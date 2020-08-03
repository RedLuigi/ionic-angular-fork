import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { getPlatforms, isPlatform } from '@ionic/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
var Platform = /** @class */ (function () {
    function Platform(doc, zone) {
        var _this = this;
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
        zone.run(function () {
            _this.win = doc.defaultView;
            _this.backButton.subscribeWithPriority = function (priority, callback) {
                return this.subscribe(function (ev) {
                    return ev.register(priority, function (processNextHandler) { return zone.run(function () { return callback(processNextHandler); }); });
                });
            };
            proxyEvent(_this.pause, doc, 'pause');
            proxyEvent(_this.resume, doc, 'resume');
            proxyEvent(_this.backButton, doc, 'ionBackButton');
            proxyEvent(_this.resize, _this.win, 'resize');
            proxyEvent(_this.keyboardDidShow, _this.win, 'ionKeyboardDidShow');
            proxyEvent(_this.keyboardDidHide, _this.win, 'ionKeyboardDidHide');
            var readyResolve;
            _this._readyPromise = new Promise(function (res) { readyResolve = res; });
            if (_this.win && _this.win['cordova']) {
                doc.addEventListener('deviceready', function () {
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
    Platform.prototype.is = function (platformName) {
        return isPlatform(this.win, platformName);
    };
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
    Platform.prototype.platforms = function () {
        return getPlatforms(this.win);
    };
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
    Platform.prototype.ready = function () {
        return this._readyPromise;
    };
    Object.defineProperty(Platform.prototype, "isRTL", {
        /**
         * Returns if this app is using right-to-left language direction or not.
         * We recommend the app's `index.html` file already has the correct `dir`
         * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
         * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
         */
        get: function () {
            return this.doc.dir === 'rtl';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the query string parameter
     */
    Platform.prototype.getQueryParam = function (key) {
        return readQueryParam(this.win.location.href, key);
    };
    /**
     * Returns `true` if the app is in landscape mode.
     */
    Platform.prototype.isLandscape = function () {
        return !this.isPortrait();
    };
    /**
     * Returns `true` if the app is in portait mode.
     */
    Platform.prototype.isPortrait = function () {
        return this.win.matchMedia && this.win.matchMedia('(orientation: portrait)').matches;
    };
    Platform.prototype.testUserAgent = function (expression) {
        var nav = this.win.navigator;
        return !!(nav && nav.userAgent && nav.userAgent.indexOf(expression) >= 0);
    };
    /**
     * Get the current url.
     */
    Platform.prototype.url = function () {
        return this.win.location.href;
    };
    /**
     * Gets the width of the platform's viewport using `window.innerWidth`.
     */
    Platform.prototype.width = function () {
        return this.win.innerWidth;
    };
    /**
     * Gets the height of the platform's viewport using `window.innerHeight`.
     */
    Platform.prototype.height = function () {
        return this.win.innerHeight;
    };
    Platform.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone }
    ]; };
    Platform.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function Platform_Factory() { return new Platform(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i0.NgZone)); }, token: Platform, providedIn: "root" });
    Platform = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__param(0, Inject(DOCUMENT))
    ], Platform);
    return Platform;
}());
export { Platform };
var readQueryParam = function (url, key) {
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    var results = regex.exec(url);
    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
};
var ɵ0 = readQueryParam;
var proxyEvent = function (emitter, el, eventName) {
    if (el) {
        el.addEventListener(eventName, function (ev) {
            // ?? cordova might emit "null" events
            emitter.next(ev != null ? ev.detail : undefined);
        });
    }
};
var ɵ1 = proxyEvent;
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9wbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQXlELFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUcsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7OztBQVM3QztJQTRDRSxrQkFBc0MsR0FBUSxFQUFFLElBQVk7UUFBNUQsaUJBMEJDO1FBMUJxQyxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBdkM5Qzs7V0FFRztRQUNILGVBQVUsR0FBc0IsSUFBSSxPQUFPLEVBQWdDLENBQUM7UUFFNUU7OztXQUdHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBOEIsQ0FBQztRQUU1RDs7O1dBR0c7UUFDSCxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFdEM7Ozs7O1dBS0c7UUFDSCxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU1Qjs7OztXQUlHO1FBQ0gsV0FBTSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFN0I7Ozs7V0FJRztRQUNILFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRzNCLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDUCxLQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7WUFDM0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxVQUFTLFFBQVEsRUFBRSxRQUFRO2dCQUNqRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxFQUFFO29CQUN0QixPQUFPLEVBQUUsQ0FBQyxRQUFRLENB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QUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUM3RSxDQUFDLENBQUM7O0FBRUYsSUFBTSxVQUFVLEdBQUcsVUFBSSxPQUFtQixFQUFFLEVBQWUsRUFBRSxTQUFpQjtJQUM1RSxJQUFLLEVBQVUsRUFBRTtRQUNmLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxFQUE0QjtZQUMxRCxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBRSxFQUFVLENBQUMsTUFBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCYWNrQnV0dG9uRXZlbnREZXRhaWwsIEtleWJvYXJkRXZlbnREZXRhaWwsIFBsYXRmb3JtcywgZ2V0UGxhdGZvcm1zLCBpc1BsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFja0J1dHRvbkVtaXR0ZXIgZXh0ZW5kcyBTdWJqZWN0PEJhY2tCdXR0b25FdmVudERldGFpbD4ge1xyXG4gIHN1YnNjcmliZVdpdGhQcmlvcml0eShwcmlvcml0eTogbnVtYmVyLCBjYWxsYmFjazogKHByb2Nlc3NOZXh0SGFuZGxlcjogKCkgPT4gdm9pZCkgPT4gUHJvbWlzZTxhbnk+IHwgdm9pZCk6IFN1YnNjcmlwdGlvbjtcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtIHtcclxuXHJcbiAgcHJpdmF0ZSBfcmVhZHlQcm9taXNlOiBQcm9taXNlPHN0cmluZz47XHJcbiAgcHJpdmF0ZSB3aW46IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGJhY2tCdXR0b246IEJhY2tCdXR0b25FbWl0dGVyID0gbmV3IFN1YmplY3Q8QmFja0J1dHRvbkV2ZW50RGV0YWlsPigpIGFzIGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGtleWJvYXJkRGlkU2hvdyBldmVudCBlbWl0cyB3aGVuIHRoZVxyXG4gICAqIG9uLXNjcmVlbiBrZXlib2FyZCBpcyBwcmVzZW50ZWQuXHJcbiAgICovXHJcbiAga2V5Ym9hcmREaWRTaG93ID0gbmV3IFN1YmplY3Q8S2V5Ym9hcmRFdmVudERldGFpbD4oKSBhcyBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBrZXlib2FyZERpZEhpZGUgZXZlbnQgZW1pdHMgd2hlbiB0aGVcclxuICAgKiBvbi1zY3JlZW4ga2V5Ym9hcmQgaXMgaGlkZGVuLlxyXG4gICAqL1xyXG4gIGtleWJvYXJkRGlkSGlkZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwYXVzZSBldmVudCBlbWl0cyB3aGVuIHRoZSBuYXRpdmUgcGxhdGZvcm0gcHV0cyB0aGUgYXBwbGljYXRpb25cclxuICAgKiBpbnRvIHRoZSBiYWNrZ3JvdW5kLCB0eXBpY2FsbHkgd2hlbiB0aGUgdXNlciBzd2l0Y2hlcyB0byBhIGRpZmZlcmVudFxyXG4gICAqIGFwcGxpY2F0aW9uLiBUaGlzIGV2ZW50IHdvdWxkIGVtaXQgd2hlbiBhIENvcmRvdmEgYXBwIGlzIHB1dCBpbnRvXHJcbiAgICogdGhlIGJhY2tncm91bmQsIGhvd2V2ZXIsIGl0IHdvdWxkIG5vdCBmaXJlIG9uIGEgc3RhbmRhcmQgd2ViIGJyb3dzZXIuXHJcbiAgICovXHJcbiAgcGF1c2UgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcmVzdW1lIGV2ZW50IGVtaXRzIHdoZW4gdGhlIG5hdGl2ZSBwbGF0Zm9ybSBwdWxscyB0aGUgYXBwbGljYXRpb25cclxuICAgKiBvdXQgZnJvbSB0aGUgYmFja2dyb3VuZC4gVGhpcyBldmVudCB3b3VsZCBlbWl0IHdoZW4gYSBDb3Jkb3ZhIGFwcCBjb21lc1xyXG4gICAqIG91dCBmcm9tIHRoZSBiYWNrZ3JvdW5kLCBob3dldmVyLCBpdCB3b3VsZCBub3QgZmlyZSBvbiBhIHN0YW5kYXJkIHdlYiBicm93c2VyLlxyXG4gICAqL1xyXG4gIHJlc3VtZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSByZXNpemUgZXZlbnQgZW1pdHMgd2hlbiB0aGUgYnJvd3NlciB3aW5kb3cgaGFzIGNoYW5nZWQgZGltZW5zaW9ucy4gVGhpc1xyXG4gICAqIGNvdWxkIGJlIGZyb20gYSBicm93c2VyIHdpbmRvdyBiZWluZyBwaHlzaWNhbGx5IHJlc2l6ZWQsIG9yIGZyb20gYSBkZXZpY2VcclxuICAgKiBjaGFuZ2luZyBvcmllbnRhdGlvbi5cclxuICAgKi9cclxuICByZXNpemUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55LCB6b25lOiBOZ1pvbmUpIHtcclxuICAgIHpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy53aW4gPSBkb2MuZGVmYXVsdFZpZXc7XHJcbiAgICAgIHRoaXMuYmFja0J1dHRvbi5zdWJzY3JpYmVXaXRoUHJpb3JpdHkgPSBmdW5jdGlvbihwcmlvcml0eSwgY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmUoZXYgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGV2LnJlZ2lzdGVyKHByaW9yaXR5LCBwcm9jZXNzTmV4dEhhbmRsZXIgPT4gem9uZS5ydW4oKCkgPT4gY2FsbGJhY2socHJvY2Vzc05leHRIYW5kbGVyKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcHJveHlFdmVudCh0aGlzLnBhdXNlLCBkb2MsICdwYXVzZScpO1xyXG4gICAgICBwcm94eUV2ZW50KHRoaXMucmVzdW1lLCBkb2MsICdyZXN1bWUnKTtcclxuICAgICAgcHJveHlFdmVudCh0aGlzLmJhY2tCdXR0b24sIGRvYywgJ2lvbkJhY2tCdXR0b24nKTtcclxuICAgICAgcHJveHlFdmVudCh0aGlzLnJlc2l6ZSwgdGhpcy53aW4sICdyZXNpemUnKTtcclxuICAgICAgcHJveHlFdmVudCh0aGlzLmtleWJvYXJkRGlkU2hvdywgdGhpcy53aW4sICdpb25LZXlib2FyZERpZFNob3cnKTtcclxuICAgICAgcHJveHlFdmVudCh0aGlzLmtleWJvYXJkRGlkSGlkZSwgdGhpcy53aW4sICdpb25LZXlib2FyZERpZEhpZGUnKTtcclxuXHJcbiAgICAgIGxldCByZWFkeVJlc29sdmU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgICB0aGlzLl9yZWFkeVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXMgPT4geyByZWFkeVJlc29sdmUgPSByZXM7IH0pO1xyXG4gICAgICBpZiAodGhpcy53aW4gJiYgdGhpcy53aW5bJ2NvcmRvdmEnXSkge1xyXG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsICgpID0+IHtcclxuICAgICAgICAgIHJlYWR5UmVzb2x2ZSgnY29yZG92YScpO1xyXG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWFkeVJlc29sdmUhKCdkb20nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyByZXR1cm5zIHRydWUvZmFsc2UgYmFzZWQgb24gcGxhdGZvcm0uXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogRGVwZW5kaW5nIG9uIHRoZSBwbGF0Zm9ybSB0aGUgdXNlciBpcyBvbiwgYGlzKHBsYXRmb3JtTmFtZSlgIHdpbGxcclxuICAgKiByZXR1cm4gYHRydWVgIG9yIGBmYWxzZWAuIE5vdGUgdGhhdCB0aGUgc2FtZSBhcHAgY2FuIHJldHVybiBgdHJ1ZWBcclxuICAgKiBmb3IgbW9yZSB0aGFuIG9uZSBwbGF0Zm9ybSBuYW1lLiBGb3IgZXhhbXBsZSwgYW4gYXBwIHJ1bm5pbmcgZnJvbVxyXG4gICAqIGFuIGlQYWQgd291bGQgcmV0dXJuIGB0cnVlYCBmb3IgdGhlIHBsYXRmb3JtIG5hbWVzOiBgbW9iaWxlYCxcclxuICAgKiBgaW9zYCwgYGlwYWRgLCBhbmQgYHRhYmxldGAuIEFkZGl0aW9uYWxseSwgaWYgdGhlIGFwcCB3YXMgcnVubmluZ1xyXG4gICAqIGZyb20gQ29yZG92YSB0aGVuIGBjb3Jkb3ZhYCB3b3VsZCBiZSB0cnVlLCBhbmQgaWYgaXQgd2FzIHJ1bm5pbmdcclxuICAgKiBmcm9tIGEgd2ViIGJyb3dzZXIgb24gdGhlIGlQYWQgdGhlbiBgbW9iaWxld2ViYCB3b3VsZCBiZSBgdHJ1ZWAuXHJcbiAgICpcclxuICAgKiBgYGBcclxuICAgKiBpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ2lvbmljLWFuZ3VsYXInO1xyXG4gICAqXHJcbiAgICogQENvbXBvbmVudCh7Li4ufSlcclxuICAgKiBleHBvcnQgTXlQYWdlIHtcclxuICAgKiAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcclxuICAgKiAgICAgaWYgKHRoaXMucGxhdGZvcm0uaXMoJ2lvcycpKSB7XHJcbiAgICogICAgICAgLy8gVGhpcyB3aWxsIG9ubHkgcHJpbnQgd2hlbiBvbiBpT1NcclxuICAgKiAgICAgICBjb25zb2xlLmxvZygnSSBhbSBhbiBpT1MgZGV2aWNlIScpO1xyXG4gICAqICAgICB9XHJcbiAgICogICB9XHJcbiAgICogfVxyXG4gICAqIGBgYFxyXG4gICAqXHJcbiAgICogfCBQbGF0Zm9ybSBOYW1lICAgfCBEZXNjcmlwdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICAgKiB8LS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxyXG4gICAqIHwgYW5kcm9pZCAgICAgICAgIHwgb24gYSBkZXZpY2UgcnVubmluZyBBbmRyb2lkLiAgICAgICB8XHJcbiAgICogfCBjb3Jkb3ZhICAgICAgICAgfCBvbiBhIGRldmljZSBydW5uaW5nIENvcmRvdmEuICAgICAgIHxcclxuICAgKiB8IGlvcyAgICAgICAgICAgICB8IG9uIGEgZGV2aWNlIHJ1bm5pbmcgaU9TLiAgICAgICAgICAgfFxyXG4gICAqIHwgaXBhZCAgICAgICAgICAgIHwgb24gYW4gaVBhZCBkZXZpY2UuICAgICAgICAgICAgICAgICB8XHJcbiAgICogfCBpcGhvbmUgICAgICAgICAgfCBvbiBhbiBpUGhvbmUgZGV2aWNlLiAgICAgICAgICAgICAgIHxcclxuICAgKiB8IHBoYWJsZXQgICAgICAgICB8IG9uIGEgcGhhYmxldCBkZXZpY2UuICAgICAgICAgICAgICAgfFxyXG4gICAqIHwgdGFibGV0ICAgICAgICAgIHwgb24gYSB0YWJsZXQgZGV2aWNlLiAgICAgICAgICAgICAgICB8XHJcbiAgICogfCBlbGVjdHJvbiAgICAgICAgfCBpbiBFbGVjdHJvbiBvbiBhIGRlc2t0b3AgZGV2aWNlLiAgIHxcclxuICAgKiB8IHB3YSAgICAgICAgICAgICB8IGFzIGEgUFdBIGFwcC4gICAgICAgICAgICAgICAgICAgICAgfFxyXG4gICAqIHwgbW9iaWxlICAgICAgICAgIHwgb24gYSBtb2JpbGUgZGV2aWNlLiAgICAgICAgICAgICAgICB8XHJcbiAgICogfCBtb2JpbGV3ZWIgICAgICAgfCBvbiBhIG1vYmlsZSBkZXZpY2UgaW4gYSBicm93c2VyLiAgIHxcclxuICAgKiB8IGRlc2t0b3AgICAgICAgICB8IG9uIGEgZGVza3RvcCBkZXZpY2UuICAgICAgICAgICAgICAgfFxyXG4gICAqIHwgaHlicmlkICAgICAgICAgIHwgaXMgYSBjb3Jkb3ZhIG9yIGNhcGFjaXRvciBhcHAuICAgICB8XHJcbiAgICpcclxuICAgKi9cclxuICBpcyhwbGF0Zm9ybU5hbWU6IFBsYXRmb3Jtcyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzUGxhdGZvcm0odGhpcy53aW4sIHBsYXRmb3JtTmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB0aGUgYXJyYXkgb2YgcGxhdGZvcm1zXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogRGVwZW5kaW5nIG9uIHdoYXQgZGV2aWNlIHlvdSBhcmUgb24sIGBwbGF0Zm9ybXNgIGNhbiByZXR1cm4gbXVsdGlwbGUgdmFsdWVzLlxyXG4gICAqIEVhY2ggcG9zc2libGUgdmFsdWUgaXMgYSBoaWVyYXJjaHkgb2YgcGxhdGZvcm1zLiBGb3IgZXhhbXBsZSwgb24gYW4gaVBob25lLFxyXG4gICAqIGl0IHdvdWxkIHJldHVybiBgbW9iaWxlYCwgYGlvc2AsIGFuZCBgaXBob25lYC5cclxuICAgKlxyXG4gICAqIGBgYFxyXG4gICAqIGltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnaW9uaWMtYW5ndWxhcic7XHJcbiAgICpcclxuICAgKiBAQ29tcG9uZW50KHsuLi59KVxyXG4gICAqIGV4cG9ydCBNeVBhZ2Uge1xyXG4gICAqICAgY29uc3RydWN0b3IocHVibGljIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xyXG4gICAqICAgICAvLyBUaGlzIHdpbGwgcHJpbnQgYW4gYXJyYXkgb2YgdGhlIGN1cnJlbnQgcGxhdGZvcm1zXHJcbiAgICogICAgIGNvbnNvbGUubG9nKHRoaXMucGxhdGZvcm0ucGxhdGZvcm1zKCkpO1xyXG4gICAqICAgfVxyXG4gICAqIH1cclxuICAgKiBgYGBcclxuICAgKi9cclxuICBwbGF0Zm9ybXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIGdldFBsYXRmb3Jtcyh0aGlzLndpbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB3aGVuIHRoZSBwbGF0Zm9ybSBpcyByZWFkeSBhbmQgbmF0aXZlIGZ1bmN0aW9uYWxpdHlcclxuICAgKiBjYW4gYmUgY2FsbGVkLiBJZiB0aGUgYXBwIGlzIHJ1bm5pbmcgZnJvbSB3aXRoaW4gYSB3ZWIgYnJvd3NlciwgdGhlblxyXG4gICAqIHRoZSBwcm9taXNlIHdpbGwgcmVzb2x2ZSB3aGVuIHRoZSBET00gaXMgcmVhZHkuIFdoZW4gdGhlIGFwcCBpcyBydW5uaW5nXHJcbiAgICogZnJvbSBhbiBhcHBsaWNhdGlvbiBlbmdpbmUgc3VjaCBhcyBDb3Jkb3ZhLCB0aGVuIHRoZSBwcm9taXNlIHdpbGxcclxuICAgKiByZXNvbHZlIHdoZW4gQ29yZG92YSB0cmlnZ2VycyB0aGUgYGRldmljZXJlYWR5YCBldmVudC5cclxuICAgKlxyXG4gICAqIFRoZSByZXNvbHZlZCB2YWx1ZSBpcyB0aGUgYHJlYWR5U291cmNlYCwgd2hpY2ggc3RhdGVzIHdoaWNoIHBsYXRmb3JtXHJcbiAgICogcmVhZHkgd2FzIHVzZWQuIEZvciBleGFtcGxlLCB3aGVuIENvcmRvdmEgaXMgcmVhZHksIHRoZSByZXNvbHZlZCByZWFkeVxyXG4gICAqIHNvdXJjZSBpcyBgY29yZG92YWAuIFRoZSBkZWZhdWx0IHJlYWR5IHNvdXJjZSB2YWx1ZSB3aWxsIGJlIGBkb21gLiBUaGVcclxuICAgKiBgcmVhZHlTb3VyY2VgIGlzIHVzZWZ1bCBpZiBkaWZmZXJlbnQgbG9naWMgc2hvdWxkIHJ1biBkZXBlbmRpbmcgb24gdGhlXHJcbiAgICogcGxhdGZvcm0gdGhlIGFwcCBpcyBydW5uaW5nIGZyb20uIEZvciBleGFtcGxlLCBvbmx5IENvcmRvdmEgY2FuIGV4ZWN1dGVcclxuICAgKiB0aGUgc3RhdHVzIGJhciBwbHVnaW4sIHNvIHRoZSB3ZWIgc2hvdWxkIG5vdCBydW4gc3RhdHVzIGJhciBwbHVnaW4gbG9naWMuXHJcbiAgICpcclxuICAgKiBgYGBcclxuICAgKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICAgKiBpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ2lvbmljLWFuZ3VsYXInO1xyXG4gICAqXHJcbiAgICogQENvbXBvbmVudCh7Li4ufSlcclxuICAgKiBleHBvcnQgTXlBcHAge1xyXG4gICAqICAgY29uc3RydWN0b3IocHVibGljIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xyXG4gICAqICAgICB0aGlzLnBsYXRmb3JtLnJlYWR5KCkudGhlbigocmVhZHlTb3VyY2UpID0+IHtcclxuICAgKiAgICAgICBjb25zb2xlLmxvZygnUGxhdGZvcm0gcmVhZHkgZnJvbScsIHJlYWR5U291cmNlKTtcclxuICAgKiAgICAgICAvLyBQbGF0Zm9ybSBub3cgcmVhZHksIGV4ZWN1dGUgYW55IHJlcXVpcmVkIG5hdGl2ZSBjb2RlXHJcbiAgICogICAgIH0pO1xyXG4gICAqICAgfVxyXG4gICAqIH1cclxuICAgKiBgYGBcclxuICAgKi9cclxuICByZWFkeSgpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlYWR5UHJvbWlzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgaWYgdGhpcyBhcHAgaXMgdXNpbmcgcmlnaHQtdG8tbGVmdCBsYW5ndWFnZSBkaXJlY3Rpb24gb3Igbm90LlxyXG4gICAqIFdlIHJlY29tbWVuZCB0aGUgYXBwJ3MgYGluZGV4Lmh0bWxgIGZpbGUgYWxyZWFkeSBoYXMgdGhlIGNvcnJlY3QgYGRpcmBcclxuICAgKiBhdHRyaWJ1dGUgdmFsdWUgc2V0LCBzdWNoIGFzIGA8aHRtbCBkaXI9XCJsdHJcIj5gIG9yIGA8aHRtbCBkaXI9XCJydGxcIj5gLlxyXG4gICAqIFtXM0M6IFN0cnVjdHVyYWwgbWFya3VwIGFuZCByaWdodC10by1sZWZ0IHRleHQgaW4gSFRNTF0oaHR0cDovL3d3dy53My5vcmcvSW50ZXJuYXRpb25hbC9xdWVzdGlvbnMvcWEtaHRtbC1kaXIpXHJcbiAgICovXHJcbiAgZ2V0IGlzUlRMKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZG9jLmRpciA9PT0gJ3J0bCc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJcclxuICAgKi9cclxuICBnZXRRdWVyeVBhcmFtKGtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gcmVhZFF1ZXJ5UGFyYW0odGhpcy53aW4ubG9jYXRpb24uaHJlZiwga2V5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBhcHAgaXMgaW4gbGFuZHNjYXBlIG1vZGUuXHJcbiAgICovXHJcbiAgaXNMYW5kc2NhcGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIXRoaXMuaXNQb3J0cmFpdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFwcCBpcyBpbiBwb3J0YWl0IG1vZGUuXHJcbiAgICovXHJcbiAgaXNQb3J0cmFpdCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLndpbi5tYXRjaE1lZGlhICYmIHRoaXMud2luLm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogcG9ydHJhaXQpJykubWF0Y2hlcztcclxuICB9XHJcblxyXG4gIHRlc3RVc2VyQWdlbnQoZXhwcmVzc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBuYXYgPSB0aGlzLndpbi5uYXZpZ2F0b3I7XHJcbiAgICByZXR1cm4gISEobmF2ICYmIG5hdi51c2VyQWdlbnQgJiYgbmF2LnVzZXJBZ2VudC5pbmRleE9mKGV4cHJlc3Npb24pID49IDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IHVybC5cclxuICAgKi9cclxuICB1cmwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aW4ubG9jYXRpb24uaHJlZjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSBwbGF0Zm9ybSdzIHZpZXdwb3J0IHVzaW5nIGB3aW5kb3cuaW5uZXJXaWR0aGAuXHJcbiAgICovXHJcbiAgd2lkdGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aW4uaW5uZXJXaWR0aDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGhlaWdodCBvZiB0aGUgcGxhdGZvcm0ncyB2aWV3cG9ydCB1c2luZyBgd2luZG93LmlubmVySGVpZ2h0YC5cclxuICAgKi9cclxuICBoZWlnaHQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLndpbi5pbm5lckhlaWdodDtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHJlYWRRdWVyeVBhcmFtID0gKHVybDogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gIGtleSA9IGtleS5yZXBsYWNlKC9bXFxbXS8sICdcXFxcWycpLnJlcGxhY2UoL1tcXF1dLywgJ1xcXFxdJyk7XHJcbiAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdbXFxcXD8mXScgKyBrZXkgKyAnPShbXiYjXSopJyk7XHJcbiAgY29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuICByZXR1cm4gcmVzdWx0cyA/IGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKSA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBwcm94eUV2ZW50ID0gPFQ+KGVtaXR0ZXI6IFN1YmplY3Q8VD4sIGVsOiBFdmVudFRhcmdldCwgZXZlbnROYW1lOiBzdHJpbmcpID0+IHtcclxuICBpZiAoKGVsIGFzIGFueSkpIHtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCAoZXY6IEV2ZW50IHwgdW5kZWZpbmVkIHwgbnVsbCkgPT4ge1xyXG4gICAgICAvLyA/PyBjb3Jkb3ZhIG1pZ2h0IGVtaXQgXCJudWxsXCIgZXZlbnRzXHJcbiAgICAgIGVtaXR0ZXIubmV4dChldiAhPSBudWxsID8gKGV2IGFzIGFueSkuZGV0YWlsIGFzIFQgOiB1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iXX0=