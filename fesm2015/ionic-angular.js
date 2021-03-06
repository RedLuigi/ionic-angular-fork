import { __decorate, __param, __awaiter } from 'tslib';
import { HostListener, Injector, ElementRef, Directive, Inject, NgZone, ɵɵdefineInjectable, ɵɵinject, Injectable, Optional, ChangeDetectorRef, Component, ChangeDetectionStrategy, InjectionToken, ApplicationRef, EventEmitter, ViewContainerRef, ComponentFactoryResolver, Attribute, SkipSelf, Output, ViewChild, ContentChild, TemplateRef, IterableDiffers, APP_INITIALIZER, NgModule } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT, Location, LocationStrategy, CommonModule } from '@angular/common';
import { NavigationStart, UrlSerializer, Router, PRIMARY_OUTLET, ActivatedRoute, ChildrenOutletContexts, RouterLink } from '@angular/router';
import { isPlatform, getPlatforms, LIFECYCLE_WILL_ENTER, LIFECYCLE_DID_ENTER, LIFECYCLE_WILL_LEAVE, LIFECYCLE_DID_LEAVE, LIFECYCLE_WILL_UNLOAD, actionSheetController, alertController, loadingController, menuController, pickerController, modalController, popoverController, toastController, createAnimation, getTimeGivenProgression, createGesture } from '@ionic/core';
export { IonicSafeString, createAnimation, getPlatforms, iosTransitionAnimation, isPlatform, mdTransitionAnimation } from '@ionic/core';
import { Subject, fromEvent, BehaviorSubject } from 'rxjs';
import { filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';

const raf = (h) => {
    if (typeof __zone_symbol__requestAnimationFrame === 'function') {
        return __zone_symbol__requestAnimationFrame(h);
    }
    if (typeof requestAnimationFrame === 'function') {
        return requestAnimationFrame(h);
    }
    return setTimeout(h);
};

class ValueAccessor {
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
__decorate([
    HostListener('ionBlur', ['$event.target'])
], ValueAccessor.prototype, "_handleBlurEvent", null);
const setIonicClasses = (element) => {
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

var BooleanValueAccessor_1;
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
__decorate([
    HostListener('ionChange', ['$event.target'])
], BooleanValueAccessor.prototype, "_handleIonChange", null);
BooleanValueAccessor = BooleanValueAccessor_1 = __decorate([
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

var NumericValueAccessor_1;
let NumericValueAccessor = NumericValueAccessor_1 = class NumericValueAccessor extends ValueAccessor {
    constructor(injector, el) {
        super(injector, el);
    }
    _handleIonChange(el) {
        this.handleChangeEvent(el, el.value);
    }
    registerOnChange(fn) {
        super.registerOnChange(value => {
            fn(value === '' ? null : parseFloat(value));
        });
    }
};
NumericValueAccessor.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef }
];
__decorate([
    HostListener('ionChange', ['$event.target'])
], NumericValueAccessor.prototype, "_handleIonChange", null);
NumericValueAccessor = NumericValueAccessor_1 = __decorate([
    Directive({
        /* tslint:disable-next-line:directive-selector */
        selector: 'ion-input[type=number]',
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: NumericValueAccessor_1,
                multi: true
            }
        ]
    })
], NumericValueAccessor);

var RadioValueAccessor_1;
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
__decorate([
    HostListener('ionSelect', ['$event.target'])
], RadioValueAccessor.prototype, "_handleIonSelect", null);
RadioValueAccessor = RadioValueAccessor_1 = __decorate([
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

var SelectValueAccessor_1;
let SelectValueAccessor = SelectValueAccessor_1 = class SelectValueAccessor extends ValueAccessor {
    constructor(injector, el) {
        super(injector, el);
    }
    _handleChangeEvent(el) {
        this.handleChangeEvent(el, el.value);
    }
};
SelectValueAccessor.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef }
];
__decorate([
    HostListener('ionChange', ['$event.target'])
], SelectValueAccessor.prototype, "_handleChangeEvent", null);
SelectValueAccessor = SelectValueAccessor_1 = __decorate([
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

var TextValueAccessor_1;
let TextValueAccessor = TextValueAccessor_1 = class TextValueAccessor extends ValueAccessor {
    constructor(injector, el) {
        super(injector, el);
    }
    _handleInputEvent(el) {
        this.handleChangeEvent(el, el.value);
    }
};
TextValueAccessor.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef }
];
__decorate([
    HostListener('ionChange', ['$event.target'])
], TextValueAccessor.prototype, "_handleInputEvent", null);
TextValueAccessor = TextValueAccessor_1 = __decorate([
    Directive({
        /* tslint:disable-next-line:directive-selector */
        selector: 'ion-input:not([type=number]),ion-textarea,ion-searchbar',
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: TextValueAccessor_1,
                multi: true
            }
        ]
    })
], TextValueAccessor);

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
Platform.ngInjectableDef = ɵɵdefineInjectable({ factory: function Platform_Factory() { return new Platform(ɵɵinject(DOCUMENT), ɵɵinject(NgZone)); }, token: Platform, providedIn: "root" });
Platform = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __param(0, Inject(DOCUMENT))
], Platform);
const readQueryParam = (url, key) => {
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    const results = regex.exec(url);
    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
};
const ɵ0$1 = readQueryParam;
const proxyEvent = (emitter, el, eventName) => {
    if (el) {
        el.addEventListener(eventName, (ev) => {
            // ?? cordova might emit "null" events
            emitter.next(ev != null ? ev.detail : undefined);
        });
    }
};
const ɵ1$1 = proxyEvent;

