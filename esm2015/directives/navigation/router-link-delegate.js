import * as tslib_1 from "tslib";
import { LocationStrategy } from '@angular/common';
import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavController } from '../../providers/nav-controller';
let RouterLinkDelegate = class RouterLinkDelegate {
    constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
        this.locationStrategy = locationStrategy;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
        this.router = router;
        this.routerLink = routerLink;
        this.routerDirection = 'forward';
    }
    ngOnInit() {
        this.updateTargetUrlAndHref();
    }
    ngOnChanges() {
        this.updateTargetUrlAndHref();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    updateTargetUrlAndHref() {
        if (this.routerLink) {
            const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
            this.elementRef.nativeElement.href = href;
        }
    }
    /**
     * @internal
     */
    onClick(ev) {
        this.navCtrl.setDirection(this.routerDirection, undefined, undefined, this.routerAnimation);
        ev.preventDefault();
    }
};
RouterLinkDelegate.ctorParameters = () => [
    { type: LocationStrategy },
    { type: NavController },
    { type: ElementRef },
    { type: Router },
    { type: RouterLink, decorators: [{ type: Optional }] }
];
tslib_1.__decorate([
    HostListener('click', ['$event'])
], RouterLinkDelegate.prototype, "onClick", null);
RouterLinkDelegate = tslib_1.__decorate([
    Directive({
        selector: '[routerLink]',
        inputs: ['routerDirection', 'routerAnimation']
    }),
    tslib_1.__param(4, Optional())
], RouterLinkDelegate);
export { RouterLinkDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWxpbmstZGVsZWdhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9yb3V0ZXItbGluay1kZWxlZ2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSXJELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQU0vRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQU83QixZQUNVLGdCQUFrQyxFQUNsQyxPQUFzQixFQUN0QixVQUFzQixFQUN0QixNQUFjLEVBQ0YsVUFBdUI7UUFKbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNGLGVBQVUsR0FBVixVQUFVLENBQWE7UUFSN0Msb0JBQWUsR0FBb0IsU0FBUyxDQUFDO0lBU3pDLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBRUgsT0FBTyxDQUFDLEVBQVc7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1RixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUNGLENBQUE7O1lBcEM2QixnQkFBZ0I7WUFDekIsYUFBYTtZQUNWLFVBQVU7WUFDZCxNQUFNO1lBQ1csVUFBVSx1QkFBMUMsUUFBUTs7QUE0Qlg7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7aURBSWpDO0FBM0NVLGtCQUFrQjtJQUo5QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztLQUMvQyxDQUFDO0lBYUcsbUJBQUEsUUFBUSxFQUFFLENBQUE7R0FaRixrQkFBa0IsQ0E0QzlCO1NBNUNZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJMaW5rIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQW5pbWF0aW9uQnVpbGRlciwgUm91dGVyRGlyZWN0aW9uIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbcm91dGVyTGlua10nLFxyXG4gIGlucHV0czogWydyb3V0ZXJEaXJlY3Rpb24nLCAncm91dGVyQW5pbWF0aW9uJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJvdXRlckxpbmtEZWxlZ2F0ZSB7XHJcblxyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xyXG5cclxuICByb3V0ZXJEaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiA9ICdmb3J3YXJkJztcclxuICByb3V0ZXJBbmltYXRpb24/OiBBbmltYXRpb25CdWlsZGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSxcclxuICAgIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlckxpbms/OiBSb3V0ZXJMaW5rLFxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpOiBhbnkge1xyXG4gICAgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKSB7XHJcbiAgICBpZiAodGhpcy5yb3V0ZXJMaW5rKSB7XHJcbiAgICAgIGNvbnN0IGhyZWYgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMucm91dGVyLnNlcmlhbGl6ZVVybCh0aGlzLnJvdXRlckxpbmsudXJsVHJlZSkpO1xyXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ocmVmID0gaHJlZjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkNsaWNrKGV2OiBVSUV2ZW50KSB7XHJcbiAgICB0aGlzLm5hdkN0cmwuc2V0RGlyZWN0aW9uKHRoaXMucm91dGVyRGlyZWN0aW9uLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcy5yb3V0ZXJBbmltYXRpb24pO1xyXG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbn1cclxuIl19