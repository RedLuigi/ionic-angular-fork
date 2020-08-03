import * as tslib_1 from "tslib";
import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { popoverController } from '@ionic/core';
import { OverlayBaseController } from '../util/overlay';
import { AngularDelegate } from './angular-delegate';
var PopoverController = /** @class */ (function (_super) {
    tslib_1.__extends(PopoverController, _super);
    function PopoverController(angularDelegate, resolver, injector) {
        var _this = _super.call(this, popoverController) || this;
        _this.angularDelegate = angularDelegate;
        _this.resolver = resolver;
        _this.injector = injector;
        return _this;
    }
    PopoverController.prototype.create = function (opts) {
        return _super.prototype.create.call(this, tslib_1.__assign({}, opts, { delegate: this.angularDelegate.create(this.resolver, this.injector) }));
    };
    PopoverController.ctorParameters = function () { return [
        { type: AngularDelegate },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    PopoverController = tslib_1.__decorate([
        Injectable()
    ], PopoverController);
    return PopoverController;
}(OverlayBaseController));
export { PopoverController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwcm92aWRlcnMvcG9wb3Zlci1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQWtCLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWhFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdyRDtJQUF1Qyw2Q0FBNEQ7SUFFakcsMkJBQ1UsZUFBZ0MsRUFDaEMsUUFBa0MsRUFDbEMsUUFBa0I7UUFINUIsWUFLRSxrQkFBTSxpQkFBaUIsQ0FBQyxTQUN6QjtRQUxTLHFCQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxjQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxjQUFRLEdBQVIsUUFBUSxDQUFVOztJQUc1QixDQUFDO0lBRUQsa0NBQU0sR0FBTixVQUFPLElBQW9CO1FBQ3pCLE9BQU8saUJBQU0sTUFBTSxpQ0FDZCxJQUFJLElBQ1AsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUNuRSxDQUFDO0lBQ0wsQ0FBQzs7Z0JBWjBCLGVBQWU7Z0JBQ3RCLHdCQUF3QjtnQkFDeEIsUUFBUTs7SUFMakIsaUJBQWlCO1FBRDdCLFVBQVUsRUFBRTtPQUNBLGlCQUFpQixDQWdCN0I7SUFBRCx3QkFBQztDQUFBLEFBaEJELENBQXVDLHFCQUFxQixHQWdCM0Q7U0FoQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQb3BvdmVyT3B0aW9ucywgcG9wb3ZlckNvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPdmVybGF5QmFzZUNvbnRyb2xsZXIgfSBmcm9tICcuLi91dGlsL292ZXJsYXknO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhckRlbGVnYXRlIH0gZnJvbSAnLi9hbmd1bGFyLWRlbGVnYXRlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb250cm9sbGVyIGV4dGVuZHMgT3ZlcmxheUJhc2VDb250cm9sbGVyPFBvcG92ZXJPcHRpb25zLCBIVE1MSW9uUG9wb3ZlckVsZW1lbnQ+IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFuZ3VsYXJEZWxlZ2F0ZTogQW5ndWxhckRlbGVnYXRlLFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgKSB7XHJcbiAgICBzdXBlcihwb3BvdmVyQ29udHJvbGxlcik7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUob3B0czogUG9wb3Zlck9wdGlvbnMpOiBQcm9taXNlPEhUTUxJb25Qb3BvdmVyRWxlbWVudD4ge1xyXG4gICAgcmV0dXJuIHN1cGVyLmNyZWF0ZSh7XHJcbiAgICAgIC4uLm9wdHMsXHJcbiAgICAgIGRlbGVnYXRlOiB0aGlzLmFuZ3VsYXJEZWxlZ2F0ZS5jcmVhdGUodGhpcy5yZXNvbHZlciwgdGhpcy5pbmplY3RvcilcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=