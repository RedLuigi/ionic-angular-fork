import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { alertController } from '@ionic/core';
import { OverlayBaseController } from '../util/overlay';
import * as i0 from "@angular/core";
let AlertController = class AlertController extends OverlayBaseController {
    constructor() {
        super(alertController);
    }
};
AlertController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AlertController_Factory() { return new AlertController(); }, token: AlertController, providedIn: "root" });
AlertController = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], AlertController);
export { AlertController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsicHJvdmlkZXJzL2FsZXJ0LWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBS3hELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEscUJBQXdEO0lBQzNGO1FBQ0UsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRixDQUFBOztBQUpZLGVBQWU7SUFIM0IsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLGVBQWUsQ0FJM0I7U0FKWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBbGVydE9wdGlvbnMsIGFsZXJ0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9jb3JlJztcclxuXHJcbmltcG9ydCB7IE92ZXJsYXlCYXNlQ29udHJvbGxlciB9IGZyb20gJy4uL3V0aWwvb3ZlcmxheSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWxlcnRDb250cm9sbGVyIGV4dGVuZHMgT3ZlcmxheUJhc2VDb250cm9sbGVyPEFsZXJ0T3B0aW9ucywgSFRNTElvbkFsZXJ0RWxlbWVudD4ge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoYWxlcnRDb250cm9sbGVyKTtcclxuICB9XHJcbn1cclxuIl19