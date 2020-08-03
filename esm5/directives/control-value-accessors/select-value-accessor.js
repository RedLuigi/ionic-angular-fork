import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from './value-accessor';
var SelectValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(SelectValueAccessor, _super);
    function SelectValueAccessor(injector, el) {
        return _super.call(this, injector, el) || this;
    }
    SelectValueAccessor_1 = SelectValueAccessor;
    SelectValueAccessor.prototype._handleChangeEvent = function (el) {
        this.handleChangeEvent(el, el.value);
    };
    var SelectValueAccessor_1;
    SelectValueAccessor.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        HostListener('ionChange', ['$event.target'])
    ], SelectValueAccessor.prototype, "_handleChangeEvent", null);
    SelectValueAccessor = SelectValueAccessor_1 = tslib_1.__decorate([
        Directive({
            /* tslint:disable-next-line:directive-selector */
            selector: 'ion-range, ion-select, ion-radio-group, ion-segment, ion-datetime',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: SelectValueAccessor_1,
                    multi: true
                }
            ]
        })
    ], SelectValueAccessor);
    return SelectValueAccessor;
}(ValueAccessor));
export { SelectValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXZhbHVlLWFjY2Vzc29yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzL3NlbGVjdC12YWx1ZS1hY2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFhakQ7SUFBeUMsK0NBQWE7SUFFcEQsNkJBQVksUUFBa0IsRUFBRSxFQUFjO2VBQzVDLGtCQUFNLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDckIsQ0FBQzs0QkFKVSxtQkFBbUI7SUFPOUIsZ0RBQWtCLEdBQWxCLFVBQW1CLEVBQU87UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O2dCQVBxQixRQUFRO2dCQUFNLFVBQVU7O0lBSzlDO1FBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lFQUc1QztJQVRVLG1CQUFtQjtRQVgvQixTQUFTLENBQUM7WUFDVCxpREFBaUQ7WUFDakQsUUFBUSxFQUFFLG1FQUFtRTtZQUM3RSxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLHFCQUFtQjtvQkFDaEMsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7T0FDVyxtQkFBbUIsQ0FVL0I7SUFBRCwwQkFBQztDQUFBLEFBVkQsQ0FBeUMsYUFBYSxHQVVyRDtTQVZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFZhbHVlQWNjZXNzb3IgfSBmcm9tICcuL3ZhbHVlLWFjY2Vzc29yJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3IgKi9cclxuICBzZWxlY3RvcjogJ2lvbi1yYW5nZSwgaW9uLXNlbGVjdCwgaW9uLXJhZGlvLWdyb3VwLCBpb24tc2VnbWVudCwgaW9uLWRhdGV0aW1lJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBTZWxlY3RWYWx1ZUFjY2Vzc29yLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbGVjdFZhbHVlQWNjZXNzb3IgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCBlbDogRWxlbWVudFJlZikge1xyXG4gICAgc3VwZXIoaW5qZWN0b3IsIGVsKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2lvbkNoYW5nZScsIFsnJGV2ZW50LnRhcmdldCddKVxyXG4gIF9oYW5kbGVDaGFuZ2VFdmVudChlbDogYW55KSB7XHJcbiAgICB0aGlzLmhhbmRsZUNoYW5nZUV2ZW50KGVsLCBlbC52YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==