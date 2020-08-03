import * as tslib_1 from "tslib";
import { ComponentFactoryResolver, Directive, ElementRef, Injector, ViewContainerRef } from '@angular/core';
import { AngularDelegate } from '../../providers/angular-delegate';
import { ProxyCmp, proxyOutputs } from '../proxies-utils';
let NavDelegate = class NavDelegate {
    constructor(ref, resolver, injector, angularDelegate, location) {
        this.el = ref.nativeElement;
        ref.nativeElement.delegate = angularDelegate.create(resolver, injector, location);
        proxyOutputs(this, this.el, ['ionNavDidChange', 'ionNavWillChange']);
    }
};
NavDelegate.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: AngularDelegate },
    { type: ViewContainerRef }
];
NavDelegate = tslib_1.__decorate([
    ProxyCmp({
        inputs: ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'],
        methods: ['push', 'insert', 'insertPages', 'pop', 'popTo', 'popToRoot', 'removeIndex', 'setRoot', 'setPages', 'getActive', 'getByIndex', 'canGoBack', 'getPrevious']
    }),
    Directive({
        selector: 'ion-nav'
    })
], NavDelegate);
export { NavDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWRlbGVnYXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL25hdmlnYXRpb24vbmF2LWRlbGVnYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFTMUQsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUV0QixZQUNFLEdBQWUsRUFDZixRQUFrQyxFQUNsQyxRQUFrQixFQUNsQixlQUFnQyxFQUNoQyxRQUEwQjtRQUUxQixJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDNUIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xGLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixFQUFHLGtCQUFrQixDQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0NBQ0YsQ0FBQTs7WUFWUSxVQUFVO1lBQ0wsd0JBQXdCO1lBQ3hCLFFBQVE7WUFDRCxlQUFlO1lBQ3RCLGdCQUFnQjs7QUFQakIsV0FBVztJQVB2QixRQUFRLENBQUM7UUFDUixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDO1FBQ3ZFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQztLQUNySyxDQUFDO0lBQ0QsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7S0FDcEIsQ0FBQztHQUNXLFdBQVcsQ0FhdkI7U0FiWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBbmd1bGFyRGVsZWdhdGUgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvYW5ndWxhci1kZWxlZ2F0ZSc7XHJcbmltcG9ydCB7IFByb3h5Q21wLCBwcm94eU91dHB1dHMgfSBmcm9tICcuLi9wcm94aWVzLXV0aWxzJztcclxuXHJcbkBQcm94eUNtcCh7XHJcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJywgJ2FuaW1hdGlvbicsICdyb290JywgJ3Jvb3RQYXJhbXMnLCAnc3dpcGVHZXN0dXJlJ10sXHJcbiAgbWV0aG9kczogWydwdXNoJywgJ2luc2VydCcsICdpbnNlcnRQYWdlcycsICdwb3AnLCAncG9wVG8nLCAncG9wVG9Sb290JywgJ3JlbW92ZUluZGV4JywgJ3NldFJvb3QnLCAnc2V0UGFnZXMnLCAnZ2V0QWN0aXZlJywgJ2dldEJ5SW5kZXgnLCAnY2FuR29CYWNrJywgJ2dldFByZXZpb3VzJ11cclxufSlcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpb24tbmF2J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF2RGVsZWdhdGUge1xyXG4gIHByb3RlY3RlZCBlbDogSFRNTEVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICByZWY6IEVsZW1lbnRSZWYsXHJcbiAgICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgYW5ndWxhckRlbGVnYXRlOiBBbmd1bGFyRGVsZWdhdGUsXHJcbiAgICBsb2NhdGlvbjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkge1xyXG4gICAgdGhpcy5lbCA9IHJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgcmVmLm5hdGl2ZUVsZW1lbnQuZGVsZWdhdGUgPSBhbmd1bGFyRGVsZWdhdGUuY3JlYXRlKHJlc29sdmVyLCBpbmplY3RvciwgbG9jYXRpb24pO1xyXG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uTmF2RGlkQ2hhbmdlJyAsICdpb25OYXZXaWxsQ2hhbmdlJyBdKTtcclxuICB9XHJcbn1cclxuIl19