import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor, setIonicClasses } from './value-accessor';
var BooleanValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(BooleanValueAccessor, _super);
    function BooleanValueAccessor(injector, el) {
        return _super.call(this, injector, el) || this;
    }
    BooleanValueAccessor_1 = BooleanValueAccessor;
    BooleanValueAccessor.prototype.writeValue = function (value) {
        this.el.nativeElement.checked = this.lastValue = value == null ? false : value;
        setIonicClasses(this.el);
    };
    BooleanValueAccessor.prototype._handleIonChange = function (el) {
        this.handleChangeEvent(el, el.checked);
    };
    var BooleanValueAccessor_1;
    BooleanValueAccessor.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        HostListener('ionChange', ['$event.target'])
    ], BooleanValueAccessor.prototype, "_handleIonChange", null);
    BooleanValueAccessor = BooleanValueAccessor_1 = tslib_1.__decorate([
        Directive({
            /* tslint:disable-next-line:directive-selector */
            selector: 'ion-checkbox,ion-toggle',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: BooleanValueAccessor_1,
                    multi: true
                }
            ]
        })
    ], BooleanValueAccessor);
    return BooleanValueAccessor;
}(ValueAccessor));
export { BooleanValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi12YWx1ZS1hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9jb250cm9sLXZhbHVlLWFjY2Vzc29ycy9ib29sZWFuLXZhbHVlLWFjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFhbEU7SUFBMEMsZ0RBQWE7SUFFckQsOEJBQVksUUFBa0IsRUFBRSxFQUFjO2VBQzVDLGtCQUFNLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDckIsQ0FBQzs2QkFKVSxvQkFBb0I7SUFNL0IseUNBQVUsR0FBVixVQUFXLEtBQVU7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDL0UsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBR0QsK0NBQWdCLEdBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7O2dCQVpxQixRQUFRO2dCQUFNLFVBQVU7O0lBVTlDO1FBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dFQUc1QztJQWRVLG9CQUFvQjtRQVhoQyxTQUFTLENBQUM7WUFDVCxpREFBaUQ7WUFDakQsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLHNCQUFvQjtvQkFDakMsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7T0FDVyxvQkFBb0IsQ0FlaEM7SUFBRCwyQkFBQztDQUFBLEFBZkQsQ0FBMEMsYUFBYSxHQWV0RDtTQWZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFZhbHVlQWNjZXNzb3IsIHNldElvbmljQ2xhc3NlcyB9IGZyb20gJy4vdmFsdWUtYWNjZXNzb3InO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvciAqL1xyXG4gIHNlbGVjdG9yOiAnaW9uLWNoZWNrYm94LGlvbi10b2dnbGUnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IEJvb2xlYW5WYWx1ZUFjY2Vzc29yLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb2xlYW5WYWx1ZUFjY2Vzc29yIGV4dGVuZHMgVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgIHN1cGVyKGluamVjdG9yLCBlbCk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdGhpcy5sYXN0VmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gZmFsc2UgOiB2YWx1ZTtcclxuICAgIHNldElvbmljQ2xhc3Nlcyh0aGlzLmVsKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2lvbkNoYW5nZScsIFsnJGV2ZW50LnRhcmdldCddKVxyXG4gIF9oYW5kbGVJb25DaGFuZ2UoZWw6IGFueSkge1xyXG4gICAgdGhpcy5oYW5kbGVDaGFuZ2VFdmVudChlbCwgZWwuY2hlY2tlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==