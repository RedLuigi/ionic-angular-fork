import * as tslib_1 from "tslib";
import { HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { raf } from '../../util/util';
export class ValueAccessor {
    constructor(injector, el) {
        this.injector = injector;
        this.el = el;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        /**
         * TODO for Ionic 6:
         * Change `value == null ? '' : value;`
         * to `value`. This was a fix for IE9, but IE9
         * is no longer supported; however, this change
         * is potentially a breaking change
         */
        this.el.nativeElement.value = this.lastValue = value == null ? '' : value;
        setIonicClasses(this.el);
    }
    handleChangeEvent(el, value) {
        if (el === this.el.nativeElement) {
            if (value !== this.lastValue) {
                this.lastValue = value;
                this.onChange(value);
            }
            setIonicClasses(this.el);
        }
    }
    _handleBlurEvent(el) {
        if (el === this.el.nativeElement) {
            this.onTouched();
            setIonicClasses(this.el);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.el.nativeElement.disabled = isDisabled;
    }
    ngOnDestroy() {
        if (this.statusChanges) {
            this.statusChanges.unsubscribe();
        }
    }
    ngAfterViewInit() {
        let ngControl;
        try {
            ngControl = this.injector.get(NgControl);
        }
        catch ( /* No FormControl or ngModel binding */_a) { /* No FormControl or ngModel binding */ }
        if (!ngControl) {
            return;
        }
        // Listen for changes in validity, disabled, or pending states
        if (ngControl.statusChanges) {
            this.statusChanges = ngControl.statusChanges.subscribe(() => setIonicClasses(this.el));
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
        const formControl = ngControl.control;
        if (formControl) {
            const methodsToPatch = ['markAsTouched', 'markAllAsTouched', 'markAsUntouched', 'markAsDirty', 'markAsPristine'];
            methodsToPatch.forEach(method => {
                if (formControl[method]) {
                    const oldFn = formControl[method].bind(formControl);
                    formControl[method] = (...params) => {
                        oldFn(...params);
                        setIonicClasses(this.el);
                    };
                }
            });
        }
    }
}
tslib_1.__decorate([
    HostListener('ionBlur', ['$event.target'])
], ValueAccessor.prototype, "_handleBlurEvent", null);
export const setIonicClasses = (element) => {
    raf(() => {
        const input = element.nativeElement;
        const classes = getClasses(input);
        setClasses(input, classes);
        const item = input.closest('ion-item');
        if (item) {
            setClasses(item, classes);
        }
    });
};
const getClasses = (element) => {
    const classList = element.classList;
    const classes = [];
    for (let i = 0; i < classList.length; i++) {
        const item = classList.item(i);
        if (item !== null && startsWith(item, 'ng-')) {
            classes.push(`ion-${item.substr(3)}`);
        }
    }
    return classes;
};
const ɵ0 = getClasses;
const setClasses = (element, classes) => {
    const classList = element.classList;
    [
        'ion-valid',
        'ion-invalid',
        'ion-touched',
        'ion-untouched',
        'ion-dirty',
        'ion-pristine'
    ].forEach(c => classList.remove(c));
    classes.forEach(c => classList.add(c));
};
const ɵ1 = setClasses;
const startsWith = (input, search) => {
    return input.substr(0, search.length) === search;
};
const ɵ2 = startsWith;
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvY29udHJvbC12YWx1ZS1hY2Nlc3NvcnMvdmFsdWUtYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBNkIsWUFBWSxFQUE2QixNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQXdCLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0QyxNQUFNLE9BQU8sYUFBYTtJQU94QixZQUFzQixRQUFrQixFQUFZLEVBQWM7UUFBNUMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLE9BQUUsR0FBRixFQUFFLENBQVk7UUFMMUQsYUFBUSxHQUF5QixHQUFHLEVBQUUsR0FBTSxDQUFDLENBQUM7UUFDOUMsY0FBUyxHQUFlLEdBQUcsRUFBRSxHQUFNLENBQUMsQ0FBQztJQUl3QixDQUFDO0lBRXRFLFVBQVUsQ0FBQyxLQUFVO1FBQ25COzs7Ozs7V0FNRztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQWUsRUFBRSxLQUFVO1FBQzNDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ2hDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFHRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQXdCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFjO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzlDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksU0FBUyxDQUFDO1FBQ2QsSUFBSTtZQUNGLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBWSxTQUE0QixDQUFDLENBQUM7U0FDeEU7UUFBQyxRQUFRLHVDQUF1QyxJQUF6QyxFQUFFLHVDQUF1QyxFQUFFO1FBRW5ELElBQUksQ0FBQyxTQUFTLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFM0IsOERBQThEO1FBQzlELElBQUksU0FBUyxDQUFDLGFBQWEsRUFBRTtZQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN4RjtRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDdEMsSUFBSSxXQUFXLEVBQUU7WUFDZixNQUFNLGNBQWMsR0FBRyxDQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUNqSCxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDdkIsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDcEQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQUUsRUFBRTt3QkFDbEMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7d0JBQ2pCLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzFCLENBQUMsQ0FBQztpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0NBQ0Y7QUE5REM7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7cURBTTFDO0FBMkRILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQW1CLEVBQUUsRUFBRTtJQUNyRCxHQUFHLENBQUMsR0FBRyxFQUFFO1FBQ1AsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGFBQTRCLENBQUM7UUFDbkQsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFM0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxJQUFJLElBQUksRUFBRTtZQUNSLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBb0IsRUFBRSxFQUFFO0lBQzFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDcEMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7O0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFvQixFQUFFLE9BQWlCLEVBQUUsRUFBRTtJQUM3RCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ3BDO1FBQ0UsV0FBVztRQUNYLGFBQWE7UUFDYixhQUFhO1FBQ2IsZUFBZTtRQUNmLFdBQVc7UUFDWCxjQUFjO0tBQ2YsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7O0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFXLEVBQUU7SUFDNUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxDQUFDO0FBQ25ELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5qZWN0b3IsIE9uRGVzdHJveSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IHJhZiB9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHsvKiovfTtcclxuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHsvKiovfTtcclxuICBwcm90ZWN0ZWQgbGFzdFZhbHVlOiBhbnk7XHJcbiAgcHJpdmF0ZSBzdGF0dXNDaGFuZ2VzPzogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUT0RPIGZvciBJb25pYyA2OlxyXG4gICAgICogQ2hhbmdlIGB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtgXHJcbiAgICAgKiB0byBgdmFsdWVgLiBUaGlzIHdhcyBhIGZpeCBmb3IgSUU5LCBidXQgSUU5XHJcbiAgICAgKiBpcyBubyBsb25nZXIgc3VwcG9ydGVkOyBob3dldmVyLCB0aGlzIGNoYW5nZVxyXG4gICAgICogaXMgcG90ZW50aWFsbHkgYSBicmVha2luZyBjaGFuZ2VcclxuICAgICAqL1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5sYXN0VmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcclxuICAgIHNldElvbmljQ2xhc3Nlcyh0aGlzLmVsKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUNoYW5nZUV2ZW50KGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGVsID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmxhc3RWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0SW9uaWNDbGFzc2VzKHRoaXMuZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignaW9uQmx1cicsIFsnJGV2ZW50LnRhcmdldCddKVxyXG4gIF9oYW5kbGVCbHVyRXZlbnQoZWw6IGFueSkge1xyXG4gICAgaWYgKGVsID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgICAgc2V0SW9uaWNDbGFzc2VzKHRoaXMuZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0dXNDaGFuZ2VzKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgbGV0IG5nQ29udHJvbDtcclxuICAgIHRyeSB7XHJcbiAgICAgIG5nQ29udHJvbCA9IHRoaXMuaW5qZWN0b3IuZ2V0PE5nQ29udHJvbD4oTmdDb250cm9sIGFzIFR5cGU8TmdDb250cm9sPik7XHJcbiAgICB9IGNhdGNoIHsgLyogTm8gRm9ybUNvbnRyb2wgb3IgbmdNb2RlbCBiaW5kaW5nICovIH1cclxuXHJcbiAgICBpZiAoIW5nQ29udHJvbCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAvLyBMaXN0ZW4gZm9yIGNoYW5nZXMgaW4gdmFsaWRpdHksIGRpc2FibGVkLCBvciBwZW5kaW5nIHN0YXRlc1xyXG4gICAgaWYgKG5nQ29udHJvbC5zdGF0dXNDaGFuZ2VzKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzQ2hhbmdlcyA9IG5nQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiBzZXRJb25pY0NsYXNzZXModGhpcy5lbCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVE9ETyBSZW1vdmUgdGhpcyBpbiBmYXZvciBvZiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMDg4N1xyXG4gICAgICogd2hlbmV2ZXIgaXQgaXMgaW1wbGVtZW50ZWQuIEN1cnJlbnRseSwgSW9uaWMncyBmb3JtIHN0YXR1cyBjbGFzc2VzXHJcbiAgICAgKiBkbyBub3QgcmVhY3QgdG8gY2hhbmdlcyB3aGVuIGRldmVsb3BlcnMgbWFudWFsbHkgY2FsbFxyXG4gICAgICogQW5ndWxhciBmb3JtIGNvbnRyb2wgbWV0aG9kcyBzdWNoIGFzIG1hcmtBc1RvdWNoZWQuXHJcbiAgICAgKiBUaGlzIHJlc3VsdHMgaW4gSW9uaWMncyBmb3JtIHN0YXR1cyBjbGFzc2VzIGJlaW5nIG91dFxyXG4gICAgICogb2Ygc3luYyB3aXRoIHRoZSBuZyBmb3JtIHN0YXR1cyBjbGFzc2VzLlxyXG4gICAgICogVGhpcyBwYXRjaGVzIHRoZSBtZXRob2RzIHRvIG1hbnVhbGx5IHN5bmNcclxuICAgICAqIHRoZSBjbGFzc2VzIHVudGlsIHRoaXMgZmVhdHVyZSBpcyBpbXBsZW1lbnRlZCBpbiBBbmd1bGFyLlxyXG4gICAgICovXHJcbiAgICBjb25zdCBmb3JtQ29udHJvbCA9IG5nQ29udHJvbC5jb250cm9sO1xyXG4gICAgaWYgKGZvcm1Db250cm9sKSB7XHJcbiAgICAgIGNvbnN0IG1ldGhvZHNUb1BhdGNoID0gWydtYXJrQXNUb3VjaGVkJywgJ21hcmtBbGxBc1RvdWNoZWQnLCAnbWFya0FzVW50b3VjaGVkJywgJ21hcmtBc0RpcnR5JywgJ21hcmtBc1ByaXN0aW5lJ107XHJcbiAgICAgIG1ldGhvZHNUb1BhdGNoLmZvckVhY2gobWV0aG9kID0+IHtcclxuICAgICAgIGlmIChmb3JtQ29udHJvbFttZXRob2RdKSB7XHJcbiAgICAgICAgIGNvbnN0IG9sZEZuID0gZm9ybUNvbnRyb2xbbWV0aG9kXS5iaW5kKGZvcm1Db250cm9sKTtcclxuICAgICAgICAgZm9ybUNvbnRyb2xbbWV0aG9kXSA9ICguLi5wYXJhbXMpID0+IHtcclxuICAgICAgICAgICBvbGRGbiguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgIHNldElvbmljQ2xhc3Nlcyh0aGlzLmVsKTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZXRJb25pY0NsYXNzZXMgPSAoZWxlbWVudDogRWxlbWVudFJlZikgPT4ge1xyXG4gIHJhZigoKSA9PiB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IGNsYXNzZXMgPSBnZXRDbGFzc2VzKGlucHV0KTtcclxuICAgIHNldENsYXNzZXMoaW5wdXQsIGNsYXNzZXMpO1xyXG5cclxuICAgIGNvbnN0IGl0ZW0gPSBpbnB1dC5jbG9zZXN0KCdpb24taXRlbScpO1xyXG4gICAgaWYgKGl0ZW0pIHtcclxuICAgICAgc2V0Q2xhc3NlcyhpdGVtLCBjbGFzc2VzKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGdldENsYXNzZXMgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICBjb25zdCBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcclxuICBjb25zdCBjbGFzc2VzID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBjbGFzc0xpc3QuaXRlbShpKTtcclxuICAgIGlmIChpdGVtICE9PSBudWxsICYmIHN0YXJ0c1dpdGgoaXRlbSwgJ25nLScpKSB7XHJcbiAgICAgIGNsYXNzZXMucHVzaChgaW9uLSR7aXRlbS5zdWJzdHIoMyl9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjbGFzc2VzO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0Q2xhc3NlcyA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgY2xhc3Nlczogc3RyaW5nW10pID0+IHtcclxuICBjb25zdCBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcclxuICBbXHJcbiAgICAnaW9uLXZhbGlkJyxcclxuICAgICdpb24taW52YWxpZCcsXHJcbiAgICAnaW9uLXRvdWNoZWQnLFxyXG4gICAgJ2lvbi11bnRvdWNoZWQnLFxyXG4gICAgJ2lvbi1kaXJ0eScsXHJcbiAgICAnaW9uLXByaXN0aW5lJ1xyXG4gIF0uZm9yRWFjaChjID0+IGNsYXNzTGlzdC5yZW1vdmUoYykpO1xyXG5cclxuICBjbGFzc2VzLmZvckVhY2goYyA9PiBjbGFzc0xpc3QuYWRkKGMpKTtcclxufTtcclxuXHJcbmNvbnN0IHN0YXJ0c1dpdGggPSAoaW5wdXQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gaW5wdXQuc3Vic3RyKDAsIHNlYXJjaC5sZW5ndGgpID09PSBzZWFyY2g7XHJcbn07XHJcbiJdfQ==