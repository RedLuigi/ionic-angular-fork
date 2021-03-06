import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { actionSheetController } from '@ionic/core';
import { OverlayBaseController } from '../util/overlay';
import * as i0 from "@angular/core";
let ActionSheetController = class ActionSheetController extends OverlayBaseController {
    constructor() {
        super(actionSheetController);
    }
};
ActionSheetController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActionSheetController_Factory() { return new ActionSheetController(); }, token: ActionSheetController, providedIn: "root" });
ActionSheetController = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], ActionSheetController);
export { ActionSheetController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLXNoZWV0LWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9hY3Rpb24tc2hlZXQtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXNCLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUt4RCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFvRTtJQUM3RztRQUNFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFBOztBQUpZLHFCQUFxQjtJQUhqQyxVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1cscUJBQXFCLENBSWpDO1NBSlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3Rpb25TaGVldE9wdGlvbnMsIGFjdGlvblNoZWV0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9jb3JlJztcclxuXHJcbmltcG9ydCB7IE92ZXJsYXlCYXNlQ29udHJvbGxlciB9IGZyb20gJy4uL3V0aWwvb3ZlcmxheSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aW9uU2hlZXRDb250cm9sbGVyIGV4dGVuZHMgT3ZlcmxheUJhc2VDb250cm9sbGVyPEFjdGlvblNoZWV0T3B0aW9ucywgSFRNTElvbkFjdGlvblNoZWV0RWxlbWVudD4ge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoYWN0aW9uU2hlZXRDb250cm9sbGVyKTtcclxuICB9XHJcbn1cclxuIl19