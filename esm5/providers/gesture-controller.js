import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { createGesture } from '@ionic/core';
import * as i0 from "@angular/core";
var GestureController = /** @class */ (function () {
    function GestureController(zone) {
        this.zone = zone;
    }
    /**
     * Create a new gesture
     */
    GestureController.prototype.create = function (opts, runInsideAngularZone) {
        var _this = this;
        if (runInsideAngularZone === void 0) { runInsideAngularZone = false; }
        if (runInsideAngularZone) {
            Object.getOwnPropertyNames(opts).forEach(function (key) {
                if (typeof opts[key] === 'function') {
                    var fn_1 = opts[key];
                    opts[key] = function () {
                        var props = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            props[_i] = arguments[_i];
                        }
                        return _this.zone.run(function () { return fn_1.apply(void 0, tslib_1.__spread(props)); });
                    };
                }
            });
        }
        return createGesture(opts);
    };
    GestureController.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    GestureController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function GestureController_Factory() { return new GestureController(i0.ɵɵinject(i0.NgZone)); }, token: GestureController, providedIn: "root" });
    GestureController = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        })
    ], GestureController);
    return GestureController;
}());
export { GestureController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwcm92aWRlcnMvZ2VzdHVyZS1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQTBCLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFLcEU7SUFDRSwyQkFBb0IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDO0lBQ3BDOztPQUVHO0lBQ0gsa0NBQU0sR0FBTixVQUFPLElBQW1CLEVBQUUsb0JBQTRCO1FBQXhELGlCQVdDO1FBWDJCLHFDQUFBLEVBQUEsNEJBQTRCO1FBQ3RELElBQUksb0JBQW9CLEVBQUU7WUFDeEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQzFDLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUNuQyxJQUFNLElBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRzt3QkFBQyxlQUFROzZCQUFSLFVBQVEsRUFBUixxQkFBUSxFQUFSLElBQVE7NEJBQVIsMEJBQVE7O3dCQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLElBQUUsZ0NBQUksS0FBSyxJQUFYLENBQVksQ0FBQztvQkFBakMsQ0FBaUMsQ0FBQztpQkFDN0Q7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0JBZnlCLE1BQU07OztJQURyQixpQkFBaUI7UUFIN0IsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLGlCQUFpQixDQWlCN0I7NEJBdkJEO0NBdUJDLEFBakJELElBaUJDO1NBakJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHZXN0dXJlLCBHZXN0dXJlQ29uZmlnLCBjcmVhdGVHZXN0dXJlIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEdlc3R1cmVDb250cm9sbGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgZ2VzdHVyZVxyXG4gICAqL1xyXG4gIGNyZWF0ZShvcHRzOiBHZXN0dXJlQ29uZmlnLCBydW5JbnNpZGVBbmd1bGFyWm9uZSA9IGZhbHNlKTogR2VzdHVyZSB7XHJcbiAgICBpZiAocnVuSW5zaWRlQW5ndWxhclpvbmUpIHtcclxuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob3B0cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0c1trZXldID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBjb25zdCBmbiA9IG9wdHNba2V5XTtcclxuICAgICAgICAgIG9wdHNba2V5XSA9ICguLi5wcm9wcykgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBmbiguLi5wcm9wcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNyZWF0ZUdlc3R1cmUob3B0cyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==