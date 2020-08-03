import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { pickerController } from '@ionic/core';
import { OverlayBaseController } from '../util/overlay';
import * as i0 from "@angular/core";
let PickerController = class PickerController extends OverlayBaseController {
    constructor() {
        super(pickerController);
    }
};
PickerController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PickerController_Factory() { return new PickerController(); }, token: PickerController, providedIn: "root" });
PickerController = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], PickerController);
export { PickerController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9waWNrZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWlCLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUt4RCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLHFCQUEwRDtJQUM5RjtRQUNFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDRixDQUFBOztBQUpZLGdCQUFnQjtJQUg1QixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csZ0JBQWdCLENBSTVCO1NBSlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQaWNrZXJPcHRpb25zLCBwaWNrZXJDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT3ZlcmxheUJhc2VDb250cm9sbGVyIH0gZnJvbSAnLi4vdXRpbC9vdmVybGF5JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaWNrZXJDb250cm9sbGVyIGV4dGVuZHMgT3ZlcmxheUJhc2VDb250cm9sbGVyPFBpY2tlck9wdGlvbnMsIEhUTUxJb25QaWNrZXJFbGVtZW50PiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihwaWNrZXJDb250cm9sbGVyKTtcclxuICB9XHJcbn1cclxuIl19