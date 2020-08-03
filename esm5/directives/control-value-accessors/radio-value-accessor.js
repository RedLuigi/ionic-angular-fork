import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from './value-accessor';
var RadioValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(RadioValueAccessor, _super);
    function RadioValueAccessor(injector, el) {
        return _super.call(this, injector, el) || this;
    }
    RadioValueAccessor_1 = RadioValueAccessor;
    RadioValueAccessor.prototype._handleIonSelect = function (el) {
        this.handleChangeEvent(el, el.checked);
    };
    var RadioValueAccessor_1;
    RadioValueAccessor.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        HostListener('ionSelect', ['$event.target'])
    ], RadioValueAccessor.prototype, "_handleIonSelect", null);
    RadioValueAccessor = RadioValueAccessor_1 = tslib_1.__decorate([
        Directive({
            /* tslint:disable-next-line:directive-selector */
            selector: 'ion-radio',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: RadioValueAccessor_1,
                    multi: true
                }
            ]
        })
    ], RadioValueAccessor);
    return RadioValueAccessor;
}(ValueAccessor));
export { RadioValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tdmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvY29udHJvbC12YWx1ZS1hY2Nlc3NvcnMvcmFkaW8tdmFsdWUtYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBYWpEO0lBQXdDLDhDQUFhO0lBRW5ELDRCQUFZLFFBQWtCLEVBQUUsRUFBYztlQUM1QyxrQkFBTSxRQUFRLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7MkJBSlUsa0JBQWtCO0lBTzdCLDZDQUFnQixHQUFoQixVQUFpQixFQUFPO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7OztnQkFQcUIsUUFBUTtnQkFBTSxVQUFVOztJQUs5QztRQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs4REFHNUM7SUFUVSxrQkFBa0I7UUFYOUIsU0FBUyxDQUFDO1lBQ1QsaURBQWlEO1lBQ2pELFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsb0JBQWtCO29CQUMvQixLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztPQUNXLGtCQUFrQixDQVU5QjtJQUFELHlCQUFDO0NBQUEsQUFWRCxDQUF3QyxhQUFhLEdBVXBEO1NBVlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgVmFsdWVBY2Nlc3NvciB9IGZyb20gJy4vdmFsdWUtYWNjZXNzb3InO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvciAqL1xyXG4gIHNlbGVjdG9yOiAnaW9uLXJhZGlvJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBSYWRpb1ZhbHVlQWNjZXNzb3IsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFkaW9WYWx1ZUFjY2Vzc29yIGV4dGVuZHMgVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgIHN1cGVyKGluamVjdG9yLCBlbCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdpb25TZWxlY3QnLCBbJyRldmVudC50YXJnZXQnXSlcclxuICBfaGFuZGxlSW9uU2VsZWN0KGVsOiBhbnkpIHtcclxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlRXZlbnQoZWwsIGVsLmNoZWNrZWQpO1xyXG4gIH1cclxufVxyXG4iXX0=