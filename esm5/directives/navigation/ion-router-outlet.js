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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXJvdXRlci1vdXRsZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tcm91dGVyLW91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxTSxPQUFPLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEgsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPbEQ7SUF5Q0UseUJBQ1UsY0FBc0MsRUFDdEMsUUFBMEIsRUFDMUIsUUFBa0MsRUFDdkIsSUFBWSxFQUNBLElBQVksRUFDbkMsTUFBYyxFQUNkLE9BQXNCLEVBQzlCLGNBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLE1BQWMsRUFDZCxJQUFZLEVBQ1osY0FBOEIsRUFDRyxZQUE4QjtRQVp2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U0F6VFksZUFBZTtBQTJUNUI7SUFDRSx3QkFDVSxLQUFxQixFQUNyQixhQUFxQyxFQUNyQyxNQUFnQjtRQUZoQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7UUFDckMsV0FBTSxHQUFOLE1BQU0sQ0FBVTtJQUN0QixDQUFDO0lBRUwsNEJBQUcsR0FBSCxVQUFJLEtBQVUsRUFBRSxhQUFtQjtRQUNqQyxJQUFJLEtBQUssS0FBSyxjQUFjLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBRUQsSUFBSSxLQUFLLEtBQUssc0JBQXNCLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzNCO1FBRUQsMkJBQTJCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3RvciwgTmdab25lLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIE91dHB1dCwgU2tpcFNlbGYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIE91dGxldENvbnRleHQsIFBSSU1BUllfT1VUTEVULCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQW5pbWF0aW9uQnVpbGRlciB9IGZyb20gJy4uLy4uLyc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jb25maWcnO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL25hdi1jb250cm9sbGVyJztcclxuXHJcbmltcG9ydCB7IFN0YWNrQ29udHJvbGxlciB9IGZyb20gJy4vc3RhY2stY29udHJvbGxlcic7XHJcbmltcG9ydCB7IFJvdXRlVmlldywgZ2V0VXJsIH0gZnJvbSAnLi9zdGFjay11dGlscyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lvbi1yb3V0ZXItb3V0bGV0JyxcclxuICBleHBvcnRBczogJ291dGxldCcsXHJcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJywgJ2FuaW1hdGlvbicsICdzd2lwZUdlc3R1cmUnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW9uUm91dGVyT3V0bGV0IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xyXG4gIG5hdGl2ZUVsOiBIVE1MSW9uUm91dGVyT3V0bGV0RWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZWQ6IENvbXBvbmVudFJlZjxhbnk+IHwgbnVsbCA9IG51bGw7XHJcbiAgYWN0aXZhdGVkVmlldzogUm91dGVWaWV3IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSB8IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX3N3aXBlR2VzdHVyZT86IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBzdGFja0N0cmw6IFN0YWNrQ29udHJvbGxlcjtcclxuXHJcbiAgLy8gTWFpbnRhaW4gbWFwIG9mIGFjdGl2YXRlZCByb3V0ZSBwcm94aWVzIGZvciBlYWNoIGNvbXBvbmVudCBpbnN0YW5jZVxyXG4gIHByaXZhdGUgcHJveHlNYXAgPSBuZXcgV2Vha01hcDxhbnksIEFjdGl2YXRlZFJvdXRlPigpO1xyXG5cclxuICAvLyBLZWVwIHRoZSBsYXRlc3QgYWN0aXZhdGVkIHJvdXRlIGluIGEgc3ViamVjdCBmb3IgdGhlIHByb3h5IHJvdXRlcyB0byBzd2l0Y2ggbWFwIHRvXHJcbiAgcHJpdmF0ZSBjdXJyZW50QWN0aXZhdGVkUm91dGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7IGNvbXBvbmVudDogYW55OyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUgfSB8IG51bGw+KG51bGwpO1xyXG5cclxuICB0YWJzUHJlZml4OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcblxyXG4gIEBPdXRwdXQoKSBzdGFja0V2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoJ2FjdGl2YXRlJykgYWN0aXZhdGVFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCdkZWFjdGl2YXRlJykgZGVhY3RpdmF0ZUV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBzZXQgYW5pbWF0aW9uKGFuaW1hdGlvbjogQW5pbWF0aW9uQnVpbGRlcikge1xyXG4gICAgdGhpcy5uYXRpdmVFbC5hbmltYXRpb24gPSBhbmltYXRpb247XHJcbiAgfVxyXG5cclxuICBzZXQgYW5pbWF0ZWQoYW5pbWF0ZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubmF0aXZlRWwuYW5pbWF0ZWQgPSBhbmltYXRlZDtcclxuICB9XHJcblxyXG4gIHNldCBzd2lwZUdlc3R1cmUoc3dpcGU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3N3aXBlR2VzdHVyZSA9IHN3aXBlO1xyXG5cclxuICAgIHRoaXMubmF0aXZlRWwuc3dpcGVIYW5kbGVyID0gc3dpcGUgPyB7XHJcbiAgICAgIGNhblN0YXJ0OiAoKSA9PiB0aGlzLnN0YWNrQ3RybC5jYW5Hb0JhY2soMSksXHJcbiAgICAgIG9uU3RhcnQ6ICgpID0+IHRoaXMuc3RhY2tDdHJsLnN0YXJ0QmFja1RyYW5zaXRpb24oKSxcclxuICAgICAgb25FbmQ6IChzaG91bGRDb250aW51ZTogYm9vbGVhbikgPT4gdGhpcy5zdGFja0N0cmwuZW5kQmFja1RyYW5zaXRpb24oc2hvdWxkQ29udGludWUpXHJcbiAgICB9IDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLFxyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIEBBdHRyaWJ1dGUoJ25hbWUnKSBuYW1lOiBzdHJpbmcsXHJcbiAgICBAT3B0aW9uYWwoKSBAQXR0cmlidXRlKCd0YWJzJykgdGFiczogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZyxcclxuICAgIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlcixcclxuICAgIGNvbW1vbkxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICByb3V0ZXI6IFJvdXRlcixcclxuICAgIHpvbmU6IE5nWm9uZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIHJlYWRvbmx5IHBhcmVudE91dGxldD86IElvblJvdXRlck91dGxldFxyXG4gICkge1xyXG4gICAgdGhpcy5uYXRpdmVFbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgUFJJTUFSWV9PVVRMRVQ7XHJcbiAgICB0aGlzLnRhYnNQcmVmaXggPSB0YWJzID09PSAndHJ1ZScgPyBnZXRVcmwocm91dGVyLCBhY3RpdmF0ZWRSb3V0ZSkgOiB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnN0YWNrQ3RybCA9IG5ldyBTdGFja0NvbnRyb2xsZXIodGhpcy50YWJzUHJlZml4LCB0aGlzLm5hdGl2ZUVsLCByb3V0ZXIsIG5hdkN0cmwsIHpvbmUsIGNvbW1vbkxvY2F0aW9uKTtcclxuICAgIHBhcmVudENvbnRleHRzLm9uQ2hpbGRPdXRsZXRDcmVhdGVkKHRoaXMubmFtZSwgdGhpcyBhcyBhbnkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0YWNrQ3RybC5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZXh0KCk6IE91dGxldENvbnRleHQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudENvbnRleHRzLmdldENvbnRleHQodGhpcy5uYW1lKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICAvLyBJZiB0aGUgb3V0bGV0IHdhcyBub3QgaW5zdGFudGlhdGVkIGF0IHRoZSB0aW1lIHRoZSByb3V0ZSBnb3QgYWN0aXZhdGVkIHdlIG5lZWQgdG8gcG9wdWxhdGVcclxuICAgICAgLy8gdGhlIG91dGxldCB3aGVuIGl0IGlzIGluaXRpYWxpemVkIChpZSBpbnNpZGUgYSBOZ0lmKVxyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCk7XHJcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQucm91dGUpIHtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlV2l0aChjb250ZXh0LnJvdXRlLCBjb250ZXh0LnJlc29sdmVyIHx8IG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoKHRoaXMubmF0aXZlRWwgYXMgYW55KS5jb21wb25lbnRPblJlYWR5KSB7XHJcbiAgICAgIHRoaXMubmF0aXZlRWwuY29tcG9uZW50T25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zd2lwZUdlc3R1cmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5zd2lwZUdlc3R1cmUgPSB0aGlzLmNvbmZpZy5nZXRCb29sZWFuKCdzd2lwZUJhY2tFbmFibGVkJywgKHRoaXMubmF0aXZlRWwgYXMgYW55KS5tb2RlID09PSAnaW9zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBpc0FjdGl2YXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIXRoaXMuYWN0aXZhdGVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbXBvbmVudCgpOiBvYmplY3Qge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0ZWQuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZhdGVkUm91dGUoKTogQWN0aXZhdGVkUm91dGUge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGVkUm91dGUgYXMgQWN0aXZhdGVkUm91dGU7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZhdGVkUm91dGVEYXRhKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkUm91dGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2YXRlZFJvdXRlLnNuYXBzaG90LmRhdGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgYFJvdXRlUmV1c2VTdHJhdGVneWAgaW5zdHJ1Y3RzIHRvIGRldGFjaCB0aGUgc3VidHJlZVxyXG4gICAqL1xyXG4gIGRldGFjaCgpOiBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luY29tcGF0aWJsZSByZXVzZSBzdHJhdGVneScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGBSb3V0ZVJldXNlU3RyYXRlZ3lgIGluc3RydWN0cyB0byByZS1hdHRhY2ggYSBwcmV2aW91c2x5IGRldGFjaGVkIHN1YnRyZWVcclxuICAgKi9cclxuICBhdHRhY2goX3JlZjogQ29tcG9uZW50UmVmPGFueT4sIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignaW5jb21wYXRpYmxlIHJldXNlIHN0cmF0ZWd5Jyk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZhdGVkKSB7XHJcbiAgICAgIGlmICh0aGlzLmFjdGl2YXRlZFZpZXcpIHtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlZFZpZXcuc2F2ZWREYXRhID0gbmV3IE1hcCh0aGlzLmdldENvbnRleHQoKSEuY2hpbGRyZW5bJ2NvbnRleHRzJ10pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbnN1cmUgd2UgYXJlIHNhdmluZyB0aGUgTmF2aWdhdGlvbkV4dHJhc1xyXG4gICAgICAgICAqIGRhdGEgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgbG9zdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKSE7XHJcblxyXG4gICAgICAgIGlmIChjb250ZXh0LnJvdXRlKSB7XHJcbiAgICAgICAgICBjb25zdCBjb250ZXh0U25hcHNob3QgPSBjb250ZXh0LnJvdXRlLnNuYXBzaG90O1xyXG5cclxuICAgICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcy5xdWVyeVBhcmFtcyA9IGNvbnRleHRTbmFwc2hvdC5xdWVyeVBhcmFtcztcclxuICAgICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcy5mcmFnbWVudCA9IGNvbnRleHRTbmFwc2hvdC5mcmFnbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYyA9IHRoaXMuY29tcG9uZW50O1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZFZpZXcgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZCA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2FjdGl2YXRlZFJvdXRlID0gbnVsbDtcclxuICAgICAgdGhpcy5kZWFjdGl2YXRlRXZlbnRzLmVtaXQoYyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZVdpdGgoYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHwgbnVsbCkge1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmF0ZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWN0aXZhdGUgYW4gYWxyZWFkeSBhY3RpdmF0ZWQgb3V0bGV0Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xyXG5cclxuICAgIGxldCBjbXBSZWY6IGFueTtcclxuICAgIGxldCBlbnRlcmluZ1ZpZXcgPSB0aGlzLnN0YWNrQ3RybC5nZXRFeGlzdGluZ1ZpZXcoYWN0aXZhdGVkUm91dGUpO1xyXG4gICAgaWYgKGVudGVyaW5nVmlldyAmJiAoIWFjdGl2YXRlZFJvdXRlLnJvdXRlQ29uZmlnIHx8ICFhY3RpdmF0ZWRSb3V0ZS5yb3V0ZUNvbmZpZy5kYXRhIHx8ICFhY3RpdmF0ZWRSb3V0ZS5yb3V0ZUNvbmZpZy5kYXRhLm5vUmV1c2UpKSB7XHJcbiAgICAgIGNtcFJlZiA9IHRoaXMuYWN0aXZhdGVkID0gZW50ZXJpbmdWaWV3LnJlZjtcclxuICAgICAgY29uc3Qgc2F2ZWQgPSBlbnRlcmluZ1ZpZXcuc2F2ZWREYXRhO1xyXG4gICAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgICAvLyBzZWxmLXJlc3RvcmVcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCkhO1xyXG4gICAgICAgIGNvbnRleHQuY2hpbGRyZW5bJ2NvbnRleHRzJ10gPSBzYXZlZDtcclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGVkIGFjdGl2YXRlZCByb3V0ZSBwcm94eSBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAgdGhpcy51cGRhdGVBY3RpdmF0ZWRSb3V0ZVByb3h5KGNtcFJlZi5pbnN0YW5jZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc25hcHNob3QgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fZnV0dXJlU25hcHNob3Q7XHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHNuYXBzaG90LnJvdXRlQ29uZmlnIS5jb21wb25lbnQgYXMgYW55O1xyXG4gICAgICByZXNvbHZlciA9IHJlc29sdmVyIHx8IHRoaXMucmVzb2x2ZXI7XHJcblxyXG4gICAgICBjb25zdCBmYWN0b3J5ID0gcmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcclxuICAgICAgY29uc3QgY2hpbGRDb250ZXh0cyA9IHRoaXMucGFyZW50Q29udGV4dHMuZ2V0T3JDcmVhdGVDb250ZXh0KHRoaXMubmFtZSkuY2hpbGRyZW47XHJcblxyXG4gICAgICAvLyBXZSBjcmVhdGUgYW4gYWN0aXZhdGVkIHJvdXRlIHByb3h5IG9iamVjdCB0aGF0IHdpbGwgbWFpbnRhaW4gZnV0dXJlIHVwZGF0ZXMgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgIC8vIG92ZXIgaXRzIGxpZmVjeWNsZSBpbiB0aGUgc3RhY2suXHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XHJcbiAgICAgIGNvbnN0IGFjdGl2YXRlZFJvdXRlUHJveHkgPSB0aGlzLmNyZWF0ZUFjdGl2YXRlZFJvdXRlUHJveHkoY29tcG9uZW50JCwgYWN0aXZhdGVkUm91dGUpO1xyXG5cclxuICAgICAgY29uc3QgaW5qZWN0b3IgPSBuZXcgT3V0bGV0SW5qZWN0b3IoYWN0aXZhdGVkUm91dGVQcm94eSwgY2hpbGRDb250ZXh0cywgdGhpcy5sb2NhdGlvbi5pbmplY3Rvcik7XHJcbiAgICAgIGNtcFJlZiA9IHRoaXMuYWN0aXZhdGVkID0gdGhpcy5sb2NhdGlvbi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgdGhpcy5sb2NhdGlvbi5sZW5ndGgsIGluamVjdG9yKTtcclxuXHJcbiAgICAgIC8vIE9uY2UgdGhlIGNvbXBvbmVudCBpcyBjcmVhdGVkIHdlIGNhbiBwdXNoIGl0IHRvIG91ciBsb2NhbCBzdWJqZWN0IHN1cHBsaWVkIHRvIHRoZSBwcm94eVxyXG4gICAgICBjb21wb25lbnQkLm5leHQoY21wUmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICAgIC8vIENhbGxpbmcgYG1hcmtGb3JDaGVja2AgdG8gbWFrZSBzdXJlIHdlIHdpbGwgcnVuIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlXHJcbiAgICAgIC8vIGBSb3V0ZXJPdXRsZXRgIGlzIGluc2lkZSBhIGBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hgIGNvbXBvbmVudC5cclxuICAgICAgZW50ZXJpbmdWaWV3ID0gdGhpcy5zdGFja0N0cmwuY3JlYXRlVmlldyh0aGlzLmFjdGl2YXRlZCwgYWN0aXZhdGVkUm91dGUpO1xyXG5cclxuICAgICAgLy8gU3RvcmUgcmVmZXJlbmNlcyB0byB0aGUgcHJveHkgYnkgY29tcG9uZW50XHJcbiAgICAgIHRoaXMucHJveHlNYXAuc2V0KGNtcFJlZi5pbnN0YW5jZSwgYWN0aXZhdGVkUm91dGVQcm94eSk7XHJcbiAgICAgIHRoaXMuY3VycmVudEFjdGl2YXRlZFJvdXRlJC5uZXh0KHsgY29tcG9uZW50OiBjbXBSZWYuaW5zdGFuY2UsIGFjdGl2YXRlZFJvdXRlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZhdGVkVmlldyA9IGVudGVyaW5nVmlldztcclxuICAgIHRoaXMuc3RhY2tDdHJsLnNldEFjdGl2ZShlbnRlcmluZ1ZpZXcpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIHRoaXMubmF2Q3RybC5zZXRUb3BPdXRsZXQodGhpcyk7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVFdmVudHMuZW1pdChjbXBSZWYuaW5zdGFuY2UpO1xyXG4gICAgICB0aGlzLnN0YWNrRXZlbnRzLmVtaXQoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZXJlIGFyZSBwYWdlcyBpbiB0aGUgc3RhY2sgdG8gZ28gYmFjay5cclxuICAgKi9cclxuICBjYW5Hb0JhY2soZGVlcCA9IDEsIHN0YWNrSWQ/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5jYW5Hb0JhY2soZGVlcCwgc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNvbHZlcyB0byBgdHJ1ZWAgaWYgaXQgdGhlIG91dGxldCB3YXMgYWJsZSB0byBzdWNlc3NmdWxseSBwb3AgdGhlIGxhc3QgTiBwYWdlcy5cclxuICAgKi9cclxuICBwb3AoZGVlcCA9IDEsIHN0YWNrSWQ/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5wb3AoZGVlcCwgc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBVUkwgb2YgdGhlIGFjdGl2ZSBwYWdlIG9mIGVhY2ggc3RhY2suXHJcbiAgICovXHJcbiAgZ2V0TGFzdFVybChzdGFja0lkPzogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuc3RhY2tDdHJsLmdldExhc3RVcmwoc3RhY2tJZCk7XHJcbiAgICByZXR1cm4gYWN0aXZlID8gYWN0aXZlLnVybCA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIFJvdXRlVmlldyBvZiB0aGUgYWN0aXZlIHBhZ2Ugb2YgZWFjaCBzdGFjay5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRMYXN0Um91dGVWaWV3KHN0YWNrSWQ/OiBzdHJpbmcpOiBSb3V0ZVZpZXcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldExhc3RVcmwoc3RhY2tJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IHZpZXcgaW4gdGhlIHRhYiBzdGFjay5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRSb290VmlldyhzdGFja0lkPzogc3RyaW5nKTogUm91dGVWaWV3IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnN0YWNrQ3RybC5nZXRSb290VXJsKHN0YWNrSWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgYWN0aXZlIHN0YWNrIElELiBJbiB0aGUgY29udGV4dCBvZiBpb24tdGFicywgaXQgbWVhbnMgdGhlIGFjdGl2ZSB0YWIuXHJcbiAgICovXHJcbiAgZ2V0QWN0aXZlU3RhY2tJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldEFjdGl2ZVN0YWNrSWQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpbmNlIHRoZSBhY3RpdmF0ZWQgcm91dGUgY2FuIGNoYW5nZSBvdmVyIHRoZSBsaWZlIHRpbWUgb2YgYSBjb21wb25lbnQgaW4gYW4gaW9uIHJvdXRlciBvdXRsZXQsIHdlIGNyZWF0ZVxyXG4gICAqIGEgcHJveHkgc28gdGhhdCB3ZSBjYW4gdXBkYXRlIHRoZSB2YWx1ZXMgb3ZlciB0aW1lIGFzIGEgdXNlciBuYXZpZ2F0ZXMgYmFjayB0byBjb21wb25lbnRzIGFscmVhZHkgaW4gdGhlIHN0YWNrLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlQWN0aXZhdGVkUm91dGVQcm94eShjb21wb25lbnQkOiBPYnNlcnZhYmxlPGFueT4sIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IEFjdGl2YXRlZFJvdXRlIHtcclxuICAgIGNvbnN0IHByb3h5OiBhbnkgPSBuZXcgQWN0aXZhdGVkUm91dGUoKTtcclxuXHJcbiAgICBwcm94eS5fZnV0dXJlU25hcHNob3QgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fZnV0dXJlU25hcHNob3Q7XHJcbiAgICBwcm94eS5fcm91dGVyU3RhdGUgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fcm91dGVyU3RhdGU7XHJcbiAgICBwcm94eS5zbmFwc2hvdCA9IGFjdGl2YXRlZFJvdXRlLnNuYXBzaG90O1xyXG4gICAgcHJveHkub3V0bGV0ID0gYWN0aXZhdGVkUm91dGUub3V0bGV0O1xyXG4gICAgcHJveHkuY29tcG9uZW50ID0gYWN0aXZhdGVkUm91dGUuY29tcG9uZW50O1xyXG5cclxuICAgIC8vIFNldHVwIHdyYXBwZXJzIGZvciB0aGUgb2JzZXJ2YWJsZXMgc28gY29uc3VtZXJzIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgc3dpdGNoaW5nIHRvIG5ldyBvYnNlcnZhYmxlcyBhcyB0aGUgc3RhdGUgdXBkYXRlc1xyXG4gICAgKHByb3h5IGFzIGFueSkuX3BhcmFtTWFwID0gdGhpcy5wcm94eU9ic2VydmFibGUoY29tcG9uZW50JCwgJ3BhcmFtTWFwJyk7XHJcbiAgICAocHJveHkgYXMgYW55KS5fcXVlcnlQYXJhbU1hcCA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdxdWVyeVBhcmFtTWFwJyk7XHJcbiAgICBwcm94eS51cmwgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAndXJsJyk7XHJcbiAgICBwcm94eS5wYXJhbXMgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAncGFyYW1zJyk7XHJcbiAgICBwcm94eS5xdWVyeVBhcmFtcyA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdxdWVyeVBhcmFtcycpO1xyXG4gICAgcHJveHkuZnJhZ21lbnQgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAnZnJhZ21lbnQnKTtcclxuICAgIHByb3h5LmRhdGEgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAnZGF0YScpO1xyXG5cclxuICAgIHJldHVybiBwcm94eSBhcyBBY3RpdmF0ZWRSb3V0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHdyYXBwZWQgb2JzZXJ2YWJsZSB0aGF0IHdpbGwgc3dpdGNoIHRvIHRoZSBsYXRlc3QgYWN0aXZhdGVkIHJvdXRlIG1hdGNoZWQgYnkgdGhlIGdpdmVuIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQ6IE9ic2VydmFibGU8YW55PiwgcGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBjb21wb25lbnQkLnBpcGUoXHJcbiAgICAgIC8vIEZpcnN0IHdhaXQgdW50aWwgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBpcyBwdXNoZWRcclxuICAgICAgZmlsdGVyKGNvbXBvbmVudCA9PiAhIWNvbXBvbmVudCksXHJcbiAgICAgIHN3aXRjaE1hcChjb21wb25lbnQgPT5cclxuICAgICAgICB0aGlzLmN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQucGlwZShcclxuICAgICAgICAgIGZpbHRlcihjdXJyZW50ID0+IGN1cnJlbnQgIT09IG51bGwgJiYgY3VycmVudC5jb21wb25lbnQgPT09IGNvbXBvbmVudCksXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoY3VycmVudCA9PiBjdXJyZW50ICYmIChjdXJyZW50LmFjdGl2YXRlZFJvdXRlIGFzIGFueSlbcGF0aF0pLFxyXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGFjdGl2YXRlZCByb3V0ZSBwcm94eSBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudCB0byB0aGUgbmV3IGluY29taW5nIHJvdXRlciBzdGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlQWN0aXZhdGVkUm91dGVQcm94eShjb21wb25lbnQ6IGFueSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKTogdm9pZCB7XHJcbiAgICBjb25zdCBwcm94eSA9IHRoaXMucHJveHlNYXAuZ2V0KGNvbXBvbmVudCk7XHJcbiAgICBpZiAoIXByb3h5KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYWN0aXZhdGVkIHJvdXRlIHByb3h5IGZvciB2aWV3YCk7XHJcbiAgICB9XHJcblxyXG4gICAgKHByb3h5IGFzIGFueSkuX2Z1dHVyZVNuYXBzaG90ID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX2Z1dHVyZVNuYXBzaG90O1xyXG4gICAgKHByb3h5IGFzIGFueSkuX3JvdXRlclN0YXRlID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX3JvdXRlclN0YXRlO1xyXG4gICAgcHJveHkuc25hcHNob3QgPSBhY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdDtcclxuICAgIHByb3h5Lm91dGxldCA9IGFjdGl2YXRlZFJvdXRlLm91dGxldDtcclxuICAgIHByb3h5LmNvbXBvbmVudCA9IGFjdGl2YXRlZFJvdXRlLmNvbXBvbmVudDtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRBY3RpdmF0ZWRSb3V0ZSQubmV4dCh7IGNvbXBvbmVudCwgYWN0aXZhdGVkUm91dGUgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBPdXRsZXRJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBjaGlsZENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLFxyXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKHRva2VuID09PSBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodG9rZW4gPT09IENoaWxkcmVuT3V0bGV0Q29udGV4dHMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRDb250ZXh0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIHJldHVybiB0aGlzLnBhcmVudC5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=