let NavController = class NavController {
    constructor(platform, location, serializer, router) {
        this.location = location;
        this.serializer = serializer;
        this.router = router;
        this.direction = DEFAULT_DIRECTION;
        this.animated = DEFAULT_ANIMATED;
        this.guessDirection = 'forward';
        this.lastNavId = -1;
        // Subscribe to router events to detect direction
        if (router) {
            router.events.subscribe(ev => {
                if (ev instanceof NavigationStart) {
                    const id = (ev.restoredState) ? ev.restoredState.navigationId : ev.id;
                    this.guessDirection = id < this.lastNavId ? 'back' : 'forward';
                    this.guessAnimation = !ev.restoredState ? this.guessDirection : undefined;
                    this.lastNavId = this.guessDirection === 'forward' ? ev.id : id;
                }
            });
        }
        // Subscribe to backButton events
        platform.backButton.subscribeWithPriority(0, processNextHandler => {
            this.pop();
            processNextHandler();
        });
    }
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling `this.router.navigateByUrl()`, but it's explicit about the **direction** of the transition.
     *
     * Going **forward** means that a new page is going to be pushed to the stack of the outlet (ion-router-outlet),
     * and that it will show a "forward" animation by default.
     *
     * Navigating forward can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="forward">Link</a>
     * ```
     */
    navigateForward(url, options = {}) {
        this.setDirection('forward', options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
    }
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling:
     *
     * ```ts
     * this.navController.setDirection('back');
     * this.router.navigateByUrl(path);
     * ```
     *
     * Going **back** means that all the pages in the stack until the navigated page is found will be popped,
     * and that it will show a "back" animation by default.
     *
     * Navigating back can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="back">Link</a>
     * ```
     */
    navigateBack(url, options = {}) {
        this.setDirection('back', options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
    }
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling:
     *
     * ```ts
     * this.navController.setDirection('root');
     * this.router.navigateByUrl(path);
     * ```
     *
     * Going **root** means that all existing pages in the stack will be removed,
     * and the navigated page will become the single page in the stack.
     *
     * Navigating root can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="root">Link</a>
     * ```
     */
    navigateRoot(url, options = {}) {
        this.setDirection('root', options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
    }
    /**
     * Same as [Location](https://angular.io/api/common/Location)'s back() method.
     * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
     * by default.
     */
    back(options = { animated: true, animationDirection: 'back' }) {
        this.setDirection('back', options.animated, options.animationDirection, options.animation);
        return this.location.back();
    }
    /**
     * This methods goes back in the context of Ionic's stack navigation.
     *
     * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
     * This is the recommended way to go back when you are using `ion-router-outlet`.
     */
    pop() {
        return __awaiter(this, void 0, void 0, function* () {
            let outlet = this.topOutlet;
            while (outlet) {
                if (yield outlet.pop()) {
                    break;
                }
                else {
                    outlet = outlet.parentOutlet;
                }
            }
        });
    }
    /**
     * This methods specifies the direction of the next navigation performed by the Angular router.
     *
     * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
     *
     * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
     */
    setDirection(direction, animated, animationDirection, animationBuilder) {
        this.direction = direction;
        this.animated = getAnimation(direction, animated, animationDirection);
        this.animationBuilder = animationBuilder;
    }
    /**
     * @internal
     */
    setTopOutlet(outlet) {
        this.topOutlet = outlet;
    }
    /**
     * @internal
     */
    consumeTransition() {
        let direction = 'root';
        let animation;
        const animationBuilder = this.animationBuilder;
        if (this.direction === 'auto') {
            direction = this.guessDirection;
            animation = this.guessAnimation;
        }
        else {
            animation = this.animated;
            direction = this.direction;
        }
        this.direction = DEFAULT_DIRECTION;
        this.animated = DEFAULT_ANIMATED;
        this.animationBuilder = undefined;
        return {
            direction,
            animation,
            animationBuilder
        };
    }
    navigate(url, options) {
        if (Array.isArray(url)) {
            return this.router.navigate(url, options);
        }
        else {
            /**
             * navigateByUrl ignores any properties that
             * would change the url, so things like queryParams
             * would be ignored unless we create a url tree
             * More Info: https://github.com/angular/angular/issues/18798
             */
            const urlTree = this.serializer.parse(url.toString());
            if (options.queryParams !== undefined) {
                urlTree.queryParams = Object.assign({}, options.queryParams);
            }
            if (options.fragment !== undefined) {
                urlTree.fragment = options.fragment;
            }
            /**
             * `navigateByUrl` will still apply `NavigationExtras` properties
             * that do not modify the url, such as `replaceUrl` which is why
             * `options` is passed in here.
             */
            return this.router.navigateByUrl(urlTree, options);
        }
    }
};
NavController.ctorParameters = () => [
    { type: Platform },
    { type: Location },
    { type: UrlSerializer },
    { type: Router, decorators: [{ type: Optional }] }
];
NavController.ngInjectableDef = ɵɵdefineInjectable({ factory: function NavController_Factory() { return new NavController(ɵɵinject(Platform), ɵɵinject(Location), ɵɵinject(UrlSerializer), ɵɵinject(Router, 8)); }, token: NavController, providedIn: "root" });
NavController = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __param(3, Optional())
], NavController);
const getAnimation = (direction, animated, animationDirection) => {
    if (animated === false) {
        return undefined;
    }
    if (animationDirection !== undefined) {
        return animationDirection;
    }
    if (direction === 'forward' || direction === 'back') {
        return direction;
    }
    else if (direction === 'root' && animated === true) {
        return 'forward';
    }
    return undefined;
};
const ɵ0$2 = getAnimation;
const DEFAULT_DIRECTION = 'auto';
const DEFAULT_ANIMATED = undefined;

/* eslint-disable */
const proxyInputs = (Cmp, inputs) => {
    const Prototype = Cmp.prototype;
    inputs.forEach(item => {
        Object.defineProperty(Prototype, item, {
            get() {
                return this.el[item];
            },
            set(val) {
                this.z.runOutsideAngular(() => (this.el[item] = val));
            }
        });
    });
};
const proxyMethods = (Cmp, methods) => {
    const Prototype = Cmp.prototype;
    methods.forEach(methodName => {
        Prototype[methodName] = function () {
            const args = arguments;
            return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
        };
    });
};
const proxyOutputs = (instance, el, events) => {
    events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
};
function ProxyCmp(opts) {
    const decorator = function (cls) {
        if (opts.inputs) {
            proxyInputs(cls, opts.inputs);
        }
        if (opts.methods) {
            proxyMethods(cls, opts.methods);
        }
        return cls;
    };
    return decorator;
}

let IonApp = class IonApp {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonApp.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonApp = __decorate([
    Component({ selector: "ion-app", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
], IonApp);
let IonAvatar = class IonAvatar {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonAvatar.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonAvatar = __decorate([
    Component({ selector: "ion-avatar", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
], IonAvatar);
let IonBackButton = class IonBackButton {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonBackButton.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonBackButton = __decorate([
    ProxyCmp({ inputs: ["color", "defaultHref", "disabled", "icon", "mode", "routerAnimation", "text", "type"] }),
    Component({ selector: "ion-back-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "defaultHref", "disabled", "icon", "mode", "routerAnimation", "text", "type"] })
], IonBackButton);
let IonBackdrop = class IonBackdrop {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionBackdropTap"]);
    }
};
IonBackdrop.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonBackdrop = __decorate([
    ProxyCmp({ inputs: ["stopPropagation", "tappable", "visible"] }),
    Component({ selector: "ion-backdrop", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["stopPropagation", "tappable", "visible"] })
], IonBackdrop);
let IonBadge = class IonBadge {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonBadge.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonBadge = __decorate([
    ProxyCmp({ inputs: ["color", "mode"] }),
    Component({ selector: "ion-badge", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
], IonBadge);
let IonButton = class IonButton {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionFocus", "ionBlur"]);
    }
};
IonButton.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonButton = __decorate([
    ProxyCmp({ inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }),
    Component({ selector: "ion-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] })
], IonButton);
let IonButtons = class IonButtons {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonButtons.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonButtons = __decorate([
    ProxyCmp({ inputs: ["collapse"] }),
    Component({ selector: "ion-buttons", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["collapse"] })
], IonButtons);
let IonCard = class IonCard {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonCard.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonCard = __decorate([
    ProxyCmp({ inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] }),
    Component({ selector: "ion-card", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] })
], IonCard);
let IonCardContent = class IonCardContent {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonCardContent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonCardContent = __decorate([
    ProxyCmp({ inputs: ["mode"] }),
    Component({ selector: "ion-card-content", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode"] })
], IonCardContent);
let IonCardHeader = class IonCardHeader {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonCardHeader.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonCardHeader = __decorate([
    ProxyCmp({ inputs: ["color", "mode", "translucent"] }),
    Component({ selector: "ion-card-header", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "translucent"] })
], IonCardHeader);
let IonCardSubtitle = class IonCardSubtitle {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonCardSubtitle.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonCardSubtitle = __decorate([
    ProxyCmp({ inputs: ["color", "mode"] }),
    Component({ selector: "ion-card-subtitle", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
], IonCardSubtitle);
let IonCardTitle = class IonCardTitle {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonCardTitle.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonCardTitle = __decorate([
    ProxyCmp({ inputs: ["color", "mode"] }),
    Component({ selector: "ion-card-title", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
], IonCardTitle);
let IonCheckbox = class IonCheckbox {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
    }
};
IonCheckbox.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonCheckbox = __decorate([
    ProxyCmp({ inputs: ["checked", "color", "disabled", "indeterminate", "mode", "name", "value"] }),
    Component({ selector: "ion-checkbox", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["checked", "color", "disabled", "indeterminate", "mode", "name", "value"] })
], IonCheckbox);
let IonChip = class IonChip {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonChip.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonChip = __decorate([
    ProxyCmp({ inputs: ["color", "mode", "outline"] }),
    Component({ selector: "ion-chip", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "outline"] })
], IonChip);
let IonCol = class IonCol {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonCol.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonCol = __decorate([
    ProxyCmp({ inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"] }),
    Component({ selector: "ion-col", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"] })
], IonCol);
let IonContent = class IonContent {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionScrollStart", "ionScroll", "ionScrollEnd"]);
    }
};
IonContent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonContent = __decorate([
    ProxyCmp({ inputs: ["color", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"], "methods": ["getScrollElement", "scrollToTop", "scrollToBottom", "scrollByPoint", "scrollToPoint"] }),
    Component({ selector: "ion-content", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"] })
], IonContent);
let IonDatetime = class IonDatetime {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionCancel", "ionChange", "ionFocus", "ionBlur"]);
    }
};
IonDatetime.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonDatetime = __decorate([
    ProxyCmp({ inputs: ["cancelText", "dayNames", "dayShortNames", "dayValues", "disabled", "displayFormat", "displayTimezone", "doneText", "hourValues", "max", "min", "minuteValues", "mode", "monthNames", "monthShortNames", "monthValues", "name", "pickerFormat", "pickerOptions", "placeholder", "readonly", "value", "yearValues"], "methods": ["open"] }),
    Component({ selector: "ion-datetime", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["cancelText", "dayNames", "dayShortNames", "dayValues", "disabled", "displayFormat", "displayTimezone", "doneText", "hourValues", "max", "min", "minuteValues", "mode", "monthNames", "monthShortNames", "monthValues", "name", "pickerFormat", "pickerOptions", "placeholder", "readonly", "value", "yearValues"] })
], IonDatetime);
let IonFab = class IonFab {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonFab.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonFab = __decorate([
    ProxyCmp({ inputs: ["activated", "edge", "horizontal", "vertical"], "methods": ["close"] }),
    Component({ selector: "ion-fab", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["activated", "edge", "horizontal", "vertical"] })
], IonFab);
let IonFabButton = class IonFabButton {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionFocus", "ionBlur"]);
    }
};
IonFabButton.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonFabButton = __decorate([
    ProxyCmp({ inputs: ["activated", "closeIcon", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"] }),
    Component({ selector: "ion-fab-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["activated", "closeIcon", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"] })
], IonFabButton);
let IonFabList = class IonFabList {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonFabList.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonFabList = __decorate([
    ProxyCmp({ inputs: ["activated", "side"] }),
    Component({ selector: "ion-fab-list", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["activated", "side"] })
], IonFabList);
let IonFooter = class IonFooter {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonFooter.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonFooter = __decorate([
    ProxyCmp({ inputs: ["mode", "translucent"] }),
    Component({ selector: "ion-footer", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode", "translucent"] })
], IonFooter);
let IonGrid = class IonGrid {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonGrid.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonGrid = __decorate([
    ProxyCmp({ inputs: ["fixed"] }),
    Component({ selector: "ion-grid", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["fixed"] })
], IonGrid);
let IonHeader = class IonHeader {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonHeader.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonHeader = __decorate([
    ProxyCmp({ inputs: ["collapse", "mode", "translucent"] }),
    Component({ selector: "ion-header", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["collapse", "mode", "translucent"] })
], IonHeader);
let IonIcon = class IonIcon {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonIcon.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonIcon = __decorate([
    ProxyCmp({ inputs: ["ariaLabel", "color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "size", "src"] }),
    Component({ selector: "ion-icon", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["ariaLabel", "color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "size", "src"] })
], IonIcon);
let IonImg = class IonImg {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionImgWillLoad", "ionImgDidLoad", "ionError"]);
    }
};
IonImg.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonImg = __decorate([
    ProxyCmp({ inputs: ["alt", "src"] }),
    Component({ selector: "ion-img", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["alt", "src"] })
], IonImg);
let IonInfiniteScroll = class IonInfiniteScroll {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionInfinite"]);
    }
};
IonInfiniteScroll.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonInfiniteScroll = __decorate([
    ProxyCmp({ inputs: ["disabled", "position", "threshold"], "methods": ["complete"] }),
    Component({ selector: "ion-infinite-scroll", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "position", "threshold"] })
], IonInfiniteScroll);
let IonInfiniteScrollContent = class IonInfiniteScrollContent {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonInfiniteScrollContent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonInfiniteScrollContent = __decorate([
    ProxyCmp({ inputs: ["loadingSpinner", "loadingText"] }),
    Component({ selector: "ion-infinite-scroll-content", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["loadingSpinner", "loadingText"] })
], IonInfiniteScrollContent);
let IonInput = class IonInput {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionInput", "ionChange", "ionBlur", "ionFocus"]);
    }
};
IonInput.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonInput = __decorate([
    ProxyCmp({ inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "spellcheck", "step", "type", "value"], "methods": ["setFocus", "getInputElement"] }),
    Component({ selector: "ion-input", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "spellcheck", "step", "type", "value"] })
], IonInput);
let IonItem = class IonItem {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonItem.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonItem = __decorate([
    ProxyCmp({ inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] }),
    Component({ selector: "ion-item", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] })
], IonItem);
let IonItemDivider = class IonItemDivider {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonItemDivider.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonItemDivider = __decorate([
    ProxyCmp({ inputs: ["color", "mode", "sticky"] }),
    Component({ selector: "ion-item-divider", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "sticky"] })
], IonItemDivider);
let IonItemGroup = class IonItemGroup {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonItemGroup.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonItemGroup = __decorate([
    Component({ selector: "ion-item-group", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
], IonItemGroup);
let IonItemOption = class IonItemOption {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonItemOption.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonItemOption = __decorate([
    ProxyCmp({ inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"] }),
    Component({ selector: "ion-item-option", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"] })
], IonItemOption);
let IonItemOptions = class IonItemOptions {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionSwipe"]);
    }
};
IonItemOptions.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonItemOptions = __decorate([
    ProxyCmp({ inputs: ["side"] }),
    Component({ selector: "ion-item-options", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["side"] })
], IonItemOptions);
let IonItemSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionDrag"]);
    }
};
IonItemSliding.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonItemSliding = __decorate([
    ProxyCmp({ inputs: ["disabled"], "methods": ["getOpenAmount", "getSlidingRatio", "open", "close", "closeOpened"] }),
    Component({ selector: "ion-item-sliding", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled"] })
], IonItemSliding);
let IonLabel = class IonLabel {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonLabel.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonLabel = __decorate([
    ProxyCmp({ inputs: ["color", "mode", "position"] }),
    Component({ selector: "ion-label", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "position"] })
], IonLabel);
let IonList = class IonList {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonList.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonList = __decorate([
    ProxyCmp({ inputs: ["inset", "lines", "mode"], "methods": ["closeSlidingItems"] }),
    Component({ selector: "ion-list", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["inset", "lines", "mode"] })
], IonList);
let IonListHeader = class IonListHeader {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonListHeader.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonListHeader = __decorate([
    ProxyCmp({ inputs: ["color", "lines", "mode"] }),
    Component({ selector: "ion-list-header", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "lines", "mode"] })
], IonListHeader);
let IonMenu = class IonMenu {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionWillOpen", "ionWillClose", "ionDidOpen", "ionDidClose"]);
    }
};
IonMenu.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonMenu = __decorate([
    ProxyCmp({ inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"], "methods": ["isOpen", "isActive", "open", "close", "toggle", "setOpen"] }),
    Component({ selector: "ion-menu", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"] })
], IonMenu);
let IonMenuButton = class IonMenuButton {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonMenuButton.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonMenuButton = __decorate([
    ProxyCmp({ inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"] }),
    Component({ selector: "ion-menu-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"] })
], IonMenuButton);
let IonMenuToggle = class IonMenuToggle {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonMenuToggle.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonMenuToggle = __decorate([
    ProxyCmp({ inputs: ["autoHide", "menu"] }),
    Component({ selector: "ion-menu-toggle", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoHide", "menu"] })
], IonMenuToggle);
let IonNav = class IonNav {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionNavWillChange", "ionNavDidChange"]);
    }
};
IonNav.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonNav = __decorate([
    ProxyCmp({ inputs: ["animated", "animation", "root", "rootParams", "swipeGesture"], "methods": ["push", "insert", "insertPages", "pop", "popTo", "popToRoot", "removeIndex", "setRoot", "setPages", "getActive", "getByIndex", "canGoBack", "getPrevious"] }),
    Component({ selector: "ion-nav", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["animated", "animation", "root", "rootParams", "swipeGesture"] })
], IonNav);
let IonNavLink = class IonNavLink {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonNavLink.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonNavLink = __decorate([
    ProxyCmp({ inputs: ["component", "componentProps", "routerAnimation", "routerDirection"] }),
    Component({ selector: "ion-nav-link", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["component", "componentProps", "routerAnimation", "routerDirection"] })
], IonNavLink);
let IonNote = class IonNote {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonNote.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonNote = __decorate([
    ProxyCmp({ inputs: ["color", "mode"] }),
    Component({ selector: "ion-note", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
], IonNote);
let IonProgressBar = class IonProgressBar {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonProgressBar.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonProgressBar = __decorate([
    ProxyCmp({ inputs: ["buffer", "color", "mode", "reversed", "type", "value"] }),
    Component({ selector: "ion-progress-bar", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["buffer", "color", "mode", "reversed", "type", "value"] })
], IonProgressBar);
let IonRadio = class IonRadio {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionFocus", "ionBlur"]);
    }
};
IonRadio.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonRadio = __decorate([
    ProxyCmp({ inputs: ["color", "disabled", "mode", "name", "value"] }),
    Component({ selector: "ion-radio", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "disabled", "mode", "name", "value"] })
], IonRadio);
let IonRadioGroup = class IonRadioGroup {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionChange"]);
    }
};
IonRadioGroup.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonRadioGroup = __decorate([
    ProxyCmp({ inputs: ["allowEmptySelection", "name", "value"] }),
    Component({ selector: "ion-radio-group", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["allowEmptySelection", "name", "value"] })
], IonRadioGroup);
let IonRange = class IonRange {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
    }
};
IonRange.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonRange = __decorate([
    ProxyCmp({ inputs: ["color", "debounce", "disabled", "dualKnobs", "max", "min", "mode", "name", "pin", "snaps", "step", "ticks", "value"] }),
    Component({ selector: "ion-range", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "debounce", "disabled", "dualKnobs", "max", "min", "mode", "name", "pin", "snaps", "step", "ticks", "value"] })
], IonRange);
let IonRefresher = class IonRefresher {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionRefresh", "ionPull", "ionStart"]);
    }
};
IonRefresher.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonRefresher = __decorate([
    ProxyCmp({ inputs: ["closeDuration", "disabled", "pullFactor", "pullMax", "pullMin", "snapbackDuration"], "methods": ["complete", "cancel", "getProgress"] }),
    Component({ selector: "ion-refresher", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["closeDuration", "disabled", "pullFactor", "pullMax", "pullMin", "snapbackDuration"] })
], IonRefresher);
let IonRefresherContent = class IonRefresherContent {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonRefresherContent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonRefresherContent = __decorate([
    ProxyCmp({ inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"] }),
    Component({ selector: "ion-refresher-content", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"] })
], IonRefresherContent);
let IonReorder = class IonReorder {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonReorder.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonReorder = __decorate([
    Component({ selector: "ion-reorder", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
], IonReorder);
let IonReorderGroup = class IonReorderGroup {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionItemReorder"]);
    }
};
IonReorderGroup.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonReorderGroup = __decorate([
    ProxyCmp({ inputs: ["disabled"], "methods": ["complete"] }),
    Component({ selector: "ion-reorder-group", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled"] })
], IonReorderGroup);
let IonRippleEffect = class IonRippleEffect {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonRippleEffect.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonRippleEffect = __decorate([
    ProxyCmp({ inputs: ["type"], "methods": ["addRipple"] }),
    Component({ selector: "ion-ripple-effect", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["type"] })
], IonRippleEffect);
let IonRow = class IonRow {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonRow.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonRow = __decorate([
    Component({ selector: "ion-row", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
], IonRow);
let IonSearchbar = class IonSearchbar {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionInput", "ionChange", "ionCancel", "ionClear", "ionBlur", "ionFocus"]);
    }
};
IonSearchbar.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSearchbar = __decorate([
    ProxyCmp({ inputs: ["animated", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "mode", "placeholder", "searchIcon", "showCancelButton", "spellcheck", "type", "value"], "methods": ["setFocus", "getInputElement"] }),
    Component({ selector: "ion-searchbar", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["animated", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "mode", "placeholder", "searchIcon", "showCancelButton", "spellcheck", "type", "value"] })
], IonSearchbar);
let IonSegment = class IonSegment {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionChange"]);
    }
};
IonSegment.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSegment = __decorate([
    ProxyCmp({ inputs: ["color", "disabled", "mode", "scrollable", "value"] }),
    Component({ selector: "ion-segment", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "disabled", "mode", "scrollable", "value"] })
], IonSegment);
let IonSegmentButton = class IonSegmentButton {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonSegmentButton.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSegmentButton = __decorate([
    ProxyCmp({ inputs: ["disabled", "layout", "mode", "type", "value"] }),
    Component({ selector: "ion-segment-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "layout", "mode", "type", "value"] })
], IonSegmentButton);
let IonSelect = class IonSelect {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionChange", "ionCancel", "ionFocus", "ionBlur"]);
    }
};
IonSelect.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSelect = __decorate([
    ProxyCmp({ inputs: ["cancelText", "compareWith", "disabled", "interface", "interfaceOptions", "mode", "multiple", "name", "okText", "placeholder", "selectedText", "value"], "methods": ["open"] }),
    Component({ selector: "ion-select", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["cancelText", "compareWith", "disabled", "interface", "interfaceOptions", "mode", "multiple", "name", "okText", "placeholder", "selectedText", "value"] })
], IonSelect);
let IonSelectOption = class IonSelectOption {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonSelectOption.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSelectOption = __decorate([
    ProxyCmp({ inputs: ["disabled", "value"] }),
    Component({ selector: "ion-select-option", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "value"] })
], IonSelectOption);
let IonSkeletonText = class IonSkeletonText {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonSkeletonText.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSkeletonText = __decorate([
    ProxyCmp({ inputs: ["animated"] }),
    Component({ selector: "ion-skeleton-text", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["animated"] })
], IonSkeletonText);
let IonSlide = class IonSlide {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonSlide.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSlide = __decorate([
    Component({ selector: "ion-slide", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
], IonSlide);
let IonSlides = class IonSlides {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionSlidesDidLoad", "ionSlideTap", "ionSlideDoubleTap", "ionSlideWillChange", "ionSlideDidChange", "ionSlideNextStart", "ionSlidePrevStart", "ionSlideNextEnd", "ionSlidePrevEnd", "ionSlideTransitionStart", "ionSlideTransitionEnd", "ionSlideDrag", "ionSlideReachStart", "ionSlideReachEnd", "ionSlideTouchStart", "ionSlideTouchEnd"]);
    }
};
IonSlides.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSlides = __decorate([
    ProxyCmp({ inputs: ["mode", "options", "pager", "scrollbar"], "methods": ["update", "updateAutoHeight", "slideTo", "slideNext", "slidePrev", "getActiveIndex", "getPreviousIndex", "length", "isEnd", "isBeginning", "startAutoplay", "stopAutoplay", "lockSwipeToNext", "lockSwipeToPrev", "lockSwipes", "getSwiper"] }),
    Component({ selector: "ion-slides", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode", "options", "pager", "scrollbar"] })
], IonSlides);
let IonSpinner = class IonSpinner {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonSpinner.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSpinner = __decorate([
    ProxyCmp({ inputs: ["color", "duration", "name", "paused"] }),
    Component({ selector: "ion-spinner", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "duration", "name", "paused"] })
], IonSpinner);
let IonSplitPane = class IonSplitPane {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionSplitPaneVisible"]);
    }
};
IonSplitPane.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonSplitPane = __decorate([
    ProxyCmp({ inputs: ["contentId", "disabled", "when"] }),
    Component({ selector: "ion-split-pane", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["contentId", "disabled", "when"] })
], IonSplitPane);
let IonTabBar = class IonTabBar {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonTabBar.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonTabBar = __decorate([
    ProxyCmp({ inputs: ["color", "mode", "selectedTab", "translucent"] }),
    Component({ selector: "ion-tab-bar", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "selectedTab", "translucent"] })
], IonTabBar);
let IonTabButton = class IonTabButton {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonTabButton.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonTabButton = __decorate([
    ProxyCmp({ inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"] }),
    Component({ selector: "ion-tab-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"] })
], IonTabButton);
let IonText = class IonText {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonText.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonText = __decorate([
    ProxyCmp({ inputs: ["color", "mode"] }),
    Component({ selector: "ion-text", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
], IonText);
let IonTextarea = class IonTextarea {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionChange", "ionInput", "ionBlur", "ionFocus"]);
    }
};
IonTextarea.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonTextarea = __decorate([
    ProxyCmp({ inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "spellcheck", "value", "wrap"], "methods": ["setFocus", "getInputElement"] }),
    Component({ selector: "ion-textarea", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "spellcheck", "value", "wrap"] })
], IonTextarea);
let IonThumbnail = class IonThumbnail {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonThumbnail.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonThumbnail = __decorate([
    Component({ selector: "ion-thumbnail", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
], IonThumbnail);
let IonTitle = class IonTitle {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonTitle.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonTitle = __decorate([
    ProxyCmp({ inputs: ["color", "size"] }),
    Component({ selector: "ion-title", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "size"] })
], IonTitle);
let IonToggle = class IonToggle {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
    }
};
IonToggle.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonToggle = __decorate([
    ProxyCmp({ inputs: ["checked", "color", "disabled", "mode", "name", "value"] }),
    Component({ selector: "ion-toggle", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["checked", "color", "disabled", "mode", "name", "value"] })
], IonToggle);
let IonToolbar = class IonToolbar {
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
IonToolbar.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
IonToolbar = __decorate([
    ProxyCmp({ inputs: ["color", "mode"] }),
    Component({ selector: "ion-toolbar", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
], IonToolbar);

let Config = class Config {
    get(key, fallback) {
        const c = getConfig();
        if (c) {
            return c.get(key, fallback);
        }
        return null;
    }
    getBoolean(key, fallback) {
        const c = getConfig();
        if (c) {
            return c.getBoolean(key, fallback);
        }
        return false;
    }
    getNumber(key, fallback) {
        const c = getConfig();
        if (c) {
            return c.getNumber(key, fallback);
        }
        return 0;
    }
    set(key, value) {
        console.warn(`[DEPRECATION][Config]: The Config.set() method is deprecated and will be removed in Ionic Framework 6.0. Please see https://ionicframework.com/docs/angular/config for alternatives.`);
        const c = getConfig();
        if (c) {
            c.set(key, value);
        }
    }
};
Config.ngInjectableDef = ɵɵdefineInjectable({ factory: function Config_Factory() { return new Config(); }, token: Config, providedIn: "root" });
Config = __decorate([
    Injectable({
        providedIn: 'root'
    })
], Config);
const ConfigToken = new InjectionToken('USERCONFIG');
const getConfig = () => {
    if (typeof window !== 'undefined') {
        const Ionic = window.Ionic;
        if (Ionic && Ionic.config) {
            return Ionic.config;
        }
    }
    return null;
};
const ɵ0$3 = getConfig;

