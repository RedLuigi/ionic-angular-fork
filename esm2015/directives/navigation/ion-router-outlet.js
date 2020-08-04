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
            onEnd: (shouldContinue) => this.stackCtrl.endBackTransition(shouldContinue)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXJvdXRlci1vdXRsZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tcm91dGVyLW91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxTSxPQUFPLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEgsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPbEQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQXlDMUIsWUFDVSxjQUFzQyxFQUN0QyxRQUEwQixFQUMxQixRQUFrQyxFQUN2QixJQUFZLEVBQ0EsSUFBWSxFQUNuQyxNQUFjLEVBQ2QsT0FBc0IsRUFDOUIsY0FBd0IsRUFDeEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNkLElBQVks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LE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQXR0cmlidXRlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTa2lwU2VsZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgT3V0bGV0Q29udGV4dCwgUFJJTUFSWV9PVVRMRVQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyIH0gZnJvbSAnLi4vLi4vJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2NvbmZpZyc7XHJcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xyXG5cclxuaW1wb3J0IHsgU3RhY2tDb250cm9sbGVyIH0gZnJvbSAnLi9zdGFjay1jb250cm9sbGVyJztcclxuaW1wb3J0IHsgUm91dGVWaWV3LCBnZXRVcmwgfSBmcm9tICcuL3N0YWNrLXV0aWxzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW9uLXJvdXRlci1vdXRsZXQnLFxyXG4gIGV4cG9ydEFzOiAnb3V0bGV0JyxcclxuICBpbnB1dHM6IFsnYW5pbWF0ZWQnLCAnYW5pbWF0aW9uJywgJ3N3aXBlR2VzdHVyZSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb25Sb3V0ZXJPdXRsZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XHJcbiAgbmF0aXZlRWw6IEhUTUxJb25Sb3V0ZXJPdXRsZXRFbGVtZW50O1xyXG5cclxuICBwcml2YXRlIGFjdGl2YXRlZDogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsID0gbnVsbDtcclxuICBhY3RpdmF0ZWRWaWV3OiBSb3V0ZVZpZXcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfc3dpcGVHZXN0dXJlPzogYm9vbGVhbjtcclxuICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICBwcml2YXRlIHN0YWNrQ3RybDogU3RhY2tDb250cm9sbGVyO1xyXG5cclxuICAvLyBNYWludGFpbiBtYXAgb2YgYWN0aXZhdGVkIHJvdXRlIHByb3hpZXMgZm9yIGVhY2ggY29tcG9uZW50IGluc3RhbmNlXHJcbiAgcHJpdmF0ZSBwcm94eU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgQWN0aXZhdGVkUm91dGU+KCk7XHJcblxyXG4gIC8vIEtlZXAgdGhlIGxhdGVzdCBhY3RpdmF0ZWQgcm91dGUgaW4gYSBzdWJqZWN0IGZvciB0aGUgcHJveHkgcm91dGVzIHRvIHN3aXRjaCBtYXAgdG9cclxuICBwcml2YXRlIGN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHsgY29tcG9uZW50OiBhbnk7IGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSB9IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHRhYnNQcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgQE91dHB1dCgpIHN0YWNrRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgnYWN0aXZhdGUnKSBhY3RpdmF0ZUV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoJ2RlYWN0aXZhdGUnKSBkZWFjdGl2YXRlRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBBbmltYXRpb25CdWlsZGVyKSB7XHJcbiAgICB0aGlzLm5hdGl2ZUVsLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcclxuICB9XHJcblxyXG4gIHNldCBhbmltYXRlZChhbmltYXRlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5uYXRpdmVFbC5hbmltYXRlZCA9IGFuaW1hdGVkO1xyXG4gIH1cclxuXHJcbiAgc2V0IHN3aXBlR2VzdHVyZShzd2lwZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc3dpcGVHZXN0dXJlID0gc3dpcGU7XHJcblxyXG4gICAgdGhpcy5uYXRpdmVFbC5zd2lwZUhhbmRsZXIgPSBzd2lwZSA/IHtcclxuICAgICAgY2FuU3RhcnQ6ICgpID0+IHRoaXMuc3RhY2tDdHJsLmNhbkdvQmFjaygxKSxcclxuICAgICAgb25TdGFydDogKCkgPT4gdGhpcy5zdGFja0N0cmwuc3RhcnRCYWNrVHJhbnNpdGlvbigpLFxyXG4gICAgICBvbkVuZDogKHNob3VsZENvbnRpbnVlOiBib29sZWFuKSA9PiB0aGlzLnN0YWNrQ3RybC5lbmRCYWNrVHJhbnNpdGlvbihzaG91bGRDb250aW51ZSlcclxuICAgIH0gOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcGFyZW50Q29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsXHJcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgQEF0dHJpYnV0ZSgnbmFtZScpIG5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIEBBdHRyaWJ1dGUoJ3RhYnMnKSB0YWJzOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBuYXZDdHJsOiBOYXZDb250cm9sbGVyLFxyXG4gICAgY29tbW9uTG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHJvdXRlcjogUm91dGVyLFxyXG4gICAgem9uZTogTmdab25lLFxyXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgcmVhZG9ubHkgcGFyZW50T3V0bGV0PzogSW9uUm91dGVyT3V0bGV0XHJcbiAgKSB7XHJcbiAgICB0aGlzLm5hdGl2ZUVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZSB8fCBQUklNQVJZX09VVExFVDtcclxuICAgIHRoaXMudGFic1ByZWZpeCA9IHRhYnMgPT09ICd0cnVlJyA/IGdldFVybChyb3V0ZXIsIGFjdGl2YXRlZFJvdXRlKSA6IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuc3RhY2tDdHJsID0gbmV3IFN0YWNrQ29udHJvbGxlcih0aGlzLnRhYnNQcmVmaXgsIHRoaXMubmF0aXZlRWwsIHJvdXRlciwgbmF2Q3RybCwgem9uZSwgY29tbW9uTG9jYXRpb24pO1xyXG4gICAgcGFyZW50Q29udGV4dHMub25DaGlsZE91dGxldENyZWF0ZWQodGhpcy5uYW1lLCB0aGlzIGFzIGFueSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RhY2tDdHJsLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIGdldENvbnRleHQoKTogT3V0bGV0Q29udGV4dCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50Q29udGV4dHMuZ2V0Q29udGV4dCh0aGlzLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZhdGVkKSB7XHJcbiAgICAgIC8vIElmIHRoZSBvdXRsZXQgd2FzIG5vdCBpbnN0YW50aWF0ZWQgYXQgdGhlIHRpbWUgdGhlIHJvdXRlIGdvdCBhY3RpdmF0ZWQgd2UgbmVlZCB0byBwb3B1bGF0ZVxyXG4gICAgICAvLyB0aGUgb3V0bGV0IHdoZW4gaXQgaXMgaW5pdGlhbGl6ZWQgKGllIGluc2lkZSBhIE5nSWYpXHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKTtcclxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5yb3V0ZSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVXaXRoKGNvbnRleHQucm91dGUsIGNvbnRleHQucmVzb2x2ZXIgfHwgbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICgodGhpcy5uYXRpdmVFbCBhcyBhbnkpLmNvbXBvbmVudE9uUmVhZHkpIHtcclxuICAgICAgdGhpcy5uYXRpdmVFbC5jb21wb25lbnRPblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N3aXBlR2VzdHVyZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnN3aXBlR2VzdHVyZSA9IHRoaXMuY29uZmlnLmdldEJvb2xlYW4oJ3N3aXBlQmFja0VuYWJsZWQnLCAodGhpcy5uYXRpdmVFbCBhcyBhbnkpLm1vZGUgPT09ICdpb3MnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGlzQWN0aXZhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy5hY3RpdmF0ZWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgY29tcG9uZW50KCk6IG9iamVjdCB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZhdGVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignT3V0bGV0IGlzIG5vdCBhY3RpdmF0ZWQnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmFjdGl2YXRlZC5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmF0ZWRSb3V0ZSgpOiBBY3RpdmF0ZWRSb3V0ZSB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZhdGVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignT3V0bGV0IGlzIG5vdCBhY3RpdmF0ZWQnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSBhcyBBY3RpdmF0ZWRSb3V0ZTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmF0ZWRSb3V0ZURhdGEoKTogYW55IHtcclxuICAgIGlmICh0aGlzLl9hY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGVkUm91dGUuc25hcHNob3QuZGF0YTtcclxuICAgIH1cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIHRoZSBgUm91dGVSZXVzZVN0cmF0ZWd5YCBpbnN0cnVjdHMgdG8gZGV0YWNoIHRoZSBzdWJ0cmVlXHJcbiAgICovXHJcbiAgZGV0YWNoKCk6IENvbXBvbmVudFJlZjxhbnk+IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignaW5jb21wYXRpYmxlIHJldXNlIHN0cmF0ZWd5Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgYFJvdXRlUmV1c2VTdHJhdGVneWAgaW5zdHJ1Y3RzIHRvIHJlLWF0dGFjaCBhIHByZXZpb3VzbHkgZGV0YWNoZWQgc3VidHJlZVxyXG4gICAqL1xyXG4gIGF0dGFjaChfcmVmOiBDb21wb25lbnRSZWY8YW55PiwgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbmNvbXBhdGlibGUgcmV1c2Ugc3RyYXRlZ3knKTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmF0ZWQpIHtcclxuICAgICAgaWYgKHRoaXMuYWN0aXZhdGVkVmlldykge1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZERhdGEgPSBuZXcgTWFwKHRoaXMuZ2V0Q29udGV4dCgpIS5jaGlsZHJlblsnY29udGV4dHMnXSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuc3VyZSB3ZSBhcmUgc2F2aW5nIHRoZSBOYXZpZ2F0aW9uRXh0cmFzXHJcbiAgICAgICAgICogZGF0YSBvdGhlcndpc2UgaXQgd2lsbCBiZSBsb3N0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRWaWV3LnNhdmVkRXh0cmFzID0ge307XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dCgpITtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRleHQucm91dGUpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbnRleHRTbmFwc2hvdCA9IGNvbnRleHQucm91dGUuc25hcHNob3Q7XHJcblxyXG4gICAgICAgICAgdGhpcy5hY3RpdmF0ZWRWaWV3LnNhdmVkRXh0cmFzLnF1ZXJ5UGFyYW1zID0gY29udGV4dFNuYXBzaG90LnF1ZXJ5UGFyYW1zO1xyXG4gICAgICAgICAgdGhpcy5hY3RpdmF0ZWRWaWV3LnNhdmVkRXh0cmFzLmZyYWdtZW50ID0gY29udGV4dFNuYXBzaG90LmZyYWdtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjID0gdGhpcy5jb21wb25lbnQ7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVkVmlldyA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVkID0gbnVsbDtcclxuICAgICAgdGhpcy5fYWN0aXZhdGVkUm91dGUgPSBudWxsO1xyXG4gICAgICB0aGlzLmRlYWN0aXZhdGVFdmVudHMuZW1pdChjKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFjdGl2YXRlV2l0aChhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfCBudWxsKSB7XHJcbiAgICBpZiAodGhpcy5pc0FjdGl2YXRlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhY3RpdmF0ZSBhbiBhbHJlYWR5IGFjdGl2YXRlZCBvdXRsZXQnKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2FjdGl2YXRlZFJvdXRlID0gYWN0aXZhdGVkUm91dGU7XHJcblxyXG4gICAgbGV0IGNtcFJlZjogYW55O1xyXG4gICAgbGV0IGVudGVyaW5nVmlldyA9IHRoaXMuc3RhY2tDdHJsLmdldEV4aXN0aW5nVmlldyhhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgICBpZiAoZW50ZXJpbmdWaWV3ICYmICghYWN0aXZhdGVkUm91dGUucm91dGVDb25maWcgfHwgIWFjdGl2YXRlZFJvdXRlLnJvdXRlQ29uZmlnLmRhdGEgfHwgIWFjdGl2YXRlZFJvdXRlLnJvdXRlQ29uZmlnLmRhdGEubm9SZXVzZSkpIHtcclxuICAgICAgY21wUmVmID0gdGhpcy5hY3RpdmF0ZWQgPSBlbnRlcmluZ1ZpZXcucmVmO1xyXG4gICAgICBjb25zdCBzYXZlZCA9IGVudGVyaW5nVmlldy5zYXZlZERhdGE7XHJcbiAgICAgIGlmIChzYXZlZCkge1xyXG4gICAgICAgIC8vIHNlbGYtcmVzdG9yZVxyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKSE7XHJcbiAgICAgICAgY29udGV4dC5jaGlsZHJlblsnY29udGV4dHMnXSA9IHNhdmVkO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFVwZGF0ZWQgYWN0aXZhdGVkIHJvdXRlIHByb3h5IGZvciB0aGlzIGNvbXBvbmVudFxyXG4gICAgICB0aGlzLnVwZGF0ZUFjdGl2YXRlZFJvdXRlUHJveHkoY21wUmVmLmluc3RhbmNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IChhY3RpdmF0ZWRSb3V0ZSBhcyBhbnkpLl9mdXR1cmVTbmFwc2hvdDtcclxuICAgICAgY29uc3QgY29tcG9uZW50ID0gc25hcHNob3Qucm91dGVDb25maWchLmNvbXBvbmVudCBhcyBhbnk7XHJcbiAgICAgIHJlc29sdmVyID0gcmVzb2x2ZXIgfHwgdGhpcy5yZXNvbHZlcjtcclxuXHJcbiAgICAgIGNvbnN0IGZhY3RvcnkgPSByZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xyXG4gICAgICBjb25zdCBjaGlsZENvbnRleHRzID0gdGhpcy5wYXJlbnRDb250ZXh0cy5nZXRPckNyZWF0ZUNvbnRleHQodGhpcy5uYW1lKS5jaGlsZHJlbjtcclxuXHJcbiAgICAgIC8vIFdlIGNyZWF0ZSBhbiBhY3RpdmF0ZWQgcm91dGUgcHJveHkgb2JqZWN0IHRoYXQgd2lsbCBtYWludGFpbiBmdXR1cmUgdXBkYXRlcyBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAgLy8gb3ZlciBpdHMgbGlmZWN5Y2xlIGluIHRoZSBzdGFjay5cclxuICAgICAgY29uc3QgY29tcG9uZW50JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcclxuICAgICAgY29uc3QgYWN0aXZhdGVkUm91dGVQcm94eSA9IHRoaXMuY3JlYXRlQWN0aXZhdGVkUm91dGVQcm94eShjb21wb25lbnQkLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcblxyXG4gICAgICBjb25zdCBpbmplY3RvciA9IG5ldyBPdXRsZXRJbmplY3RvcihhY3RpdmF0ZWRSb3V0ZVByb3h5LCBjaGlsZENvbnRleHRzLCB0aGlzLmxvY2F0aW9uLmluamVjdG9yKTtcclxuICAgICAgY21wUmVmID0gdGhpcy5hY3RpdmF0ZWQgPSB0aGlzLmxvY2F0aW9uLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCB0aGlzLmxvY2F0aW9uLmxlbmd0aCwgaW5qZWN0b3IpO1xyXG5cclxuICAgICAgLy8gT25jZSB0aGUgY29tcG9uZW50IGlzIGNyZWF0ZWQgd2UgY2FuIHB1c2ggaXQgdG8gb3VyIGxvY2FsIHN1YmplY3Qgc3VwcGxpZWQgdG8gdGhlIHByb3h5XHJcbiAgICAgIGNvbXBvbmVudCQubmV4dChjbXBSZWYuaW5zdGFuY2UpO1xyXG5cclxuICAgICAgLy8gQ2FsbGluZyBgbWFya0ZvckNoZWNrYCB0byBtYWtlIHN1cmUgd2Ugd2lsbCBydW4gdGhlIGNoYW5nZSBkZXRlY3Rpb24gd2hlbiB0aGVcclxuICAgICAgLy8gYFJvdXRlck91dGxldGAgaXMgaW5zaWRlIGEgYENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaGAgY29tcG9uZW50LlxyXG4gICAgICBlbnRlcmluZ1ZpZXcgPSB0aGlzLnN0YWNrQ3RybC5jcmVhdGVWaWV3KHRoaXMuYWN0aXZhdGVkLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcblxyXG4gICAgICAvLyBTdG9yZSByZWZlcmVuY2VzIHRvIHRoZSBwcm94eSBieSBjb21wb25lbnRcclxuICAgICAgdGhpcy5wcm94eU1hcC5zZXQoY21wUmVmLmluc3RhbmNlLCBhY3RpdmF0ZWRSb3V0ZVByb3h5KTtcclxuICAgICAgdGhpcy5jdXJyZW50QWN0aXZhdGVkUm91dGUkLm5leHQoeyBjb21wb25lbnQ6IGNtcFJlZi5pbnN0YW5jZSwgYWN0aXZhdGVkUm91dGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmF0ZWRWaWV3ID0gZW50ZXJpbmdWaWV3O1xyXG4gICAgdGhpcy5zdGFja0N0cmwuc2V0QWN0aXZlKGVudGVyaW5nVmlldykudGhlbihkYXRhID0+IHtcclxuICAgICAgdGhpcy5uYXZDdHJsLnNldFRvcE91dGxldCh0aGlzKTtcclxuICAgICAgdGhpcy5hY3RpdmF0ZUV2ZW50cy5lbWl0KGNtcFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgIHRoaXMuc3RhY2tFdmVudHMuZW1pdChkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlcmUgYXJlIHBhZ2VzIGluIHRoZSBzdGFjayB0byBnbyBiYWNrLlxyXG4gICAqL1xyXG4gIGNhbkdvQmFjayhkZWVwID0gMSwgc3RhY2tJZD86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmNhbkdvQmFjayhkZWVwLCBzdGFja0lkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc29sdmVzIHRvIGB0cnVlYCBpZiBpdCB0aGUgb3V0bGV0IHdhcyBhYmxlIHRvIHN1Y2Vzc2Z1bGx5IHBvcCB0aGUgbGFzdCBOIHBhZ2VzLlxyXG4gICAqL1xyXG4gIHBvcChkZWVwID0gMSwgc3RhY2tJZD86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLnBvcChkZWVwLCBzdGFja0lkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIFVSTCBvZiB0aGUgYWN0aXZlIHBhZ2Ugb2YgZWFjaCBzdGFjay5cclxuICAgKi9cclxuICBnZXRMYXN0VXJsKHN0YWNrSWQ/OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5zdGFja0N0cmwuZ2V0TGFzdFVybChzdGFja0lkKTtcclxuICAgIHJldHVybiBhY3RpdmUgPyBhY3RpdmUudXJsIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgUm91dGVWaWV3IG9mIHRoZSBhY3RpdmUgcGFnZSBvZiBlYWNoIHN0YWNrLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldExhc3RSb3V0ZVZpZXcoc3RhY2tJZD86IHN0cmluZyk6IFJvdXRlVmlldyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGFja0N0cmwuZ2V0TGFzdFVybChzdGFja0lkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgdmlldyBpbiB0aGUgdGFiIHN0YWNrLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldFJvb3RWaWV3KHN0YWNrSWQ/OiBzdHJpbmcpOiBSb3V0ZVZpZXcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldFJvb3RVcmwoc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBhY3RpdmUgc3RhY2sgSUQuIEluIHRoZSBjb250ZXh0IG9mIGlvbi10YWJzLCBpdCBtZWFucyB0aGUgYWN0aXZlIHRhYi5cclxuICAgKi9cclxuICBnZXRBY3RpdmVTdGFja0lkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGFja0N0cmwuZ2V0QWN0aXZlU3RhY2tJZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2luY2UgdGhlIGFjdGl2YXRlZCByb3V0ZSBjYW4gY2hhbmdlIG92ZXIgdGhlIGxpZmUgdGltZSBvZiBhIGNvbXBvbmVudCBpbiBhbiBpb24gcm91dGVyIG91dGxldCwgd2UgY3JlYXRlXHJcbiAgICogYSBwcm94eSBzbyB0aGF0IHdlIGNhbiB1cGRhdGUgdGhlIHZhbHVlcyBvdmVyIHRpbWUgYXMgYSB1c2VyIG5hdmlnYXRlcyBiYWNrIHRvIGNvbXBvbmVudHMgYWxyZWFkeSBpbiB0aGUgc3RhY2suXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVBY3RpdmF0ZWRSb3V0ZVByb3h5KGNvbXBvbmVudCQ6IE9ic2VydmFibGU8YW55PiwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKTogQWN0aXZhdGVkUm91dGUge1xyXG4gICAgY29uc3QgcHJveHk6IGFueSA9IG5ldyBBY3RpdmF0ZWRSb3V0ZSgpO1xyXG5cclxuICAgIHByb3h5Ll9mdXR1cmVTbmFwc2hvdCA9IChhY3RpdmF0ZWRSb3V0ZSBhcyBhbnkpLl9mdXR1cmVTbmFwc2hvdDtcclxuICAgIHByb3h5Ll9yb3V0ZXJTdGF0ZSA9IChhY3RpdmF0ZWRSb3V0ZSBhcyBhbnkpLl9yb3V0ZXJTdGF0ZTtcclxuICAgIHByb3h5LnNuYXBzaG90ID0gYWN0aXZhdGVkUm91dGUuc25hcHNob3Q7XHJcbiAgICBwcm94eS5vdXRsZXQgPSBhY3RpdmF0ZWRSb3V0ZS5vdXRsZXQ7XHJcbiAgICBwcm94eS5jb21wb25lbnQgPSBhY3RpdmF0ZWRSb3V0ZS5jb21wb25lbnQ7XHJcblxyXG4gICAgLy8gU2V0dXAgd3JhcHBlcnMgZm9yIHRoZSBvYnNlcnZhYmxlcyBzbyBjb25zdW1lcnMgZG9uJ3QgaGF2ZSB0byB3b3JyeSBhYm91dCBzd2l0Y2hpbmcgdG8gbmV3IG9ic2VydmFibGVzIGFzIHRoZSBzdGF0ZSB1cGRhdGVzXHJcbiAgICAocHJveHkgYXMgYW55KS5fcGFyYW1NYXAgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAncGFyYW1NYXAnKTtcclxuICAgIChwcm94eSBhcyBhbnkpLl9xdWVyeVBhcmFtTWFwID0gdGhpcy5wcm94eU9ic2VydmFibGUoY29tcG9uZW50JCwgJ3F1ZXJ5UGFyYW1NYXAnKTtcclxuICAgIHByb3h5LnVybCA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICd1cmwnKTtcclxuICAgIHByb3h5LnBhcmFtcyA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdwYXJhbXMnKTtcclxuICAgIHByb3h5LnF1ZXJ5UGFyYW1zID0gdGhpcy5wcm94eU9ic2VydmFibGUoY29tcG9uZW50JCwgJ3F1ZXJ5UGFyYW1zJyk7XHJcbiAgICBwcm94eS5mcmFnbWVudCA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdmcmFnbWVudCcpO1xyXG4gICAgcHJveHkuZGF0YSA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdkYXRhJyk7XHJcblxyXG4gICAgcmV0dXJuIHByb3h5IGFzIEFjdGl2YXRlZFJvdXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgd3JhcHBlZCBvYnNlcnZhYmxlIHRoYXQgd2lsbCBzd2l0Y2ggdG8gdGhlIGxhdGVzdCBhY3RpdmF0ZWQgcm91dGUgbWF0Y2hlZCBieSB0aGUgZ2l2ZW4gY29tcG9uZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwcm94eU9ic2VydmFibGUoY29tcG9uZW50JDogT2JzZXJ2YWJsZTxhbnk+LCBwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIGNvbXBvbmVudCQucGlwZShcclxuICAgICAgLy8gRmlyc3Qgd2FpdCB1bnRpbCB0aGUgY29tcG9uZW50IGluc3RhbmNlIGlzIHB1c2hlZFxyXG4gICAgICBmaWx0ZXIoY29tcG9uZW50ID0+ICEhY29tcG9uZW50KSxcclxuICAgICAgc3dpdGNoTWFwKGNvbXBvbmVudCA9PlxyXG4gICAgICAgIHRoaXMuY3VycmVudEFjdGl2YXRlZFJvdXRlJC5waXBlKFxyXG4gICAgICAgICAgZmlsdGVyKGN1cnJlbnQgPT4gY3VycmVudCAhPT0gbnVsbCAmJiBjdXJyZW50LmNvbXBvbmVudCA9PT0gY29tcG9uZW50KSxcclxuICAgICAgICAgIHN3aXRjaE1hcChjdXJyZW50ID0+IGN1cnJlbnQgJiYgKGN1cnJlbnQuYWN0aXZhdGVkUm91dGUgYXMgYW55KVtwYXRoXSksXHJcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgYWN0aXZhdGVkIHJvdXRlIHByb3h5IGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50IHRvIHRoZSBuZXcgaW5jb21pbmcgcm91dGVyIHN0YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVBY3RpdmF0ZWRSb3V0ZVByb3h5KGNvbXBvbmVudDogYW55LCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByb3h5ID0gdGhpcy5wcm94eU1hcC5nZXQoY29tcG9uZW50KTtcclxuICAgIGlmICghcHJveHkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhY3RpdmF0ZWQgcm91dGUgcHJveHkgZm9yIHZpZXdgKTtcclxuICAgIH1cclxuXHJcbiAgICAocHJveHkgYXMgYW55KS5fZnV0dXJlU25hcHNob3QgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fZnV0dXJlU25hcHNob3Q7XHJcbiAgICAocHJveHkgYXMgYW55KS5fcm91dGVyU3RhdGUgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fcm91dGVyU3RhdGU7XHJcbiAgICBwcm94eS5zbmFwc2hvdCA9IGFjdGl2YXRlZFJvdXRlLnNuYXBzaG90O1xyXG4gICAgcHJveHkub3V0bGV0ID0gYWN0aXZhdGVkUm91dGUub3V0bGV0O1xyXG4gICAgcHJveHkuY29tcG9uZW50ID0gYWN0aXZhdGVkUm91dGUuY29tcG9uZW50O1xyXG5cclxuICAgIHRoaXMuY3VycmVudEFjdGl2YXRlZFJvdXRlJC5uZXh0KHsgY29tcG9uZW50LCBhY3RpdmF0ZWRSb3V0ZSB9KTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE91dGxldEluamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIGNoaWxkQ29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsXHJcbiAgICBwcml2YXRlIHBhcmVudDogSW5qZWN0b3JcclxuICApIHsgfVxyXG5cclxuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk6IGFueSB7XHJcbiAgICBpZiAodG9rZW4gPT09IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvdXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0b2tlbiA9PT0gQ2hpbGRyZW5PdXRsZXRDb250ZXh0cykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZENvbnRleHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==