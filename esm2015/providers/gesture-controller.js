import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { createGesture } from '@ionic/core';
import * as i0 from "@angular/core";
let GestureController = class GestureController {
    constructor(zone) {
        this.zone = zone;
    }
    /**
     * Create a new gesture
     */
    create(opts, runInsideAngularZone = false) {
        if (runInsideAngularZone) {
            Object.getOwnPropertyNames(opts).forEach(key => {
                if (typeof opts[key] === 'function') {
                    const fn = opts[key];
                    opts[key] = (...props) => this.zone.run(() => fn(...props));
                }
            });
        }
        return createGesture(opts);
    }
};
GestureController.ctorParameters = () => [
    { type: NgZone }
];
GestureController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function GestureController_Factory() { return new GestureController(i0.ɵɵinject(i0.NgZone)); }, token: GestureController, providedIn: "root" });
GestureController = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], GestureController);
export { GestureController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwcm92aWRlcnMvZ2VzdHVyZS1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQTBCLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFLcEUsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFDNUIsWUFBb0IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDO0lBQ3BDOztPQUVHO0lBQ0gsTUFBTSxDQUFDLElBQW1CLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUN0RCxJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdDLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUNuQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0YsQ0FBQTs7WUFoQjJCLE1BQU07OztBQURyQixpQkFBaUI7SUFIN0IsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLGlCQUFpQixDQWlCN0I7U0FqQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdlc3R1cmUsIEdlc3R1cmVDb25maWcsIGNyZWF0ZUdlc3R1cmUgfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2VzdHVyZUNvbnRyb2xsZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBnZXN0dXJlXHJcbiAgICovXHJcbiAgY3JlYXRlKG9wdHM6IEdlc3R1cmVDb25maWcsIHJ1bkluc2lkZUFuZ3VsYXJab25lID0gZmFsc2UpOiBHZXN0dXJlIHtcclxuICAgIGlmIChydW5JbnNpZGVBbmd1bGFyWm9uZSkge1xyXG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIGNvbnN0IGZuID0gb3B0c1trZXldO1xyXG4gICAgICAgICAgb3B0c1trZXldID0gKC4uLnByb3BzKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGZuKC4uLnByb3BzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3JlYXRlR2VzdHVyZShvcHRzKTtcclxuICB9XHJcbn1cclxuIl19