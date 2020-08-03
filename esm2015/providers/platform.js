import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { getPlatforms, isPlatform } from '@ionic/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
let Platform = class Platform {
    constructor(doc, zone) {
        this.doc = doc;
        /**
         * @hidden
         */
        this.backButton = new Subject();
        /**
         * The keyboardDidShow event emits when the
         * on-screen keyboard is presented.
         */
        this.keyboardDidShow = new Subject();
        /**
         * The keyboardDidHide event emits when the
         * on-screen keyboard is hidden.
         */
        this.keyboardDidHide = new Subject();
        /**
         * The pause event emits when the native platform puts the application
         * into the background, typically when the user switches to a different
         * application. This event would emit when a Cordova app is put into
         * the background, however, it would not fire on a standard web browser.
         */
        this.pause = new Subject();
        /**
         * The resume event emits when the native platform pulls the application
         * out from the background. This event would emit when a Cordova app comes
         * out from the background, however, it would not fire on a standard web browser.
         */
        this.resume = new Subject();
        /**
         * The resize event emits when the browser window has changed dimensions. This
         * could be from a browser window being physically resized, or from a device
         * changing orientation.
         */
        this.resize = new Subject();
        zone.run(() => {
            this.win = doc.defaultView;
            this.backButton.subscribeWithPriority = function (priority, callback) {
                return this.subscribe(ev => {
                    return ev.register(priority, processNextHandler => zone.run(() => callback(processNextHandler)));
                });
            };
            proxyEvent(this.pause, doc, 'pause');
            proxyEvent(this.resume, doc, 'resume');
            proxyEvent(this.backButton, doc, 'ionBackButton');
            proxyEvent(this.resize, this.win, 'resize');
            proxyEvent(this.keyboardDidShow, this.win, 'ionKeyboardDidShow');
            proxyEvent(this.keyboardDidHide, this.win, 'ionKeyboardDidHide');
            let readyResolve;
            this._readyPromise = new Promise(res => { readyResolve = res; });
            if (this.win && this.win['cordova']) {
                doc.addEventListener('deviceready', () => {
                    readyResolve('cordova');
                }, { once: true });
            }
            else {
                readyResolve('dom');
            }
        });
    }
    /**
     * @returns returns true/false based on platform.
     * @description
     * Depending on the platform the user is on, `is(platformName)` will
     * return `true` or `false`. Note that the same app can return `true`
     * for more than one platform name. For example, an app running from
     * an iPad would return `true` for the platform names: `mobile`,
     * `ios`, `ipad`, and `tablet`. Additionally, if the app was running
     * from Cordova then `cordova` would be true, and if it was running
     * from a web browser on the iPad then `mobileweb` would be `true`.
     *
     * ```
     * import { Platform } from 'ionic-angular';
     *
     * @Component({...})
     * export MyPage {
     *   constructor(public platform: Platform) {
     *     if (this.platform.is('ios')) {
     *       // This will only print when on iOS
     *       console.log('I am an iOS device!');
     *     }
     *   }
     * }
     * ```
     *
     * | Platform Name   | Description                        |
     * |-----------------|------------------------------------|
     * | android         | on a device running Android.       |
     * | cordova         | on a device running Cordova.       |
     * | ios             | on a device running iOS.           |
     * | ipad            | on an iPad device.                 |
     * | iphone          | on an iPhone device.               |
     * | phablet         | on a phablet device.               |
     * | tablet          | on a tablet device.                |
     * | electron        | in Electron on a desktop device.   |
     * | pwa             | as a PWA app.                      |
     * | mobile          | on a mobile device.                |
     * | mobileweb       | on a mobile device in a browser.   |
     * | desktop         | on a desktop device.               |
     * | hybrid          | is a cordova or capacitor app.     |
     *
     */
    is(platformName) {
        return isPlatform(this.win, platformName);
    }
    /**
     * @returns the array of platforms
     * @description
     * Depending on what device you are on, `platforms` can return multiple values.
     * Each possible value is a hierarchy of platforms. For example, on an iPhone,
     * it would return `mobile`, `ios`, and `iphone`.
     *
     * ```
     * import { Platform } from 'ionic-angular';
     *
     * @Component({...})
     * export MyPage {
     *   constructor(public platform: Platform) {
     *     // This will print an array of the current platforms
     *     console.log(this.platform.platforms());
     *   }
     * }
     * ```
     */
    platforms() {
        return getPlatforms(this.win);
    }
    /**
     * Returns a promise when the platform is ready and native functionality
     * can be called. If the app is running from within a web browser, then
     * the promise will resolve when the DOM is ready. When the app is running
     * from an application engine such as Cordova, then the promise will
     * resolve when Cordova triggers the `deviceready` event.
     *
     * The resolved value is the `readySource`, which states which platform
     * ready was used. For example, when Cordova is ready, the resolved ready
     * source is `cordova`. The default ready source value will be `dom`. The
     * `readySource` is useful if different logic should run depending on the
     * platform the app is running from. For example, only Cordova can execute
     * the status bar plugin, so the web should not run status bar plugin logic.
     *
     * ```
     * import { Component } from '@angular/core';
     * import { Platform } from 'ionic-angular';
     *
     * @Component({...})
     * export MyApp {
     *   constructor(public platform: Platform) {
     *     this.platform.ready().then((readySource) => {
     *       console.log('Platform ready from', readySource);
     *       // Platform now ready, execute any required native code
     *     });
     *   }
     * }
     * ```
     */
    ready() {
        return this._readyPromise;
    }
    /**
     * Returns if this app is using right-to-left language direction or not.
     * We recommend the app's `index.html` file already has the correct `dir`
     * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
     * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
     */
    get isRTL() {
        return this.doc.dir === 'rtl';
    }
    /**
     * Get the query string parameter
     */
    getQueryParam(key) {
        return readQueryParam(this.win.location.href, key);
    }
    /**
     * Returns `true` if the app is in landscape mode.
     */
    isLandscape() {
        return !this.isPortrait();
    }
    /**
     * Returns `true` if the app is in portait mode.
     */
    isPortrait() {
        return this.win.matchMedia && this.win.matchMedia('(orientation: portrait)').matches;
    }
    testUserAgent(expression) {
        const nav = this.win.navigator;
        return !!(nav && nav.userAgent && nav.userAgent.indexOf(expression) >= 0);
    }
    /**
     * Get the current url.
     */
    url() {
        return this.win.location.href;
    }
    /**
     * Gets the width of the platform's viewport using `window.innerWidth`.
     */
    width() {
        return this.win.innerWidth;
    }
    /**
     * Gets the height of the platform's viewport using `window.innerHeight`.
     */
    height() {
        return this.win.innerHeight;
    }
};
Platform.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone }
];
Platform.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function Platform_Factory() { return new Platform(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i0.NgZone)); }, token: Platform, providedIn: "root" });
Platform = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    }),
    tslib_1.__param(0, Inject(DOCUMENT))
], Platform);
export { Platform };
const readQueryParam = (url, key) => {
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    const results = regex.exec(url);
    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
};
const ɵ0 = readQueryParam;
const proxyEvent = (emitter, el, eventName) => {
    if (el) {
        el.addEventListener(eventName, (ev) => {
            // ?? cordova might emit "null" events
            emitter.next(ev != null ? ev.detail : undefined);
        });
    }
};
const ɵ1 = proxyEvent;
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9wbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQXlELFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUcsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7OztBQVM3QyxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBNENuQixZQUFzQyxHQUFRLEVBQUUsSUFBWTtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBdkM5Qzs7V0FFRztRQUNILGVBQVUsR0FBc0IsSUFBSSxPQUFPLEVBQWdDLENBQUM7UUFFNUU7OztXQUdHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBOEIsQ0FBQztRQUU1RDs7O1dBR0c7UUFDSCxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFdEM7Ozs7O1dBS0c7UUFDSCxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU1Qjs7OztXQUlHO1FBQ0gsV0FBTSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFN0I7Ozs7V0FJRztRQUNILFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLEdBQUcsVUFBUyxRQUFRLEVBQUUsUUFBUTtnQkFDakUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO29C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QztBQUM3RSxDQUFDLENBQUM7O0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBSSxPQUFtQixFQUFFLEVBQWUsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDaEYsSUFBSyxFQUFVLEVBQUU7UUFDZixFQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBNEIsRUFBRSxFQUFFO1lBQzlELHNDQUFzQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFFLEVBQVUsQ0FBQyxNQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhY2tCdXR0b25FdmVudERldGFpbCwgS2V5Ym9hcmRFdmVudERldGFpbCwgUGxhdGZvcm1zLCBnZXRQbGF0Zm9ybXMsIGlzUGxhdGZvcm0gfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYWNrQnV0dG9uRW1pdHRlciBleHRlbmRzIFN1YmplY3Q8QmFja0J1dHRvbkV2ZW50RGV0YWlsPiB7XHJcbiAgc3Vic2NyaWJlV2l0aFByaW9yaXR5KHByaW9yaXR5OiBudW1iZXIsIGNhbGxiYWNrOiAocHJvY2Vzc05leHRIYW5kbGVyOiAoKSA9PiB2b2lkKSA9PiBQcm9taXNlPGFueT4gfCB2b2lkKTogU3Vic2NyaXB0aW9uO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGxhdGZvcm0ge1xyXG5cclxuICBwcml2YXRlIF9yZWFkeVByb21pc2U6IFByb21pc2U8c3RyaW5nPjtcclxuICBwcml2YXRlIHdpbjogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgYmFja0J1dHRvbjogQmFja0J1dHRvbkVtaXR0ZXIgPSBuZXcgU3ViamVjdDxCYWNrQnV0dG9uRXZlbnREZXRhaWw+KCkgYXMgYW55O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUga2V5Ym9hcmREaWRTaG93IGV2ZW50IGVtaXRzIHdoZW4gdGhlXHJcbiAgICogb24tc2NyZWVuIGtleWJvYXJkIGlzIHByZXNlbnRlZC5cclxuICAgKi9cclxuICBrZXlib2FyZERpZFNob3cgPSBuZXcgU3ViamVjdDxLZXlib2FyZEV2ZW50RGV0YWlsPigpIGFzIGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGtleWJvYXJkRGlkSGlkZSBldmVudCBlbWl0cyB3aGVuIHRoZVxyXG4gICAqIG9uLXNjcmVlbiBrZXlib2FyZCBpcyBoaWRkZW4uXHJcbiAgICovXHJcbiAga2V5Ym9hcmREaWRIaWRlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHBhdXNlIGV2ZW50IGVtaXRzIHdoZW4gdGhlIG5hdGl2ZSBwbGF0Zm9ybSBwdXRzIHRoZSBhcHBsaWNhdGlvblxyXG4gICAqIGludG8gdGhlIGJhY2tncm91bmQsIHR5cGljYWxseSB3aGVuIHRoZSB1c2VyIHN3aXRjaGVzIHRvIGEgZGlmZmVyZW50XHJcbiAgICogYXBwbGljYXRpb24uIFRoaXMgZXZlbnQgd291bGQgZW1pdCB3aGVuIGEgQ29yZG92YSBhcHAgaXMgcHV0IGludG9cclxuICAgKiB0aGUgYmFja2dyb3VuZCwgaG93ZXZlciwgaXQgd291bGQgbm90IGZpcmUgb24gYSBzdGFuZGFyZCB3ZWIgYnJvd3Nlci5cclxuICAgKi9cclxuICBwYXVzZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSByZXN1bWUgZXZlbnQgZW1pdHMgd2hlbiB0aGUgbmF0aXZlIHBsYXRmb3JtIHB1bGxzIHRoZSBhcHBsaWNhdGlvblxyXG4gICAqIG91dCBmcm9tIHRoZSBiYWNrZ3JvdW5kLiBUaGlzIGV2ZW50IHdvdWxkIGVtaXQgd2hlbiBhIENvcmRvdmEgYXBwIGNvbWVzXHJcbiAgICogb3V0IGZyb20gdGhlIGJhY2tncm91bmQsIGhvd2V2ZXIsIGl0IHdvdWxkIG5vdCBmaXJlIG9uIGEgc3RhbmRhcmQgd2ViIGJyb3dzZXIuXHJcbiAgICovXHJcbiAgcmVzdW1lID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHJlc2l6ZSBldmVudCBlbWl0cyB3aGVuIHRoZSBicm93c2VyIHdpbmRvdyBoYXMgY2hhbmdlZCBkaW1lbnNpb25zLiBUaGlzXHJcbiAgICogY291bGQgYmUgZnJvbSBhIGJyb3dzZXIgd2luZG93IGJlaW5nIHBoeXNpY2FsbHkgcmVzaXplZCwgb3IgZnJvbSBhIGRldmljZVxyXG4gICAqIGNoYW5naW5nIG9yaWVudGF0aW9uLlxyXG4gICAqL1xyXG4gIHJlc2l6ZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnksIHpvbmU6IE5nWm9uZSkge1xyXG4gICAgem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLndpbiA9IGRvYy5kZWZhdWx0VmlldztcclxuICAgICAgdGhpcy5iYWNrQnV0dG9uLnN1YnNjcmliZVdpdGhQcmlvcml0eSA9IGZ1bmN0aW9uKHByaW9yaXR5LCBjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShldiA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZXYucmVnaXN0ZXIocHJpb3JpdHksIHByb2Nlc3NOZXh0SGFuZGxlciA9PiB6b25lLnJ1bigoKSA9PiBjYWxsYmFjayhwcm9jZXNzTmV4dEhhbmRsZXIpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBwcm94eUV2ZW50KHRoaXMucGF1c2UsIGRvYywgJ3BhdXNlJyk7XHJcbiAgICAgIHByb3h5RXZlbnQodGhpcy5yZXN1bWUsIGRvYywgJ3Jlc3VtZScpO1xyXG4gICAgICBwcm94eUV2ZW50KHRoaXMuYmFja0J1dHRvbiwgZG9jLCAnaW9uQmFja0J1dHRvbicpO1xyXG4gICAgICBwcm94eUV2ZW50KHRoaXMucmVzaXplLCB0aGlzLndpbiwgJ3Jlc2l6ZScpO1xyXG4gICAgICBwcm94eUV2ZW50KHRoaXMua2V5Ym9hcmREaWRTaG93LCB0aGlzLndpbiwgJ2lvbktleWJvYXJkRGlkU2hvdycpO1xyXG4gICAgICBwcm94eUV2ZW50KHRoaXMua2V5Ym9hcmREaWRIaWRlLCB0aGlzLndpbiwgJ2lvbktleWJvYXJkRGlkSGlkZScpO1xyXG5cclxuICAgICAgbGV0IHJlYWR5UmVzb2x2ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICAgIHRoaXMuX3JlYWR5UHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlcyA9PiB7IHJlYWR5UmVzb2x2ZSA9IHJlczsgfSk7XHJcbiAgICAgIGlmICh0aGlzLndpbiAmJiB0aGlzLndpblsnY29yZG92YSddKSB7XHJcbiAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgKCkgPT4ge1xyXG4gICAgICAgICAgcmVhZHlSZXNvbHZlKCdjb3Jkb3ZhJyk7XHJcbiAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlYWR5UmVzb2x2ZSEoJ2RvbScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHJldHVybnMgdHJ1ZS9mYWxzZSBiYXNlZCBvbiBwbGF0Zm9ybS5cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBEZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIHRoZSB1c2VyIGlzIG9uLCBgaXMocGxhdGZvcm1OYW1lKWAgd2lsbFxyXG4gICAqIHJldHVybiBgdHJ1ZWAgb3IgYGZhbHNlYC4gTm90ZSB0aGF0IHRoZSBzYW1lIGFwcCBjYW4gcmV0dXJuIGB0cnVlYFxyXG4gICAqIGZvciBtb3JlIHRoYW4gb25lIHBsYXRmb3JtIG5hbWUuIEZvciBleGFtcGxlLCBhbiBhcHAgcnVubmluZyBmcm9tXHJcbiAgICogYW4gaVBhZCB3b3VsZCByZXR1cm4gYHRydWVgIGZvciB0aGUgcGxhdGZvcm0gbmFtZXM6IGBtb2JpbGVgLFxyXG4gICAqIGBpb3NgLCBgaXBhZGAsIGFuZCBgdGFibGV0YC4gQWRkaXRpb25hbGx5LCBpZiB0aGUgYXBwIHdhcyBydW5uaW5nXHJcbiAgICogZnJvbSBDb3Jkb3ZhIHRoZW4gYGNvcmRvdmFgIHdvdWxkIGJlIHRydWUsIGFuZCBpZiBpdCB3YXMgcnVubmluZ1xyXG4gICAqIGZyb20gYSB3ZWIgYnJvd3NlciBvbiB0aGUgaVBhZCB0aGVuIGBtb2JpbGV3ZWJgIHdvdWxkIGJlIGB0cnVlYC5cclxuICAgKlxyXG4gICAqIGBgYFxyXG4gICAqIGltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnaW9uaWMtYW5ndWxhcic7XHJcbiAgICpcclxuICAgKiBAQ29tcG9uZW50KHsuLi59KVxyXG4gICAqIGV4cG9ydCBNeVBhZ2Uge1xyXG4gICAqICAgY29uc3RydWN0b3IocHVibGljIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xyXG4gICAqICAgICBpZiAodGhpcy5wbGF0Zm9ybS5pcygnaW9zJykpIHtcclxuICAgKiAgICAgICAvLyBUaGlzIHdpbGwgb25seSBwcmludCB3aGVuIG9uIGlPU1xyXG4gICAqICAgICAgIGNvbnNvbGUubG9nKCdJIGFtIGFuIGlPUyBkZXZpY2UhJyk7XHJcbiAgICogICAgIH1cclxuICAgKiAgIH1cclxuICAgKiB9XHJcbiAgICogYGBgXHJcbiAgICpcclxuICAgKiB8IFBsYXRmb3JtIE5hbWUgICB8IERlc2NyaXB0aW9uICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gICAqIHwtLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XHJcbiAgICogfCBhbmRyb2lkICAgICAgICAgfCBvbiBhIGRldmljZSBydW5uaW5nIEFuZHJvaWQuICAgICAgIHxcclxuICAgKiB8IGNvcmRvdmEgICAgICAgICB8IG9uIGEgZGV2aWNlIHJ1bm5pbmcgQ29yZG92YS4gICAgICAgfFxyXG4gICAqIHwgaW9zICAgICAgICAgICAgIHwgb24gYSBkZXZpY2UgcnVubmluZyBpT1MuICAgICAgICAgICB8XHJcbiAgICogfCBpcGFkICAgICAgICAgICAgfCBvbiBhbiBpUGFkIGRldmljZS4gICAgICAgICAgICAgICAgIHxcclxuICAgKiB8IGlwaG9uZSAgICAgICAgICB8IG9uIGFuIGlQaG9uZSBkZXZpY2UuICAgICAgICAgICAgICAgfFxyXG4gICAqIHwgcGhhYmxldCAgICAgICAgIHwgb24gYSBwaGFibGV0IGRldmljZS4gICAgICAgICAgICAgICB8XHJcbiAgICogfCB0YWJsZXQgICAgICAgICAgfCBvbiBhIHRhYmxldCBkZXZpY2UuICAgICAgICAgICAgICAgIHxcclxuICAgKiB8IGVsZWN0cm9uICAgICAgICB8IGluIEVsZWN0cm9uIG9uIGEgZGVza3RvcCBkZXZpY2UuICAgfFxyXG4gICAqIHwgcHdhICAgICAgICAgICAgIHwgYXMgYSBQV0EgYXBwLiAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAgICogfCBtb2JpbGUgICAgICAgICAgfCBvbiBhIG1vYmlsZSBkZXZpY2UuICAgICAgICAgICAgICAgIHxcclxuICAgKiB8IG1vYmlsZXdlYiAgICAgICB8IG9uIGEgbW9iaWxlIGRldmljZSBpbiBhIGJyb3dzZXIuICAgfFxyXG4gICAqIHwgZGVza3RvcCAgICAgICAgIHwgb24gYSBkZXNrdG9wIGRldmljZS4gICAgICAgICAgICAgICB8XHJcbiAgICogfCBoeWJyaWQgICAgICAgICAgfCBpcyBhIGNvcmRvdmEgb3IgY2FwYWNpdG9yIGFwcC4gICAgIHxcclxuICAgKlxyXG4gICAqL1xyXG4gIGlzKHBsYXRmb3JtTmFtZTogUGxhdGZvcm1zKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNQbGF0Zm9ybSh0aGlzLndpbiwgcGxhdGZvcm1OYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHRoZSBhcnJheSBvZiBwbGF0Zm9ybXNcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBEZXBlbmRpbmcgb24gd2hhdCBkZXZpY2UgeW91IGFyZSBvbiwgYHBsYXRmb3Jtc2AgY2FuIHJldHVybiBtdWx0aXBsZSB2YWx1ZXMuXHJcbiAgICogRWFjaCBwb3NzaWJsZSB2YWx1ZSBpcyBhIGhpZXJhcmNoeSBvZiBwbGF0Zm9ybXMuIEZvciBleGFtcGxlLCBvbiBhbiBpUGhvbmUsXHJcbiAgICogaXQgd291bGQgcmV0dXJuIGBtb2JpbGVgLCBgaW9zYCwgYW5kIGBpcGhvbmVgLlxyXG4gICAqXHJcbiAgICogYGBgXHJcbiAgICogaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdpb25pYy1hbmd1bGFyJztcclxuICAgKlxyXG4gICAqIEBDb21wb25lbnQoey4uLn0pXHJcbiAgICogZXhwb3J0IE15UGFnZSB7XHJcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgcGxhdGZvcm06IFBsYXRmb3JtKSB7XHJcbiAgICogICAgIC8vIFRoaXMgd2lsbCBwcmludCBhbiBhcnJheSBvZiB0aGUgY3VycmVudCBwbGF0Zm9ybXNcclxuICAgKiAgICAgY29uc29sZS5sb2codGhpcy5wbGF0Zm9ybS5wbGF0Zm9ybXMoKSk7XHJcbiAgICogICB9XHJcbiAgICogfVxyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIHBsYXRmb3JtcygpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gZ2V0UGxhdGZvcm1zKHRoaXMud2luKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHdoZW4gdGhlIHBsYXRmb3JtIGlzIHJlYWR5IGFuZCBuYXRpdmUgZnVuY3Rpb25hbGl0eVxyXG4gICAqIGNhbiBiZSBjYWxsZWQuIElmIHRoZSBhcHAgaXMgcnVubmluZyBmcm9tIHdpdGhpbiBhIHdlYiBicm93c2VyLCB0aGVuXHJcbiAgICogdGhlIHByb21pc2Ugd2lsbCByZXNvbHZlIHdoZW4gdGhlIERPTSBpcyByZWFkeS4gV2hlbiB0aGUgYXBwIGlzIHJ1bm5pbmdcclxuICAgKiBmcm9tIGFuIGFwcGxpY2F0aW9uIGVuZ2luZSBzdWNoIGFzIENvcmRvdmEsIHRoZW4gdGhlIHByb21pc2Ugd2lsbFxyXG4gICAqIHJlc29sdmUgd2hlbiBDb3Jkb3ZhIHRyaWdnZXJzIHRoZSBgZGV2aWNlcmVhZHlgIGV2ZW50LlxyXG4gICAqXHJcbiAgICogVGhlIHJlc29sdmVkIHZhbHVlIGlzIHRoZSBgcmVhZHlTb3VyY2VgLCB3aGljaCBzdGF0ZXMgd2hpY2ggcGxhdGZvcm1cclxuICAgKiByZWFkeSB3YXMgdXNlZC4gRm9yIGV4YW1wbGUsIHdoZW4gQ29yZG92YSBpcyByZWFkeSwgdGhlIHJlc29sdmVkIHJlYWR5XHJcbiAgICogc291cmNlIGlzIGBjb3Jkb3ZhYC4gVGhlIGRlZmF1bHQgcmVhZHkgc291cmNlIHZhbHVlIHdpbGwgYmUgYGRvbWAuIFRoZVxyXG4gICAqIGByZWFkeVNvdXJjZWAgaXMgdXNlZnVsIGlmIGRpZmZlcmVudCBsb2dpYyBzaG91bGQgcnVuIGRlcGVuZGluZyBvbiB0aGVcclxuICAgKiBwbGF0Zm9ybSB0aGUgYXBwIGlzIHJ1bm5pbmcgZnJvbS4gRm9yIGV4YW1wbGUsIG9ubHkgQ29yZG92YSBjYW4gZXhlY3V0ZVxyXG4gICAqIHRoZSBzdGF0dXMgYmFyIHBsdWdpbiwgc28gdGhlIHdlYiBzaG91bGQgbm90IHJ1biBzdGF0dXMgYmFyIHBsdWdpbiBsb2dpYy5cclxuICAgKlxyXG4gICAqIGBgYFxyXG4gICAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gICAqIGltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnaW9uaWMtYW5ndWxhcic7XHJcbiAgICpcclxuICAgKiBAQ29tcG9uZW50KHsuLi59KVxyXG4gICAqIGV4cG9ydCBNeUFwcCB7XHJcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgcGxhdGZvcm06IFBsYXRmb3JtKSB7XHJcbiAgICogICAgIHRoaXMucGxhdGZvcm0ucmVhZHkoKS50aGVuKChyZWFkeVNvdXJjZSkgPT4ge1xyXG4gICAqICAgICAgIGNvbnNvbGUubG9nKCdQbGF0Zm9ybSByZWFkeSBmcm9tJywgcmVhZHlTb3VyY2UpO1xyXG4gICAqICAgICAgIC8vIFBsYXRmb3JtIG5vdyByZWFkeSwgZXhlY3V0ZSBhbnkgcmVxdWlyZWQgbmF0aXZlIGNvZGVcclxuICAgKiAgICAgfSk7XHJcbiAgICogICB9XHJcbiAgICogfVxyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIHJlYWR5KCk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVhZHlQcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiB0aGlzIGFwcCBpcyB1c2luZyByaWdodC10by1sZWZ0IGxhbmd1YWdlIGRpcmVjdGlvbiBvciBub3QuXHJcbiAgICogV2UgcmVjb21tZW5kIHRoZSBhcHAncyBgaW5kZXguaHRtbGAgZmlsZSBhbHJlYWR5IGhhcyB0aGUgY29ycmVjdCBgZGlyYFxyXG4gICAqIGF0dHJpYnV0ZSB2YWx1ZSBzZXQsIHN1Y2ggYXMgYDxodG1sIGRpcj1cImx0clwiPmAgb3IgYDxodG1sIGRpcj1cInJ0bFwiPmAuXHJcbiAgICogW1czQzogU3RydWN0dXJhbCBtYXJrdXAgYW5kIHJpZ2h0LXRvLWxlZnQgdGV4dCBpbiBIVE1MXShodHRwOi8vd3d3LnczLm9yZy9JbnRlcm5hdGlvbmFsL3F1ZXN0aW9ucy9xYS1odG1sLWRpcilcclxuICAgKi9cclxuICBnZXQgaXNSVEwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kb2MuZGlyID09PSAncnRsJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgcXVlcnkgc3RyaW5nIHBhcmFtZXRlclxyXG4gICAqL1xyXG4gIGdldFF1ZXJ5UGFyYW0oa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIHJldHVybiByZWFkUXVlcnlQYXJhbSh0aGlzLndpbi5sb2NhdGlvbi5ocmVmLCBrZXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFwcCBpcyBpbiBsYW5kc2NhcGUgbW9kZS5cclxuICAgKi9cclxuICBpc0xhbmRzY2FwZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhdGhpcy5pc1BvcnRyYWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXBwIGlzIGluIHBvcnRhaXQgbW9kZS5cclxuICAgKi9cclxuICBpc1BvcnRyYWl0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMud2luLm1hdGNoTWVkaWEgJiYgdGhpcy53aW4ubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzO1xyXG4gIH1cclxuXHJcbiAgdGVzdFVzZXJBZ2VudChleHByZXNzaW9uOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IG5hdiA9IHRoaXMud2luLm5hdmlnYXRvcjtcclxuICAgIHJldHVybiAhIShuYXYgJiYgbmF2LnVzZXJBZ2VudCAmJiBuYXYudXNlckFnZW50LmluZGV4T2YoZXhwcmVzc2lvbikgPj0gMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgdXJsLlxyXG4gICAqL1xyXG4gIHVybCgpIHtcclxuICAgIHJldHVybiB0aGlzLndpbi5sb2NhdGlvbi5ocmVmO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIHBsYXRmb3JtJ3Mgdmlld3BvcnQgdXNpbmcgYHdpbmRvdy5pbm5lcldpZHRoYC5cclxuICAgKi9cclxuICB3aWR0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLndpbi5pbm5lcldpZHRoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBwbGF0Zm9ybSdzIHZpZXdwb3J0IHVzaW5nIGB3aW5kb3cuaW5uZXJIZWlnaHRgLlxyXG4gICAqL1xyXG4gIGhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMud2luLmlubmVySGVpZ2h0O1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcmVhZFF1ZXJ5UGFyYW0gPSAodXJsOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1tcXFtdLywgJ1xcXFxbJykucmVwbGFjZSgvW1xcXV0vLCAnXFxcXF0nKTtcclxuICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1tcXFxcPyZdJyArIGtleSArICc9KFteJiNdKiknKTtcclxuICBjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG4gIHJldHVybiByZXN1bHRzID8gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHByb3h5RXZlbnQgPSA8VD4oZW1pdHRlcjogU3ViamVjdDxUPiwgZWw6IEV2ZW50VGFyZ2V0LCBldmVudE5hbWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICgoZWwgYXMgYW55KSkge1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChldjogRXZlbnQgfCB1bmRlZmluZWQgfCBudWxsKSA9PiB7XHJcbiAgICAgIC8vID8/IGNvcmRvdmEgbWlnaHQgZW1pdCBcIm51bGxcIiBldmVudHNcclxuICAgICAgZW1pdHRlci5uZXh0KGV2ICE9IG51bGwgPyAoZXYgYXMgYW55KS5kZXRhaWwgYXMgVCA6IHVuZGVmaW5lZCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiJdfQ==