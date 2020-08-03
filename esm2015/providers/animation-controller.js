import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { createAnimation, getTimeGivenProgression } from '@ionic/core';
import * as i0 from "@angular/core";
let AnimationController = class AnimationController {
    /**
     * Create a new animation
     */
    create(animationId) {
        return createAnimation(animationId);
    }
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
    easingTime(p0, p1, p2, p3, progression) {
        return getTimeGivenProgression(p0, p1, p2, p3, progression);
    }
};
AnimationController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AnimationController_Factory() { return new AnimationController(); }, token: AnimationController, providedIn: "root" });
AnimationController = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], AnimationController);
export { AnimationController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9hbmltYXRpb24tY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWEsZUFBZSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUtsRixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUM5Qjs7T0FFRztJQUNILE1BQU0sQ0FBQyxXQUFvQjtRQUN6QixPQUFPLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFVBQVUsQ0FBQyxFQUFZLEVBQUUsRUFBWSxFQUFFLEVBQVksRUFBRSxFQUFZLEVBQUUsV0FBbUI7UUFDcEYsT0FBTyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGLENBQUE7O0FBekJZLG1CQUFtQjtJQUgvQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csbUJBQW1CLENBeUIvQjtTQXpCWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiwgY3JlYXRlQW5pbWF0aW9uLCBnZXRUaW1lR2l2ZW5Qcm9ncmVzc2lvbiB9IGZyb20gJ0Bpb25pYy9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25Db250cm9sbGVyIHtcclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgYW5pbWF0aW9uXHJcbiAgICovXHJcbiAgY3JlYXRlKGFuaW1hdGlvbklkPzogc3RyaW5nKTogQW5pbWF0aW9uIHtcclxuICAgIHJldHVybiBjcmVhdGVBbmltYXRpb24oYW5pbWF0aW9uSWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRVhQRVJJTUVOVEFMXHJcbiAgICpcclxuICAgKiBHaXZlbiBhIHByb2dyZXNzaW9uIGFuZCBhIGN1YmljIGJlemllciBmdW5jdGlvbixcclxuICAgKiB0aGlzIHV0aWxpdHkgcmV0dXJucyB0aGUgdGltZSB2YWx1ZShzKSBhdCB3aGljaCB0aGVcclxuICAgKiBjdWJpYyBiZXppZXIgcmVhY2hlcyB0aGUgZ2l2ZW4gdGltZSBwcm9ncmVzc2lvbi5cclxuICAgKlxyXG4gICAqIElmIHRoZSBjdWJpYyBiZXppZXIgbmV2ZXIgcmVhY2hlcyB0aGUgcHJvZ3Jlc3Npb25cclxuICAgKiB0aGUgcmVzdWx0IHdpbGwgYmUgYW4gZW1wdHkgYXJyYXkuXHJcbiAgICpcclxuICAgKiBUaGlzIGlzIG1vc3QgdXNlZnVsIGZvciBzd2l0Y2hpbmcgYmV0d2VlbiBlYXNpbmcgY3VydmVzXHJcbiAgICogd2hlbiBkb2luZyBhIGdlc3R1cmUgYW5pbWF0aW9uIChpLmUuIGdvaW5nIGZyb20gbGluZWFyIGVhc2luZ1xyXG4gICAqIGR1cmluZyBhIGRyYWcsIHRvIGFub3RoZXIgZWFzaW5nIHdoZW4gYHByb2dyZXNzRW5kYCBpcyBjYWxsZWQpXHJcbiAgICovXHJcbiAgZWFzaW5nVGltZShwMDogbnVtYmVyW10sIHAxOiBudW1iZXJbXSwgcDI6IG51bWJlcltdLCBwMzogbnVtYmVyW10sIHByb2dyZXNzaW9uOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICByZXR1cm4gZ2V0VGltZUdpdmVuUHJvZ3Jlc3Npb24ocDAsIHAxLCBwMiwgcDMsIHByb2dyZXNzaW9uKTtcclxuICB9XHJcbn1cclxuIl19