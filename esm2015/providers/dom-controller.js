import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let DomController = class DomController {
    /**
     * Schedules a task to run during the READ phase of the next frame.
     * This task should only read the DOM, but never modify it.
     */
    read(cb) {
        getQueue().read(cb);
    }
    /**
     * Schedules a task to run during the WRITE phase of the next frame.
     * This task should write the DOM, but never READ it.
     */
    write(cb) {
        getQueue().write(cb);
    }
};
DomController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DomController_Factory() { return new DomController(); }, token: DomController, providedIn: "root" });
DomController = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], DomController);
export { DomController };
const getQueue = () => {
    const win = typeof window !== 'undefined' ? window : null;
    if (win != null) {
        const Ionic = win.Ionic;
        if (Ionic && Ionic.queue) {
            return Ionic.queue;
        }
        return {
            read: (cb) => win.requestAnimationFrame(cb),
            write: (cb) => win.requestAnimationFrame(cb)
        };
    }
    return {
        read: (cb) => cb(),
        write: (cb) => cb()
    };
};
const ɵ0 = getQueue;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9kb20tY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUV4Qjs7O09BR0c7SUFDSCxJQUFJLENBQUMsRUFBZTtRQUNsQixRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxFQUFlO1FBQ25CLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ0YsQ0FBQTs7QUFqQlksYUFBYTtJQUh6QixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csYUFBYSxDQWlCekI7U0FqQlksYUFBYTtBQW1CMUIsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO0lBQ3BCLE1BQU0sR0FBRyxHQUFHLE9BQVEsTUFBYyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFXLENBQUM7SUFFMUUsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ2YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNwQjtRQUVELE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUM7WUFDaEQsS0FBSyxFQUFFLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDO1NBQ2xELENBQUM7S0FDSDtJQUVELE9BQU87UUFDTCxJQUFJLEVBQUUsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN2QixLQUFLLEVBQUUsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtLQUN6QixDQUFDO0FBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIERvbUNvbnRyb2xsZXIge1xyXG5cclxuICAvKipcclxuICAgKiBTY2hlZHVsZXMgYSB0YXNrIHRvIHJ1biBkdXJpbmcgdGhlIFJFQUQgcGhhc2Ugb2YgdGhlIG5leHQgZnJhbWUuXHJcbiAgICogVGhpcyB0YXNrIHNob3VsZCBvbmx5IHJlYWQgdGhlIERPTSwgYnV0IG5ldmVyIG1vZGlmeSBpdC5cclxuICAgKi9cclxuICByZWFkKGNiOiBSYWZDYWxsYmFjaykge1xyXG4gICAgZ2V0UXVldWUoKS5yZWFkKGNiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjaGVkdWxlcyBhIHRhc2sgdG8gcnVuIGR1cmluZyB0aGUgV1JJVEUgcGhhc2Ugb2YgdGhlIG5leHQgZnJhbWUuXHJcbiAgICogVGhpcyB0YXNrIHNob3VsZCB3cml0ZSB0aGUgRE9NLCBidXQgbmV2ZXIgUkVBRCBpdC5cclxuICAgKi9cclxuICB3cml0ZShjYjogUmFmQ2FsbGJhY2spIHtcclxuICAgIGdldFF1ZXVlKCkud3JpdGUoY2IpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZ2V0UXVldWUgPSAoKSA9PiB7XHJcbiAgY29uc3Qgd2luID0gdHlwZW9mICh3aW5kb3cgYXMgYW55KSAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsIGFzIGFueTtcclxuXHJcbiAgaWYgKHdpbiAhPSBudWxsKSB7XHJcbiAgICBjb25zdCBJb25pYyA9IHdpbi5Jb25pYztcclxuICAgIGlmIChJb25pYyAmJiBJb25pYy5xdWV1ZSkge1xyXG4gICAgICByZXR1cm4gSW9uaWMucXVldWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVhZDogKGNiOiBhbnkpID0+IHdpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpLFxyXG4gICAgICB3cml0ZTogKGNiOiBhbnkpID0+IHdpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlYWQ6IChjYjogYW55KSA9PiBjYigpLFxyXG4gICAgd3JpdGU6IChjYjogYW55KSA9PiBjYigpXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFJhZkNhbGxiYWNrID0gKHRpbWVTdGFtcD86IG51bWJlcikgPT4gdm9pZDtcclxuIl19