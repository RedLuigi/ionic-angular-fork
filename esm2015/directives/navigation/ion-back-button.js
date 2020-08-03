import * as tslib_1 from "tslib";
import { Directive, HostListener, Optional } from '@angular/core';
import { Config } from '../../providers/config';
import { NavController } from '../../providers/nav-controller';
import { IonRouterOutlet } from './ion-router-outlet';
let IonBackButtonDelegate = class IonBackButtonDelegate {
    constructor(routerOutlet, navCtrl, config) {
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.config = config;
    }
    /**
     * @internal
     */
    onClick(ev) {
        const defaultHref = this.defaultHref || this.config.get('backButtonDefaultHref');
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.navCtrl.setDirection('back', undefined, undefined, this.routerAnimation);
            this.routerOutlet.pop();
            ev.preventDefault();
        }
        else if (defaultHref != null) {
            this.navCtrl.navigateBack(defaultHref, { animation: this.routerAnimation });
            ev.preventDefault();
        }
    }
};
IonBackButtonDelegate.ctorParameters = () => [
    { type: IonRouterOutlet, decorators: [{ type: Optional }] },
    { type: NavController },
    { type: Config }
];
tslib_1.__decorate([
    HostListener('click', ['$event'])
], IonBackButtonDelegate.prototype, "onClick", null);
IonBackButtonDelegate = tslib_1.__decorate([
    Directive({
        selector: 'ion-back-button',
        inputs: ['defaultHref', 'routerAnimation'],
    }),
    tslib_1.__param(0, Optional())
], IonBackButtonDelegate);
export { IonBackButtonDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLWJhY2stYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL25hdmlnYXRpb24vaW9uLWJhY2stYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNdEQsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFLaEMsWUFDc0IsWUFBNkIsRUFDekMsT0FBc0IsRUFDdEIsTUFBYztRQUZGLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUN6QyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDckIsQ0FBQztJQUVKOztPQUVHO0lBRUgsT0FBTyxDQUFDLEVBQVM7UUFDZixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFakYsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUM1RSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFyQnFDLGVBQWUsdUJBQWhELFFBQVE7WUFDUSxhQUFhO1lBQ2QsTUFBTTs7QUFPeEI7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7b0RBWWpDO0FBMUJVLHFCQUFxQjtJQUpqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQztLQUMzQyxDQUFDO0lBT0csbUJBQUEsUUFBUSxFQUFFLENBQUE7R0FORixxQkFBcUIsQ0EyQmpDO1NBM0JZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2NvbmZpZyc7XHJcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xyXG5cclxuaW1wb3J0IHsgSW9uUm91dGVyT3V0bGV0IH0gZnJvbSAnLi9pb24tcm91dGVyLW91dGxldCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lvbi1iYWNrLWJ1dHRvbicsXHJcbiAgaW5wdXRzOiBbJ2RlZmF1bHRIcmVmJywgJ3JvdXRlckFuaW1hdGlvbiddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW9uQmFja0J1dHRvbkRlbGVnYXRlIHtcclxuXHJcbiAgZGVmYXVsdEhyZWY6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XHJcbiAgcm91dGVyQW5pbWF0aW9uPzogQW5pbWF0aW9uQnVpbGRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlck91dGxldDogSW9uUm91dGVyT3V0bGV0LFxyXG4gICAgcHJpdmF0ZSBuYXZDdHJsOiBOYXZDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1xyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soZXY6IEV2ZW50KSB7XHJcbiAgICBjb25zdCBkZWZhdWx0SHJlZiA9IHRoaXMuZGVmYXVsdEhyZWYgfHwgdGhpcy5jb25maWcuZ2V0KCdiYWNrQnV0dG9uRGVmYXVsdEhyZWYnKTtcclxuXHJcbiAgICBpZiAodGhpcy5yb3V0ZXJPdXRsZXQgJiYgdGhpcy5yb3V0ZXJPdXRsZXQuY2FuR29CYWNrKCkpIHtcclxuICAgICAgdGhpcy5uYXZDdHJsLnNldERpcmVjdGlvbignYmFjaycsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzLnJvdXRlckFuaW1hdGlvbik7XHJcbiAgICAgIHRoaXMucm91dGVyT3V0bGV0LnBvcCgpO1xyXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSBlbHNlIGlmIChkZWZhdWx0SHJlZiAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMubmF2Q3RybC5uYXZpZ2F0ZUJhY2soZGVmYXVsdEhyZWYsIHsgYW5pbWF0aW9uOiB0aGlzLnJvdXRlckFuaW1hdGlvbiB9KTtcclxuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19