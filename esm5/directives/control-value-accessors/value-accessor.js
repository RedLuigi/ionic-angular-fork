import * as tslib_1 from "tslib";
import { HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { raf } from '../../util/util';
var ValueAccessor = /** @class */ (function () {
    function ValueAccessor(injector, el) {
        this.injector = injector;
        this.el = el;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    ValueAccessor.prototype.writeValue = function (value) {
        /**
         * TODO for Ionic 6:
         * Change `value == null ? '' : value;`
         * to `value`. This was a fix for IE9, but IE9
         * is no longer supported; however, this change
         * is potentially a breaking change
         */
        this.el.nativeElement.value = this.lastValue = value == null ? '' : value;
        setIonicClasses(this.el);
    };
    ValueAccessor.prototype.handleChangeEvent = function (el, value) {
        if (el === this.el.nativeElement) {
            if (value !== this.lastValue) {
                this.lastValue = value;
                this.onChange(value);
            }
            setIonicClasses(this.el);
        }
    };
    ValueAccessor.prototype._handleBlurEvent = function (el) {
        if (el === this.el.nativeElement) {
            this.onTouched();
            setIonicClasses(this.el);
        }
    };
    ValueAccessor.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ValueAccessor.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this.el.nativeElement.disabled = isDisabled;
    };
    ValueAccessor.prototype.ngOnDestroy = function () {
        if (this.statusChanges) {
            this.statusChanges.unsubscribe();
        }
    };
    ValueAccessor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var ngControl;
        try {
            ngControl = this.injector.get(NgControl);
        }
        catch ( /* No FormControl or ngModel binding */_a) { /* No FormControl or ngModel binding */ }
        if (!ngControl) {
            return;
        }
        // Listen for changes in validity, disabled, or pending states
        if (ngControl.statusChanges) {
            this.statusChanges = ngControl.statusChanges.subscribe(function () { return setIonicClasses(_this.el); });
        }
        /**
         * TODO Remove this in favor of https://github.com/angular/angular/issues/10887
         * whenever it is implemented. Currently, Ionic's form status classes
         * do not react to changes when developers manually call
         * Angular form control methods such as markAsTouched.
         * This results in Ionic's form status classes being out
         * of sync with the ng form status classes.
         * This patches the methods to manually sync
         * the classes until this feature is implemented in Angular.
         */
        var formControl = ngControl.control;
        if (formControl) {
            var methodsToPatch = ['markAsTouched', 'markAllAsTouched', 'markAsUntouched', 'markAsDirty', 'markAsPristine'];
            methodsToPatch.forEach(function (method) {
                if (formControl[method]) {
                    var oldFn_1 = formControl[method].bind(formControl);
                    formControl[method] = function () {
                        var params = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            params[_i] = arguments[_i];
                        }
                        oldFn_1.apply(void 0, tslib_1.__spread(params));
                        setIonicClasses(_this.el);
                    };
                }
            });
        }
    };
    tslib_1.__decorate([
        HostListener('ionBlur', ['$event.target'])
    ], ValueAccessor.prototype, "_handleBlurEvent", null);
    return ValueAccessor;
}());
export { ValueAccessor };
export var setIonicClasses = function (element) {
    raf(function () {
        var input = element.nativeElement;
        var classes = getClasses(input);
        setClasses(input, classes);
        var item = input.closest('ion-item');
        if (item) {
            setClasses(item, classes);
        }
    });
};
var getClasses = function (element) {
    var classList = element.classList;
    var classes = [];
    for (var i = 0; i < classList.length; i++) {
        var item = classList.item(i);
        if (item !== null && startsWith(item, 'ng-')) {
            classes.push("ion-" + item.substr(3));
        }
    }
    return classes;
};
var ɵ0 = getClasses;
var setClasses = function (element, classes) {
    var classList = element.classList;
    [
        'ion-valid',
        'ion-invalid',
        'ion-touched',
        'ion-untouched',
        'ion-dirty',
        'ion-pristine'
    ].forEach(function (c) { return classList.remove(c); });
    classes.forEach(function (c) { return classList.add(c); });
};
var ɵ1 = setClasses;
var startsWith = function (input, search) {
    return input.substr(0, search.length) === search;
};
var ɵ2 = startsWith;
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvY29udHJvbC12YWx1ZS1hY2Nlc3NvcnMvdmFsdWUtYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBNkIsWUFBWSxFQUE2QixNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQXdCLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0QztJQU9FLHVCQUFzQixRQUFrQixFQUFZLEVBQWM7UUFBNUMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLE9BQUUsR0FBRixFQUFFLENBQVk7UUFMMUQsYUFBUSxHQUF5QixjQUFXLENBQUMsQ0FBQztRQUM5QyxjQUFTLEdBQWUsY0FBVyxDQUFDLENBQUM7SUFJd0IsQ0FBQztJQUV0RSxrQ0FBVSxHQUFWLFVBQVcsS0FBVTtRQUNuQjs7Ozs7O1dBTUc7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMxRSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCx5Q0FBaUIsR0FBakIsVUFBa0IsRUFBZSxFQUFFLEtBQVU7UUFDM0MsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDaEMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7WUFDRCxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUdELHdDQUFnQixHQUFoQixVQUFpQixFQUFPO1FBQ3RCLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixFQUF3QjtRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQseUNBQWlCLEdBQWpCLFVBQWtCLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixVQUFtQjtRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzlDLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUFBLGlCQW9DQztRQW5DQyxJQUFJLFNBQVMsQ0FBQztRQUNkLElBQUk7WUFDRixTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQVksU0FBNEIsQ0FBQyxDQUFDO1NBQ3hFO1FBQUMsUUFBUSx1Q0FBdUMsSUFBekMsRUFBRSx1Q0FBdUMsRUFBRTtRQUVuRCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRTNCLDhEQUE4RDtRQUM5RCxJQUFJLFNBQVMsQ0FBQyxhQUFhLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsZUFBZSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1NBQ3hGO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUN0QyxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQU0sY0FBYyxHQUFHLENBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pILGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO2dCQUM1QixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDdkIsSUFBTSxPQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDcEQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHO3dCQUFDLGdCQUFTOzZCQUFULFVBQVMsRUFBVCxxQkFBUyxFQUFULElBQVM7NEJBQVQsMkJBQVM7O3dCQUM5QixPQUFLLGdDQUFJLE1BQU0sR0FBRTt3QkFDakIsZUFBZSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUE3REQ7UUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7eURBTTFDO0lBeURILG9CQUFDO0NBQUEsQUE5RkQsSUE4RkM7U0E5RlksYUFBYTtBQWdHMUIsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLFVBQUMsT0FBbUI7SUFDakQsR0FBRyxDQUFDO1FBQ0YsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGFBQTRCLENBQUM7UUFDbkQsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFM0IsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxJQUFJLElBQUksRUFBRTtZQUNSLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLElBQU0sVUFBVSxHQUFHLFVBQUMsT0FBb0I7SUFDdEMsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNwQyxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekMsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksS0FBSyxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtZQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUcsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7O0FBRUYsSUFBTSxVQUFVLEdBQUcsVUFBQyxPQUFvQixFQUFFLE9BQWlCO0lBQ3pELElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDcEM7UUFDRSxXQUFXO1FBQ1gsYUFBYTtRQUNiLGFBQWE7UUFDYixlQUFlO1FBQ2YsV0FBVztRQUNYLGNBQWM7S0FDZixDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztJQUVwQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQzs7QUFFRixJQUFNLFVBQVUsR0FBRyxVQUFDLEtBQWEsRUFBRSxNQUFjO0lBQy9DLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUNuRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdG9yLCBPbkRlc3Ryb3ksIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyByYWYgfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7LyoqL307XHJcbiAgcHJpdmF0ZSBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7LyoqL307XHJcbiAgcHJvdGVjdGVkIGxhc3RWYWx1ZTogYW55O1xyXG4gIHByaXZhdGUgc3RhdHVzQ2hhbmdlcz86IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvciwgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIC8qKlxyXG4gICAgICogVE9ETyBmb3IgSW9uaWMgNjpcclxuICAgICAqIENoYW5nZSBgdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7YFxyXG4gICAgICogdG8gYHZhbHVlYC4gVGhpcyB3YXMgYSBmaXggZm9yIElFOSwgYnV0IElFOVxyXG4gICAgICogaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZDsgaG93ZXZlciwgdGhpcyBjaGFuZ2VcclxuICAgICAqIGlzIHBvdGVudGlhbGx5IGEgYnJlYWtpbmcgY2hhbmdlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMubGFzdFZhbHVlID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XHJcbiAgICBzZXRJb25pY0NsYXNzZXModGhpcy5lbCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDaGFuZ2VFdmVudChlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmIChlbCA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5sYXN0VmFsdWUpIHtcclxuICAgICAgICB0aGlzLmxhc3RWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldElvbmljQ2xhc3Nlcyh0aGlzLmVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2lvbkJsdXInLCBbJyRldmVudC50YXJnZXQnXSlcclxuICBfaGFuZGxlQmx1ckV2ZW50KGVsOiBhbnkpIHtcclxuICAgIGlmIChlbCA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICAgIHNldElvbmljQ2xhc3Nlcyh0aGlzLmVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdHVzQ2hhbmdlcykge1xyXG4gICAgICB0aGlzLnN0YXR1c0NoYW5nZXMudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGxldCBuZ0NvbnRyb2w7XHJcbiAgICB0cnkge1xyXG4gICAgICBuZ0NvbnRyb2wgPSB0aGlzLmluamVjdG9yLmdldDxOZ0NvbnRyb2w+KE5nQ29udHJvbCBhcyBUeXBlPE5nQ29udHJvbD4pO1xyXG4gICAgfSBjYXRjaCB7IC8qIE5vIEZvcm1Db250cm9sIG9yIG5nTW9kZWwgYmluZGluZyAqLyB9XHJcblxyXG4gICAgaWYgKCFuZ0NvbnRyb2wpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgLy8gTGlzdGVuIGZvciBjaGFuZ2VzIGluIHZhbGlkaXR5LCBkaXNhYmxlZCwgb3IgcGVuZGluZyBzdGF0ZXNcclxuICAgIGlmIChuZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlcykge1xyXG4gICAgICB0aGlzLnN0YXR1c0NoYW5nZXMgPSBuZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gc2V0SW9uaWNDbGFzc2VzKHRoaXMuZWwpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRPRE8gUmVtb3ZlIHRoaXMgaW4gZmF2b3Igb2YgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTA4ODdcclxuICAgICAqIHdoZW5ldmVyIGl0IGlzIGltcGxlbWVudGVkLiBDdXJyZW50bHksIElvbmljJ3MgZm9ybSBzdGF0dXMgY2xhc3Nlc1xyXG4gICAgICogZG8gbm90IHJlYWN0IHRvIGNoYW5nZXMgd2hlbiBkZXZlbG9wZXJzIG1hbnVhbGx5IGNhbGxcclxuICAgICAqIEFuZ3VsYXIgZm9ybSBjb250cm9sIG1ldGhvZHMgc3VjaCBhcyBtYXJrQXNUb3VjaGVkLlxyXG4gICAgICogVGhpcyByZXN1bHRzIGluIElvbmljJ3MgZm9ybSBzdGF0dXMgY2xhc3NlcyBiZWluZyBvdXRcclxuICAgICAqIG9mIHN5bmMgd2l0aCB0aGUgbmcgZm9ybSBzdGF0dXMgY2xhc3Nlcy5cclxuICAgICAqIFRoaXMgcGF0Y2hlcyB0aGUgbWV0aG9kcyB0byBtYW51YWxseSBzeW5jXHJcbiAgICAgKiB0aGUgY2xhc3NlcyB1bnRpbCB0aGlzIGZlYXR1cmUgaXMgaW1wbGVtZW50ZWQgaW4gQW5ndWxhci5cclxuICAgICAqL1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSBuZ0NvbnRyb2wuY29udHJvbDtcclxuICAgIGlmIChmb3JtQ29udHJvbCkge1xyXG4gICAgICBjb25zdCBtZXRob2RzVG9QYXRjaCA9IFsnbWFya0FzVG91Y2hlZCcsICdtYXJrQWxsQXNUb3VjaGVkJywgJ21hcmtBc1VudG91Y2hlZCcsICdtYXJrQXNEaXJ0eScsICdtYXJrQXNQcmlzdGluZSddO1xyXG4gICAgICBtZXRob2RzVG9QYXRjaC5mb3JFYWNoKG1ldGhvZCA9PiB7XHJcbiAgICAgICBpZiAoZm9ybUNvbnRyb2xbbWV0aG9kXSkge1xyXG4gICAgICAgICBjb25zdCBvbGRGbiA9IGZvcm1Db250cm9sW21ldGhvZF0uYmluZChmb3JtQ29udHJvbCk7XHJcbiAgICAgICAgIGZvcm1Db250cm9sW21ldGhvZF0gPSAoLi4ucGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgb2xkRm4oLi4ucGFyYW1zKTtcclxuICAgICAgICAgICBzZXRJb25pY0NsYXNzZXModGhpcy5lbCk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0SW9uaWNDbGFzc2VzID0gKGVsZW1lbnQ6IEVsZW1lbnRSZWYpID0+IHtcclxuICByYWYoKCkgPT4ge1xyXG4gICAgY29uc3QgaW5wdXQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjbGFzc2VzID0gZ2V0Q2xhc3NlcyhpbnB1dCk7XHJcbiAgICBzZXRDbGFzc2VzKGlucHV0LCBjbGFzc2VzKTtcclxuXHJcbiAgICBjb25zdCBpdGVtID0gaW5wdXQuY2xvc2VzdCgnaW9uLWl0ZW0nKTtcclxuICAgIGlmIChpdGVtKSB7XHJcbiAgICAgIHNldENsYXNzZXMoaXRlbSwgY2xhc3Nlcyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRDbGFzc2VzID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgY29uc3QgY2xhc3NMaXN0ID0gZWxlbWVudC5jbGFzc0xpc3Q7XHJcbiAgY29uc3QgY2xhc3NlcyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBpdGVtID0gY2xhc3NMaXN0Lml0ZW0oaSk7XHJcbiAgICBpZiAoaXRlbSAhPT0gbnVsbCAmJiBzdGFydHNXaXRoKGl0ZW0sICduZy0nKSkge1xyXG4gICAgICBjbGFzc2VzLnB1c2goYGlvbi0ke2l0ZW0uc3Vic3RyKDMpfWApO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY2xhc3NlcztcclxufTtcclxuXHJcbmNvbnN0IHNldENsYXNzZXMgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNsYXNzZXM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgY29uc3QgY2xhc3NMaXN0ID0gZWxlbWVudC5jbGFzc0xpc3Q7XHJcbiAgW1xyXG4gICAgJ2lvbi12YWxpZCcsXHJcbiAgICAnaW9uLWludmFsaWQnLFxyXG4gICAgJ2lvbi10b3VjaGVkJyxcclxuICAgICdpb24tdW50b3VjaGVkJyxcclxuICAgICdpb24tZGlydHknLFxyXG4gICAgJ2lvbi1wcmlzdGluZSdcclxuICBdLmZvckVhY2goYyA9PiBjbGFzc0xpc3QucmVtb3ZlKGMpKTtcclxuXHJcbiAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gY2xhc3NMaXN0LmFkZChjKSk7XHJcbn07XHJcblxyXG5jb25zdCBzdGFydHNXaXRoID0gKGlucHV0OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIGlucHV0LnN1YnN0cigwLCBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoO1xyXG59O1xyXG4iXX0=