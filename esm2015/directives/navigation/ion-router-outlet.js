import * as tslib_1 from "tslib";
import { Location } from '@angular/common';
import { Attribute, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, Injector, NgZone, OnDestroy, OnInit, Optional, Output, SkipSelf, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, OutletContext, PRIMARY_OUTLET, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Config } from '../../providers/config';
import { NavController } from '../../providers/nav-controller';
import { StackController } from './stack-controller';
import { getUrl } from './stack-utils';
let IonRouterOutlet = class IonRouterOutlet {
    constructor(parentContexts, location, resolver, name, tabs, config, navCtrl, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
        this.parentContexts = parentContexts;
        this.location = location;
        this.resolver = resolver;
        this.config = config;
        this.navCtrl = navCtrl;
        this.parentOutlet = parentOutlet;
        this.activated = null;
        this.activatedView = null;
        this._activatedRoute = null;
        // Maintain map of activated route proxies for each component instance
        this.proxyMap = new WeakMap();
        // Keep the latest activated route in a subject for the proxy routes to switch map to
        this.currentActivatedRoute$ = new BehaviorSubject(null);
        this.stackEvents = new EventEmitter();
        this.activateEvents = new EventEmitter();
        this.deactivateEvents = new EventEmitter();
        this.nativeEl = elementRef.nativeElement;
        this.name = name || PRIMARY_OUTLET;
        this.tabsPrefix = tabs === 'true' ? getUrl(router, activatedRoute) : undefined;
        this.stackCtrl = new StackController(this.tabsPrefix, this.nativeEl, router, navCtrl, zone, commonLocation);
        parentContexts.onChildOutletCreated(this.name, this);
    }
    set animation(animation) {
        this.nativeEl.animation = animation;
    }
    set animated(animated) {
        this.nativeEl.animated = animated;
    }
    set swipeGesture(swipe) {
        this._swipeGesture = swipe;
        this.nativeEl.swipeHandler = swipe ? {
            canStart: () => this.stackCtrl.canGoBack(1),
            onStart: () => this.stackCtrl.startBackTransition(),
            onEnd: shouldContinue => this.stackCtrl.endBackTransition(shouldContinue)
        } : undefined;
    }
    ngOnDestroy() {
        this.stackCtrl.destroy();
    }
    getContext() {
        return this.parentContexts.getContext(this.name);
    }
    ngOnInit() {
        if (!this.activated) {
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            const context = this.getContext();
            if (context && context.route) {
                this.activateWith(context.route, context.resolver || null);
            }
        }
        if (this.nativeEl.componentOnReady) {
            this.nativeEl.componentOnReady().then(() => {
                if (this._swipeGesture === undefined) {
                    this.swipeGesture = this.config.getBoolean('swipeBackEnabled', this.nativeEl.mode === 'ios');
                }
            });
        }
    }
    get isActivated() {
        return !!this.activated;
    }
    get component() {
        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }
        return this.activated.instance;
    }
    get activatedRoute() {
        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }
        return this._activatedRoute;
    }
    get activatedRouteData() {
        if (this._activatedRoute) {
            return this._activatedRoute.snapshot.data;
        }
        return {};
    }
    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    detach() {
        throw new Error('incompatible reuse strategy');
    }
    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     */
    attach(_ref, _activatedRoute) {
        throw new Error('incompatible reuse strategy');
    }
    deactivate() {
        if (this.activated) {
            if (this.activatedView) {
                this.activatedView.savedData = new Map(this.getContext().children['contexts']);
                /**
                 * Ensure we are saving the NavigationExtras
                 * data otherwise it will be lost
                 */
                this.activatedView.savedExtras = {};
                const context = this.getContext();
                if (context.route) {
                    const contextSnapshot = context.route.snapshot;
                    this.activatedView.savedExtras.queryParams = contextSnapshot.queryParams;
                    this.activatedView.savedExtras.fragment = contextSnapshot.fragment;
                }
            }
            const c = this.component;
            this.activatedView = null;
            this.activated = null;
            this._activatedRoute = null;
            this.deactivateEvents.emit(c);
        }
    }
    activateWith(activatedRoute, resolver) {
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute = activatedRoute;
        let cmpRef;
        let enteringView = this.stackCtrl.getExistingView(activatedRoute);
        if (enteringView && (!activatedRoute.routeConfig || !activatedRoute.routeConfig.data || !activatedRoute.routeConfig.data.noReuse)) {
            cmpRef = this.activated = enteringView.ref;
            const saved = enteringView.savedData;
            if (saved) {
                // self-restore
                const context = this.getContext();
                context.children['contexts'] = saved;
            }
            // Updated activated route proxy for this component
            this.updateActivatedRouteProxy(cmpRef.instance, activatedRoute);
        }
        else {
            const snapshot = activatedRoute._futureSnapshot;
            const component = snapshot.routeConfig.component;
            resolver = resolver || this.resolver;
            const factory = resolver.resolveComponentFactory(component);
            const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
            // We create an activated route proxy object that will maintain future updates for this component
            // over its lifecycle in the stack.
            const component$ = new BehaviorSubject(null);
            const activatedRouteProxy = this.createActivatedRouteProxy(component$, activatedRoute);
            const injector = new OutletInjector(activatedRouteProxy, childContexts, this.location.injector);
            cmpRef = this.activated = this.location.createComponent(factory, this.location.length, injector);
            // Once the component is created we can push it to our local subject supplied to the proxy
            component$.next(cmpRef.instance);
            // Calling `markForCheck` to make sure we will run the change detection when the
            // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
            enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
            // Store references to the proxy by component
            this.proxyMap.set(cmpRef.instance, activatedRouteProxy);
            this.currentActivatedRoute$.next({ component: cmpRef.instance, activatedRoute });
        }
        this.activatedView = enteringView;
        this.stackCtrl.setActive(enteringView).then(data => {
            this.navCtrl.setTopOutlet(this);
            this.activateEvents.emit(cmpRef.instance);
            this.stackEvents.emit(data);
        });
    }
    /**
     * Returns `true` if there are pages in the stack to go back.
     */
    canGoBack(deep = 1, stackId) {
        return this.stackCtrl.canGoBack(deep, stackId);
    }
    /**
     * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
     */
    pop(deep = 1, stackId) {
        return this.stackCtrl.pop(deep, stackId);
    }
    /**
     * Returns the URL of the active page of each stack.
     */
    getLastUrl(stackId) {
        const active = this.stackCtrl.getLastUrl(stackId);
        return active ? active.url : undefined;
    }
    /**
     * Returns the RouteView of the active page of each stack.
     * @internal
     */
    getLastRouteView(stackId) {
        return this.stackCtrl.getLastUrl(stackId);
    }
    /**
     * Returns the root view in the tab stack.
     * @internal
     */
    getRootView(stackId) {
        return this.stackCtrl.getRootUrl(stackId);
    }
    /**
     * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
     */
    getActiveStackId() {
        return this.stackCtrl.getActiveStackId();
    }
    /**
     * Since the activated route can change over the life time of a component in an ion router outlet, we create
     * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
     */
    createActivatedRouteProxy(component$, activatedRoute) {
        const proxy = new ActivatedRoute();
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        // Setup wrappers for the observables so consumers don't have to worry about switching to new observables as the state updates
        proxy._paramMap = this.proxyObservable(component$, 'paramMap');
        proxy._queryParamMap = this.proxyObservable(component$, 'queryParamMap');
        proxy.url = this.proxyObservable(component$, 'url');
        proxy.params = this.proxyObservable(component$, 'params');
        proxy.queryParams = this.proxyObservable(component$, 'queryParams');
        proxy.fragment = this.proxyObservable(component$, 'fragment');
        proxy.data = this.proxyObservable(component$, 'data');
        return proxy;
    }
    /**
     * Create a wrapped observable that will switch to the latest activated route matched by the given component
     */
    proxyObservable(component$, path) {
        return component$.pipe(
        // First wait until the component instance is pushed
        filter(component => !!component), switchMap(component => this.currentActivatedRoute$.pipe(filter(current => current !== null && current.component === component), switchMap(current => current && current.activatedRoute[path]), distinctUntilChanged())));
    }
    /**
     * Updates the activated route proxy for the given component to the new incoming router state
     */
    updateActivatedRouteProxy(component, activatedRoute) {
        const proxy = this.proxyMap.get(component);
        if (!proxy) {
            throw new Error(`Could not find activated route proxy for view`);
        }
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        this.currentActivatedRoute$.next({ component, activatedRoute });
    }
};
IonRouterOutlet.ctorParameters = () => [
    { type: ChildrenOutletContexts },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: String, decorators: [{ type: Attribute, args: ['name',] }] },
    { type: String, decorators: [{ type: Optional }, { type: Attribute, args: ['tabs',] }] },
    { type: Config },
    { type: NavController },
    { type: Location },
    { type: ElementRef },
    { type: Router },
    { type: NgZone },
    { type: ActivatedRoute },
    { type: IonRouterOutlet, decorators: [{ type: SkipSelf }, { type: Optional }] }
];
tslib_1.__decorate([
    Output()
], IonRouterOutlet.prototype, "stackEvents", void 0);
tslib_1.__decorate([
    Output('activate')
], IonRouterOutlet.prototype, "activateEvents", void 0);
tslib_1.__decorate([
    Output('deactivate')
], IonRouterOutlet.prototype, "deactivateEvents", void 0);
IonRouterOutlet = tslib_1.__decorate([
    Directive({
        selector: 'ion-router-outlet',
        exportAs: 'outlet',
        inputs: ['animated', 'animation', 'swipeGesture']
    }),
    tslib_1.__param(3, Attribute('name')),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Attribute('tabs')),
    tslib_1.__param(12, SkipSelf()), tslib_1.__param(12, Optional())
], IonRouterOutlet);
export { IonRouterOutlet };
class OutletInjector {
    constructor(route, childContexts, parent) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
    }
    get(token, notFoundValue) {
        if (token === ActivatedRoute) {
            return this.route;
        }
        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }
        // tslint:disable-next-line
        return this.parent.get(token, notFoundValue);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXJvdXRlci1vdXRsZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tcm91dGVyLW91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxTSxPQUFPLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEgsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPbEQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQXlDMUIsWUFDVSxjQUFzQyxFQUN0QyxRQUEwQixFQUMxQixRQUFrQyxFQUN2QixJQUFZLEVBQ0EsSUFBWSxFQUNuQyxNQUFjLEVBQ2QsT0FBc0IsRUFDOUIsY0FBd0IsRUFDeEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNkLElBQVks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SUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQXR0cmlidXRlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTa2lwU2VsZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgT3V0bGV0Q29udGV4dCwgUFJJTUFSWV9PVVRMRVQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyIH0gZnJvbSAnLi4vLi4vJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2NvbmZpZyc7XHJcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xyXG5cclxuaW1wb3J0IHsgU3RhY2tDb250cm9sbGVyIH0gZnJvbSAnLi9zdGFjay1jb250cm9sbGVyJztcclxuaW1wb3J0IHsgUm91dGVWaWV3LCBnZXRVcmwgfSBmcm9tICcuL3N0YWNrLXV0aWxzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW9uLXJvdXRlci1vdXRsZXQnLFxyXG4gIGV4cG9ydEFzOiAnb3V0bGV0JyxcclxuICBpbnB1dHM6IFsnYW5pbWF0ZWQnLCAnYW5pbWF0aW9uJywgJ3N3aXBlR2VzdHVyZSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb25Sb3V0ZXJPdXRsZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XHJcbiAgbmF0aXZlRWw6IEhUTUxJb25Sb3V0ZXJPdXRsZXRFbGVtZW50O1xyXG5cclxuICBwcml2YXRlIGFjdGl2YXRlZDogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsID0gbnVsbDtcclxuICBhY3RpdmF0ZWRWaWV3OiBSb3V0ZVZpZXcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfc3dpcGVHZXN0dXJlPzogYm9vbGVhbjtcclxuICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICBwcml2YXRlIHN0YWNrQ3RybDogU3RhY2tDb250cm9sbGVyO1xyXG5cclxuICAvLyBNYWludGFpbiBtYXAgb2YgYWN0aXZhdGVkIHJvdXRlIHByb3hpZXMgZm9yIGVhY2ggY29tcG9uZW50IGluc3RhbmNlXHJcbiAgcHJpdmF0ZSBwcm94eU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgQWN0aXZhdGVkUm91dGU+KCk7XHJcblxyXG4gIC8vIEtlZXAgdGhlIGxhdGVzdCBhY3RpdmF0ZWQgcm91dGUgaW4gYSBzdWJqZWN0IGZvciB0aGUgcHJveHkgcm91dGVzIHRvIHN3aXRjaCBtYXAgdG9cclxuICBwcml2YXRlIGN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHsgY29tcG9uZW50OiBhbnk7IGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSB9IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHRhYnNQcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgQE91dHB1dCgpIHN0YWNrRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgnYWN0aXZhdGUnKSBhY3RpdmF0ZUV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoJ2RlYWN0aXZhdGUnKSBkZWFjdGl2YXRlRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBBbmltYXRpb25CdWlsZGVyKSB7XHJcbiAgICB0aGlzLm5hdGl2ZUVsLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcclxuICB9XHJcblxyXG4gIHNldCBhbmltYXRlZChhbmltYXRlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5uYXRpdmVFbC5hbmltYXRlZCA9IGFuaW1hdGVkO1xyXG4gIH1cclxuXHJcbiAgc2V0IHN3aXBlR2VzdHVyZShzd2lwZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc3dpcGVHZXN0dXJlID0gc3dpcGU7XHJcblxyXG4gICAgdGhpcy5uYXRpdmVFbC5zd2lwZUhhbmRsZXIgPSBzd2lwZSA/IHtcclxuICAgICAgY2FuU3RhcnQ6ICgpID0+IHRoaXMuc3RhY2tDdHJsLmNhbkdvQmFjaygxKSxcclxuICAgICAgb25TdGFydDogKCkgPT4gdGhpcy5zdGFja0N0cmwuc3RhcnRCYWNrVHJhbnNpdGlvbigpLFxyXG4gICAgICBvbkVuZDogc2hvdWxkQ29udGludWUgPT4gdGhpcy5zdGFja0N0cmwuZW5kQmFja1RyYW5zaXRpb24oc2hvdWxkQ29udGludWUpXHJcbiAgICB9IDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLFxyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIEBBdHRyaWJ1dGUoJ25hbWUnKSBuYW1lOiBzdHJpbmcsXHJcbiAgICBAT3B0aW9uYWwoKSBAQXR0cmlidXRlKCd0YWJzJykgdGFiczogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZyxcclxuICAgIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlcixcclxuICAgIGNvbW1vbkxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICByb3V0ZXI6IFJvdXRlcixcclxuICAgIHpvbmU6IE5nWm9uZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIHJlYWRvbmx5IHBhcmVudE91dGxldD86IElvblJvdXRlck91dGxldFxyXG4gICkge1xyXG4gICAgdGhpcy5uYXRpdmVFbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgUFJJTUFSWV9PVVRMRVQ7XHJcbiAgICB0aGlzLnRhYnNQcmVmaXggPSB0YWJzID09PSAndHJ1ZScgPyBnZXRVcmwocm91dGVyLCBhY3RpdmF0ZWRSb3V0ZSkgOiB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnN0YWNrQ3RybCA9IG5ldyBTdGFja0NvbnRyb2xsZXIodGhpcy50YWJzUHJlZml4LCB0aGlzLm5hdGl2ZUVsLCByb3V0ZXIsIG5hdkN0cmwsIHpvbmUsIGNvbW1vbkxvY2F0aW9uKTtcclxuICAgIHBhcmVudENvbnRleHRzLm9uQ2hpbGRPdXRsZXRDcmVhdGVkKHRoaXMubmFtZSwgdGhpcyBhcyBhbnkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0YWNrQ3RybC5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZXh0KCk6IE91dGxldENvbnRleHQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudENvbnRleHRzLmdldENvbnRleHQodGhpcy5uYW1lKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICAvLyBJZiB0aGUgb3V0bGV0IHdhcyBub3QgaW5zdGFudGlhdGVkIGF0IHRoZSB0aW1lIHRoZSByb3V0ZSBnb3QgYWN0aXZhdGVkIHdlIG5lZWQgdG8gcG9wdWxhdGVcclxuICAgICAgLy8gdGhlIG91dGxldCB3aGVuIGl0IGlzIGluaXRpYWxpemVkIChpZSBpbnNpZGUgYSBOZ0lmKVxyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCk7XHJcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQucm91dGUpIHtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlV2l0aChjb250ZXh0LnJvdXRlLCBjb250ZXh0LnJlc29sdmVyIHx8IG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoKHRoaXMubmF0aXZlRWwgYXMgYW55KS5jb21wb25lbnRPblJlYWR5KSB7XHJcbiAgICAgIHRoaXMubmF0aXZlRWwuY29tcG9uZW50T25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zd2lwZUdlc3R1cmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5zd2lwZUdlc3R1cmUgPSB0aGlzLmNvbmZpZy5nZXRCb29sZWFuKCdzd2lwZUJhY2tFbmFibGVkJywgKHRoaXMubmF0aXZlRWwgYXMgYW55KS5tb2RlID09PSAnaW9zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBpc0FjdGl2YXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIXRoaXMuYWN0aXZhdGVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbXBvbmVudCgpOiBvYmplY3Qge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0ZWQuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZhdGVkUm91dGUoKTogQWN0aXZhdGVkUm91dGUge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGVkUm91dGUgYXMgQWN0aXZhdGVkUm91dGU7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZhdGVkUm91dGVEYXRhKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkUm91dGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2YXRlZFJvdXRlLnNuYXBzaG90LmRhdGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgYFJvdXRlUmV1c2VTdHJhdGVneWAgaW5zdHJ1Y3RzIHRvIGRldGFjaCB0aGUgc3VidHJlZVxyXG4gICAqL1xyXG4gIGRldGFjaCgpOiBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luY29tcGF0aWJsZSByZXVzZSBzdHJhdGVneScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGBSb3V0ZVJldXNlU3RyYXRlZ3lgIGluc3RydWN0cyB0byByZS1hdHRhY2ggYSBwcmV2aW91c2x5IGRldGFjaGVkIHN1YnRyZWVcclxuICAgKi9cclxuICBhdHRhY2goX3JlZjogQ29tcG9uZW50UmVmPGFueT4sIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignaW5jb21wYXRpYmxlIHJldXNlIHN0cmF0ZWd5Jyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZhdGVkKSB7XHJcbiAgICAgIGlmICh0aGlzLmFjdGl2YXRlZFZpZXcpIHtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlZFZpZXcuc2F2ZWREYXRhID0gbmV3IE1hcCh0aGlzLmdldENvbnRleHQoKSEuY2hpbGRyZW5bJ2NvbnRleHRzJ10pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbnN1cmUgd2UgYXJlIHNhdmluZyB0aGUgTmF2aWdhdGlvbkV4dHJhc1xyXG4gICAgICAgICAqIGRhdGEgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgbG9zdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKSE7XHJcblxyXG4gICAgICAgIGlmIChjb250ZXh0LnJvdXRlKSB7XHJcbiAgICAgICAgICBjb25zdCBjb250ZXh0U25hcHNob3QgPSBjb250ZXh0LnJvdXRlLnNuYXBzaG90O1xyXG5cclxuICAgICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcy5xdWVyeVBhcmFtcyA9IGNvbnRleHRTbmFwc2hvdC5xdWVyeVBhcmFtcztcclxuICAgICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcy5mcmFnbWVudCA9IGNvbnRleHRTbmFwc2hvdC5mcmFnbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYyA9IHRoaXMuY29tcG9uZW50O1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZFZpZXcgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZCA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2FjdGl2YXRlZFJvdXRlID0gbnVsbDtcclxuICAgICAgdGhpcy5kZWFjdGl2YXRlRXZlbnRzLmVtaXQoYyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZVdpdGgoYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHwgbnVsbCkge1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmF0ZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWN0aXZhdGUgYW4gYWxyZWFkeSBhY3RpdmF0ZWQgb3V0bGV0Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xyXG5cclxuICAgIGxldCBjbXBSZWY6IGFueTtcclxuICAgIGxldCBlbnRlcmluZ1ZpZXcgPSB0aGlzLnN0YWNrQ3RybC5nZXRFeGlzdGluZ1ZpZXcoYWN0aXZhdGVkUm91dGUpO1xyXG4gICAgaWYgKGVudGVyaW5nVmlldyAmJiAoIWFjdGl2YXRlZFJvdXRlLnJvdXRlQ29uZmlnIHx8ICFhY3RpdmF0ZWRSb3V0ZS5yb3V0ZUNvbmZpZy5kYXRhIHx8ICFhY3RpdmF0ZWRSb3V0ZS5yb3V0ZUNvbmZpZy5kYXRhLm5vUmV1c2UpKSB7XHJcbiAgICAgIGNtcFJlZiA9IHRoaXMuYWN0aXZhdGVkID0gZW50ZXJpbmdWaWV3LnJlZjtcclxuICAgICAgY29uc3Qgc2F2ZWQgPSBlbnRlcmluZ1ZpZXcuc2F2ZWREYXRhO1xyXG4gICAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgICAvLyBzZWxmLXJlc3RvcmVcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCkhO1xyXG4gICAgICAgIGNvbnRleHQuY2hpbGRyZW5bJ2NvbnRleHRzJ10gPSBzYXZlZDtcclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGVkIGFjdGl2YXRlZCByb3V0ZSBwcm94eSBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAgdGhpcy51cGRhdGVBY3RpdmF0ZWRSb3V0ZVByb3h5KGNtcFJlZi5pbnN0YW5jZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc25hcHNob3QgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fZnV0dXJlU25hcHNob3Q7XHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHNuYXBzaG90LnJvdXRlQ29uZmlnIS5jb21wb25lbnQgYXMgYW55O1xyXG4gICAgICByZXNvbHZlciA9IHJlc29sdmVyIHx8IHRoaXMucmVzb2x2ZXI7XHJcblxyXG4gICAgICBjb25zdCBmYWN0b3J5ID0gcmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcclxuICAgICAgY29uc3QgY2hpbGRDb250ZXh0cyA9IHRoaXMucGFyZW50Q29udGV4dHMuZ2V0T3JDcmVhdGVDb250ZXh0KHRoaXMubmFtZSkuY2hpbGRyZW47XHJcblxyXG4gICAgICAvLyBXZSBjcmVhdGUgYW4gYWN0aXZhdGVkIHJvdXRlIHByb3h5IG9iamVjdCB0aGF0IHdpbGwgbWFpbnRhaW4gZnV0dXJlIHVwZGF0ZXMgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgIC8vIG92ZXIgaXRzIGxpZmVjeWNsZSBpbiB0aGUgc3RhY2suXHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XHJcbiAgICAgIGNvbnN0IGFjdGl2YXRlZFJvdXRlUHJveHkgPSB0aGlzLmNyZWF0ZUFjdGl2YXRlZFJvdXRlUHJveHkoY29tcG9uZW50JCwgYWN0aXZhdGVkUm91dGUpO1xyXG5cclxuICAgICAgY29uc3QgaW5qZWN0b3IgPSBuZXcgT3V0bGV0SW5qZWN0b3IoYWN0aXZhdGVkUm91dGVQcm94eSwgY2hpbGRDb250ZXh0cywgdGhpcy5sb2NhdGlvbi5pbmplY3Rvcik7XHJcbiAgICAgIGNtcFJlZiA9IHRoaXMuYWN0aXZhdGVkID0gdGhpcy5sb2NhdGlvbi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgdGhpcy5sb2NhdGlvbi5sZW5ndGgsIGluamVjdG9yKTtcclxuXHJcbiAgICAgIC8vIE9uY2UgdGhlIGNvbXBvbmVudCBpcyBjcmVhdGVkIHdlIGNhbiBwdXNoIGl0IHRvIG91ciBsb2NhbCBzdWJqZWN0IHN1cHBsaWVkIHRvIHRoZSBwcm94eVxyXG4gICAgICBjb21wb25lbnQkLm5leHQoY21wUmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICAgIC8vIENhbGxpbmcgYG1hcmtGb3JDaGVja2AgdG8gbWFrZSBzdXJlIHdlIHdpbGwgcnVuIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlXHJcbiAgICAgIC8vIGBSb3V0ZXJPdXRsZXRgIGlzIGluc2lkZSBhIGBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hgIGNvbXBvbmVudC5cclxuICAgICAgZW50ZXJpbmdWaWV3ID0gdGhpcy5zdGFja0N0cmwuY3JlYXRlVmlldyh0aGlzLmFjdGl2YXRlZCwgYWN0aXZhdGVkUm91dGUpO1xyXG5cclxuICAgICAgLy8gU3RvcmUgcmVmZXJlbmNlcyB0byB0aGUgcHJveHkgYnkgY29tcG9uZW50XHJcbiAgICAgIHRoaXMucHJveHlNYXAuc2V0KGNtcFJlZi5pbnN0YW5jZSwgYWN0aXZhdGVkUm91dGVQcm94eSk7XHJcbiAgICAgIHRoaXMuY3VycmVudEFjdGl2YXRlZFJvdXRlJC5uZXh0KHsgY29tcG9uZW50OiBjbXBSZWYuaW5zdGFuY2UsIGFjdGl2YXRlZFJvdXRlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZhdGVkVmlldyA9IGVudGVyaW5nVmlldztcclxuICAgIHRoaXMuc3RhY2tDdHJsLnNldEFjdGl2ZShlbnRlcmluZ1ZpZXcpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIHRoaXMubmF2Q3RybC5zZXRUb3BPdXRsZXQodGhpcyk7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVFdmVudHMuZW1pdChjbXBSZWYuaW5zdGFuY2UpO1xyXG4gICAgICB0aGlzLnN0YWNrRXZlbnRzLmVtaXQoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZXJlIGFyZSBwYWdlcyBpbiB0aGUgc3RhY2sgdG8gZ28gYmFjay5cclxuICAgKi9cclxuICBjYW5Hb0JhY2soZGVlcCA9IDEsIHN0YWNrSWQ/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5jYW5Hb0JhY2soZGVlcCwgc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNvbHZlcyB0byBgdHJ1ZWAgaWYgaXQgdGhlIG91dGxldCB3YXMgYWJsZSB0byBzdWNlc3NmdWxseSBwb3AgdGhlIGxhc3QgTiBwYWdlcy5cclxuICAgKi9cclxuICBwb3AoZGVlcCA9IDEsIHN0YWNrSWQ/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5wb3AoZGVlcCwgc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBVUkwgb2YgdGhlIGFjdGl2ZSBwYWdlIG9mIGVhY2ggc3RhY2suXHJcbiAgICovXHJcbiAgZ2V0TGFzdFVybChzdGFja0lkPzogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuc3RhY2tDdHJsLmdldExhc3RVcmwoc3RhY2tJZCk7XHJcbiAgICByZXR1cm4gYWN0aXZlID8gYWN0aXZlLnVybCA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIFJvdXRlVmlldyBvZiB0aGUgYWN0aXZlIHBhZ2Ugb2YgZWFjaCBzdGFjay5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRMYXN0Um91dGVWaWV3KHN0YWNrSWQ/OiBzdHJpbmcpOiBSb3V0ZVZpZXcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldExhc3RVcmwoc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IHZpZXcgaW4gdGhlIHRhYiBzdGFjay5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRSb290VmlldyhzdGFja0lkPzogc3RyaW5nKTogUm91dGVWaWV3IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5nZXRSb290VXJsKHN0YWNrSWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgYWN0aXZlIHN0YWNrIElELiBJbiB0aGUgY29udGV4dCBvZiBpb24tdGFicywgaXQgbWVhbnMgdGhlIGFjdGl2ZSB0YWIuXHJcbiAgICovXHJcbiAgZ2V0QWN0aXZlU3RhY2tJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldEFjdGl2ZVN0YWNrSWQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpbmNlIHRoZSBhY3RpdmF0ZWQgcm91dGUgY2FuIGNoYW5nZSBvdmVyIHRoZSBsaWZlIHRpbWUgb2YgYSBjb21wb25lbnQgaW4gYW4gaW9uIHJvdXRlciBvdXRsZXQsIHdlIGNyZWF0ZVxyXG4gICAqIGEgcHJveHkgc28gdGhhdCB3ZSBjYW4gdXBkYXRlIHRoZSB2YWx1ZXMgb3ZlciB0aW1lIGFzIGEgdXNlciBuYXZpZ2F0ZXMgYmFjayB0byBjb21wb25lbnRzIGFscmVhZHkgaW4gdGhlIHN0YWNrLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlQWN0aXZhdGVkUm91dGVQcm94eShjb21wb25lbnQkOiBPYnNlcnZhYmxlPGFueT4sIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IEFjdGl2YXRlZFJvdXRlIHtcclxuICAgIGNvbnN0IHByb3h5OiBhbnkgPSBuZXcgQWN0aXZhdGVkUm91dGUoKTtcclxuXHJcbiAgICBwcm94eS5fZnV0dXJlU25hcHNob3QgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fZnV0dXJlU25hcHNob3Q7XHJcbiAgICBwcm94eS5fcm91dGVyU3RhdGUgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fcm91dGVyU3RhdGU7XHJcbiAgICBwcm94eS5zbmFwc2hvdCA9IGFjdGl2YXRlZFJvdXRlLnNuYXBzaG90O1xyXG4gICAgcHJveHkub3V0bGV0ID0gYWN0aXZhdGVkUm91dGUub3V0bGV0O1xyXG4gICAgcHJveHkuY29tcG9uZW50ID0gYWN0aXZhdGVkUm91dGUuY29tcG9uZW50O1xyXG5cclxuICAgIC8vIFNldHVwIHdyYXBwZXJzIGZvciB0aGUgb2JzZXJ2YWJsZXMgc28gY29uc3VtZXJzIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgc3dpdGNoaW5nIHRvIG5ldyBvYnNlcnZhYmxlcyBhcyB0aGUgc3RhdGUgdXBkYXRlc1xyXG4gICAgKHByb3h5IGFzIGFueSkuX3BhcmFtTWFwID0gdGhpcy5wcm94eU9ic2VydmFibGUoY29tcG9uZW50JCwgJ3BhcmFtTWFwJyk7XHJcbiAgICAocHJveHkgYXMgYW55KS5fcXVlcnlQYXJhbU1hcCA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdxdWVyeVBhcmFtTWFwJyk7XHJcbiAgICBwcm94eS51cmwgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAndXJsJyk7XHJcbiAgICBwcm94eS5wYXJhbXMgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAncGFyYW1zJyk7XHJcbiAgICBwcm94eS5xdWVyeVBhcmFtcyA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdxdWVyeVBhcmFtcycpO1xyXG4gICAgcHJveHkuZnJhZ21lbnQgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAnZnJhZ21lbnQnKTtcclxuICAgIHByb3h5LmRhdGEgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAnZGF0YScpO1xyXG5cclxuICAgIHJldHVybiBwcm94eSBhcyBBY3RpdmF0ZWRSb3V0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHdyYXBwZWQgb2JzZXJ2YWJsZSB0aGF0IHdpbGwgc3dpdGNoIHRvIHRoZSBsYXRlc3QgYWN0aXZhdGVkIHJvdXRlIG1hdGNoZWQgYnkgdGhlIGdpdmVuIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQ6IE9ic2VydmFibGU8YW55PiwgcGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBjb21wb25lbnQkLnBpcGUoXHJcbiAgICAgIC8vIEZpcnN0IHdhaXQgdW50aWwgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBpcyBwdXNoZWRcclxuICAgICAgZmlsdGVyKGNvbXBvbmVudCA9PiAhIWNvbXBvbmVudCksXHJcbiAgICAgIHN3aXRjaE1hcChjb21wb25lbnQgPT5cclxuICAgICAgICB0aGlzLmN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQucGlwZShcclxuICAgICAgICAgIGZpbHRlcihjdXJyZW50ID0+IGN1cnJlbnQgIT09IG51bGwgJiYgY3VycmVudC5jb21wb25lbnQgPT09IGNvbXBvbmVudCksXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoY3VycmVudCA9PiBjdXJyZW50ICYmIChjdXJyZW50LmFjdGl2YXRlZFJvdXRlIGFzIGFueSlbcGF0aF0pLFxyXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGFjdGl2YXRlZCByb3V0ZSBwcm94eSBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudCB0byB0aGUgbmV3IGluY29taW5nIHJvdXRlciBzdGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlQWN0aXZhdGVkUm91dGVQcm94eShjb21wb25lbnQ6IGFueSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKTogdm9pZCB7XHJcbiAgICBjb25zdCBwcm94eSA9IHRoaXMucHJveHlNYXAuZ2V0KGNvbXBvbmVudCk7XHJcbiAgICBpZiAoIXByb3h5KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYWN0aXZhdGVkIHJvdXRlIHByb3h5IGZvciB2aWV3YCk7XHJcbiAgICB9XHJcblxyXG4gICAgKHByb3h5IGFzIGFueSkuX2Z1dHVyZVNuYXBzaG90ID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX2Z1dHVyZVNuYXBzaG90O1xyXG4gICAgKHByb3h5IGFzIGFueSkuX3JvdXRlclN0YXRlID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX3JvdXRlclN0YXRlO1xyXG4gICAgcHJveHkuc25hcHNob3QgPSBhY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdDtcclxuICAgIHByb3h5Lm91dGxldCA9IGFjdGl2YXRlZFJvdXRlLm91dGxldDtcclxuICAgIHByb3h5LmNvbXBvbmVudCA9IGFjdGl2YXRlZFJvdXRlLmNvbXBvbmVudDtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQubmV4dCh7IGNvbXBvbmVudCwgYWN0aXZhdGVkUm91dGUgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBPdXRsZXRJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBjaGlsZENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLFxyXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKHRva2VuID09PSBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodG9rZW4gPT09IENoaWxkcmVuT3V0bGV0Q29udGV4dHMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRDb250ZXh0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIHJldHVybiB0aGlzLnBhcmVudC5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=