import * as tslib_1 from "tslib";
import { ComponentFactoryResolver, Directive, ElementRef, Injector, ViewContainerRef } from '@angular/core';
import { AngularDelegate } from '../../providers/angular-delegate';
import { ProxyCmp, proxyOutputs } from '../proxies-utils';
var NavDelegate = /** @class */ (function () {
    function NavDelegate(ref, resolver, injector, angularDelegate, location) {
        this.el = ref.nativeElement;
        ref.nativeElement.delegate = angularDelegate.create(resolver, injector, location);
        proxyOutputs(this, this.el, ['ionNavDidChange', 'ionNavWillChange']);
    }
    NavDelegate.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: AngularDelegate },
        { type: ViewContainerRef }
    ]; };
    NavDelegate = tslib_1.__decorate([
        ProxyCmp({
            inputs: ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'],
            methods: ['push', 'insert', 'insertPages', 'pop', 'popTo', 'popToRoot', 'removeIndex', 'setRoot', 'setPages', 'getActive', 'getByIndex', 'canGoBack', 'getPrevious']
        }),
        Directive({
            selector: 'ion-nav'
        })
    ], NavDelegate);
    return NavDelegate;
}());
export { NavDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWRlbGVnYXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL25hdmlnYXRpb24vbmF2LWRlbGVnYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFTMUQ7SUFFRSxxQkFDRSxHQUFlLEVBQ2YsUUFBa0MsRUFDbEMsUUFBa0IsRUFDbEIsZUFBZ0MsRUFDaEMsUUFBMEI7UUFFMUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRixZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRyxrQkFBa0IsQ0FBRSxDQUFDLENBQUM7SUFDekUsQ0FBQzs7Z0JBVE0sVUFBVTtnQkFDTCx3QkFBd0I7Z0JBQ3hCLFFBQVE7Z0JBQ0QsZUFBZTtnQkFDdEIsZ0JBQWdCOztJQVBqQixXQUFXO1FBUHZCLFFBQVEsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7WUFDdkUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDO1NBQ3JLLENBQUM7UUFDRCxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztTQUNwQixDQUFDO09BQ1csV0FBVyxDQWF2QjtJQUFELGtCQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhckRlbGVnYXRlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2FuZ3VsYXItZGVsZWdhdGUnO1xyXG5pbXBvcnQgeyBQcm94eUNtcCwgcHJveHlPdXRwdXRzIH0gZnJvbSAnLi4vcHJveGllcy11dGlscyc7XHJcblxyXG5AUHJveHlDbXAoe1xyXG4gIGlucHV0czogWydhbmltYXRlZCcsICdhbmltYXRpb24nLCAncm9vdCcsICdyb290UGFyYW1zJywgJ3N3aXBlR2VzdHVyZSddLFxyXG4gIG1ldGhvZHM6IFsncHVzaCcsICdpbnNlcnQnLCAnaW5zZXJ0UGFnZXMnLCAncG9wJywgJ3BvcFRvJywgJ3BvcFRvUm9vdCcsICdyZW1vdmVJbmRleCcsICdzZXRSb290JywgJ3NldFBhZ2VzJywgJ2dldEFjdGl2ZScsICdnZXRCeUluZGV4JywgJ2NhbkdvQmFjaycsICdnZXRQcmV2aW91cyddXHJcbn0pXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW9uLW5hdidcclxufSlcclxuZXhwb3J0IGNsYXNzIE5hdkRlbGVnYXRlIHtcclxuICBwcm90ZWN0ZWQgZWw6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgIGFuZ3VsYXJEZWxlZ2F0ZTogQW5ndWxhckRlbGVnYXRlLFxyXG4gICAgbG9jYXRpb246IFZpZXdDb250YWluZXJSZWZcclxuICApIHtcclxuICAgIHRoaXMuZWwgPSByZWYubmF0aXZlRWxlbWVudDtcclxuICAgIHJlZi5uYXRpdmVFbGVtZW50LmRlbGVnYXRlID0gYW5ndWxhckRlbGVnYXRlLmNyZWF0ZShyZXNvbHZlciwgaW5qZWN0b3IsIGxvY2F0aW9uKTtcclxuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbk5hdkRpZENoYW5nZScgLCAnaW9uTmF2V2lsbENoYW5nZScgXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==