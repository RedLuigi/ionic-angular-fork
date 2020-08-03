import * as tslib_1 from "tslib";
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * @hidden
 */
var VirtualItem = /** @class */ (function () {
    function VirtualItem(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    VirtualItem.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    VirtualItem = tslib_1.__decorate([
        Directive({ selector: '[virtualItem]' })
    ], VirtualItem);
    return VirtualItem;
}());
export { VirtualItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1pdGVtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJekU7O0dBRUc7QUFFSDtJQUNFLHFCQUFtQixXQUF3QyxFQUFTLGFBQStCO1FBQWhGLGdCQUFXLEdBQVgsV0FBVyxDQUE2QjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtJQUFHLENBQUM7O2dCQUF2RSxXQUFXO2dCQUF3QyxnQkFBZ0I7O0lBRHhGLFdBQVc7UUFEdkIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO09BQzVCLFdBQVcsQ0FFdkI7SUFBRCxrQkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBWaXJ0dWFsQ29udGV4dCB9IGZyb20gJy4vdmlydHVhbC11dGlscyc7XHJcblxyXG4vKipcclxuICogQGhpZGRlblxyXG4gKi9cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpcnR1YWxJdGVtXScgfSlcclxuZXhwb3J0IGNsYXNzIFZpcnR1YWxJdGVtIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPFZpcnR1YWxDb250ZXh0PiwgcHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHt9XHJcbn1cclxuIl19