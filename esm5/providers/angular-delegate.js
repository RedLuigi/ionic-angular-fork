import * as tslib_1 from "tslib";
import { ApplicationRef, ComponentFactoryResolver, Injectable, InjectionToken, Injector, NgZone, ViewContainerRef } from '@angular/core';
import { LIFECYCLE_DID_ENTER, LIFECYCLE_DID_LEAVE, LIFECYCLE_WILL_ENTER, LIFECYCLE_WILL_LEAVE, LIFECYCLE_WILL_UNLOAD } from '@ionic/core';
import { NavParams } from '../directives/navigation/nav-params';
var AngularDelegate = /** @class */ (function () {
    function AngularDelegate(zone, appRef) {
        this.zone = zone;
        this.appRef = appRef;
    }
    AngularDelegate.prototype.create = function (resolver, injector, location) {
        return new AngularFrameworkDelegate(resolver, injector, location, this.appRef, this.zone);
    };
    AngularDelegate.ctorParameters = function () { return [
        { type: NgZone },
        { type: ApplicationRef }
    ]; };
    AngularDelegate = tslib_1.__decorate([
        Injectable()
    ], AngularDelegate);
    return AngularDelegate;
}());
export { AngularDelegate };
var AngularFrameworkDelegate = /** @class */ (function () {
    function AngularFrameworkDelegate(resolver, injector, location, appRef, zone) {
        this.resolver = resolver;
        this.injector = injector;
        this.location = location;
        this.appRef = appRef;
        this.zone = zone;
        this.elRefMap = new WeakMap();
        this.elEventsMap = new WeakMap();
    }
    AngularFrameworkDelegate.prototype.attachViewToDom = function (container, component, params, cssClasses) {
        var _this = this;
        return this.zone.run(function () {
            return new Promise(function (resolve) {
                var el = attachView(_this.zone, _this.resolver, _this.injector, _this.location, _this.appRef, _this.elRefMap, _this.elEventsMap, container, component, params, cssClasses);
                resolve(el);
            });
        });
    };
    AngularFrameworkDelegate.prototype.removeViewFromDom = function (_container, component) {
        var _this = this;
        return this.zone.run(function () {
            return new Promise(function (resolve) {
                var componentRef = _this.elRefMap.get(component);
                if (componentRef) {
                    componentRef.destroy();
                    _this.elRefMap.delete(component);
                    var unbindEvents = _this.elEventsMap.get(component);
                    if (unbindEvents) {
                        unbindEvents();
                        _this.elEventsMap.delete(component);
                    }
                }
                resolve();
            });
        });
    };
    return AngularFrameworkDelegate;
}());
export { AngularFrameworkDelegate };
export var attachView = function (zone, resolver, injector, location, appRef, elRefMap, elEventsMap, container, component, params, cssClasses) {
    var e_1, _a;
    var factory = resolver.resolveComponentFactory(component);
    var childInjector = Injector.create({
        providers: getProviders(params),
        parent: injector
    });
    var componentRef = (location)
        ? location.createComponent(factory, location.length, childInjector)
        : factory.create(childInjector);
    var instance = componentRef.instance;
    var hostElement = componentRef.location.nativeElement;
    if (params) {
        Object.assign(instance, params);
    }
    if (cssClasses) {
        try {
            for (var cssClasses_1 = tslib_1.__values(cssClasses), cssClasses_1_1 = cssClasses_1.next(); !cssClasses_1_1.done; cssClasses_1_1 = cssClasses_1.next()) {
                var clazz = cssClasses_1_1.value;
                hostElement.classList.add(clazz);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cssClasses_1_1 && !cssClasses_1_1.done && (_a = cssClasses_1.return)) _a.call(cssClasses_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    var unbindEvents = bindLifecycleEvents(zone, instance, hostElement);
    container.appendChild(hostElement);
    if (!location) {
        appRef.attachView(componentRef.hostView);
    }
    componentRef.changeDetectorRef.reattach();
    elRefMap.set(hostElement, componentRef);
    elEventsMap.set(hostElement, unbindEvents);
    return hostElement;
};
var LIFECYCLES = [
    LIFECYCLE_WILL_ENTER,
    LIFECYCLE_DID_ENTER,
    LIFECYCLE_WILL_LEAVE,
    LIFECYCLE_DID_LEAVE,
    LIFECYCLE_WILL_UNLOAD
];
export var bindLifecycleEvents = function (zone, instance, element) {
    return zone.run(function () {
        var unregisters = LIFECYCLES
            .filter(function (eventName) { return typeof instance[eventName] === 'function'; })
            .map(function (eventName) {
            var handler = function (ev) { return instance[eventName](ev.detail); };
            element.addEventListener(eventName, handler);
            return function () { return element.removeEventListener(eventName, handler); };
        });
        return function () { return unregisters.forEach(function (fn) { return fn(); }); };
    });
};
var NavParamsToken = new InjectionToken('NavParamsToken');
var getProviders = function (params) {
    return [
        {
            provide: NavParamsToken, useValue: params
        },
        {
            provide: NavParams, useFactory: provideNavParamsInjectable, deps: [NavParamsToken]
        }
    ];
};
var ɵ0 = getProviders;
var provideNavParamsInjectable = function (params) {
    return new NavParams(params);
};
var ɵ1 = provideNavParamsInjectable;
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kZWxlZ2F0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsicHJvdmlkZXJzL2FuZ3VsYXItZGVsZWdhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pJLE9BQU8sRUFBcUIsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFN0osT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBR2hFO0lBRUUseUJBQ1UsSUFBWSxFQUNaLE1BQXNCO1FBRHRCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUM3QixDQUFDO0lBRUosZ0NBQU0sR0FBTixVQUNFLFFBQWtDLEVBQ2xDLFFBQWtCLEVBQ2xCLFFBQTJCO1FBRTNCLE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RixDQUFDOztnQkFWZSxNQUFNO2dCQUNKLGNBQWM7O0lBSnJCLGVBQWU7UUFEM0IsVUFBVSxFQUFFO09BQ0EsZUFBZSxDQWMzQjtJQUFELHNCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksZUFBZTtBQWdCNUI7SUFLRSxrQ0FDVSxRQUFrQyxFQUNsQyxRQUFrQixFQUNsQixRQUFzQyxFQUN0QyxNQUFzQixFQUN0QixJQUFZO1FBSlosYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUE4QjtR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TyxHQUFHLFVBQUMsRUFBTyxJQUFLLE9BQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQztZQUM1RCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLE9BQU8sY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQS9DLENBQStDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxPQUFPLGNBQU0sT0FBQSxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxFQUFFLEVBQUosQ0FBSSxDQUFDLEVBQS9CLENBQStCLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixJQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBTSxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWpFLElBQU0sWUFBWSxHQUFHLFVBQUMsTUFBNEI7SUFDaEQsT0FBTztRQUNMO1lBQ0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTTtTQUMxQztRQUNEO1lBQ0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQ25GO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQzs7QUFFRixJQUFNLDBCQUEwQixHQUFHLFVBQUMsTUFBNEI7SUFDOUQsT0FBTyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIE5nWm9uZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGcmFtZXdvcmtEZWxlZ2F0ZSwgTElGRUNZQ0xFX0RJRF9FTlRFUiwgTElGRUNZQ0xFX0RJRF9MRUFWRSwgTElGRUNZQ0xFX1dJTExfRU5URVIsIExJRkVDWUNMRV9XSUxMX0xFQVZFLCBMSUZFQ1lDTEVfV0lMTF9VTkxPQUQgfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOYXZQYXJhbXMgfSBmcm9tICcuLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vbmF2LXBhcmFtcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRGVsZWdhdGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmXHJcbiAgKSB7fVxyXG5cclxuICBjcmVhdGUoXHJcbiAgICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgbG9jYXRpb24/OiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICkge1xyXG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRnJhbWV3b3JrRGVsZWdhdGUocmVzb2x2ZXIsIGluamVjdG9yLCBsb2NhdGlvbiwgdGhpcy5hcHBSZWYsIHRoaXMuem9uZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW5ndWxhckZyYW1ld29ya0RlbGVnYXRlIGltcGxlbWVudHMgRnJhbWV3b3JrRGVsZWdhdGUge1xyXG5cclxuICBwcml2YXRlIGVsUmVmTWFwID0gbmV3IFdlYWtNYXA8SFRNTEVsZW1lbnQsIGFueT4oKTtcclxuICBwcml2YXRlIGVsRXZlbnRzTWFwID0gbmV3IFdlYWtNYXA8SFRNTEVsZW1lbnQsICgpID0+IHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmIHwgdW5kZWZpbmVkLFxyXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXHJcbiAgKSB7fVxyXG5cclxuICBhdHRhY2hWaWV3VG9Eb20oY29udGFpbmVyOiBhbnksIGNvbXBvbmVudDogYW55LCBwYXJhbXM/OiBhbnksIGNzc0NsYXNzZXM/OiBzdHJpbmdbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBjb25zdCBlbCA9IGF0dGFjaFZpZXcoXHJcbiAgICAgICAgICB0aGlzLnpvbmUsIHRoaXMucmVzb2x2ZXIsIHRoaXMuaW5qZWN0b3IsIHRoaXMubG9jYXRpb24sIHRoaXMuYXBwUmVmLFxyXG4gICAgICAgICAgdGhpcy5lbFJlZk1hcCwgdGhpcy5lbEV2ZW50c01hcCxcclxuICAgICAgICAgIGNvbnRhaW5lciwgY29tcG9uZW50LCBwYXJhbXMsIGNzc0NsYXNzZXNcclxuICAgICAgICApO1xyXG4gICAgICAgIHJlc29sdmUoZWwpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlVmlld0Zyb21Eb20oX2NvbnRhaW5lcjogYW55LCBjb21wb25lbnQ6IGFueSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5lbFJlZk1hcC5nZXQoY29tcG9uZW50KTtcclxuICAgICAgICBpZiAoY29tcG9uZW50UmVmKSB7XHJcbiAgICAgICAgICBjb21wb25lbnRSZWYuZGVzdHJveSgpO1xyXG4gICAgICAgICAgdGhpcy5lbFJlZk1hcC5kZWxldGUoY29tcG9uZW50KTtcclxuICAgICAgICAgIGNvbnN0IHVuYmluZEV2ZW50cyA9IHRoaXMuZWxFdmVudHNNYXAuZ2V0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgICBpZiAodW5iaW5kRXZlbnRzKSB7XHJcbiAgICAgICAgICAgIHVuYmluZEV2ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLmVsRXZlbnRzTWFwLmRlbGV0ZShjb21wb25lbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXR0YWNoVmlldyA9IChcclxuICB6b25lOiBOZ1pvbmUsXHJcbiAgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgbG9jYXRpb246IFZpZXdDb250YWluZXJSZWYgfCB1bmRlZmluZWQsXHJcbiAgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcclxuICBlbFJlZk1hcDogV2Vha01hcDxIVE1MRWxlbWVudCwgYW55PixcclxuICBlbEV2ZW50c01hcDogV2Vha01hcDxIVE1MRWxlbWVudCwgKCkgPT4gdm9pZD4sXHJcbiAgY29udGFpbmVyOiBhbnksIGNvbXBvbmVudDogYW55LCBwYXJhbXM6IGFueSwgY3NzQ2xhc3Nlczogc3RyaW5nW10gfCB1bmRlZmluZWRcclxuKSA9PiB7XHJcbiAgY29uc3QgZmFjdG9yeSA9IHJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XHJcbiAgY29uc3QgY2hpbGRJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XHJcbiAgICBwcm92aWRlcnM6IGdldFByb3ZpZGVycyhwYXJhbXMpLFxyXG4gICAgcGFyZW50OiBpbmplY3RvclxyXG4gIH0pO1xyXG4gIGNvbnN0IGNvbXBvbmVudFJlZiA9IChsb2NhdGlvbilcclxuICAgID8gbG9jYXRpb24uY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIGxvY2F0aW9uLmxlbmd0aCwgY2hpbGRJbmplY3RvcilcclxuICAgIDogZmFjdG9yeS5jcmVhdGUoY2hpbGRJbmplY3Rvcik7XHJcblxyXG4gIGNvbnN0IGluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gIGNvbnN0IGhvc3RFbGVtZW50ID0gY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgaWYgKHBhcmFtcykge1xyXG4gICAgT2JqZWN0LmFzc2lnbihpbnN0YW5jZSwgcGFyYW1zKTtcclxuICB9XHJcbiAgaWYgKGNzc0NsYXNzZXMpIHtcclxuICAgIGZvciAoY29uc3QgY2xhenogb2YgY3NzQ2xhc3Nlcykge1xyXG4gICAgICBob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXp6KTtcclxuICAgIH1cclxuICB9XHJcbiAgY29uc3QgdW5iaW5kRXZlbnRzID0gYmluZExpZmVjeWNsZUV2ZW50cyh6b25lLCBpbnN0YW5jZSwgaG9zdEVsZW1lbnQpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChob3N0RWxlbWVudCk7XHJcblxyXG4gIGlmICghbG9jYXRpb24pIHtcclxuICAgIGFwcFJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcbiAgfVxyXG4gIGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5yZWF0dGFjaCgpO1xyXG4gIGVsUmVmTWFwLnNldChob3N0RWxlbWVudCwgY29tcG9uZW50UmVmKTtcclxuICBlbEV2ZW50c01hcC5zZXQoaG9zdEVsZW1lbnQsIHVuYmluZEV2ZW50cyk7XHJcbiAgcmV0dXJuIGhvc3RFbGVtZW50O1xyXG59O1xyXG5cclxuY29uc3QgTElGRUNZQ0xFUyA9IFtcclxuICBMSUZFQ1lDTEVfV0lMTF9FTlRFUixcclxuICBMSUZFQ1lDTEVfRElEX0VOVEVSLFxyXG4gIExJRkVDWUNMRV9XSUxMX0xFQVZFLFxyXG4gIExJRkVDWUNMRV9ESURfTEVBVkUsXHJcbiAgTElGRUNZQ0xFX1dJTExfVU5MT0FEXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgYmluZExpZmVjeWNsZUV2ZW50cyA9ICh6b25lOiBOZ1pvbmUsIGluc3RhbmNlOiBhbnksIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgcmV0dXJuIHpvbmUucnVuKCgpID0+IHtcclxuICAgIGNvbnN0IHVucmVnaXN0ZXJzID0gTElGRUNZQ0xFU1xyXG4gICAgICAuZmlsdGVyKGV2ZW50TmFtZSA9PiB0eXBlb2YgaW5zdGFuY2VbZXZlbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgLm1hcChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXY6IGFueSkgPT4gaW5zdGFuY2VbZXZlbnROYW1lXShldi5kZXRhaWwpO1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4gdW5yZWdpc3RlcnMuZm9yRWFjaChmbiA9PiBmbigpKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IE5hdlBhcmFtc1Rva2VuID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ05hdlBhcmFtc1Rva2VuJyk7XHJcblxyXG5jb25zdCBnZXRQcm92aWRlcnMgPSAocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4ge1xyXG4gIHJldHVybiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5hdlBhcmFtc1Rva2VuLCB1c2VWYWx1ZTogcGFyYW1zXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOYXZQYXJhbXMsIHVzZUZhY3Rvcnk6IHByb3ZpZGVOYXZQYXJhbXNJbmplY3RhYmxlLCBkZXBzOiBbTmF2UGFyYW1zVG9rZW5dXHJcbiAgICB9XHJcbiAgXTtcclxufTtcclxuXHJcbmNvbnN0IHByb3ZpZGVOYXZQYXJhbXNJbmplY3RhYmxlID0gKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pID0+IHtcclxuICByZXR1cm4gbmV3IE5hdlBhcmFtcyhwYXJhbXMpO1xyXG59O1xyXG4iXX0=