/**
 * @description
 * NavParams are an object that exists on a page and can contain data for that particular view.
 * Similar to how data was pass to a view in V1 with `$stateParams`, NavParams offer a much more flexible
 * option with a simple `get` method.
 *
 * @usage
 * ```ts
 * import { NavParams } from '@ionic/angular';
 *
 * export class MyClass{
 *
 *  constructor(navParams: NavParams){
 *    // userParams is an object we have in our nav-parameters
 *    navParams.get('userParams');
 *  }
 *
 * }
 * ```
 */
class NavParams {
    constructor(data = {}) {
        this.data = data;
    }
    /**
     * Get the value of a nav-parameter for the current view
     *
     * ```ts
     * import { NavParams } from 'ionic-angular';
     *
     * export class MyClass{
     *  constructor(public navParams: NavParams){
     *    // userParams is an object we have in our nav-parameters
     *    this.navParams.get('userParams');
     *  }
     * }
     * ```
     *
     * @param param Which param you want to look up
     */
    get(param) {
        return this.data[param];
    }
}

let AngularDelegate = class AngularDelegate {
    constructor(zone, appRef) {
        this.zone = zone;
        this.appRef = appRef;
    }
    create(resolver, injector, location) {
        return new AngularFrameworkDelegate(resolver, injector, location, this.appRef, this.zone);
    }
};
AngularDelegate.ctorParameters = () => [
    { type: NgZone },
    { type: ApplicationRef }
];
AngularDelegate = __decorate([
    Injectable()
], AngularDelegate);
class AngularFrameworkDelegate {
    constructor(resolver, injector, location, appRef, zone) {
        this.resolver = resolver;
        this.injector = injector;
        this.location = location;
        this.appRef = appRef;
        this.zone = zone;
        this.elRefMap = new WeakMap();
        this.elEventsMap = new WeakMap();
    }
    attachViewToDom(container, component, params, cssClasses) {
        return this.zone.run(() => {
            return new Promise(resolve => {
                const el = attachView(this.zone, this.resolver, this.injector, this.location, this.appRef, this.elRefMap, this.elEventsMap, container, component, params, cssClasses);
                resolve(el);
            });
        });
    }
    removeViewFromDom(_container, component) {
        return this.zone.run(() => {
            return new Promise(resolve => {
                const componentRef = this.elRefMap.get(component);
                if (componentRef) {
                    componentRef.destroy();
                    this.elRefMap.delete(component);
                    const unbindEvents = this.elEventsMap.get(component);
                    if (unbindEvents) {
                        unbindEvents();
                        this.elEventsMap.delete(component);
                    }
                }
                resolve();
            });
        });
    }
}
const attachView = (zone, resolver, injector, location, appRef, elRefMap, elEventsMap, container, component, params, cssClasses) => {
    const factory = resolver.resolveComponentFactory(component);
    const childInjector = Injector.create({
        providers: getProviders(params),
        parent: injector
    });
    const componentRef = (location)
        ? location.createComponent(factory, location.length, childInjector)
        : factory.create(childInjector);
    const instance = componentRef.instance;
    const hostElement = componentRef.location.nativeElement;
    if (params) {
        Object.assign(instance, params);
    }
    if (cssClasses) {
        for (const clazz of cssClasses) {
            hostElement.classList.add(clazz);
        }
    }
    const unbindEvents = bindLifecycleEvents(zone, instance, hostElement);
    container.appendChild(hostElement);
    if (!location) {
        appRef.attachView(componentRef.hostView);
    }
    componentRef.changeDetectorRef.reattach();
    elRefMap.set(hostElement, componentRef);
    elEventsMap.set(hostElement, unbindEvents);
    return hostElement;
};
const LIFECYCLES = [
    LIFECYCLE_WILL_ENTER,
    LIFECYCLE_DID_ENTER,
    LIFECYCLE_WILL_LEAVE,
    LIFECYCLE_DID_LEAVE,
    LIFECYCLE_WILL_UNLOAD
];
const bindLifecycleEvents = (zone, instance, element) => {
    return zone.run(() => {
        const unregisters = LIFECYCLES
            .filter(eventName => typeof instance[eventName] === 'function')
            .map(eventName => {
            const handler = (ev) => instance[eventName](ev.detail);
            element.addEventListener(eventName, handler);
            return () => element.removeEventListener(eventName, handler);
        });
        return () => unregisters.forEach(fn => fn());
    });
};
const NavParamsToken = new InjectionToken('NavParamsToken');
const getProviders = (params) => {
    return [
        {
            provide: NavParamsToken, useValue: params
        },
        {
            provide: NavParams, useFactory: provideNavParamsInjectable, deps: [NavParamsToken]
        }
    ];
};
const ɵ0$4 = getProviders;
const provideNavParamsInjectable = (params) => {
    return new NavParams(params);
};
const ɵ1$2 = provideNavParamsInjectable;

