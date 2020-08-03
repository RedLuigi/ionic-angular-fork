import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { createAnimation, getTimeGivenProgression } from '@ionic/core';
import * as i0 from "@angular/core";
var AnimationController = /** @class */ (function () {
    function AnimationController() {
    }
    /**
     * Create a new animation
     */
    AnimationController.prototype.create = function (animationId) {
        return createAnimation(animationId);
    };
    /**
     * EXPERIMENTAL
     *
     * Given a progression and a cubic bezier function,
     * this utility returns the time value(s) at which the
     * cubic bezier reaches the given time progression.
     *
     * If the cubic bezier never reaches the progression
     * the result will be an empty array.
     *
     * This is most useful for switching between easing curves
     * when doing a gesture animation (i.e. going from linear easing
     * during a drag, to another easing when `progressEnd` is called)
     */
    AnimationController.prototype.easingTime = function (p0, p1, p2, p3, progression) {
        return getTimeGivenProgression(p0, p1, p2, p3, progression);
    };
    AnimationController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AnimationController_Factory() { return new AnimationController(); }, token: AnimationController, providedIn: "root" });
    AnimationController = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        })
    ], AnimationController);
    return AnimationController;
}());
export { AnimationController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9hbmltYXRpb24tY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWEsZUFBZSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUtsRjtJQUFBO0tBeUJDO0lBeEJDOztPQUVHO0lBQ0gsb0NBQU0sR0FBTixVQUFPLFdBQW9CO1FBQ3pCLE9BQU8sZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsd0NBQVUsR0FBVixVQUFXLEVBQVksRUFBRSxFQUFZLEVBQUUsRUFBWSxFQUFFLEVBQVksRUFBRSxXQUFtQjtRQUNwRixPQUFPLHVCQUF1QixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM5RCxDQUFDOztJQXhCVSxtQkFBbUI7UUFIL0IsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLG1CQUFtQixDQXlCL0I7OEJBL0JEO0NBK0JDLEFBekJELElBeUJDO1NBekJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQW5pbWF0aW9uLCBjcmVhdGVBbmltYXRpb24sIGdldFRpbWVHaXZlblByb2dyZXNzaW9uIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkNvbnRyb2xsZXIge1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBhbmltYXRpb25cclxuICAgKi9cclxuICBjcmVhdGUoYW5pbWF0aW9uSWQ/OiBzdHJpbmcpOiBBbmltYXRpb24ge1xyXG4gICAgcmV0dXJuIGNyZWF0ZUFuaW1hdGlvbihhbmltYXRpb25JZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFWFBFUklNRU5UQUxcclxuICAgKlxyXG4gICAqIEdpdmVuIGEgcHJvZ3Jlc3Npb24gYW5kIGEgY3ViaWMgYmV6aWVyIGZ1bmN0aW9uLFxyXG4gICAqIHRoaXMgdXRpbGl0eSByZXR1cm5zIHRoZSB0aW1lIHZhbHVlKHMpIGF0IHdoaWNoIHRoZVxyXG4gICAqIGN1YmljIGJlemllciByZWFjaGVzIHRoZSBnaXZlbiB0aW1lIHByb2dyZXNzaW9uLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGN1YmljIGJlemllciBuZXZlciByZWFjaGVzIHRoZSBwcm9ncmVzc2lvblxyXG4gICAqIHRoZSByZXN1bHQgd2lsbCBiZSBhbiBlbXB0eSBhcnJheS5cclxuICAgKlxyXG4gICAqIFRoaXMgaXMgbW9zdCB1c2VmdWwgZm9yIHN3aXRjaGluZyBiZXR3ZWVuIGVhc2luZyBjdXJ2ZXNcclxuICAgKiB3aGVuIGRvaW5nIGEgZ2VzdHVyZSBhbmltYXRpb24gKGkuZS4gZ29pbmcgZnJvbSBsaW5lYXIgZWFzaW5nXHJcbiAgICogZHVyaW5nIGEgZHJhZywgdG8gYW5vdGhlciBlYXNpbmcgd2hlbiBgcHJvZ3Jlc3NFbmRgIGlzIGNhbGxlZClcclxuICAgKi9cclxuICBlYXNpbmdUaW1lKHAwOiBudW1iZXJbXSwgcDE6IG51bWJlcltdLCBwMjogbnVtYmVyW10sIHAzOiBudW1iZXJbXSwgcHJvZ3Jlc3Npb246IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgIHJldHVybiBnZXRUaW1lR2l2ZW5Qcm9ncmVzc2lvbihwMCwgcDEsIHAyLCBwMywgcHJvZ3Jlc3Npb24pO1xyXG4gIH1cclxufVxyXG4iXX0=