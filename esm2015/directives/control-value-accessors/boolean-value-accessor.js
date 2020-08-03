import * as tslib_1 from "tslib";
var BooleanValueAccessor_1;
import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor, setIonicClasses } from './value-accessor';
let BooleanValueAccessor = BooleanValueAccessor_1 = class BooleanValueAccessor extends ValueAccessor {
    constructor(injector, el) {
        super(injector, el);
    }
    writeValue(value) {
        this.el.nativeElement.checked = this.lastValue = value == null ? false : value;
        setIonicClasses(this.el);
    }
    _handleIonChange(el) {
        this.handleChangeEvent(el, el.checked);
    }
};
BooleanValueAccessor.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef }
];
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
export { BooleanValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi12YWx1ZS1hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9jb250cm9sLXZhbHVlLWFjY2Vzc29ycy9ib29sZWFuLXZhbHVlLWFjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBYWxFLElBQWEsb0JBQW9CLDRCQUFqQyxNQUFhLG9CQUFxQixTQUFRLGFBQWE7SUFFckQsWUFBWSxRQUFrQixFQUFFLEVBQWM7UUFDNUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDL0UsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBR0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0YsQ0FBQTs7WUFidUIsUUFBUTtZQUFNLFVBQVU7O0FBVTlDO0lBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDOzREQUc1QztBQWRVLG9CQUFvQjtJQVhoQyxTQUFTLENBQUM7UUFDVCxpREFBaUQ7UUFDakQsUUFBUSxFQUFFLHlCQUF5QjtRQUNuQyxTQUFTLEVBQUU7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsc0JBQW9CO2dCQUNqQyxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0Y7S0FDRixDQUFDO0dBQ1csb0JBQW9CLENBZWhDO1NBZlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgVmFsdWVBY2Nlc3Nvciwgc2V0SW9uaWNDbGFzc2VzIH0gZnJvbSAnLi92YWx1ZS1hY2Nlc3Nvcic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yICovXHJcbiAgc2VsZWN0b3I6ICdpb24tY2hlY2tib3gsaW9uLXRvZ2dsZScsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogQm9vbGVhblZhbHVlQWNjZXNzb3IsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vbGVhblZhbHVlQWNjZXNzb3IgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCBlbDogRWxlbWVudFJlZikge1xyXG4gICAgc3VwZXIoaW5qZWN0b3IsIGVsKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0aGlzLmxhc3RWYWx1ZSA9IHZhbHVlID09IG51bGwgPyBmYWxzZSA6IHZhbHVlO1xyXG4gICAgc2V0SW9uaWNDbGFzc2VzKHRoaXMuZWwpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignaW9uQ2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXHJcbiAgX2hhbmRsZUlvbkNoYW5nZShlbDogYW55KSB7XHJcbiAgICB0aGlzLmhhbmRsZUNoYW5nZUV2ZW50KGVsLCBlbC5jaGVja2VkKTtcclxuICB9XHJcbn1cclxuIl19