const insertView = (views, view, direction) => {
    if (direction === 'root') {
        return setRoot(views, view);
    }
    else if (direction === 'forward') {
        return setForward(views, view);
    }
    else {
        return setBack(views, view);
    }
};
const setRoot = (views, view) => {
    views = views.filter(v => v.stackId !== view.stackId);
    views.push(view);
    return views;
};
const ɵ0$5 = setRoot;
const setForward = (views, view) => {
    const index = views.indexOf(view);
    if (index >= 0) {
        views = views.filter(v => v.stackId !== view.stackId || v.id <= view.id);
    }
    else {
        views.push(view);
    }
    return views;
};
const ɵ1$3 = setForward;
const setBack = (views, view) => {
    const index = views.indexOf(view);
    if (index >= 0) {
        return views.filter(v => v.stackId !== view.stackId || v.id <= view.id);
    }
    else {
        return setRoot(views, view);
    }
};
const ɵ2$1 = setBack;
const getUrl = (router, activatedRoute) => {
    const urlTree = router.createUrlTree(['.'], { relativeTo: activatedRoute });
    return router.serializeUrl(urlTree);
};
const isTabSwitch = (enteringView, leavingView) => {
    if (!leavingView) {
        return true;
    }
    return enteringView.stackId !== leavingView.stackId;
};
const computeStackId = (prefixUrl, url) => {
    if (!prefixUrl) {
        return undefined;
    }
    const segments = toSegments(url);
    for (let i = 0; i < segments.length; i++) {
        if (i >= prefixUrl.length) {
            return segments[i];
        }
        if (segments[i] !== prefixUrl[i]) {
            return undefined;
        }
    }
    return undefined;
};
const toSegments = (path) => {
    return path
        .split('/')
        .map(s => s.trim())
        .filter(s => s !== '');
};
const destroyView = (view) => {
    if (view) {
        // TODO lifecycle event
        view.ref.destroy();
        view.unlistenEvents();
    }
};

class StackController {
    constructor(tabsPrefix, containerEl, router, navCtrl, zone, location) {
        this.containerEl = containerEl;
        this.router = router;
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.location = location;
        this.views = [];
        this.skipTransition = false;
        this.nextId = 0;
        this.tabsPrefix = tabsPrefix !== undefined ? toSegments(tabsPrefix) : undefined;
    }
    createView(ref, activatedRoute) {
        const url = getUrl(this.router, activatedRoute);
        const element = (ref && ref.location && ref.location.nativeElement);
        const unlistenEvents = bindLifecycleEvents(this.zone, ref.instance, element);
        return {
            id: this.nextId++,
            stackId: computeStackId(this.tabsPrefix, url),
            unlistenEvents,
            element,
            ref,
            url,
        };
    }
    getExistingView(activatedRoute) {
        const activatedUrlKey = getUrl(this.router, activatedRoute);
        const view = this.views.find(vw => vw.url === activatedUrlKey);
        if (view) {
            view.ref.changeDetectorRef.reattach();
        }
        return view;
    }
    setActive(enteringView) {
        const consumeResult = this.navCtrl.consumeTransition();
        let { direction, animation, animationBuilder } = consumeResult;
        const leavingView = this.activeView;
        const tabSwitch = isTabSwitch(enteringView, leavingView);
        if (tabSwitch) {
            direction = 'back';
            animation = undefined;
        }
        const viewsSnapshot = this.views.slice();
        let currentNavigation;
        const router = this.router;
        // Angular >= 7.2.0
        if (router.getCurrentNavigation) {
            currentNavigation = router.getCurrentNavigation();
            // Angular < 7.2.0
        }
        else if (router.navigations &&
            router.navigations.value) {
            currentNavigation = router.navigations.value;
        }
        /**
         * If the navigation action
         * sets `replaceUrl: true`
         * then we need to make sure
         * we remove the last item
         * from our views stack
         */
        if (currentNavigation &&
            currentNavigation.extras &&
            currentNavigation.extras.replaceUrl) {
            if (this.views.length > 0) {
                this.views.splice(-1, 1);
            }
        }
        const reused = this.views.includes(enteringView);
        const views = this.insertView(enteringView, direction);
        // Trigger change detection before transition starts
        // This will call ngOnInit() the first time too, just after the view
        // was attached to the dom, but BEFORE the transition starts
        if (!reused) {
            enteringView.ref.changeDetectorRef.detectChanges();
        }
        /**
         * If we are going back from a page that
         * was presented using a custom animation
         * we should default to using that
         * unless the developer explicitly
         * provided another animation.
         */
        const customAnimation = enteringView.animationBuilder;
        if (animationBuilder === undefined &&
            direction === 'back' &&
            !tabSwitch &&
            customAnimation !== undefined) {
            animationBuilder = customAnimation;
        }
        /**
         * Save any custom animation so that navigating
         * back will use this custom animation by default.
         */
        if (leavingView) {
            leavingView.animationBuilder = animationBuilder;
        }
        // Wait until previous transitions finish
        return this.zone.runOutsideAngular(() => {
            return this.wait(() => {
                // disconnect leaving page from change detection to
                // reduce jank during the page transition
                if (leavingView) {
                    leavingView.ref.changeDetectorRef.detach();
                }
                // In case the enteringView is the same as the leavingPage we need to reattach()
                enteringView.ref.changeDetectorRef.reattach();
                return this.transition(enteringView, leavingView, animation, this.canGoBack(1), false, animationBuilder)
                    .then(() => cleanupAsync(enteringView, views, viewsSnapshot, this.location))
                    .then(() => ({
                    enteringView,
                    direction,
                    animation,
                    tabSwitch
                }));
            });
        });
    }
    canGoBack(deep, stackId = this.getActiveStackId()) {
        return this.getStack(stackId).length > deep;
    }
    pop(deep, stackId = this.getActiveStackId()) {
        return this.zone.run(() => {
            const views = this.getStack(stackId);
            if (views.length <= deep) {
                return Promise.resolve(false);
            }
            const view = views[views.length - deep - 1];
            let url = view.url;
            const viewSavedData = view.savedData;
            if (viewSavedData) {
                const primaryOutlet = viewSavedData.get('primary');
                if (primaryOutlet &&
                    primaryOutlet.route &&
                    primaryOutlet.route._routerState &&
                    primaryOutlet.route._routerState.snapshot &&
                    primaryOutlet.route._routerState.snapshot.url) {
                    url = primaryOutlet.route._routerState.snapshot.url;
                }
            }
            const { animationBuilder } = this.navCtrl.consumeTransition();
            return this.navCtrl.navigateBack(url, Object.assign({}, view.savedExtras, { animation: animationBuilder })).then(() => true);
        });
    }
    startBackTransition() {
        const leavingView = this.activeView;
        if (leavingView) {
            const views = this.getStack(leavingView.stackId);
            const enteringView = views[views.length - 2];
            const customAnimation = enteringView.animationBuilder;
            return this.wait(() => {
                return this.transition(enteringView, // entering view
                leavingView, // leaving view
                'back', this.canGoBack(2), true, customAnimation);
            });
        }
        return Promise.resolve();
    }
    endBackTransition(shouldComplete) {
        if (shouldComplete) {
            this.skipTransition = true;
            this.pop(1);
        }
        else if (this.activeView) {
            cleanup(this.activeView, this.views, this.views, this.location);
        }
    }
    getLastUrl(stackId) {
        const views = this.getStack(stackId);
        return views.length > 0 ? views[views.length - 1] : undefined;
    }
    /**
     * @internal
     */
    getRootUrl(stackId) {
        const views = this.getStack(stackId);
        return views.length > 0 ? views[0] : undefined;
    }
    getActiveStackId() {
        return this.activeView ? this.activeView.stackId : undefined;
    }
    destroy() {
        this.containerEl = undefined;
        this.views.forEach(destroyView);
        this.activeView = undefined;
        this.views = [];
    }
    getStack(stackId) {
        return this.views.filter(v => v.stackId === stackId);
    }
    insertView(enteringView, direction) {
        this.activeView = enteringView;
        this.views = insertView(this.views, enteringView, direction);
        return this.views.slice();
    }
    transition(enteringView, leavingView, direction, showGoBack, progressAnimation, animationBuilder) {
        if (this.skipTransition) {
            this.skipTransition = false;
            return Promise.resolve(false);
        }
        if (leavingView === enteringView) {
            return Promise.resolve(false);
        }
        const enteringEl = enteringView ? enteringView.element : undefined;
        const leavingEl = leavingView ? leavingView.element : undefined;
        const containerEl = this.containerEl;
        if (enteringEl && enteringEl !== leavingEl) {
            enteringEl.classList.add('ion-page');
            enteringEl.classList.add('ion-page-invisible');
            if (enteringEl.parentElement !== containerEl) {
                containerEl.appendChild(enteringEl);
            }
            if (containerEl.commit) {
                return containerEl.commit(enteringEl, leavingEl, {
                    deepWait: true,
                    duration: direction === undefined ? 0 : undefined,
                    direction,
                    showGoBack,
                    progressAnimation,
                    animationBuilder
                });
            }
        }
        return Promise.resolve(false);
    }
    wait(task) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.runningTask !== undefined) {
                yield this.runningTask;
                this.runningTask = undefined;
            }
            const promise = this.runningTask = task();
            return promise;
        });
    }
}
const cleanupAsync = (activeRoute, views, viewsSnapshot, location) => {
    if (typeof requestAnimationFrame === 'function') {
        return new Promise(resolve => {
            requestAnimationFrame(() => {
                cleanup(activeRoute, views, viewsSnapshot, location);
                resolve();
            });
        });
    }
    return Promise.resolve();
};
const ɵ0$6 = cleanupAsync;
const cleanup = (activeRoute, views, viewsSnapshot, location) => {
    viewsSnapshot
        .filter(view => !views.includes(view))
        .forEach(destroyView);
    views.forEach(view => {
        /**
         * In the event that a user navigated multiple
         * times in rapid succession, we want to make sure
         * we don't pre-emptively detach a view while
         * it is in mid-transition.
         *
         * In this instance we also do not care about query
         * params or fragments as it will be the same view regardless
         */
        const locationWithoutParams = location.path().split('?')[0];
        const locationWithoutFragment = locationWithoutParams.split('#')[0];
        if (view !== activeRoute && view.url !== locationWithoutFragment) {
            const element = view.element;
            element.setAttribute('aria-hidden', 'true');
            element.classList.add('ion-page-hidden');
            view.ref.changeDetectorRef.detach();
        }
    });
};
const ɵ1$4 = cleanup;

let IonRouterOutlet = class IonRouterOutlet {
    constructor(parentContexts, location, resolver, name, tabs, config, navCtrl, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
        this.parentContexts = parentContexts;
        this.location = location;
        this.resolver = resolver;
        this.config = config;
        this.navCtrl = navCtrl;
        this.parentOutlet = parentOutlet;
        this.activated = null;
        this.activatedView = null;
        this._activatedRoute = null;
        // Maintain map of activated route proxies for each component instance
        this.proxyMap = new WeakMap();
        // Keep the latest activated route in a subject for the proxy routes to switch map to
        this.currentActivatedRoute$ = new BehaviorSubject(null);
        this.stackEvents = new EventEmitter();
        this.activateEvents = new EventEmitter();
        this.deactivateEvents = new EventEmitter();
        this.nativeEl = elementRef.nativeElement;
        this.name = name || PRIMARY_OUTLET;
        this.tabsPrefix = tabs === 'true' ? getUrl(router, activatedRoute) : undefined;
        this.stackCtrl = new StackController(this.tabsPrefix, this.nativeEl, router, navCtrl, zone, commonLocation);
        parentContexts.onChildOutletCreated(this.name, this);
    }
    set animation(animation) {
        this.nativeEl.animation = animation;
    }
    set animated(animated) {
        this.nativeEl.animated = animated;
    }
    set swipeGesture(swipe) {
        this._swipeGesture = swipe;
        this.nativeEl.swipeHandler = swipe ? {
            canStart: () => this.stackCtrl.canGoBack(1),
            onStart: () => this.stackCtrl.startBackTransition(),
            onEnd: (shouldContinue) => this.stackCtrl.endBackTransition(shouldContinue)
        } : undefined;
    }
    ngOnDestroy() {
        this.stackCtrl.destroy();
    }
    getContext() {
        return this.parentContexts.getContext(this.name);
    }
    ngOnInit() {
        if (!this.activated) {
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            const context = this.getContext();
            if (context && context.route) {
                this.activateWith(context.route, context.resolver || null);
            }
        }
        if (this.nativeEl.componentOnReady) {
            this.nativeEl.componentOnReady().then(() => {
                if (this._swipeGesture === undefined) {
                    this.swipeGesture = this.config.getBoolean('swipeBackEnabled', this.nativeEl.mode === 'ios');
                }
            });
        }
    }
    get isActivated() {
        return !!this.activated;
    }
    get component() {
        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }
        return this.activated.instance;
    }
    get activatedRoute() {
        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }
        return this._activatedRoute;
    }
    get activatedRouteData() {
        if (this._activatedRoute) {
            return this._activatedRoute.snapshot.data;
        }
        return {};
    }
    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    detach() {
        throw new Error('incompatible reuse strategy');
    }
    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     */
    attach(_ref, _activatedRoute) {
        throw new Error('incompatible reuse strategy');
    }
    deactivate() {
        if (this.activated) {
            if (this.activatedView) {
                this.activatedView.savedData = new Map(this.getContext().children['contexts']);
                /**
                 * Ensure we are saving the NavigationExtras
                 * data otherwise it will be lost
                 */
                this.activatedView.savedExtras = {};
                const context = this.getContext();
                if (context.route) {
                    const contextSnapshot = context.route.snapshot;
                    this.activatedView.savedExtras.queryParams = contextSnapshot.queryParams;
                    this.activatedView.savedExtras.fragment = contextSnapshot.fragment;
                }
            }
            const c = this.component;
            this.activatedView = null;
            this.activated = null;
            this._activatedRoute = null;
            this.deactivateEvents.emit(c);
        }
    }
    activateWith(activatedRoute, resolver) {
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute = activatedRoute;
        let cmpRef;
        let enteringView = this.stackCtrl.getExistingView(activatedRoute);
        if (enteringView && (!activatedRoute.routeConfig || !activatedRoute.routeConfig.data || !activatedRoute.routeConfig.data.noReuse)) {
            cmpRef = this.activated = enteringView.ref;
            const saved = enteringView.savedData;
            if (saved) {
                // self-restore
                const context = this.getContext();
                context.children['contexts'] = saved;
            }
            // Updated activated route proxy for this component
            this.updateActivatedRouteProxy(cmpRef.instance, activatedRoute);
        }
        else {
            const snapshot = activatedRoute._futureSnapshot;
            const component = snapshot.routeConfig.component;
            resolver = resolver || this.resolver;
            const factory = resolver.resolveComponentFactory(component);
            const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
            // We create an activated route proxy object that will maintain future updates for this component
            // over its lifecycle in the stack.
            const component$ = new BehaviorSubject(null);
            const activatedRouteProxy = this.createActivatedRouteProxy(component$, activatedRoute);
            const injector = new OutletInjector(activatedRouteProxy, childContexts, this.location.injector);
            cmpRef = this.activated = this.location.createComponent(factory, this.location.length, injector);
            // Once the component is created we can push it to our local subject supplied to the proxy
            component$.next(cmpRef.instance);
            // Calling `markForCheck` to make sure we will run the change detection when the
            // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
            enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
            // Store references to the proxy by component
            this.proxyMap.set(cmpRef.instance, activatedRouteProxy);
            this.currentActivatedRoute$.next({ component: cmpRef.instance, activatedRoute });
        }
        this.activatedView = enteringView;
        this.stackCtrl.setActive(enteringView).then(data => {
            this.navCtrl.setTopOutlet(this);
            this.activateEvents.emit(cmpRef.instance);
            this.stackEvents.emit(data);
        });
    }
    /**
     * Returns `true` if there are pages in the stack to go back.
     */
    canGoBack(deep = 1, stackId) {
        return this.stackCtrl.canGoBack(deep, stackId);
    }
    /**
     * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
     */
    pop(deep = 1, stackId) {
        return this.stackCtrl.pop(deep, stackId);
    }
    /**
     * Returns the URL of the active page of each stack.
     */
    getLastUrl(stackId) {
        const active = this.stackCtrl.getLastUrl(stackId);
        return active ? active.url : undefined;
    }
    /**
     * Returns the RouteView of the active page of each stack.
     * @internal
     */
    getLastRouteView(stackId) {
        return this.stackCtrl.getLastUrl(stackId);
    }
    /**
     * Returns the root view in the tab stack.
     * @internal
     */
    getRootView(stackId) {
        return this.stackCtrl.getRootUrl(stackId);
    }
    /**
     * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
     */
    getActiveStackId() {
        return this.stackCtrl.getActiveStackId();
    }
    /**
     * Since the activated route can change over the life time of a component in an ion router outlet, we create
     * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
     */
    createActivatedRouteProxy(component$, activatedRoute) {
        const proxy = new ActivatedRoute();
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        // Setup wrappers for the observables so consumers don't have to worry about switching to new observables as the state updates
        proxy._paramMap = this.proxyObservable(component$, 'paramMap');
        proxy._queryParamMap = this.proxyObservable(component$, 'queryParamMap');
        proxy.url = this.proxyObservable(component$, 'url');
        proxy.params = this.proxyObservable(component$, 'params');
        proxy.queryParams = this.proxyObservable(component$, 'queryParams');
        proxy.fragment = this.proxyObservable(component$, 'fragment');
        proxy.data = this.proxyObservable(component$, 'data');
        return proxy;
    }
    /**
     * Create a wrapped observable that will switch to the latest activated route matched by the given component
     */
    proxyObservable(component$, path) {
        return component$.pipe(
        // First wait until the component instance is pushed
        filter(component => !!component), switchMap(component => this.currentActivatedRoute$.pipe(filter(current => current !== null && current.component === component), switchMap(current => current && current.activatedRoute[path]), distinctUntilChanged())));
    }
    /**
     * Updates the activated route proxy for the given component to the new incoming router state
     */
    updateActivatedRouteProxy(component, activatedRoute) {
        const proxy = this.proxyMap.get(component);
        if (!proxy) {
            throw new Error(`Could not find activated route proxy for view`);
        }
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        this.currentActivatedRoute$.next({ component, activatedRoute });
    }
};
IonRouterOutlet.ctorParameters = () => [
    { type: ChildrenOutletContexts },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: String, decorators: [{ type: Attribute, args: ['name',] }] },
    { type: String, decorators: [{ type: Optional }, { type: Attribute, args: ['tabs',] }] },
    { type: Config },
    { type: NavController },
    { type: Location },
    { type: ElementRef },
    { type: Router },
    { type: NgZone },
    { type: ActivatedRoute },
    { type: IonRouterOutlet, decorators: [{ type: SkipSelf }, { type: Optional }] }
];
__decorate([
    Output()
], IonRouterOutlet.prototype, "stackEvents", void 0);
__decorate([
    Output('activate')
], IonRouterOutlet.prototype, "activateEvents", void 0);
__decorate([
    Output('deactivate')
], IonRouterOutlet.prototype, "deactivateEvents", void 0);
IonRouterOutlet = __decorate([
    Directive({
        selector: 'ion-router-outlet',
        exportAs: 'outlet',
        inputs: ['animated', 'animation', 'swipeGesture']
    }),
    __param(3, Attribute('name')),
    __param(4, Optional()), __param(4, Attribute('tabs')),
    __param(12, SkipSelf()), __param(12, Optional())
], IonRouterOutlet);
class OutletInjector {
    constructor(route, childContexts, parent) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
    }
    get(token, notFoundValue) {
        if (token === ActivatedRoute) {
            return this.route;
        }
        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }
        // tslint:disable-next-line
        return this.parent.get(token, notFoundValue);
    }
}

let IonTabs = class IonTabs {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
        this.ionTabsWillChange = new EventEmitter();
        this.ionTabsDidChange = new EventEmitter();
    }
    /**
     * @internal
     */
    onPageSelected(detail) {
        const stackId = detail.enteringView.stackId;
        if (detail.tabSwitch && stackId !== undefined) {
            if (this.tabBar) {
                this.tabBar.selectedTab = stackId;
            }
            this.ionTabsWillChange.emit({ tab: stackId });
            this.ionTabsDidChange.emit({ tab: stackId });
        }
    }
    /**
     * When a tab button is clicked, there are several scenarios:
     * 1. If the selected tab is currently active (the tab button has been clicked
     *    again), then it should go to the root view for that tab.
     *
     *   a. Get the saved root view from the router outlet. If the saved root view
     *      matches the tabRootUrl, set the route view to this view including the
     *      navigation extras.
     *   b. If the saved root view from the router outlet does
     *      not match, navigate to the tabRootUrl. No navigation extras are
     *      included.
     *
     * 2. If the current tab tab is not currently selected, get the last route
     *    view from the router outlet.
     *
     *   a. If the last route view exists, navigate to that view including any
     *      navigation extras
     *   b. If the last route view doesn't exist, then navigate
     *      to the default tabRootUrl
     */
    select(tab) {
        const alreadySelected = this.outlet.getActiveStackId() === tab;
        const tabRootUrl = `${this.outlet.tabsPrefix}/${tab}`;
        if (alreadySelected) {
            const activeStackId = this.outlet.getActiveStackId();
            const activeView = this.outlet.getLastRouteView(activeStackId);
            // If on root tab, do not navigate to root tab again
            if (activeView.url === tabRootUrl) {
                return;
            }
            const rootView = this.outlet.getRootView(tab);
            const navigationExtras = rootView && tabRootUrl === rootView.url && rootView.savedExtras;
            return this.navCtrl.navigateRoot(tabRootUrl, Object.assign({}, (navigationExtras), { animated: true, animationDirection: 'back' }));
        }
        else {
            const lastRoute = this.outlet.getLastRouteView(tab);
            /**
             * If there is a lastRoute, goto that, otherwise goto the fallback url of the
             * selected tab
             */
            const url = lastRoute && lastRoute.url || tabRootUrl;
            const navigationExtras = lastRoute && lastRoute.savedExtras;
            return this.navCtrl.navigateRoot(url, Object.assign({}, (navigationExtras), { animated: true, animationDirection: 'back' }));
        }
    }
    getSelected() {
        return this.outlet.getActiveStackId();
    }
};
IonTabs.ctorParameters = () => [
    { type: NavController }
];
__decorate([
    ViewChild('outlet', { read: IonRouterOutlet, static: false })
], IonTabs.prototype, "outlet", void 0);
__decorate([
    ContentChild(IonTabBar, { static: false })
], IonTabs.prototype, "tabBar", void 0);
__decorate([
    Output()
], IonTabs.prototype, "ionTabsWillChange", void 0);
__decorate([
    Output()
], IonTabs.prototype, "ionTabsDidChange", void 0);
__decorate([
    HostListener('ionTabButtonClick', ['$event.detail.tab'])
], IonTabs.prototype, "select", null);
IonTabs = __decorate([
    Component({
        selector: 'ion-tabs',
        template: `
    <ng-content select="[slot=top]"></ng-content>
    <div class="tabs-inner">
      <ion-router-outlet #outlet tabs="true" (stackEvents)="onPageSelected($event)"></ion-router-outlet>
    </div>
    <ng-content></ng-content>`,
        styles: [`
    :host {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      flex-direction: column;

      width: 100%;
      height: 100%;

      contain: layout size style;
      z-index: $z-index-page-container;
    }
    .tabs-inner {
      position: relative;

      flex: 1;

      contain: layout size style;
    }`]
    })
], IonTabs);

let IonBackButtonDelegate = class IonBackButtonDelegate {
    constructor(routerOutlet, navCtrl, config) {
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.config = config;
    }
    /**
     * @internal
     */
    onClick(ev) {
        const defaultHref = this.defaultHref || this.config.get('backButtonDefaultHref');
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.navCtrl.setDirection('back', undefined, undefined, this.routerAnimation);
            this.routerOutlet.pop();
            ev.preventDefault();
        }
        else if (defaultHref != null) {
            this.navCtrl.navigateBack(defaultHref, { animation: this.routerAnimation });
            ev.preventDefault();
        }
    }
};
IonBackButtonDelegate.ctorParameters = () => [
    { type: IonRouterOutlet, decorators: [{ type: Optional }] },
    { type: NavController },
    { type: Config }
];
__decorate([
    HostListener('click', ['$event'])
], IonBackButtonDelegate.prototype, "onClick", null);
IonBackButtonDelegate = __decorate([
    Directive({
        selector: 'ion-back-button',
        inputs: ['defaultHref', 'routerAnimation'],
    }),
    __param(0, Optional())
], IonBackButtonDelegate);

let NavDelegate = class NavDelegate {
    constructor(ref, resolver, injector, angularDelegate, location) {
        this.el = ref.nativeElement;
        ref.nativeElement.delegate = angularDelegate.create(resolver, injector, location);
        proxyOutputs(this, this.el, ['ionNavDidChange', 'ionNavWillChange']);
    }
};
NavDelegate.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: AngularDelegate },
    { type: ViewContainerRef }
];
NavDelegate = __decorate([
    ProxyCmp({
        inputs: ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'],
        methods: ['push', 'insert', 'insertPages', 'pop', 'popTo', 'popToRoot', 'removeIndex', 'setRoot', 'setPages', 'getActive', 'getByIndex', 'canGoBack', 'getPrevious']
    }),
    Directive({
        selector: 'ion-nav'
    })
], NavDelegate);

let RouterLinkDelegate = class RouterLinkDelegate {
    constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
        this.locationStrategy = locationStrategy;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
        this.router = router;
        this.routerLink = routerLink;
        this.routerDirection = 'forward';
    }
    ngOnInit() {
        this.updateTargetUrlAndHref();
    }
    ngOnChanges() {
        this.updateTargetUrlAndHref();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    updateTargetUrlAndHref() {
        if (this.routerLink) {
            const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
            this.elementRef.nativeElement.href = href;
        }
    }
    /**
     * @internal
     */
    onClick(ev) {
        this.navCtrl.setDirection(this.routerDirection, undefined, undefined, this.routerAnimation);
        ev.preventDefault();
    }
};
RouterLinkDelegate.ctorParameters = () => [
    { type: LocationStrategy },
    { type: NavController },
    { type: ElementRef },
    { type: Router },
    { type: RouterLink, decorators: [{ type: Optional }] }
];
__decorate([
    HostListener('click', ['$event'])
], RouterLinkDelegate.prototype, "onClick", null);
RouterLinkDelegate = __decorate([
    Directive({
        selector: '[routerLink]',
        inputs: ['routerDirection', 'routerAnimation']
    }),
    __param(4, Optional())
], RouterLinkDelegate);

/**
 * @hidden
 */
let VirtualFooter = class VirtualFooter {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
VirtualFooter.ctorParameters = () => [
    { type: TemplateRef }
];
VirtualFooter = __decorate([
    Directive({ selector: '[virtualFooter]' })
], VirtualFooter);

/**
 * @hidden
 */
let VirtualHeader = class VirtualHeader {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
VirtualHeader.ctorParameters = () => [
    { type: TemplateRef }
];
VirtualHeader = __decorate([
    Directive({ selector: '[virtualHeader]' })
], VirtualHeader);

/**
 * @hidden
 */
let VirtualItem = class VirtualItem {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
};
VirtualItem.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
VirtualItem = __decorate([
    Directive({ selector: '[virtualItem]' })
], VirtualItem);

let IonVirtualScroll = class IonVirtualScroll {
    constructor(z, iterableDiffers, elementRef) {
        this.z = z;
        this.iterableDiffers = iterableDiffers;
        this.refMap = new WeakMap();
        this.el = elementRef.nativeElement;
        this.el.nodeRender = this.nodeRender.bind(this);
    }
    ngOnChanges(changes) {
        if (this.trackBy && 'items' in changes) {
            // React on virtualScroll changes only once all inputs have been initialized
            const value = changes['items'].currentValue;
            if (this.differ === undefined && value != null) {
                try {
                    this.differ = this.iterableDiffers.find(value).create(this.trackBy);
                }
                catch (e) {
                    throw new Error(`Cannot find a differ supporting object '${value}'. VirtualScroll only supports binding to Iterables such as Arrays.`);
                }
            }
        }
    }
    ngDoCheck() {
        // and if there actually are changes
        const changes = this.differ !== undefined && this.items ? this.differ.diff(this.items) : null;
        if (changes === null) {
            return;
        }
        // TODO: optimize
        this.checkRange(0);
    }
    nodeRender(el, cell, index) {
        return this.z.run(() => {
            let node;
            if (!el) {
                node = this.itmTmp.viewContainer.createEmbeddedView(this.getComponent(cell.type), { $implicit: cell.value, index }, index);
                el = getElement(node);
                this.refMap.set(el, node);
            }
            else {
                node = this.refMap.get(el);
                const ctx = node.context;
                ctx.$implicit = cell.value;
                ctx.index = cell.index;
            }
            // run sync change detections
            node.detectChanges();
            return el;
        });
    }
    getComponent(type) {
        switch (type) {
            case 'item': return this.itmTmp.templateRef;
            case 'header': return this.hdrTmp.templateRef;
            case 'footer': return this.ftrTmp.templateRef;
        }
        throw new Error('template for virtual item was not provided');
    }
};
IonVirtualScroll.ctorParameters = () => [
    { type: NgZone },
    { type: IterableDiffers },
    { type: ElementRef }
];
__decorate([
    ContentChild(VirtualItem, { static: false })
], IonVirtualScroll.prototype, "itmTmp", void 0);
__decorate([
    ContentChild(VirtualHeader, { static: false })
], IonVirtualScroll.prototype, "hdrTmp", void 0);
__decorate([
    ContentChild(VirtualFooter, { static: false })
], IonVirtualScroll.prototype, "ftrTmp", void 0);
IonVirtualScroll = __decorate([
    ProxyCmp({
        inputs: ['approxItemHeight', 'approxHeaderHeight', 'approxFooterHeight', 'headerFn', 'footerFn', 'items', 'itemHeight', 'headerHeight', 'footerHeight'],
        methods: ['checkEnd', 'checkRange', 'positionForItem']
    }),
    Component({
        selector: 'ion-virtual-scroll',
        template: '<ng-content></ng-content>',
        changeDetection: ChangeDetectionStrategy.OnPush,
        inputs: [
            'approxItemHeight',
            'approxHeaderHeight',
            'approxFooterHeight',
            'headerFn',
            'footerFn',
            'items',
            'itemHeight',
            'headerHeight',
            'footerHeight',
            'trackBy'
        ]
    })
], IonVirtualScroll);
const getElement = (view) => {
    const rootNodes = view.rootNodes;
    for (let i = 0; i < rootNodes.length; i++) {
        if (rootNodes[i].nodeType === 1) {
            return rootNodes[i];
        }
    }
    throw new Error('virtual element was not created');
};
const ɵ0$7 = getElement;

class OverlayBaseController {
    constructor(ctrl) {
        this.ctrl = ctrl;
    }
    /**
     * Creates a new overlay
     */
    create(opts) {
        // TODO: next major release opts is not optional
        return this.ctrl.create((opts || {}));
    }
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data, role, id) {
        return this.ctrl.dismiss(data, role, id);
    }
    /**
     * Returns the top overlay.
     */
    getTop() {
        return this.ctrl.getTop();
    }
}

let ActionSheetController = class ActionSheetController extends OverlayBaseController {
    constructor() {
        super(actionSheetController);
    }
};
ActionSheetController.ngInjectableDef = ɵɵdefineInjectable({ factory: function ActionSheetController_Factory() { return new ActionSheetController(); }, token: ActionSheetController, providedIn: "root" });
ActionSheetController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ActionSheetController);

let AlertController = class AlertController extends OverlayBaseController {
    constructor() {
        super(alertController);
    }
};
AlertController.ngInjectableDef = ɵɵdefineInjectable({ factory: function AlertController_Factory() { return new AlertController(); }, token: AlertController, providedIn: "root" });
AlertController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AlertController);

let LoadingController = class LoadingController extends OverlayBaseController {
    constructor() {
        super(loadingController);
    }
};
LoadingController.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoadingController_Factory() { return new LoadingController(); }, token: LoadingController, providedIn: "root" });
LoadingController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], LoadingController);

