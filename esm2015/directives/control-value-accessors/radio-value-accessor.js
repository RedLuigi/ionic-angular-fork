import * as tslib_1 from "tslib";
var RadioValueAccessor_1;
import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from './value-accessor';
let RadioValueAccessor = RadioValueAccessor_1 = class RadioValueAccessor extends ValueAccessor {
    constructor(injector, el) {
        super(injector, el);
    }
    _handleIonSelect(el) {
        this.handleChangeEvent(el, el.checked);
    }
};
RadioValueAccessor.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef }
];
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
export { RadioValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tdmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvY29udHJvbC12YWx1ZS1hY2Nlc3NvcnMvcmFkaW8tdmFsdWUtYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWFqRCxJQUFhLGtCQUFrQiwwQkFBL0IsTUFBYSxrQkFBbUIsU0FBUSxhQUFhO0lBRW5ELFlBQVksUUFBa0IsRUFBRSxFQUFjO1FBQzVDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUdELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUNGLENBQUE7O1lBUnVCLFFBQVE7WUFBTSxVQUFVOztBQUs5QztJQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQzswREFHNUM7QUFUVSxrQkFBa0I7SUFYOUIsU0FBUyxDQUFDO1FBQ1QsaURBQWlEO1FBQ2pELFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFNBQVMsRUFBRTtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxvQkFBa0I7Z0JBQy9CLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjtLQUNGLENBQUM7R0FDVyxrQkFBa0IsQ0FVOUI7U0FWWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnLi92YWx1ZS1hY2Nlc3Nvcic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yICovXHJcbiAgc2VsZWN0b3I6ICdpb24tcmFkaW8nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IFJhZGlvVmFsdWVBY2Nlc3NvcixcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1cclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYWRpb1ZhbHVlQWNjZXNzb3IgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCBlbDogRWxlbWVudFJlZikge1xyXG4gICAgc3VwZXIoaW5qZWN0b3IsIGVsKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2lvblNlbGVjdCcsIFsnJGV2ZW50LnRhcmdldCddKVxyXG4gIF9oYW5kbGVJb25TZWxlY3QoZWw6IGFueSkge1xyXG4gICAgdGhpcy5oYW5kbGVDaGFuZ2VFdmVudChlbCwgZWwuY2hlY2tlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==