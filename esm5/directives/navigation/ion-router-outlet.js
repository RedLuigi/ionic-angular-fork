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
var IonRouterOutlet = /** @class */ (function () {
    function IonRouterOutlet(parentContexts, location, resolver, name, tabs, config, navCtrl, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
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
    Object.defineProperty(IonRouterOutlet.prototype, "animation", {
        set: function (animation) {
            this.nativeEl.animation = animation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonRouterOutlet.prototype, "animated", {
        set: function (animated) {
            this.nativeEl.animated = animated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonRouterOutlet.prototype, "swipeGesture", {
        set: function (swipe) {
            var _this = this;
            this._swipeGesture = swipe;
            this.nativeEl.swipeHandler = swipe ? {
                canStart: function () { return _this.stackCtrl.canGoBack(1); },
                onStart: function () { return _this.stackCtrl.startBackTransition(); },
                onEnd: function (shouldContinue) { return _this.stackCtrl.endBackTransition(shouldContinue); }
            } : undefined;
        },
        enumerable: true,
        configurable: true
    });
    IonRouterOutlet.prototype.ngOnDestroy = function () {
        this.stackCtrl.destroy();
    };
    IonRouterOutlet.prototype.getContext = function () {
        return this.parentContexts.getContext(this.name);
    };
    IonRouterOutlet.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.activated) {
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            var context = this.getContext();
            if (context && context.route) {
                this.activateWith(context.route, context.resolver || null);
            }
        }
        if (this.nativeEl.componentOnReady) {
            this.nativeEl.componentOnReady().then(function () {
                if (_this._swipeGesture === undefined) {
                    _this.swipeGesture = _this.config.getBoolean('swipeBackEnabled', _this.nativeEl.mode === 'ios');
                }
            });
        }
    };
    Object.defineProperty(IonRouterOutlet.prototype, "isActivated", {
        get: function () {
            return !!this.activated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonRouterOutlet.prototype, "component", {
        get: function () {
            if (!this.activated) {
                throw new Error('Outlet is not activated');
            }
            return this.activated.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonRouterOutlet.prototype, "activatedRoute", {
        get: function () {
            if (!this.activated) {
                throw new Error('Outlet is not activated');
            }
            return this._activatedRoute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonRouterOutlet.prototype, "activatedRouteData", {
        get: function () {
            if (this._activatedRoute) {
                return this._activatedRoute.snapshot.data;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    IonRouterOutlet.prototype.detach = function () {
        throw new Error('incompatible reuse strategy');
    };
    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     */
    IonRouterOutlet.prototype.attach = function (_ref, _activatedRoute) {
        throw new Error('incompatible reuse strategy');
    };
    IonRouterOutlet.prototype.deactivate = function () {
        if (this.activated) {
            if (this.activatedView) {
                this.activatedView.savedData = new Map(this.getContext().children['contexts']);
                /**
                 * Ensure we are saving the NavigationExtras
                 * data otherwise it will be lost
                 */
                this.activatedView.savedExtras = {};
                var context = this.getContext();
                if (context.route) {
                    var contextSnapshot = context.route.snapshot;
                    this.activatedView.savedExtras.queryParams = contextSnapshot.queryParams;
                    this.activatedView.savedExtras.fragment = contextSnapshot.fragment;
                }
            }
            var c = this.component;
            this.activatedView = null;
            this.activated = null;
            this._activatedRoute = null;
            this.deactivateEvents.emit(c);
        }
    };
    IonRouterOutlet.prototype.activateWith = function (activatedRoute, resolver) {
        var _this = this;
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute = activatedRoute;
        var cmpRef;
        var enteringView = this.stackCtrl.getExistingView(activatedRoute);
        if (enteringView && (!activatedRoute.routeConfig || !activatedRoute.routeConfig.data || !activatedRoute.routeConfig.data.noReuse)) {
            cmpRef = this.activated = enteringView.ref;
            var saved = enteringView.savedData;
            if (saved) {
                // self-restore
                var context = this.getContext();
                context.children['contexts'] = saved;
            }
            // Updated activated route proxy for this component
            this.updateActivatedRouteProxy(cmpRef.instance, activatedRoute);
        }
        else {
            var snapshot = activatedRoute._futureSnapshot;
            var component = snapshot.routeConfig.component;
            resolver = resolver || this.resolver;
            var factory = resolver.resolveComponentFactory(component);
            var childContexts = this.parentContexts.getOrCreateContext(this.name).children;
            // We create an activated route proxy object that will maintain future updates for this component
            // over its lifecycle in the stack.
            var component$ = new BehaviorSubject(null);
            var activatedRouteProxy = this.createActivatedRouteProxy(component$, activatedRoute);
            var injector = new OutletInjector(activatedRouteProxy, childContexts, this.location.injector);
            cmpRef = this.activated = this.location.createComponent(factory, this.location.length, injector);
            // Once the component is created we can push it to our local subject supplied to the proxy
            component$.next(cmpRef.instance);
            // Calling `markForCheck` to make sure we will run the change detection when the
            // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
            enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
            // Store references to the proxy by component
            this.proxyMap.set(cmpRef.instance, activatedRouteProxy);
            this.currentActivatedRoute$.next({ component: cmpRef.instance, activatedRoute: activatedRoute });
        }
        this.activatedView = enteringView;
        this.stackCtrl.setActive(enteringView).then(function (data) {
            _this.navCtrl.setTopOutlet(_this);
            _this.activateEvents.emit(cmpRef.instance);
            _this.stackEvents.emit(data);
        });
    };
    /**
     * Returns `true` if there are pages in the stack to go back.
     */
    IonRouterOutlet.prototype.canGoBack = function (deep, stackId) {
        if (deep === void 0) { deep = 1; }
        return this.stackCtrl.canGoBack(deep, stackId);
    };
    /**
     * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
     */
    IonRouterOutlet.prototype.pop = function (deep, stackId) {
        if (deep === void 0) { deep = 1; }
        return this.stackCtrl.pop(deep, stackId);
    };
    /**
     * Returns the URL of the active page of each stack.
     */
    IonRouterOutlet.prototype.getLastUrl = function (stackId) {
        var active = this.stackCtrl.getLastUrl(stackId);
        return active ? active.url : undefined;
    };
    /**
     * Returns the RouteView of the active page of each stack.
     * @internal
     */
    IonRouterOutlet.prototype.getLastRouteView = function (stackId) {
        return this.stackCtrl.getLastUrl(stackId);
    };
    /**
     * Returns the root view in the tab stack.
     * @internal
     */
    IonRouterOutlet.prototype.getRootView = function (stackId) {
        return this.stackCtrl.getRootUrl(stackId);
    };
    /**
     * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
     */
    IonRouterOutlet.prototype.getActiveStackId = function () {
        return this.stackCtrl.getActiveStackId();
    };
    /**
     * Since the activated route can change over the life time of a component in an ion router outlet, we create
     * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
     */
    IonRouterOutlet.prototype.createActivatedRouteProxy = function (component$, activatedRoute) {
        var proxy = new ActivatedRoute();
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
    };
    /**
     * Create a wrapped observable that will switch to the latest activated route matched by the given component
     */
    IonRouterOutlet.prototype.proxyObservable = function (component$, path) {
        var _this = this;
        return component$.pipe(
        // First wait until the component instance is pushed
        filter(function (component) { return !!component; }), switchMap(function (component) {
            return _this.currentActivatedRoute$.pipe(filter(function (current) { return current !== null && current.component === component; }), switchMap(function (current) { return current && current.activatedRoute[path]; }), distinctUntilChanged());
        }));
    };
    /**
     * Updates the activated route proxy for the given component to the new incoming router state
     */
    IonRouterOutlet.prototype.updateActivatedRouteProxy = function (component, activatedRoute) {
        var proxy = this.proxyMap.get(component);
        if (!proxy) {
            throw new Error("Could not find activated route proxy for view");
        }
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        this.currentActivatedRoute$.next({ component: component, activatedRoute: activatedRoute });
    };
    IonRouterOutlet.ctorParameters = function () { return [
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
    ]; };
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
    return IonRouterOutlet;
}());
export { IonRouterOutlet };
var OutletInjector = /** @class */ (function () {
    function OutletInjector(route, childContexts, parent) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
    }
    OutletInjector.prototype.get = function (token, notFoundValue) {
        if (token === ActivatedRoute) {
            return this.route;
        }
        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }
        // tslint:disable-next-line
        return this.parent.get(token, notFoundValue);
    };
    return OutletInjector;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXJvdXRlci1vdXRsZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tcm91dGVyLW91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxTSxPQUFPLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEgsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPbEQ7SUF5Q0UseUJBQ1UsY0FBc0MsRUFDdEMsUUFBMEIsRUFDMUIsUUFBa0MsRUFDdkIsSUFBWSxFQUNBLElBQVksRUFDbkMsTUFBYyxFQUNkLE9BQXNCLEVBQzlCLGNBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLE1BQWMsRUFDZCxJQUFZLEVBQ1osY0FBOEIsRUFDRyxZQUE4QjtRQVp2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QXpUWSxlQUFlO0FBMlQ1QjtJQUNFLHdCQUNVLEtBQXFCLEVBQ3JCLGFBQXFDLEVBQ3JDLE1BQWdCO1FBRmhCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtRQUNyQyxXQUFNLEdBQU4sTUFBTSxDQUFVO0lBQ3RCLENBQUM7SUFFTCw0QkFBRyxHQUFILFVBQUksS0FBVSxFQUFFLGFBQW1CO1FBQ2pDLElBQUksS0FBSyxLQUFLLGNBQWMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7UUFFRCxJQUFJLEtBQUssS0FBSyxzQkFBc0IsRUFBRTtZQUNwQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDM0I7UUFFRCwyQkFBMkI7UUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQXR0cmlidXRlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTa2lwU2VsZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgT3V0bGV0Q29udGV4dCwgUFJJTUFSWV9PVVRMRVQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyIH0gZnJvbSAnLi4vLi4vJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2NvbmZpZyc7XHJcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xyXG5cclxuaW1wb3J0IHsgU3RhY2tDb250cm9sbGVyIH0gZnJvbSAnLi9zdGFjay1jb250cm9sbGVyJztcclxuaW1wb3J0IHsgUm91dGVWaWV3LCBnZXRVcmwgfSBmcm9tICcuL3N0YWNrLXV0aWxzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW9uLXJvdXRlci1vdXRsZXQnLFxyXG4gIGV4cG9ydEFzOiAnb3V0bGV0JyxcclxuICBpbnB1dHM6IFsnYW5pbWF0ZWQnLCAnYW5pbWF0aW9uJywgJ3N3aXBlR2VzdHVyZSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb25Sb3V0ZXJPdXRsZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XHJcbiAgbmF0aXZlRWw6IEhUTUxJb25Sb3V0ZXJPdXRsZXRFbGVtZW50O1xyXG5cclxuICBwcml2YXRlIGFjdGl2YXRlZDogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsID0gbnVsbDtcclxuICBhY3RpdmF0ZWRWaWV3OiBSb3V0ZVZpZXcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfc3dpcGVHZXN0dXJlPzogYm9vbGVhbjtcclxuICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICBwcml2YXRlIHN0YWNrQ3RybDogU3RhY2tDb250cm9sbGVyO1xyXG5cclxuICAvLyBNYWludGFpbiBtYXAgb2YgYWN0aXZhdGVkIHJvdXRlIHByb3hpZXMgZm9yIGVhY2ggY29tcG9uZW50IGluc3RhbmNlXHJcbiAgcHJpdmF0ZSBwcm94eU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgQWN0aXZhdGVkUm91dGU+KCk7XHJcblxyXG4gIC8vIEtlZXAgdGhlIGxhdGVzdCBhY3RpdmF0ZWQgcm91dGUgaW4gYSBzdWJqZWN0IGZvciB0aGUgcHJveHkgcm91dGVzIHRvIHN3aXRjaCBtYXAgdG9cclxuICBwcml2YXRlIGN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHsgY29tcG9uZW50OiBhbnk7IGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSB9IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHRhYnNQcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgQE91dHB1dCgpIHN0YWNrRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgnYWN0aXZhdGUnKSBhY3RpdmF0ZUV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoJ2RlYWN0aXZhdGUnKSBkZWFjdGl2YXRlRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBBbmltYXRpb25CdWlsZGVyKSB7XHJcbiAgICB0aGlzLm5hdGl2ZUVsLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcclxuICB9XHJcblxyXG4gIHNldCBhbmltYXRlZChhbmltYXRlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5uYXRpdmVFbC5hbmltYXRlZCA9IGFuaW1hdGVkO1xyXG4gIH1cclxuXHJcbiAgc2V0IHN3aXBlR2VzdHVyZShzd2lwZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc3dpcGVHZXN0dXJlID0gc3dpcGU7XHJcblxyXG4gICAgdGhpcy5uYXRpdmVFbC5zd2lwZUhhbmRsZXIgPSBzd2lwZSA/IHtcclxuICAgICAgY2FuU3RhcnQ6ICgpID0+IHRoaXMuc3RhY2tDdHJsLmNhbkdvQmFjaygxKSxcclxuICAgICAgb25TdGFydDogKCkgPT4gdGhpcy5zdGFja0N0cmwuc3RhcnRCYWNrVHJhbnNpdGlvbigpLFxyXG4gICAgICBvbkVuZDogc2hvdWxkQ29udGludWUgPT4gdGhpcy5zdGFja0N0cmwuZW5kQmFja1RyYW5zaXRpb24oc2hvdWxkQ29udGludWUpXHJcbiAgICB9IDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLFxyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIEBBdHRyaWJ1dGUoJ25hbWUnKSBuYW1lOiBzdHJpbmcsXHJcbiAgICBAT3B0aW9uYWwoKSBAQXR0cmlidXRlKCd0YWJzJykgdGFiczogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZyxcclxuICAgIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlcixcclxuICAgIGNvbW1vbkxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICByb3V0ZXI6IFJvdXRlcixcclxuICAgIHpvbmU6IE5nWm9uZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIHJlYWRvbmx5IHBhcmVudE91dGxldD86IElvblJvdXRlck91dGxldFxyXG4gICkge1xyXG4gICAgdGhpcy5uYXRpdmVFbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgUFJJTUFSWV9PVVRMRVQ7XHJcbiAgICB0aGlzLnRhYnNQcmVmaXggPSB0YWJzID09PSAndHJ1ZScgPyBnZXRVcmwocm91dGVyLCBhY3RpdmF0ZWRSb3V0ZSkgOiB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnN0YWNrQ3RybCA9IG5ldyBTdGFja0NvbnRyb2xsZXIodGhpcy50YWJzUHJlZml4LCB0aGlzLm5hdGl2ZUVsLCByb3V0ZXIsIG5hdkN0cmwsIHpvbmUsIGNvbW1vbkxvY2F0aW9uKTtcclxuICAgIHBhcmVudENvbnRleHRzLm9uQ2hpbGRPdXRsZXRDcmVhdGVkKHRoaXMubmFtZSwgdGhpcyBhcyBhbnkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0YWNrQ3RybC5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZXh0KCk6IE91dGxldENvbnRleHQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudENvbnRleHRzLmdldENvbnRleHQodGhpcy5uYW1lKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICAvLyBJZiB0aGUgb3V0bGV0IHdhcyBub3QgaW5zdGFudGlhdGVkIGF0IHRoZSB0aW1lIHRoZSByb3V0ZSBnb3QgYWN0aXZhdGVkIHdlIG5lZWQgdG8gcG9wdWxhdGVcclxuICAgICAgLy8gdGhlIG91dGxldCB3aGVuIGl0IGlzIGluaXRpYWxpemVkIChpZSBpbnNpZGUgYSBOZ0lmKVxyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCk7XHJcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQucm91dGUpIHtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlV2l0aChjb250ZXh0LnJvdXRlLCBjb250ZXh0LnJlc29sdmVyIHx8IG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoKHRoaXMubmF0aXZlRWwgYXMgYW55KS5jb21wb25lbnRPblJlYWR5KSB7XHJcbiAgICAgIHRoaXMubmF0aXZlRWwuY29tcG9uZW50T25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zd2lwZUdlc3R1cmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5zd2lwZUdlc3R1cmUgPSB0aGlzLmNvbmZpZy5nZXRCb29sZWFuKCdzd2lwZUJhY2tFbmFibGVkJywgKHRoaXMubmF0aXZlRWwgYXMgYW55KS5tb2RlID09PSAnaW9zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBpc0FjdGl2YXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIXRoaXMuYWN0aXZhdGVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbXBvbmVudCgpOiBvYmplY3Qge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0ZWQuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZhdGVkUm91dGUoKTogQWN0aXZhdGVkUm91dGUge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGVkUm91dGUgYXMgQWN0aXZhdGVkUm91dGU7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZhdGVkUm91dGVEYXRhKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkUm91dGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2YXRlZFJvdXRlLnNuYXBzaG90LmRhdGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgYFJvdXRlUmV1c2VTdHJhdGVneWAgaW5zdHJ1Y3RzIHRvIGRldGFjaCB0aGUgc3VidHJlZVxyXG4gICAqL1xyXG4gIGRldGFjaCgpOiBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luY29tcGF0aWJsZSByZXVzZSBzdHJhdGVneScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGBSb3V0ZVJldXNlU3RyYXRlZ3lgIGluc3RydWN0cyB0byByZS1hdHRhY2ggYSBwcmV2aW91c2x5IGRldGFjaGVkIHN1YnRyZWVcclxuICAgKi9cclxuICBhdHRhY2goX3JlZjogQ29tcG9uZW50UmVmPGFueT4sIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignaW5jb21wYXRpYmxlIHJldXNlIHN0cmF0ZWd5Jyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZhdGVkKSB7XHJcbiAgICAgIGlmICh0aGlzLmFjdGl2YXRlZFZpZXcpIHtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlZFZpZXcuc2F2ZWREYXRhID0gbmV3IE1hcCh0aGlzLmdldENvbnRleHQoKSEuY2hpbGRyZW5bJ2NvbnRleHRzJ10pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbnN1cmUgd2UgYXJlIHNhdmluZyB0aGUgTmF2aWdhdGlvbkV4dHJhc1xyXG4gICAgICAgICAqIGRhdGEgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgbG9zdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKSE7XHJcblxyXG4gICAgICAgIGlmIChjb250ZXh0LnJvdXRlKSB7XHJcbiAgICAgICAgICBjb25zdCBjb250ZXh0U25hcHNob3QgPSBjb250ZXh0LnJvdXRlLnNuYXBzaG90O1xyXG5cclxuICAgICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcy5xdWVyeVBhcmFtcyA9IGNvbnRleHRTbmFwc2hvdC5xdWVyeVBhcmFtcztcclxuICAgICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcy5mcmFnbWVudCA9IGNvbnRleHRTbmFwc2hvdC5mcmFnbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYyA9IHRoaXMuY29tcG9uZW50O1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZFZpZXcgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZCA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2FjdGl2YXRlZFJvdXRlID0gbnVsbDtcclxuICAgICAgdGhpcy5kZWFjdGl2YXRlRXZlbnRzLmVtaXQoYyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZVdpdGgoYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHwgbnVsbCkge1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmF0ZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWN0aXZhdGUgYW4gYWxyZWFkeSBhY3RpdmF0ZWQgb3V0bGV0Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xyXG5cclxuICAgIGxldCBjbXBSZWY6IGFueTtcclxuICAgIGxldCBlbnRlcmluZ1ZpZXcgPSB0aGlzLnN0YWNrQ3RybC5nZXRFeGlzdGluZ1ZpZXcoYWN0aXZhdGVkUm91dGUpO1xyXG4gICAgaWYgKGVudGVyaW5nVmlldyAmJiAoIWFjdGl2YXRlZFJvdXRlLnJvdXRlQ29uZmlnIHx8ICFhY3RpdmF0ZWRSb3V0ZS5yb3V0ZUNvbmZpZy5kYXRhIHx8ICFhY3RpdmF0ZWRSb3V0ZS5yb3V0ZUNvbmZpZy5kYXRhLm5vUmV1c2UpKSB7XHJcbiAgICAgIGNtcFJlZiA9IHRoaXMuYWN0aXZhdGVkID0gZW50ZXJpbmdWaWV3LnJlZjtcclxuICAgICAgY29uc3Qgc2F2ZWQgPSBlbnRlcmluZ1ZpZXcuc2F2ZWREYXRhO1xyXG4gICAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgICAvLyBzZWxmLXJlc3RvcmVcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCkhO1xyXG4gICAgICAgIGNvbnRleHQuY2hpbGRyZW5bJ2NvbnRleHRzJ10gPSBzYXZlZDtcclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGVkIGFjdGl2YXRlZCByb3V0ZSBwcm94eSBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAgdGhpcy51cGRhdGVBY3RpdmF0ZWRSb3V0ZVByb3h5KGNtcFJlZi5pbnN0YW5jZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc25hcHNob3QgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fZnV0dXJlU25hcHNob3Q7XHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHNuYXBzaG90LnJvdXRlQ29uZmlnIS5jb21wb25lbnQgYXMgYW55O1xyXG4gICAgICByZXNvbHZlciA9IHJlc29sdmVyIHx8IHRoaXMucmVzb2x2ZXI7XHJcblxyXG4gICAgICBjb25zdCBmYWN0b3J5ID0gcmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcclxuICAgICAgY29uc3QgY2hpbGRDb250ZXh0cyA9IHRoaXMucGFyZW50Q29udGV4dHMuZ2V0T3JDcmVhdGVDb250ZXh0KHRoaXMubmFtZSkuY2hpbGRyZW47XHJcblxyXG4gICAgICAvLyBXZSBjcmVhdGUgYW4gYWN0aXZhdGVkIHJvdXRlIHByb3h5IG9iamVjdCB0aGF0IHdpbGwgbWFpbnRhaW4gZnV0dXJlIHVwZGF0ZXMgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgIC8vIG92ZXIgaXRzIGxpZmVjeWNsZSBpbiB0aGUgc3RhY2suXHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XHJcbiAgICAgIGNvbnN0IGFjdGl2YXRlZFJvdXRlUHJveHkgPSB0aGlzLmNyZWF0ZUFjdGl2YXRlZFJvdXRlUHJveHkoY29tcG9uZW50JCwgYWN0aXZhdGVkUm91dGUpO1xyXG5cclxuICAgICAgY29uc3QgaW5qZWN0b3IgPSBuZXcgT3V0bGV0SW5qZWN0b3IoYWN0aXZhdGVkUm91dGVQcm94eSwgY2hpbGRDb250ZXh0cywgdGhpcy5sb2NhdGlvbi5pbmplY3Rvcik7XHJcbiAgICAgIGNtcFJlZiA9IHRoaXMuYWN0aXZhdGVkID0gdGhpcy5sb2NhdGlvbi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgdGhpcy5sb2NhdGlvbi5sZW5ndGgsIGluamVjdG9yKTtcclxuXHJcbiAgICAgIC8vIE9uY2UgdGhlIGNvbXBvbmVudCBpcyBjcmVhdGVkIHdlIGNhbiBwdXNoIGl0IHRvIG91ciBsb2NhbCBzdWJqZWN0IHN1cHBsaWVkIHRvIHRoZSBwcm94eVxyXG4gICAgICBjb21wb25lbnQkLm5leHQoY21wUmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICAgIC8vIENhbGxpbmcgYG1hcmtGb3JDaGVja2AgdG8gbWFrZSBzdXJlIHdlIHdpbGwgcnVuIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlXHJcbiAgICAgIC8vIGBSb3V0ZXJPdXRsZXRgIGlzIGluc2lkZSBhIGBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hgIGNvbXBvbmVudC5cclxuICAgICAgZW50ZXJpbmdWaWV3ID0gdGhpcy5zdGFja0N0cmwuY3JlYXRlVmlldyh0aGlzLmFjdGl2YXRlZCwgYWN0aXZhdGVkUm91dGUpO1xyXG5cclxuICAgICAgLy8gU3RvcmUgcmVmZXJlbmNlcyB0byB0aGUgcHJveHkgYnkgY29tcG9uZW50XHJcbiAgICAgIHRoaXMucHJveHlNYXAuc2V0KGNtcFJlZi5pbnN0YW5jZSwgYWN0aXZhdGVkUm91dGVQcm94eSk7XHJcbiAgICAgIHRoaXMuY3VycmVudEFjdGl2YXRlZFJvdXRlJC5uZXh0KHsgY29tcG9uZW50OiBjbXBSZWYuaW5zdGFuY2UsIGFjdGl2YXRlZFJvdXRlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZhdGVkVmlldyA9IGVudGVyaW5nVmlldztcclxuICAgIHRoaXMuc3RhY2tDdHJsLnNldEFjdGl2ZShlbnRlcmluZ1ZpZXcpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIHRoaXMubmF2Q3RybC5zZXRUb3BPdXRsZXQodGhpcyk7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVFdmVudHMuZW1pdChjbXBSZWYuaW5zdGFuY2UpO1xyXG4gICAgICB0aGlzLnN0YWNrRXZlbnRzLmVtaXQoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZXJlIGFyZSBwYWdlcyBpbiB0aGUgc3RhY2sgdG8gZ28gYmFjay5cclxuICAgKi9cclxuICBjYW5Hb0JhY2soZGVlcCA9IDEsIHN0YWNrSWQ/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5jYW5Hb0JhY2soZGVlcCwgc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNvbHZlcyB0byBgdHJ1ZWAgaWYgaXQgdGhlIG91dGxldCB3YXMgYWJsZSB0byBzdWNlc3NmdWxseSBwb3AgdGhlIGxhc3QgTiBwYWdlcy5cclxuICAgKi9cclxuICBwb3AoZGVlcCA9IDEsIHN0YWNrSWQ/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5wb3AoZGVlcCwgc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBVUkwgb2YgdGhlIGFjdGl2ZSBwYWdlIG9mIGVhY2ggc3RhY2suXHJcbiAgICovXHJcbiAgZ2V0TGFzdFVybChzdGFja0lkPzogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuc3RhY2tDdHJsLmdldExhc3RVcmwoc3RhY2tJZCk7XHJcbiAgICByZXR1cm4gYWN0aXZlID8gYWN0aXZlLnVybCA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIFJvdXRlVmlldyBvZiB0aGUgYWN0aXZlIHBhZ2Ugb2YgZWFjaCBzdGFjay5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRMYXN0Um91dGVWaWV3KHN0YWNrSWQ/OiBzdHJpbmcpOiBSb3V0ZVZpZXcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldExhc3RVcmwoc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IHZpZXcgaW4gdGhlIHRhYiBzdGFjay5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRSb290VmlldyhzdGFja0lkPzogc3RyaW5nKTogUm91dGVWaWV3IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5nZXRSb290VXJsKHN0YWNrSWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgYWN0aXZlIHN0YWNrIElELiBJbiB0aGUgY29udGV4dCBvZiBpb24tdGFicywgaXQgbWVhbnMgdGhlIGFjdGl2ZSB0YWIuXHJcbiAgICovXHJcbiAgZ2V0QWN0aXZlU3RhY2tJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldEFjdGl2ZVN0YWNrSWQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpbmNlIHRoZSBhY3RpdmF0ZWQgcm91dGUgY2FuIGNoYW5nZSBvdmVyIHRoZSBsaWZlIHRpbWUgb2YgYSBjb21wb25lbnQgaW4gYW4gaW9uIHJvdXRlciBvdXRsZXQsIHdlIGNyZWF0ZVxyXG4gICAqIGEgcHJveHkgc28gdGhhdCB3ZSBjYW4gdXBkYXRlIHRoZSB2YWx1ZXMgb3ZlciB0aW1lIGFzIGEgdXNlciBuYXZpZ2F0ZXMgYmFjayB0byBjb21wb25lbnRzIGFscmVhZHkgaW4gdGhlIHN0YWNrLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlQWN0aXZhdGVkUm91dGVQcm94eShjb21wb25lbnQkOiBPYnNlcnZhYmxlPGFueT4sIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IEFjdGl2YXRlZFJvdXRlIHtcclxuICAgIGNvbnN0IHByb3h5OiBhbnkgPSBuZXcgQWN0aXZhdGVkUm91dGUoKTtcclxuXHJcbiAgICBwcm94eS5fZnV0dXJlU25hcHNob3QgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fZnV0dXJlU25hcHNob3Q7XHJcbiAgICBwcm94eS5fcm91dGVyU3RhdGUgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fcm91dGVyU3RhdGU7XHJcbiAgICBwcm94eS5zbmFwc2hvdCA9IGFjdGl2YXRlZFJvdXRlLnNuYXBzaG90O1xyXG4gICAgcHJveHkub3V0bGV0ID0gYWN0aXZhdGVkUm91dGUub3V0bGV0O1xyXG4gICAgcHJveHkuY29tcG9uZW50ID0gYWN0aXZhdGVkUm91dGUuY29tcG9uZW50O1xyXG5cclxuICAgIC8vIFNldHVwIHdyYXBwZXJzIGZvciB0aGUgb2JzZXJ2YWJsZXMgc28gY29uc3VtZXJzIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgc3dpdGNoaW5nIHRvIG5ldyBvYnNlcnZhYmxlcyBhcyB0aGUgc3RhdGUgdXBkYXRlc1xyXG4gICAgKHByb3h5IGFzIGFueSkuX3BhcmFtTWFwID0gdGhpcy5wcm94eU9ic2VydmFibGUoY29tcG9uZW50JCwgJ3BhcmFtTWFwJyk7XHJcbiAgICAocHJveHkgYXMgYW55KS5fcXVlcnlQYXJhbU1hcCA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdxdWVyeVBhcmFtTWFwJyk7XHJcbiAgICBwcm94eS51cmwgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAndXJsJyk7XHJcbiAgICBwcm94eS5wYXJhbXMgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAncGFyYW1zJyk7XHJcbiAgICBwcm94eS5xdWVyeVBhcmFtcyA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdxdWVyeVBhcmFtcycpO1xyXG4gICAgcHJveHkuZnJhZ21lbnQgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAnZnJhZ21lbnQnKTtcclxuICAgIHByb3h5LmRhdGEgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAnZGF0YScpO1xyXG5cclxuICAgIHJldHVybiBwcm94eSBhcyBBY3RpdmF0ZWRSb3V0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHdyYXBwZWQgb2JzZXJ2YWJsZSB0aGF0IHdpbGwgc3dpdGNoIHRvIHRoZSBsYXRlc3QgYWN0aXZhdGVkIHJvdXRlIG1hdGNoZWQgYnkgdGhlIGdpdmVuIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQ6IE9ic2VydmFibGU8YW55PiwgcGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBjb21wb25lbnQkLnBpcGUoXHJcbiAgICAgIC8vIEZpcnN0IHdhaXQgdW50aWwgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBpcyBwdXNoZWRcclxuICAgICAgZmlsdGVyKGNvbXBvbmVudCA9PiAhIWNvbXBvbmVudCksXHJcbiAgICAgIHN3aXRjaE1hcChjb21wb25lbnQgPT5cclxuICAgICAgICB0aGlzLmN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQucGlwZShcclxuICAgICAgICAgIGZpbHRlcihjdXJyZW50ID0+IGN1cnJlbnQgIT09IG51bGwgJiYgY3VycmVudC5jb21wb25lbnQgPT09IGNvbXBvbmVudCksXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoY3VycmVudCA9PiBjdXJyZW50ICYmIChjdXJyZW50LmFjdGl2YXRlZFJvdXRlIGFzIGFueSlbcGF0aF0pLFxyXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGFjdGl2YXRlZCByb3V0ZSBwcm94eSBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudCB0byB0aGUgbmV3IGluY29taW5nIHJvdXRlciBzdGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlQWN0aXZhdGVkUm91dGVQcm94eShjb21wb25lbnQ6IGFueSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKTogdm9pZCB7XHJcbiAgICBjb25zdCBwcm94eSA9IHRoaXMucHJveHlNYXAuZ2V0KGNvbXBvbmVudCk7XHJcbiAgICBpZiAoIXByb3h5KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYWN0aXZhdGVkIHJvdXRlIHByb3h5IGZvciB2aWV3YCk7XHJcbiAgICB9XHJcblxyXG4gICAgKHByb3h5IGFzIGFueSkuX2Z1dHVyZVNuYXBzaG90ID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX2Z1dHVyZVNuYXBzaG90O1xyXG4gICAgKHByb3h5IGFzIGFueSkuX3JvdXRlclN0YXRlID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX3JvdXRlclN0YXRlO1xyXG4gICAgcHJveHkuc25hcHNob3QgPSBhY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdDtcclxuICAgIHByb3h5Lm91dGxldCA9IGFjdGl2YXRlZFJvdXRlLm91dGxldDtcclxuICAgIHByb3h5LmNvbXBvbmVudCA9IGFjdGl2YXRlZFJvdXRlLmNvbXBvbmVudDtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQubmV4dCh7IGNvbXBvbmVudCwgYWN0aXZhdGVkUm91dGUgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBPdXRsZXRJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBjaGlsZENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLFxyXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKHRva2VuID09PSBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodG9rZW4gPT09IENoaWxkcmVuT3V0bGV0Q29udGV4dHMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRDb250ZXh0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIHJldHVybiB0aGlzLnBhcmVudC5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=