let MenuController = class MenuController {
    /**
     * Programmatically open the Menu.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu is fully opened
     */
    open(menuId) {
        return menuController.open(menuId);
    }
    /**
     * Programmatically close the Menu. If no `menuId` is given as the first
     * argument then it'll close any menu which is open. If a `menuId`
     * is given then it'll close that exact menu.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu is fully closed
     */
    close(menuId) {
        return menuController.close(menuId);
    }
    /**
     * Toggle the menu. If it's closed, it will open, and if opened, it
     * will close.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu has been toggled
     */
    toggle(menuId) {
        return menuController.toggle(menuId);
    }
    /**
     * Used to enable or disable a menu. For example, there could be multiple
     * left menus, but only one of them should be able to be opened at the same
     * time. If there are multiple menus on the same side, then enabling one menu
     * will also automatically disable all the others that are on the same side.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns the instance of the menu, which is useful for chaining.
     */
    enable(shouldEnable, menuId) {
        return menuController.enable(shouldEnable, menuId);
    }
    /**
     * Used to enable or disable the ability to swipe open the menu.
     * @param shouldEnable  True if it should be swipe-able, false if not.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns the instance of the menu, which is useful for chaining.
     */
    swipeGesture(shouldEnable, menuId) {
        return menuController.swipeGesture(shouldEnable, menuId);
    }
    /**
     * @param [menuId] Optionally get the menu by its id, or side.
     * @return Returns true if the specified menu is currently open, otherwise false.
     * If the menuId is not specified, it returns true if ANY menu is currenly open.
     */
    isOpen(menuId) {
        return menuController.isOpen(menuId);
    }
    /**
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns true if the menu is currently enabled, otherwise false.
     */
    isEnabled(menuId) {
        return menuController.isEnabled(menuId);
    }
    /**
     * Used to get a menu instance. If a `menuId` is not provided then it'll
     * return the first menu found. If a `menuId` is `left` or `right`, then
     * it'll return the enabled menu on that side. Otherwise, if a `menuId` is
     * provided, then it'll try to find the menu using the menu's `id`
     * property. If a menu is not found then it'll return `null`.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns the instance of the menu if found, otherwise `null`.
     */
    get(menuId) {
        return menuController.get(menuId);
    }
    /**
     * @return Returns the instance of the menu already opened, otherwise `null`.
     */
    getOpen() {
        return menuController.getOpen();
    }
    /**
     * @return Returns an array of all menu instances.
     */
    getMenus() {
        return menuController.getMenus();
    }
};
MenuController.ngInjectableDef = ɵɵdefineInjectable({ factory: function MenuController_Factory() { return new MenuController(); }, token: MenuController, providedIn: "root" });
MenuController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], MenuController);

let PickerController = class PickerController extends OverlayBaseController {
    constructor() {
        super(pickerController);
    }
};
PickerController.ngInjectableDef = ɵɵdefineInjectable({ factory: function PickerController_Factory() { return new PickerController(); }, token: PickerController, providedIn: "root" });
PickerController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], PickerController);

let ModalController = class ModalController extends OverlayBaseController {
    constructor(angularDelegate, resolver, injector) {
        super(modalController);
        this.angularDelegate = angularDelegate;
        this.resolver = resolver;
        this.injector = injector;
    }
    create(opts) {
        return super.create(Object.assign({}, opts, { delegate: this.angularDelegate.create(this.resolver, this.injector) }));
    }
};
ModalController.ctorParameters = () => [
    { type: AngularDelegate },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
ModalController = __decorate([
    Injectable()
], ModalController);

let PopoverController = class PopoverController extends OverlayBaseController {
    constructor(angularDelegate, resolver, injector) {
        super(popoverController);
        this.angularDelegate = angularDelegate;
        this.resolver = resolver;
        this.injector = injector;
    }
    create(opts) {
        return super.create(Object.assign({}, opts, { delegate: this.angularDelegate.create(this.resolver, this.injector) }));
    }
};
PopoverController.ctorParameters = () => [
    { type: AngularDelegate },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
PopoverController = __decorate([
    Injectable()
], PopoverController);

let ToastController = class ToastController extends OverlayBaseController {
    constructor() {
        super(toastController);
    }
};
ToastController.ngInjectableDef = ɵɵdefineInjectable({ factory: function ToastController_Factory() { return new ToastController(); }, token: ToastController, providedIn: "root" });
ToastController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ToastController);

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
DomController.ngInjectableDef = ɵɵdefineInjectable({ factory: function DomController_Factory() { return new DomController(); }, token: DomController, providedIn: "root" });
DomController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], DomController);
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
const ɵ0$8 = getQueue;

let AnimationController = class AnimationController {
    /**
     * Create a new animation
     */
    create(animationId) {
        return createAnimation(animationId);
    }
    /**
     * EXPERIMENTAL
     *
     * Given a progression and a cubic bezier function,
     * this utility returns the time value(s) at which the
     * cubic bezier reaches the given time progression.
     *
     * If the cubic bezier never reaches the progression
     * the result will be an empty array.
     *
     * This is most useful for switching between easing curves
     * when doing a gesture animation (i.e. going from linear easing
     * during a drag, to another easing when `progressEnd` is called)
     */
    easingTime(p0, p1, p2, p3, progression) {
        return getTimeGivenProgression(p0, p1, p2, p3, progression);
    }
};
AnimationController.ngInjectableDef = ɵɵdefineInjectable({ factory: function AnimationController_Factory() { return new AnimationController(); }, token: AnimationController, providedIn: "root" });
AnimationController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AnimationController);

let GestureController = class GestureController {
    constructor(zone) {
        this.zone = zone;
    }
    /**
     * Create a new gesture
     */
    create(opts, runInsideAngularZone = false) {
        if (runInsideAngularZone) {
            Object.getOwnPropertyNames(opts).forEach(key => {
                if (typeof opts[key] === 'function') {
                    const fn = opts[key];
                    opts[key] = (...props) => this.zone.run(() => fn(...props));
                }
            });
        }
        return createGesture(opts);
    }
};
GestureController.ctorParameters = () => [
    { type: NgZone }
];
GestureController.ngInjectableDef = ɵɵdefineInjectable({ factory: function GestureController_Factory() { return new GestureController(ɵɵinject(NgZone)); }, token: GestureController, providedIn: "root" });
GestureController = __decorate([
    Injectable({
        providedIn: 'root',
    })
], GestureController);

class IonicRouteStrategy {
    shouldDetach(_route) {
        return false;
    }
    shouldAttach(_route) {
        return false;
    }
    store(_route, _detachedTree) {
        return;
    }
    retrieve(_route) {
        return null;
    }
    shouldReuseRoute(future, curr) {
        if (future.routeConfig !== curr.routeConfig) {
            return false;
        }
        // checking router params
        const futureParams = future.params;
        const currentParams = curr.params;
        const keysA = Object.keys(futureParams);
        const keysB = Object.keys(currentParams);
        if (keysA.length !== keysB.length) {
            return false;
        }
        // Test for A's keys different from B.
        for (const key of keysA) {
            if (currentParams[key] !== futureParams[key]) {
                return false;
            }
        }
        return true;
    }
}

let didInitialize = false;
const appInitialize = (config, doc, zone) => {
    return () => {
        const win = doc.defaultView;
        if (win && typeof window !== 'undefined') {
            if (didInitialize) {
                console.warn('Ionic Angular was already initialized. Make sure IonicModule.forRoot() is just called once.');
            }
            didInitialize = true;
            const Ionic = win.Ionic = win.Ionic || {};
            Ionic.config = Object.assign({}, config, { _zoneGate: (h) => zone.run(h) });
            const aelFn = '__zone_symbol__addEventListener' in doc.body
                ? '__zone_symbol__addEventListener'
                : 'addEventListener';
            return applyPolyfills().then(() => {
                return defineCustomElements(win, {
                    exclude: ['ion-tabs', 'ion-tab'],
                    syncQueue: true,
                    raf,
                    jmp: (h) => zone.runOutsideAngular(h),
                    ael(elm, eventName, cb, opts) {
                        elm[aelFn](eventName, cb, opts);
                    },
                    rel(elm, eventName, cb, opts) {
                        elm.removeEventListener(eventName, cb, opts);
                    }
                });
            });
        }
    };
};

var IonicModule_1;
const DECLARATIONS = [
    // proxies
    IonApp,
    IonAvatar,
    IonBackButton,
    IonBackdrop,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonCol,
    IonContent,
    IonDatetime,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonNav,
    IonNavLink,
    IonNote,
    IonProgressBar,
    IonRadio,
    IonRadioGroup,
    IonRange,
    IonRefresher,
    IonRefresherContent,
    IonReorder,
    IonReorderGroup,
    IonRippleEffect,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSkeletonText,
    IonSlide,
    IonSlides,
    IonSpinner,
    IonSplitPane,
    IonTabBar,
    IonTabButton,
    IonText,
    IonTextarea,
    IonThumbnail,
    IonToggle,
    IonToolbar,
    IonTitle,
    IonTabs,
    // ngModel accessors
    BooleanValueAccessor,
    NumericValueAccessor,
    RadioValueAccessor,
    SelectValueAccessor,
    TextValueAccessor,
    // navigation
    IonRouterOutlet,
    IonBackButtonDelegate,
    NavDelegate,
    RouterLinkDelegate,
    // virtual scroll
    VirtualFooter,
    VirtualHeader,
    VirtualItem,
    IonVirtualScroll
];
let IonicModule = IonicModule_1 = class IonicModule {
    static forRoot(config) {
        return {
            ngModule: IonicModule_1,
            providers: [
                {
                    provide: ConfigToken,
                    useValue: config
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: appInitialize,
                    multi: true,
                    deps: [
                        ConfigToken,
                        DOCUMENT,
                        NgZone
                    ]
                }
            ]
        };
    }
};
IonicModule = IonicModule_1 = __decorate([
    NgModule({
        declarations: DECLARATIONS,
        exports: DECLARATIONS,
        providers: [AngularDelegate, ModalController, PopoverController],
        imports: [CommonModule]
    })
], IonicModule);

// DIRECTIVES

/**
 * Generated bundle index. Do not edit.
 */

export { ActionSheetController, AlertController, AngularDelegate, AnimationController, BooleanValueAccessor, Config, DomController, GestureController, IonApp, IonAvatar, IonBackButton, IonBackButtonDelegate, IonBackdrop, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonChip, IonCol, IonContent, IonDatetime, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonMenu, IonMenuButton, IonMenuToggle, IonNav, IonNavLink, IonNote, IonProgressBar, IonRadio, IonRadioGroup, IonRange, IonRefresher, IonRefresherContent, IonReorder, IonReorderGroup, IonRippleEffect, IonRouterOutlet, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSkeletonText, IonSlide, IonSlides, IonSpinner, IonSplitPane, IonTabBar, IonTabButton, IonTabs, IonText, IonTextarea, IonThumbnail, IonTitle, IonToggle, IonToolbar, IonVirtualScroll, IonicModule, IonicRouteStrategy, LoadingController, MenuController, ModalController, NavController, NavDelegate, NavParams, NumericValueAccessor, PickerController, Platform, PopoverController, RadioValueAccessor, RouterLinkDelegate, SelectValueAccessor, TextValueAccessor, ToastController, VirtualFooter, VirtualHeader, VirtualItem, ConfigToken as ɵa, ValueAccessor as ɵb, ProxyCmp as ɵc, OverlayBaseController as ɵe, appInitialize as ɵf };
//# sourceMappingURL=ionic-angular.js.map
