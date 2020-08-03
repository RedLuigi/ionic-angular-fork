import * as tslib_1 from "tslib";
import { LocationStrategy } from '@angular/common';
import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavController } from '../../providers/nav-controller';
var RouterLinkDelegate = /** @class */ (function () {
    function RouterLinkDelegate(locationStrategy, navCtrl, elementRef, router, routerLink) {
        this.locationStrategy = locationStrategy;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
        this.router = router;
        this.routerLink = routerLink;
        this.routerDirection = 'forward';
    }
    RouterLinkDelegate.prototype.ngOnInit = function () {
        this.updateTargetUrlAndHref();
    };
    RouterLinkDelegate.prototype.ngOnChanges = function () {
        this.updateTargetUrlAndHref();
    };
    RouterLinkDelegate.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    RouterLinkDelegate.prototype.updateTargetUrlAndHref = function () {
        if (this.routerLink) {
            var href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
            this.elementRef.nativeElement.href = href;
        }
    };
    /**
     * @internal
     */
    RouterLinkDelegate.prototype.onClick = function (ev) {
        this.navCtrl.setDirection(this.routerDirection, undefined, undefined, this.routerAnimation);
        ev.preventDefault();
    };
    RouterLinkDelegate.ctorParameters = function () { return [
        { type: LocationStrategy },
        { type: NavController },
        { type: ElementRef },
        { type: Router },
        { type: RouterLink, decorators: [{ type: Optional }] }
    ]; };
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
    return RouterLinkDelegate;
}());
export { RouterLinkDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWxpbmstZGVsZWdhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9yb3V0ZXItbGluay1kZWxlZ2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSXJELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQU0vRDtJQU9FLDRCQUNVLGdCQUFrQyxFQUNsQyxPQUFzQixFQUN0QixVQUFzQixFQUN0QixNQUFjLEVBQ0YsVUFBdUI7UUFKbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNGLGVBQVUsR0FBVixVQUFVLENBQWE7UUFSN0Msb0JBQWUsR0FBb0IsU0FBUyxDQUFDO0lBU3pDLENBQUM7SUFFTCxxQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVPLG1EQUFzQixHQUE5QjtRQUNFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFFSCxvQ0FBTyxHQUFQLFVBQVEsRUFBVztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVGLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN0QixDQUFDOztnQkFuQzJCLGdCQUFnQjtnQkFDekIsYUFBYTtnQkFDVixVQUFVO2dCQUNkLE1BQU07Z0JBQ1csVUFBVSx1QkFBMUMsUUFBUTs7SUE0Qlg7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7cURBSWpDO0lBM0NVLGtCQUFrQjtRQUo5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QixNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztTQUMvQyxDQUFDO1FBYUcsbUJBQUEsUUFBUSxFQUFFLENBQUE7T0FaRixrQkFBa0IsQ0E0QzlCO0lBQUQseUJBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQTVDWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgUm91dGVyTGluayB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkJ1aWxkZXIsIFJvdXRlckRpcmVjdGlvbiB9IGZyb20gJ0Bpb25pYy9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL25hdi1jb250cm9sbGVyJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3JvdXRlckxpbmtdJyxcclxuICBpbnB1dHM6IFsncm91dGVyRGlyZWN0aW9uJywgJ3JvdXRlckFuaW1hdGlvbiddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3V0ZXJMaW5rRGVsZWdhdGUge1xyXG5cclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcm91dGVyRGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24gPSAnZm9yd2FyZCc7XHJcbiAgcm91dGVyQW5pbWF0aW9uPzogQW5pbWF0aW9uQnVpbGRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3ksXHJcbiAgICBwcml2YXRlIG5hdkN0cmw6IE5hdkNvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXJMaW5rPzogUm91dGVyTGluayxcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogYW55IHtcclxuICAgIHRoaXMudXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogYW55IHtcclxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCkge1xyXG4gICAgaWYgKHRoaXMucm91dGVyTGluaykge1xyXG4gICAgICBjb25zdCBocmVmID0gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnByZXBhcmVFeHRlcm5hbFVybCh0aGlzLnJvdXRlci5zZXJpYWxpemVVcmwodGhpcy5yb3V0ZXJMaW5rLnVybFRyZWUpKTtcclxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaHJlZiA9IGhyZWY7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgb25DbGljayhldjogVUlFdmVudCkge1xyXG4gICAgdGhpcy5uYXZDdHJsLnNldERpcmVjdGlvbih0aGlzLnJvdXRlckRpcmVjdGlvbiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMucm91dGVyQW5pbWF0aW9uKTtcclxuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==