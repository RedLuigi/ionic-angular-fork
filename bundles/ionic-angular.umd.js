(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/router'), require('@ionic/core'), require('rxjs'), require('rxjs/operators'), require('@ionic/core/loader')) :
    typeof define === 'function' && define.amd ? define('@ionic/angular', ['exports', '@angular/core', '@angular/forms', '@angular/common', '@angular/router', '@ionic/core', 'rxjs', 'rxjs/operators', '@ionic/core/loader'], factory) :
    (global = global || self, factory((global.ionic = global.ionic || {}, global.ionic.angular = {}), global.ng.core, global.ng.forms, global.ng.common, global.ng.router, global.core$1, global.rxjs, global.rxjs.operators, global.loader));
}(this, (function (exports, core, forms, common, router, core$1, rxjs, operators, loader) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var raf = function (h) {
        if (typeof __zone_symbol__requestAnimationFrame === 'function') {
            return __zone_symbol__requestAnimationFrame(h);
        }
        if (typeof requestAnimationFrame === 'function') {
            return requestAnimationFrame(h);
        }
        return setTimeout(h);
    };

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
                ngControl = this.injector.get(forms.NgControl);
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
                            oldFn_1.apply(void 0, __spread(params));
                            setIonicClasses(_this.el);
                        };
                    }
                });
            }
        };
        __decorate([
            core.HostListener('ionBlur', ['$event.target'])
        ], ValueAccessor.prototype, "_handleBlurEvent", null);
        return ValueAccessor;
    }());
    var setIonicClasses = function (element) {
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

    var BooleanValueAccessor = /** @class */ (function (_super) {
        __extends(BooleanValueAccessor, _super);
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
            { type: core.Injector },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.HostListener('ionChange', ['$event.target'])
        ], BooleanValueAccessor.prototype, "_handleIonChange", null);
        BooleanValueAccessor = BooleanValueAccessor_1 = __decorate([
            core.Directive({
                /* tslint:disable-next-line:directive-selector */
                selector: 'ion-checkbox,ion-toggle',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: BooleanValueAccessor_1,
                        multi: true
                    }
                ]
            })
        ], BooleanValueAccessor);
        return BooleanValueAccessor;
    }(ValueAccessor));

    var NumericValueAccessor = /** @class */ (function (_super) {
        __extends(NumericValueAccessor, _super);
        function NumericValueAccessor(injector, el) {
            return _super.call(this, injector, el) || this;
        }
        NumericValueAccessor_1 = NumericValueAccessor;
        NumericValueAccessor.prototype._handleIonChange = function (el) {
            this.handleChangeEvent(el, el.value);
        };
        NumericValueAccessor.prototype.registerOnChange = function (fn) {
            _super.prototype.registerOnChange.call(this, function (value) {
                fn(value === '' ? null : parseFloat(value));
            });
        };
        var NumericValueAccessor_1;
        NumericValueAccessor.ctorParameters = function () { return [
            { type: core.Injector },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.HostListener('ionChange', ['$event.target'])
        ], NumericValueAccessor.prototype, "_handleIonChange", null);
        NumericValueAccessor = NumericValueAccessor_1 = __decorate([
            core.Directive({
                /* tslint:disable-next-line:directive-selector */
                selector: 'ion-input[type=number]',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: NumericValueAccessor_1,
                        multi: true
                    }
                ]
            })
        ], NumericValueAccessor);
        return NumericValueAccessor;
    }(ValueAccessor));

    var RadioValueAccessor = /** @class */ (function (_super) {
        __extends(RadioValueAccessor, _super);
        function RadioValueAccessor(injector, el) {
            return _super.call(this, injector, el) || this;
        }
        RadioValueAccessor_1 = RadioValueAccessor;
        RadioValueAccessor.prototype._handleIonSelect = function (el) {
            this.handleChangeEvent(el, el.checked);
        };
        var RadioValueAccessor_1;
        RadioValueAccessor.ctorParameters = function () { return [
            { type: core.Injector },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.HostListener('ionSelect', ['$event.target'])
        ], RadioValueAccessor.prototype, "_handleIonSelect", null);
        RadioValueAccessor = RadioValueAccessor_1 = __decorate([
            core.Directive({
                /* tslint:disable-next-line:directive-selector */
                selector: 'ion-radio',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: RadioValueAccessor_1,
                        multi: true
                    }
                ]
            })
        ], RadioValueAccessor);
        return RadioValueAccessor;
    }(ValueAccessor));

    var SelectValueAccessor = /** @class */ (function (_super) {
        __extends(SelectValueAccessor, _super);
        function SelectValueAccessor(injector, el) {
            return _super.call(this, injector, el) || this;
        }
        SelectValueAccessor_1 = SelectValueAccessor;
        SelectValueAccessor.prototype._handleChangeEvent = function (el) {
            this.handleChangeEvent(el, el.value);
        };
        var SelectValueAccessor_1;
        SelectValueAccessor.ctorParameters = function () { return [
            { type: core.Injector },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.HostListener('ionChange', ['$event.target'])
        ], SelectValueAccessor.prototype, "_handleChangeEvent", null);
        SelectValueAccessor = SelectValueAccessor_1 = __decorate([
            core.Directive({
                /* tslint:disable-next-line:directive-selector */
                selector: 'ion-range, ion-select, ion-radio-group, ion-segment, ion-datetime',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: SelectValueAccessor_1,
                        multi: true
                    }
                ]
            })
        ], SelectValueAccessor);
        return SelectValueAccessor;
    }(ValueAccessor));

    var TextValueAccessor = /** @class */ (function (_super) {
        __extends(TextValueAccessor, _super);
        function TextValueAccessor(injector, el) {
            return _super.call(this, injector, el) || this;
        }
        TextValueAccessor_1 = TextValueAccessor;
        TextValueAccessor.prototype._handleInputEvent = function (el) {
            this.handleChangeEvent(el, el.value);
        };
        var TextValueAccessor_1;
        TextValueAccessor.ctorParameters = function () { return [
            { type: core.Injector },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.HostListener('ionChange', ['$event.target'])
        ], TextValueAccessor.prototype, "_handleInputEvent", null);
        TextValueAccessor = TextValueAccessor_1 = __decorate([
            core.Directive({
                /* tslint:disable-next-line:directive-selector */
                selector: 'ion-input:not([type=number]),ion-textarea,ion-searchbar',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: TextValueAccessor_1,
                        multi: true
                    }
                ]
            })
        ], TextValueAccessor);
        return TextValueAccessor;
    }(ValueAccessor));

    var Platform = /** @class */ (function () {
        function Platform(doc, zone) {
            var _this = this;
            this.doc = doc;
            /**
             * @hidden
             */
            this.backButton = new rxjs.Subject();
            /**
             * The keyboardDidShow event emits when the
             * on-screen keyboard is presented.
             */
            this.keyboardDidShow = new rxjs.Subject();
            /**
             * The keyboardDidHide event emits when the
             * on-screen keyboard is hidden.
             */
            this.keyboardDidHide = new rxjs.Subject();
            /**
             * The pause event emits when the native platform puts the application
             * into the background, typically when the user switches to a different
             * application. This event would emit when a Cordova app is put into
             * the background, however, it would not fire on a standard web browser.
             */
            this.pause = new rxjs.Subject();
            /**
             * The resume event emits when the native platform pulls the application
             * out from the background. This event would emit when a Cordova app comes
             * out from the background, however, it would not fire on a standard web browser.
             */
            this.resume = new rxjs.Subject();
            /**
             * The resize event emits when the browser window has changed dimensions. This
             * could be from a browser window being physically resized, or from a device
             * changing orientation.
             */
            this.resize = new rxjs.Subject();
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
            return core$1.isPlatform(this.win, platformName);
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
            return core$1.getPlatforms(this.win);
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
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.NgZone }
        ]; };
        Platform.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function Platform_Factory() { return new Platform(core.ɵɵinject(common.DOCUMENT), core.ɵɵinject(core.NgZone)); }, token: Platform, providedIn: "root" });
        Platform = __decorate([
            core.Injectable({
                providedIn: 'root',
            }),
            __param(0, core.Inject(common.DOCUMENT))
        ], Platform);
        return Platform;
    }());
    var readQueryParam = function (url, key) {
        key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
        var results = regex.exec(url);
        return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
    };
    var ɵ0$1 = readQueryParam;
    var proxyEvent = function (emitter, el, eventName) {
        if (el) {
            el.addEventListener(eventName, function (ev) {
                // ?? cordova might emit "null" events
                emitter.next(ev != null ? ev.detail : undefined);
            });
        }
    };
    var ɵ1$1 = proxyEvent;

    var NavController = /** @class */ (function () {
        function NavController(platform, location, serializer, router$1) {
            var _this = this;
            this.location = location;
            this.serializer = serializer;
            this.router = router$1;
            this.direction = DEFAULT_DIRECTION;
            this.animated = DEFAULT_ANIMATED;
            this.guessDirection = 'forward';
            this.lastNavId = -1;
            // Subscribe to router events to detect direction
            if (router$1) {
                router$1.events.subscribe(function (ev) {
                    if (ev instanceof router.NavigationStart) {
                        var id = (ev.restoredState) ? ev.restoredState.navigationId : ev.id;
                        _this.guessDirection = id < _this.lastNavId ? 'back' : 'forward';
                        _this.guessAnimation = !ev.restoredState ? _this.guessDirection : undefined;
                        _this.lastNavId = _this.guessDirection === 'forward' ? ev.id : id;
                    }
                });
            }
            // Subscribe to backButton events
            platform.backButton.subscribeWithPriority(0, function (processNextHandler) {
                _this.pop();
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
        NavController.prototype.navigateForward = function (url, options) {
            if (options === void 0) { options = {}; }
            this.setDirection('forward', options.animated, options.animationDirection, options.animation);
            return this.navigate(url, options);
        };
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
        NavController.prototype.navigateBack = function (url, options) {
            if (options === void 0) { options = {}; }
            this.setDirection('back', options.animated, options.animationDirection, options.animation);
            return this.navigate(url, options);
        };
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
        NavController.prototype.navigateRoot = function (url, options) {
            if (options === void 0) { options = {}; }
            this.setDirection('root', options.animated, options.animationDirection, options.animation);
            return this.navigate(url, options);
        };
        /**
         * Same as [Location](https://angular.io/api/common/Location)'s back() method.
         * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
         * by default.
         */
        NavController.prototype.back = function (options) {
            if (options === void 0) { options = { animated: true, animationDirection: 'back' }; }
            this.setDirection('back', options.animated, options.animationDirection, options.animation);
            return this.location.back();
        };
        /**
         * This methods goes back in the context of Ionic's stack navigation.
         *
         * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
         * This is the recommended way to go back when you are using `ion-router-outlet`.
         */
        NavController.prototype.pop = function () {
            return __awaiter(this, void 0, void 0, function () {
                var outlet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            outlet = this.topOutlet;
                            _a.label = 1;
                        case 1:
                            if (!outlet) return [3 /*break*/, 3];
                            return [4 /*yield*/, outlet.pop()];
                        case 2:
                            if (_a.sent()) {
                                return [3 /*break*/, 3];
                            }
                            else {
                                outlet = outlet.parentOutlet;
                            }
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * This methods specifies the direction of the next navigation performed by the Angular router.
         *
         * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
         *
         * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
         */
        NavController.prototype.setDirection = function (direction, animated, animationDirection, animationBuilder) {
            this.direction = direction;
            this.animated = getAnimation(direction, animated, animationDirection);
            this.animationBuilder = animationBuilder;
        };
        /**
         * @internal
         */
        NavController.prototype.setTopOutlet = function (outlet) {
            this.topOutlet = outlet;
        };
        /**
         * @internal
         */
        NavController.prototype.consumeTransition = function () {
            var direction = 'root';
            var animation;
            var animationBuilder = this.animationBuilder;
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
                direction: direction,
                animation: animation,
                animationBuilder: animationBuilder
            };
        };
        NavController.prototype.navigate = function (url, options) {
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
                var urlTree = this.serializer.parse(url.toString());
                if (options.queryParams !== undefined) {
                    urlTree.queryParams = __assign({}, options.queryParams);
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
        };
        NavController.ctorParameters = function () { return [
            { type: Platform },
            { type: common.Location },
            { type: router.UrlSerializer },
            { type: router.Router, decorators: [{ type: core.Optional }] }
        ]; };
        NavController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function NavController_Factory() { return new NavController(core.ɵɵinject(Platform), core.ɵɵinject(common.Location), core.ɵɵinject(router.UrlSerializer), core.ɵɵinject(router.Router, 8)); }, token: NavController, providedIn: "root" });
        NavController = __decorate([
            core.Injectable({
                providedIn: 'root',
            }),
            __param(3, core.Optional())
        ], NavController);
        return NavController;
    }());
    var getAnimation = function (direction, animated, animationDirection) {
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
    var ɵ0$2 = getAnimation;
    var DEFAULT_DIRECTION = 'auto';
    var DEFAULT_ANIMATED = undefined;

    /* eslint-disable */
    var proxyInputs = function (Cmp, inputs) {
        var Prototype = Cmp.prototype;
        inputs.forEach(function (item) {
            Object.defineProperty(Prototype, item, {
                get: function () {
                    return this.el[item];
                },
                set: function (val) {
                    var _this = this;
                    this.z.runOutsideAngular(function () { return (_this.el[item] = val); });
                }
            });
        });
    };
    var proxyMethods = function (Cmp, methods) {
        var Prototype = Cmp.prototype;
        methods.forEach(function (methodName) {
            Prototype[methodName] = function () {
                var _this = this;
                var args = arguments;
                return this.z.runOutsideAngular(function () {
                    return _this.el[methodName].apply(_this.el, args);
                });
            };
        });
    };
    var proxyOutputs = function (instance, el, events) {
        events.forEach(function (eventName) { return instance[eventName] = rxjs.fromEvent(el, eventName); });
    };
    function ProxyCmp(opts) {
        var decorator = function (cls) {
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

    var IonApp = /** @class */ (function () {
        function IonApp(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonApp.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonApp = __decorate([
            core.Component({ selector: "ion-app", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
        ], IonApp);
        return IonApp;
    }());
    var IonAvatar = /** @class */ (function () {
        function IonAvatar(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonAvatar.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonAvatar = __decorate([
            core.Component({ selector: "ion-avatar", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
        ], IonAvatar);
        return IonAvatar;
    }());
    var IonBackButton = /** @class */ (function () {
        function IonBackButton(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonBackButton.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonBackButton = __decorate([
            ProxyCmp({ inputs: ["color", "defaultHref", "disabled", "icon", "mode", "routerAnimation", "text", "type"] }),
            core.Component({ selector: "ion-back-button", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "defaultHref", "disabled", "icon", "mode", "routerAnimation", "text", "type"] })
        ], IonBackButton);
        return IonBackButton;
    }());
    var IonBackdrop = /** @class */ (function () {
        function IonBackdrop(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionBackdropTap"]);
        }
        IonBackdrop.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonBackdrop = __decorate([
            ProxyCmp({ inputs: ["stopPropagation", "tappable", "visible"] }),
            core.Component({ selector: "ion-backdrop", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["stopPropagation", "tappable", "visible"] })
        ], IonBackdrop);
        return IonBackdrop;
    }());
    var IonBadge = /** @class */ (function () {
        function IonBadge(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonBadge.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonBadge = __decorate([
            ProxyCmp({ inputs: ["color", "mode"] }),
            core.Component({ selector: "ion-badge", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
        ], IonBadge);
        return IonBadge;
    }());
    var IonButton = /** @class */ (function () {
        function IonButton(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionFocus", "ionBlur"]);
        }
        IonButton.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonButton = __decorate([
            ProxyCmp({ inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }),
            core.Component({ selector: "ion-button", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] })
        ], IonButton);
        return IonButton;
    }());
    var IonButtons = /** @class */ (function () {
        function IonButtons(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonButtons.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonButtons = __decorate([
            ProxyCmp({ inputs: ["collapse"] }),
            core.Component({ selector: "ion-buttons", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["collapse"] })
        ], IonButtons);
        return IonButtons;
    }());
    var IonCard = /** @class */ (function () {
        function IonCard(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonCard.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonCard = __decorate([
            ProxyCmp({ inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] }),
            core.Component({ selector: "ion-card", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] })
        ], IonCard);
        return IonCard;
    }());
    var IonCardContent = /** @class */ (function () {
        function IonCardContent(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonCardContent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonCardContent = __decorate([
            ProxyCmp({ inputs: ["mode"] }),
            core.Component({ selector: "ion-card-content", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode"] })
        ], IonCardContent);
        return IonCardContent;
    }());
    var IonCardHeader = /** @class */ (function () {
        function IonCardHeader(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonCardHeader.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonCardHeader = __decorate([
            ProxyCmp({ inputs: ["color", "mode", "translucent"] }),
            core.Component({ selector: "ion-card-header", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "translucent"] })
        ], IonCardHeader);
        return IonCardHeader;
    }());
    var IonCardSubtitle = /** @class */ (function () {
        function IonCardSubtitle(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonCardSubtitle.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonCardSubtitle = __decorate([
            ProxyCmp({ inputs: ["color", "mode"] }),
            core.Component({ selector: "ion-card-subtitle", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
        ], IonCardSubtitle);
        return IonCardSubtitle;
    }());
    var IonCardTitle = /** @class */ (function () {
        function IonCardTitle(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonCardTitle.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonCardTitle = __decorate([
            ProxyCmp({ inputs: ["color", "mode"] }),
            core.Component({ selector: "ion-card-title", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
        ], IonCardTitle);
        return IonCardTitle;
    }());
    var IonCheckbox = /** @class */ (function () {
        function IonCheckbox(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
        }
        IonCheckbox.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonCheckbox = __decorate([
            ProxyCmp({ inputs: ["checked", "color", "disabled", "indeterminate", "mode", "name", "value"] }),
            core.Component({ selector: "ion-checkbox", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["checked", "color", "disabled", "indeterminate", "mode", "name", "value"] })
        ], IonCheckbox);
        return IonCheckbox;
    }());
    var IonChip = /** @class */ (function () {
        function IonChip(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonChip.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonChip = __decorate([
            ProxyCmp({ inputs: ["color", "mode", "outline"] }),
            core.Component({ selector: "ion-chip", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "outline"] })
        ], IonChip);
        return IonChip;
    }());
    var IonCol = /** @class */ (function () {
        function IonCol(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonCol.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonCol = __decorate([
            ProxyCmp({ inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"] }),
            core.Component({ selector: "ion-col", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"] })
        ], IonCol);
        return IonCol;
    }());
    var IonContent = /** @class */ (function () {
        function IonContent(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionScrollStart", "ionScroll", "ionScrollEnd"]);
        }
        IonContent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonContent = __decorate([
            ProxyCmp({ inputs: ["color", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"], "methods": ["getScrollElement", "scrollToTop", "scrollToBottom", "scrollByPoint", "scrollToPoint"] }),
            core.Component({ selector: "ion-content", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"] })
        ], IonContent);
        return IonContent;
    }());
    var IonDatetime = /** @class */ (function () {
        function IonDatetime(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionCancel", "ionChange", "ionFocus", "ionBlur"]);
        }
        IonDatetime.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonDatetime = __decorate([
            ProxyCmp({ inputs: ["cancelText", "dayNames", "dayShortNames", "dayValues", "disabled", "displayFormat", "displayTimezone", "doneText", "hourValues", "max", "min", "minuteValues", "mode", "monthNames", "monthShortNames", "monthValues", "name", "pickerFormat", "pickerOptions", "placeholder", "readonly", "value", "yearValues"], "methods": ["open"] }),
            core.Component({ selector: "ion-datetime", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["cancelText", "dayNames", "dayShortNames", "dayValues", "disabled", "displayFormat", "displayTimezone", "doneText", "hourValues", "max", "min", "minuteValues", "mode", "monthNames", "monthShortNames", "monthValues", "name", "pickerFormat", "pickerOptions", "placeholder", "readonly", "value", "yearValues"] })
        ], IonDatetime);
        return IonDatetime;
    }());
    var IonFab = /** @class */ (function () {
        function IonFab(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonFab.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonFab = __decorate([
            ProxyCmp({ inputs: ["activated", "edge", "horizontal", "vertical"], "methods": ["close"] }),
            core.Component({ selector: "ion-fab", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["activated", "edge", "horizontal", "vertical"] })
        ], IonFab);
        return IonFab;
    }());
    var IonFabButton = /** @class */ (function () {
        function IonFabButton(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionFocus", "ionBlur"]);
        }
        IonFabButton.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonFabButton = __decorate([
            ProxyCmp({ inputs: ["activated", "closeIcon", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"] }),
            core.Component({ selector: "ion-fab-button", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["activated", "closeIcon", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"] })
        ], IonFabButton);
        return IonFabButton;
    }());
    var IonFabList = /** @class */ (function () {
        function IonFabList(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonFabList.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonFabList = __decorate([
            ProxyCmp({ inputs: ["activated", "side"] }),
            core.Component({ selector: "ion-fab-list", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["activated", "side"] })
        ], IonFabList);
        return IonFabList;
    }());
    var IonFooter = /** @class */ (function () {
        function IonFooter(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonFooter.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonFooter = __decorate([
            ProxyCmp({ inputs: ["mode", "translucent"] }),
            core.Component({ selector: "ion-footer", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode", "translucent"] })
        ], IonFooter);
        return IonFooter;
    }());
    var IonGrid = /** @class */ (function () {
        function IonGrid(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonGrid.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonGrid = __decorate([
            ProxyCmp({ inputs: ["fixed"] }),
            core.Component({ selector: "ion-grid", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["fixed"] })
        ], IonGrid);
        return IonGrid;
    }());
    var IonHeader = /** @class */ (function () {
        function IonHeader(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonHeader.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonHeader = __decorate([
            ProxyCmp({ inputs: ["collapse", "mode", "translucent"] }),
            core.Component({ selector: "ion-header", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["collapse", "mode", "translucent"] })
        ], IonHeader);
        return IonHeader;
    }());
    var IonIcon = /** @class */ (function () {
        function IonIcon(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonIcon.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonIcon = __decorate([
            ProxyCmp({ inputs: ["ariaLabel", "color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "size", "src"] }),
            core.Component({ selector: "ion-icon", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["ariaLabel", "color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "size", "src"] })
        ], IonIcon);
        return IonIcon;
    }());
    var IonImg = /** @class */ (function () {
        function IonImg(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionImgWillLoad", "ionImgDidLoad", "ionError"]);
        }
        IonImg.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonImg = __decorate([
            ProxyCmp({ inputs: ["alt", "src"] }),
            core.Component({ selector: "ion-img", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["alt", "src"] })
        ], IonImg);
        return IonImg;
    }());
    var IonInfiniteScroll = /** @class */ (function () {
        function IonInfiniteScroll(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionInfinite"]);
        }
        IonInfiniteScroll.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonInfiniteScroll = __decorate([
            ProxyCmp({ inputs: ["disabled", "position", "threshold"], "methods": ["complete"] }),
            core.Component({ selector: "ion-infinite-scroll", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "position", "threshold"] })
        ], IonInfiniteScroll);
        return IonInfiniteScroll;
    }());
    var IonInfiniteScrollContent = /** @class */ (function () {
        function IonInfiniteScrollContent(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonInfiniteScrollContent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonInfiniteScrollContent = __decorate([
            ProxyCmp({ inputs: ["loadingSpinner", "loadingText"] }),
            core.Component({ selector: "ion-infinite-scroll-content", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["loadingSpinner", "loadingText"] })
        ], IonInfiniteScrollContent);
        return IonInfiniteScrollContent;
    }());
    var IonInput = /** @class */ (function () {
        function IonInput(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionInput", "ionChange", "ionBlur", "ionFocus"]);
        }
        IonInput.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonInput = __decorate([
            ProxyCmp({ inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "spellcheck", "step", "type", "value"], "methods": ["setFocus", "getInputElement"] }),
            core.Component({ selector: "ion-input", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "spellcheck", "step", "type", "value"] })
        ], IonInput);
        return IonInput;
    }());
    var IonItem = /** @class */ (function () {
        function IonItem(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonItem.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonItem = __decorate([
            ProxyCmp({ inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] }),
            core.Component({ selector: "ion-item", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] })
        ], IonItem);
        return IonItem;
    }());
    var IonItemDivider = /** @class */ (function () {
        function IonItemDivider(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonItemDivider.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonItemDivider = __decorate([
            ProxyCmp({ inputs: ["color", "mode", "sticky"] }),
            core.Component({ selector: "ion-item-divider", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "sticky"] })
        ], IonItemDivider);
        return IonItemDivider;
    }());
    var IonItemGroup = /** @class */ (function () {
        function IonItemGroup(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonItemGroup.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonItemGroup = __decorate([
            core.Component({ selector: "ion-item-group", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
        ], IonItemGroup);
        return IonItemGroup;
    }());
    var IonItemOption = /** @class */ (function () {
        function IonItemOption(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonItemOption.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonItemOption = __decorate([
            ProxyCmp({ inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"] }),
            core.Component({ selector: "ion-item-option", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"] })
        ], IonItemOption);
        return IonItemOption;
    }());
    var IonItemOptions = /** @class */ (function () {
        function IonItemOptions(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionSwipe"]);
        }
        IonItemOptions.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonItemOptions = __decorate([
            ProxyCmp({ inputs: ["side"] }),
            core.Component({ selector: "ion-item-options", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["side"] })
        ], IonItemOptions);
        return IonItemOptions;
    }());
    var IonItemSliding = /** @class */ (function () {
        function IonItemSliding(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionDrag"]);
        }
        IonItemSliding.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonItemSliding = __decorate([
            ProxyCmp({ inputs: ["disabled"], "methods": ["getOpenAmount", "getSlidingRatio", "open", "close", "closeOpened"] }),
            core.Component({ selector: "ion-item-sliding", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled"] })
        ], IonItemSliding);
        return IonItemSliding;
    }());
    var IonLabel = /** @class */ (function () {
        function IonLabel(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonLabel.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonLabel = __decorate([
            ProxyCmp({ inputs: ["color", "mode", "position"] }),
            core.Component({ selector: "ion-label", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "position"] })
        ], IonLabel);
        return IonLabel;
    }());
    var IonList = /** @class */ (function () {
        function IonList(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonList.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonList = __decorate([
            ProxyCmp({ inputs: ["inset", "lines", "mode"], "methods": ["closeSlidingItems"] }),
            core.Component({ selector: "ion-list", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["inset", "lines", "mode"] })
        ], IonList);
        return IonList;
    }());
    var IonListHeader = /** @class */ (function () {
        function IonListHeader(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonListHeader.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonListHeader = __decorate([
            ProxyCmp({ inputs: ["color", "lines", "mode"] }),
            core.Component({ selector: "ion-list-header", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "lines", "mode"] })
        ], IonListHeader);
        return IonListHeader;
    }());
    var IonMenu = /** @class */ (function () {
        function IonMenu(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionWillOpen", "ionWillClose", "ionDidOpen", "ionDidClose"]);
        }
        IonMenu.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonMenu = __decorate([
            ProxyCmp({ inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"], "methods": ["isOpen", "isActive", "open", "close", "toggle", "setOpen"] }),
            core.Component({ selector: "ion-menu", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"] })
        ], IonMenu);
        return IonMenu;
    }());
    var IonMenuButton = /** @class */ (function () {
        function IonMenuButton(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonMenuButton.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonMenuButton = __decorate([
            ProxyCmp({ inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"] }),
            core.Component({ selector: "ion-menu-button", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"] })
        ], IonMenuButton);
        return IonMenuButton;
    }());
    var IonMenuToggle = /** @class */ (function () {
        function IonMenuToggle(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonMenuToggle.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonMenuToggle = __decorate([
            ProxyCmp({ inputs: ["autoHide", "menu"] }),
            core.Component({ selector: "ion-menu-toggle", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoHide", "menu"] })
        ], IonMenuToggle);
        return IonMenuToggle;
    }());
    var IonNav = /** @class */ (function () {
        function IonNav(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionNavWillChange", "ionNavDidChange"]);
        }
        IonNav.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonNav = __decorate([
            ProxyCmp({ inputs: ["animated", "animation", "root", "rootParams", "swipeGesture"], "methods": ["push", "insert", "insertPages", "pop", "popTo", "popToRoot", "removeIndex", "setRoot", "setPages", "getActive", "getByIndex", "canGoBack", "getPrevious"] }),
            core.Component({ selector: "ion-nav", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["animated", "animation", "root", "rootParams", "swipeGesture"] })
        ], IonNav);
        return IonNav;
    }());
    var IonNavLink = /** @class */ (function () {
        function IonNavLink(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonNavLink.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonNavLink = __decorate([
            ProxyCmp({ inputs: ["component", "componentProps", "routerAnimation", "routerDirection"] }),
            core.Component({ selector: "ion-nav-link", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["component", "componentProps", "routerAnimation", "routerDirection"] })
        ], IonNavLink);
        return IonNavLink;
    }());
    var IonNote = /** @class */ (function () {
        function IonNote(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonNote.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonNote = __decorate([
            ProxyCmp({ inputs: ["color", "mode"] }),
            core.Component({ selector: "ion-note", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
        ], IonNote);
        return IonNote;
    }());
    var IonProgressBar = /** @class */ (function () {
        function IonProgressBar(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonProgressBar.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonProgressBar = __decorate([
            ProxyCmp({ inputs: ["buffer", "color", "mode", "reversed", "type", "value"] }),
            core.Component({ selector: "ion-progress-bar", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["buffer", "color", "mode", "reversed", "type", "value"] })
        ], IonProgressBar);
        return IonProgressBar;
    }());
    var IonRadio = /** @class */ (function () {
        function IonRadio(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionFocus", "ionBlur"]);
        }
        IonRadio.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonRadio = __decorate([
            ProxyCmp({ inputs: ["color", "disabled", "mode", "name", "value"] }),
            core.Component({ selector: "ion-radio", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "disabled", "mode", "name", "value"] })
        ], IonRadio);
        return IonRadio;
    }());
    var IonRadioGroup = /** @class */ (function () {
        function IonRadioGroup(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionChange"]);
        }
        IonRadioGroup.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonRadioGroup = __decorate([
            ProxyCmp({ inputs: ["allowEmptySelection", "name", "value"] }),
            core.Component({ selector: "ion-radio-group", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["allowEmptySelection", "name", "value"] })
        ], IonRadioGroup);
        return IonRadioGroup;
    }());
    var IonRange = /** @class */ (function () {
        function IonRange(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
        }
        IonRange.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonRange = __decorate([
            ProxyCmp({ inputs: ["color", "debounce", "disabled", "dualKnobs", "max", "min", "mode", "name", "pin", "snaps", "step", "ticks", "value"] }),
            core.Component({ selector: "ion-range", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "debounce", "disabled", "dualKnobs", "max", "min", "mode", "name", "pin", "snaps", "step", "ticks", "value"] })
        ], IonRange);
        return IonRange;
    }());
    var IonRefresher = /** @class */ (function () {
        function IonRefresher(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionRefresh", "ionPull", "ionStart"]);
        }
        IonRefresher.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonRefresher = __decorate([
            ProxyCmp({ inputs: ["closeDuration", "disabled", "pullFactor", "pullMax", "pullMin", "snapbackDuration"], "methods": ["complete", "cancel", "getProgress"] }),
            core.Component({ selector: "ion-refresher", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["closeDuration", "disabled", "pullFactor", "pullMax", "pullMin", "snapbackDuration"] })
        ], IonRefresher);
        return IonRefresher;
    }());
    var IonRefresherContent = /** @class */ (function () {
        function IonRefresherContent(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonRefresherContent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonRefresherContent = __decorate([
            ProxyCmp({ inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"] }),
            core.Component({ selector: "ion-refresher-content", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"] })
        ], IonRefresherContent);
        return IonRefresherContent;
    }());
    var IonReorder = /** @class */ (function () {
        function IonReorder(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonReorder.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonReorder = __decorate([
            core.Component({ selector: "ion-reorder", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
        ], IonReorder);
        return IonReorder;
    }());
    var IonReorderGroup = /** @class */ (function () {
        function IonReorderGroup(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionItemReorder"]);
        }
        IonReorderGroup.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonReorderGroup = __decorate([
            ProxyCmp({ inputs: ["disabled"], "methods": ["complete"] }),
            core.Component({ selector: "ion-reorder-group", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled"] })
        ], IonReorderGroup);
        return IonReorderGroup;
    }());
    var IonRippleEffect = /** @class */ (function () {
        function IonRippleEffect(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonRippleEffect.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonRippleEffect = __decorate([
            ProxyCmp({ inputs: ["type"], "methods": ["addRipple"] }),
            core.Component({ selector: "ion-ripple-effect", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["type"] })
        ], IonRippleEffect);
        return IonRippleEffect;
    }());
    var IonRow = /** @class */ (function () {
        function IonRow(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonRow.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonRow = __decorate([
            core.Component({ selector: "ion-row", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
        ], IonRow);
        return IonRow;
    }());
    var IonSearchbar = /** @class */ (function () {
        function IonSearchbar(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionInput", "ionChange", "ionCancel", "ionClear", "ionBlur", "ionFocus"]);
        }
        IonSearchbar.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSearchbar = __decorate([
            ProxyCmp({ inputs: ["animated", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "mode", "placeholder", "searchIcon", "showCancelButton", "spellcheck", "type", "value"], "methods": ["setFocus", "getInputElement"] }),
            core.Component({ selector: "ion-searchbar", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["animated", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "mode", "placeholder", "searchIcon", "showCancelButton", "spellcheck", "type", "value"] })
        ], IonSearchbar);
        return IonSearchbar;
    }());
    var IonSegment = /** @class */ (function () {
        function IonSegment(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionChange"]);
        }
        IonSegment.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSegment = __decorate([
            ProxyCmp({ inputs: ["color", "disabled", "mode", "scrollable", "value"] }),
            core.Component({ selector: "ion-segment", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "disabled", "mode", "scrollable", "value"] })
        ], IonSegment);
        return IonSegment;
    }());
    var IonSegmentButton = /** @class */ (function () {
        function IonSegmentButton(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonSegmentButton.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSegmentButton = __decorate([
            ProxyCmp({ inputs: ["disabled", "layout", "mode", "type", "value"] }),
            core.Component({ selector: "ion-segment-button", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "layout", "mode", "type", "value"] })
        ], IonSegmentButton);
        return IonSegmentButton;
    }());
    var IonSelect = /** @class */ (function () {
        function IonSelect(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionChange", "ionCancel", "ionFocus", "ionBlur"]);
        }
        IonSelect.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSelect = __decorate([
            ProxyCmp({ inputs: ["cancelText", "compareWith", "disabled", "interface", "interfaceOptions", "mode", "multiple", "name", "okText", "placeholder", "selectedText", "value"], "methods": ["open"] }),
            core.Component({ selector: "ion-select", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["cancelText", "compareWith", "disabled", "interface", "interfaceOptions", "mode", "multiple", "name", "okText", "placeholder", "selectedText", "value"] })
        ], IonSelect);
        return IonSelect;
    }());
    var IonSelectOption = /** @class */ (function () {
        function IonSelectOption(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonSelectOption.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSelectOption = __decorate([
            ProxyCmp({ inputs: ["disabled", "value"] }),
            core.Component({ selector: "ion-select-option", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "value"] })
        ], IonSelectOption);
        return IonSelectOption;
    }());
    var IonSkeletonText = /** @class */ (function () {
        function IonSkeletonText(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonSkeletonText.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSkeletonText = __decorate([
            ProxyCmp({ inputs: ["animated"] }),
            core.Component({ selector: "ion-skeleton-text", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["animated"] })
        ], IonSkeletonText);
        return IonSkeletonText;
    }());
    var IonSlide = /** @class */ (function () {
        function IonSlide(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonSlide.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSlide = __decorate([
            core.Component({ selector: "ion-slide", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
        ], IonSlide);
        return IonSlide;
    }());
    var IonSlides = /** @class */ (function () {
        function IonSlides(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionSlidesDidLoad", "ionSlideTap", "ionSlideDoubleTap", "ionSlideWillChange", "ionSlideDidChange", "ionSlideNextStart", "ionSlidePrevStart", "ionSlideNextEnd", "ionSlidePrevEnd", "ionSlideTransitionStart", "ionSlideTransitionEnd", "ionSlideDrag", "ionSlideReachStart", "ionSlideReachEnd", "ionSlideTouchStart", "ionSlideTouchEnd"]);
        }
        IonSlides.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSlides = __decorate([
            ProxyCmp({ inputs: ["mode", "options", "pager", "scrollbar"], "methods": ["update", "updateAutoHeight", "slideTo", "slideNext", "slidePrev", "getActiveIndex", "getPreviousIndex", "length", "isEnd", "isBeginning", "startAutoplay", "stopAutoplay", "lockSwipeToNext", "lockSwipeToPrev", "lockSwipes", "getSwiper"] }),
            core.Component({ selector: "ion-slides", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["mode", "options", "pager", "scrollbar"] })
        ], IonSlides);
        return IonSlides;
    }());
    var IonSpinner = /** @class */ (function () {
        function IonSpinner(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonSpinner.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSpinner = __decorate([
            ProxyCmp({ inputs: ["color", "duration", "name", "paused"] }),
            core.Component({ selector: "ion-spinner", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "duration", "name", "paused"] })
        ], IonSpinner);
        return IonSpinner;
    }());
    var IonSplitPane = /** @class */ (function () {
        function IonSplitPane(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionSplitPaneVisible"]);
        }
        IonSplitPane.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonSplitPane = __decorate([
            ProxyCmp({ inputs: ["contentId", "disabled", "when"] }),
            core.Component({ selector: "ion-split-pane", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["contentId", "disabled", "when"] })
        ], IonSplitPane);
        return IonSplitPane;
    }());
    var IonTabBar = /** @class */ (function () {
        function IonTabBar(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonTabBar.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonTabBar = __decorate([
            ProxyCmp({ inputs: ["color", "mode", "selectedTab", "translucent"] }),
            core.Component({ selector: "ion-tab-bar", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode", "selectedTab", "translucent"] })
        ], IonTabBar);
        return IonTabBar;
    }());
    var IonTabButton = /** @class */ (function () {
        function IonTabButton(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonTabButton.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonTabButton = __decorate([
            ProxyCmp({ inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"] }),
            core.Component({ selector: "ion-tab-button", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"] })
        ], IonTabButton);
        return IonTabButton;
    }());
    var IonText = /** @class */ (function () {
        function IonText(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonText.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonText = __decorate([
            ProxyCmp({ inputs: ["color", "mode"] }),
            core.Component({ selector: "ion-text", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
        ], IonText);
        return IonText;
    }());
    var IonTextarea = /** @class */ (function () {
        function IonTextarea(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionChange", "ionInput", "ionBlur", "ionFocus"]);
        }
        IonTextarea.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonTextarea = __decorate([
            ProxyCmp({ inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "spellcheck", "value", "wrap"], "methods": ["setFocus", "getInputElement"] }),
            core.Component({ selector: "ion-textarea", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "spellcheck", "value", "wrap"] })
        ], IonTextarea);
        return IonTextarea;
    }());
    var IonThumbnail = /** @class */ (function () {
        function IonThumbnail(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonThumbnail.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonThumbnail = __decorate([
            core.Component({ selector: "ion-thumbnail", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>" })
        ], IonThumbnail);
        return IonThumbnail;
    }());
    var IonTitle = /** @class */ (function () {
        function IonTitle(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonTitle.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonTitle = __decorate([
            ProxyCmp({ inputs: ["color", "size"] }),
            core.Component({ selector: "ion-title", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "size"] })
        ], IonTitle);
        return IonTitle;
    }());
    var IonToggle = /** @class */ (function () {
        function IonToggle(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
            proxyOutputs(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
        }
        IonToggle.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonToggle = __decorate([
            ProxyCmp({ inputs: ["checked", "color", "disabled", "mode", "name", "value"] }),
            core.Component({ selector: "ion-toggle", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["checked", "color", "disabled", "mode", "name", "value"] })
        ], IonToggle);
        return IonToggle;
    }());
    var IonToolbar = /** @class */ (function () {
        function IonToolbar(c, r, z) {
            this.z = z;
            c.detach();
            this.el = r.nativeElement;
        }
        IonToolbar.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        IonToolbar = __decorate([
            ProxyCmp({ inputs: ["color", "mode"] }),
            core.Component({ selector: "ion-toolbar", changeDetection: core.ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "mode"] })
        ], IonToolbar);
        return IonToolbar;
    }());

    var Config = /** @class */ (function () {
        function Config() {
        }
        Config.prototype.get = function (key, fallback) {
            var c = getConfig();
            if (c) {
                return c.get(key, fallback);
            }
            return null;
        };
        Config.prototype.getBoolean = function (key, fallback) {
            var c = getConfig();
            if (c) {
                return c.getBoolean(key, fallback);
            }
            return false;
        };
        Config.prototype.getNumber = function (key, fallback) {
            var c = getConfig();
            if (c) {
                return c.getNumber(key, fallback);
            }
            return 0;
        };
        Config.prototype.set = function (key, value) {
            console.warn("[DEPRECATION][Config]: The Config.set() method is deprecated and will be removed in Ionic Framework 6.0. Please see https://ionicframework.com/docs/angular/config for alternatives.");
            var c = getConfig();
            if (c) {
                c.set(key, value);
            }
        };
        Config.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function Config_Factory() { return new Config(); }, token: Config, providedIn: "root" });
        Config = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], Config);
        return Config;
    }());
    var ConfigToken = new core.InjectionToken('USERCONFIG');
    var getConfig = function () {
        if (typeof window !== 'undefined') {
            var Ionic = window.Ionic;
            if (Ionic && Ionic.config) {
                return Ionic.config;
            }
        }
        return null;
    };
    var ɵ0$3 = getConfig;

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
    var NavParams = /** @class */ (function () {
        function NavParams(data) {
            if (data === void 0) { data = {}; }
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
        NavParams.prototype.get = function (param) {
            return this.data[param];
        };
        return NavParams;
    }());

    var AngularDelegate = /** @class */ (function () {
        function AngularDelegate(zone, appRef) {
            this.zone = zone;
            this.appRef = appRef;
        }
        AngularDelegate.prototype.create = function (resolver, injector, location) {
            return new AngularFrameworkDelegate(resolver, injector, location, this.appRef, this.zone);
        };
        AngularDelegate.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: core.ApplicationRef }
        ]; };
        AngularDelegate = __decorate([
            core.Injectable()
        ], AngularDelegate);
        return AngularDelegate;
    }());
    var AngularFrameworkDelegate = /** @class */ (function () {
        function AngularFrameworkDelegate(resolver, injector, location, appRef, zone) {
            this.resolver = resolver;
            this.injector = injector;
            this.location = location;
            this.appRef = appRef;
            this.zone = zone;
            this.elRefMap = new WeakMap();
            this.elEventsMap = new WeakMap();
        }
        AngularFrameworkDelegate.prototype.attachViewToDom = function (container, component, params, cssClasses) {
            var _this = this;
            return this.zone.run(function () {
                return new Promise(function (resolve) {
                    var el = attachView(_this.zone, _this.resolver, _this.injector, _this.location, _this.appRef, _this.elRefMap, _this.elEventsMap, container, component, params, cssClasses);
                    resolve(el);
                });
            });
        };
        AngularFrameworkDelegate.prototype.removeViewFromDom = function (_container, component) {
            var _this = this;
            return this.zone.run(function () {
                return new Promise(function (resolve) {
                    var componentRef = _this.elRefMap.get(component);
                    if (componentRef) {
                        componentRef.destroy();
                        _this.elRefMap.delete(component);
                        var unbindEvents = _this.elEventsMap.get(component);
                        if (unbindEvents) {
                            unbindEvents();
                            _this.elEventsMap.delete(component);
                        }
                    }
                    resolve();
                });
            });
        };
        return AngularFrameworkDelegate;
    }());
    var attachView = function (zone, resolver, injector, location, appRef, elRefMap, elEventsMap, container, component, params, cssClasses) {
        var e_1, _a;
        var factory = resolver.resolveComponentFactory(component);
        var childInjector = core.Injector.create({
            providers: getProviders(params),
            parent: injector
        });
        var componentRef = (location)
            ? location.createComponent(factory, location.length, childInjector)
            : factory.create(childInjector);
        var instance = componentRef.instance;
        var hostElement = componentRef.location.nativeElement;
        if (params) {
            Object.assign(instance, params);
        }
        if (cssClasses) {
            try {
                for (var cssClasses_1 = __values(cssClasses), cssClasses_1_1 = cssClasses_1.next(); !cssClasses_1_1.done; cssClasses_1_1 = cssClasses_1.next()) {
                    var clazz = cssClasses_1_1.value;
                    hostElement.classList.add(clazz);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (cssClasses_1_1 && !cssClasses_1_1.done && (_a = cssClasses_1.return)) _a.call(cssClasses_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var unbindEvents = bindLifecycleEvents(zone, instance, hostElement);
        container.appendChild(hostElement);
        if (!location) {
            appRef.attachView(componentRef.hostView);
        }
        componentRef.changeDetectorRef.reattach();
        elRefMap.set(hostElement, componentRef);
        elEventsMap.set(hostElement, unbindEvents);
        return hostElement;
    };
    var LIFECYCLES = [
        core$1.LIFECYCLE_WILL_ENTER,
        core$1.LIFECYCLE_DID_ENTER,
        core$1.LIFECYCLE_WILL_LEAVE,
        core$1.LIFECYCLE_DID_LEAVE,
        core$1.LIFECYCLE_WILL_UNLOAD
    ];
    var bindLifecycleEvents = function (zone, instance, element) {
        return zone.run(function () {
            var unregisters = LIFECYCLES
                .filter(function (eventName) { return typeof instance[eventName] === 'function'; })
                .map(function (eventName) {
                var handler = function (ev) { return instance[eventName](ev.detail); };
                element.addEventListener(eventName, handler);
                return function () { return element.removeEventListener(eventName, handler); };
            });
            return function () { return unregisters.forEach(function (fn) { return fn(); }); };
        });
    };
    var NavParamsToken = new core.InjectionToken('NavParamsToken');
    var getProviders = function (params) {
        return [
            {
                provide: NavParamsToken, useValue: params
            },
            {
                provide: NavParams, useFactory: provideNavParamsInjectable, deps: [NavParamsToken]
            }
        ];
    };
    var ɵ0$4 = getProviders;
    var provideNavParamsInjectable = function (params) {
        return new NavParams(params);
    };
    var ɵ1$2 = provideNavParamsInjectable;

    var insertView = function (views, view, direction) {
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
    var setRoot = function (views, view) {
        views = views.filter(function (v) { return v.stackId !== view.stackId; });
        views.push(view);
        return views;
    };
    var ɵ0$5 = setRoot;
    var setForward = function (views, view) {
        var index = views.indexOf(view);
        if (index >= 0) {
            views = views.filter(function (v) { return v.stackId !== view.stackId || v.id <= view.id; });
        }
        else {
            views.push(view);
        }
        return views;
    };
    var ɵ1$3 = setForward;
    var setBack = function (views, view) {
        var index = views.indexOf(view);
        if (index >= 0) {
            return views.filter(function (v) { return v.stackId !== view.stackId || v.id <= view.id; });
        }
        else {
            return setRoot(views, view);
        }
    };
    var ɵ2$1 = setBack;
    var getUrl = function (router, activatedRoute) {
        var urlTree = router.createUrlTree(['.'], { relativeTo: activatedRoute });
        return router.serializeUrl(urlTree);
    };
    var isTabSwitch = function (enteringView, leavingView) {
        if (!leavingView) {
            return true;
        }
        return enteringView.stackId !== leavingView.stackId;
    };
    var computeStackId = function (prefixUrl, url) {
        if (!prefixUrl) {
            return undefined;
        }
        var segments = toSegments(url);
        for (var i = 0; i < segments.length; i++) {
            if (i >= prefixUrl.length) {
                return segments[i];
            }
            if (segments[i] !== prefixUrl[i]) {
                return undefined;
            }
        }
        return undefined;
    };
    var toSegments = function (path) {
        return path
            .split('/')
            .map(function (s) { return s.trim(); })
            .filter(function (s) { return s !== ''; });
    };
    var destroyView = function (view) {
        if (view) {
            // TODO lifecycle event
            view.ref.destroy();
            view.unlistenEvents();
        }
    };

    var StackController = /** @class */ (function () {
        function StackController(tabsPrefix, containerEl, router, navCtrl, zone, location) {
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
        StackController.prototype.createView = function (ref, activatedRoute) {
            var url = getUrl(this.router, activatedRoute);
            var element = (ref && ref.location && ref.location.nativeElement);
            var unlistenEvents = bindLifecycleEvents(this.zone, ref.instance, element);
            return {
                id: this.nextId++,
                stackId: computeStackId(this.tabsPrefix, url),
                unlistenEvents: unlistenEvents,
                element: element,
                ref: ref,
                url: url,
            };
        };
        StackController.prototype.getExistingView = function (activatedRoute) {
            var activatedUrlKey = getUrl(this.router, activatedRoute);
            var view = this.views.find(function (vw) { return vw.url === activatedUrlKey; });
            if (view) {
                view.ref.changeDetectorRef.reattach();
            }
            return view;
        };
        StackController.prototype.setActive = function (enteringView) {
            var _this = this;
            var consumeResult = this.navCtrl.consumeTransition();
            var direction = consumeResult.direction, animation = consumeResult.animation, animationBuilder = consumeResult.animationBuilder;
            var leavingView = this.activeView;
            var tabSwitch = isTabSwitch(enteringView, leavingView);
            if (tabSwitch) {
                direction = 'back';
                animation = undefined;
            }
            var viewsSnapshot = this.views.slice();
            var currentNavigation;
            var router = this.router;
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
            var reused = this.views.includes(enteringView);
            var views = this.insertView(enteringView, direction);
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
            var customAnimation = enteringView.animationBuilder;
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
            return this.zone.runOutsideAngular(function () {
                return _this.wait(function () {
                    // disconnect leaving page from change detection to
                    // reduce jank during the page transition
                    if (leavingView) {
                        leavingView.ref.changeDetectorRef.detach();
                    }
                    // In case the enteringView is the same as the leavingPage we need to reattach()
                    enteringView.ref.changeDetectorRef.reattach();
                    return _this.transition(enteringView, leavingView, animation, _this.canGoBack(1), false, animationBuilder)
                        .then(function () { return cleanupAsync(enteringView, views, viewsSnapshot, _this.location); })
                        .then(function () { return ({
                        enteringView: enteringView,
                        direction: direction,
                        animation: animation,
                        tabSwitch: tabSwitch
                    }); });
                });
            });
        };
        StackController.prototype.canGoBack = function (deep, stackId) {
            if (stackId === void 0) { stackId = this.getActiveStackId(); }
            return this.getStack(stackId).length > deep;
        };
        StackController.prototype.pop = function (deep, stackId) {
            var _this = this;
            if (stackId === void 0) { stackId = this.getActiveStackId(); }
            return this.zone.run(function () {
                var views = _this.getStack(stackId);
                if (views.length <= deep) {
                    return Promise.resolve(false);
                }
                var view = views[views.length - deep - 1];
                var url = view.url;
                var viewSavedData = view.savedData;
                if (viewSavedData) {
                    var primaryOutlet = viewSavedData.get('primary');
                    if (primaryOutlet &&
                        primaryOutlet.route &&
                        primaryOutlet.route._routerState &&
                        primaryOutlet.route._routerState.snapshot &&
                        primaryOutlet.route._routerState.snapshot.url) {
                        url = primaryOutlet.route._routerState.snapshot.url;
                    }
                }
                var animationBuilder = _this.navCtrl.consumeTransition().animationBuilder;
                return _this.navCtrl.navigateBack(url, __assign({}, view.savedExtras, { animation: animationBuilder })).then(function () { return true; });
            });
        };
        StackController.prototype.startBackTransition = function () {
            var _this = this;
            var leavingView = this.activeView;
            if (leavingView) {
                var views = this.getStack(leavingView.stackId);
                var enteringView_1 = views[views.length - 2];
                var customAnimation_1 = enteringView_1.animationBuilder;
                return this.wait(function () {
                    return _this.transition(enteringView_1, // entering view
                    leavingView, // leaving view
                    'back', _this.canGoBack(2), true, customAnimation_1);
                });
            }
            return Promise.resolve();
        };
        StackController.prototype.endBackTransition = function (shouldComplete) {
            if (shouldComplete) {
                this.skipTransition = true;
                this.pop(1);
            }
            else if (this.activeView) {
                cleanup(this.activeView, this.views, this.views, this.location);
            }
        };
        StackController.prototype.getLastUrl = function (stackId) {
            var views = this.getStack(stackId);
            return views.length > 0 ? views[views.length - 1] : undefined;
        };
        /**
         * @internal
         */
        StackController.prototype.getRootUrl = function (stackId) {
            var views = this.getStack(stackId);
            return views.length > 0 ? views[0] : undefined;
        };
        StackController.prototype.getActiveStackId = function () {
            return this.activeView ? this.activeView.stackId : undefined;
        };
        StackController.prototype.destroy = function () {
            this.containerEl = undefined;
            this.views.forEach(destroyView);
            this.activeView = undefined;
            this.views = [];
        };
        StackController.prototype.getStack = function (stackId) {
            return this.views.filter(function (v) { return v.stackId === stackId; });
        };
        StackController.prototype.insertView = function (enteringView, direction) {
            this.activeView = enteringView;
            this.views = insertView(this.views, enteringView, direction);
            return this.views.slice();
        };
        StackController.prototype.transition = function (enteringView, leavingView, direction, showGoBack, progressAnimation, animationBuilder) {
            if (this.skipTransition) {
                this.skipTransition = false;
                return Promise.resolve(false);
            }
            if (leavingView === enteringView) {
                return Promise.resolve(false);
            }
            var enteringEl = enteringView ? enteringView.element : undefined;
            var leavingEl = leavingView ? leavingView.element : undefined;
            var containerEl = this.containerEl;
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
                        direction: direction,
                        showGoBack: showGoBack,
                        progressAnimation: progressAnimation,
                        animationBuilder: animationBuilder
                    });
                }
            }
            return Promise.resolve(false);
        };
        StackController.prototype.wait = function (task) {
            return __awaiter(this, void 0, void 0, function () {
                var promise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.runningTask !== undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.runningTask];
                        case 1:
                            _a.sent();
                            this.runningTask = undefined;
                            _a.label = 2;
                        case 2:
                            promise = this.runningTask = task();
                            return [2 /*return*/, promise];
                    }
                });
            });
        };
        return StackController;
    }());
    var cleanupAsync = function (activeRoute, views, viewsSnapshot, location) {
        if (typeof requestAnimationFrame === 'function') {
            return new Promise(function (resolve) {
                requestAnimationFrame(function () {
                    cleanup(activeRoute, views, viewsSnapshot, location);
                    resolve();
                });
            });
        }
        return Promise.resolve();
    };
    var ɵ0$6 = cleanupAsync;
    var cleanup = function (activeRoute, views, viewsSnapshot, location) {
        viewsSnapshot
            .filter(function (view) { return !views.includes(view); })
            .forEach(destroyView);
        views.forEach(function (view) {
            /**
             * In the event that a user navigated multiple
             * times in rapid succession, we want to make sure
             * we don't pre-emptively detach a view while
             * it is in mid-transition.
             *
             * In this instance we also do not care about query
             * params or fragments as it will be the same view regardless
             */
            var locationWithoutParams = location.path().split('?')[0];
            var locationWithoutFragment = locationWithoutParams.split('#')[0];
            if (view !== activeRoute && view.url !== locationWithoutFragment) {
                var element = view.element;
                element.setAttribute('aria-hidden', 'true');
                element.classList.add('ion-page-hidden');
                view.ref.changeDetectorRef.detach();
            }
        });
    };
    var ɵ1$4 = cleanup;

    var IonRouterOutlet = /** @class */ (function () {
        function IonRouterOutlet(parentContexts, location, resolver, name, tabs, config, navCtrl, commonLocation, elementRef, router$1, zone, activatedRoute, parentOutlet) {
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
            this.currentActivatedRoute$ = new rxjs.BehaviorSubject(null);
            this.stackEvents = new core.EventEmitter();
            this.activateEvents = new core.EventEmitter();
            this.deactivateEvents = new core.EventEmitter();
            this.nativeEl = elementRef.nativeElement;
            this.name = name || router.PRIMARY_OUTLET;
            this.tabsPrefix = tabs === 'true' ? getUrl(router$1, activatedRoute) : undefined;
            this.stackCtrl = new StackController(this.tabsPrefix, this.nativeEl, router$1, navCtrl, zone, commonLocation);
            parentContexts.onChildOutletCreated(this.name, this);
        }
        Object.defineProperty(IonRouterOutlet.prototype, "animation", {
            set: function (animation) {
                this.nativeEl.animation = animation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonRouterOutlet.prototype, "animated", {
            set: function (animated) {
                this.nativeEl.animated = animated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonRouterOutlet.prototype, "swipeGesture", {
            set: function (swipe) {
                var _this = this;
                this._swipeGesture = swipe;
                this.nativeEl.swipeHandler = swipe ? {
                    canStart: function () { return _this.stackCtrl.canGoBack(1); },
                    onStart: function () { return _this.stackCtrl.startBackTransition(); },
                    onEnd: function (shouldContinue) { return _this.stackCtrl.endBackTransition(shouldContinue); }
                } : undefined;
            },
            enumerable: true,
            configurable: true
        });
        IonRouterOutlet.prototype.ngOnDestroy = function () {
            this.stackCtrl.destroy();
        };
        IonRouterOutlet.prototype.getContext = function () {
            return this.parentContexts.getContext(this.name);
        };
        IonRouterOutlet.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.activated) {
                // If the outlet was not instantiated at the time the route got activated we need to populate
                // the outlet when it is initialized (ie inside a NgIf)
                var context = this.getContext();
                if (context && context.route) {
                    this.activateWith(context.route, context.resolver || null);
                }
            }
            if (this.nativeEl.componentOnReady) {
                this.nativeEl.componentOnReady().then(function () {
                    if (_this._swipeGesture === undefined) {
                        _this.swipeGesture = _this.config.getBoolean('swipeBackEnabled', _this.nativeEl.mode === 'ios');
                    }
                });
            }
        };
        Object.defineProperty(IonRouterOutlet.prototype, "isActivated", {
            get: function () {
                return !!this.activated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonRouterOutlet.prototype, "component", {
            get: function () {
                if (!this.activated) {
                    throw new Error('Outlet is not activated');
                }
                return this.activated.instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonRouterOutlet.prototype, "activatedRoute", {
            get: function () {
                if (!this.activated) {
                    throw new Error('Outlet is not activated');
                }
                return this._activatedRoute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonRouterOutlet.prototype, "activatedRouteData", {
            get: function () {
                if (this._activatedRoute) {
                    return this._activatedRoute.snapshot.data;
                }
                return {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Called when the `RouteReuseStrategy` instructs to detach the subtree
         */
        IonRouterOutlet.prototype.detach = function () {
            throw new Error('incompatible reuse strategy');
        };
        /**
         * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
         */
        IonRouterOutlet.prototype.attach = function (_ref, _activatedRoute) {
            throw new Error('incompatible reuse strategy');
        };
        IonRouterOutlet.prototype.deactivate = function () {
            if (this.activated) {
                if (this.activatedView) {
                    this.activatedView.savedData = new Map(this.getContext().children['contexts']);
                    /**
                     * Ensure we are saving the NavigationExtras
                     * data otherwise it will be lost
                     */
                    this.activatedView.savedExtras = {};
                    var context = this.getContext();
                    if (context.route) {
                        var contextSnapshot = context.route.snapshot;
                        this.activatedView.savedExtras.queryParams = contextSnapshot.queryParams;
                        this.activatedView.savedExtras.fragment = contextSnapshot.fragment;
                    }
                }
                var c = this.component;
                this.activatedView = null;
                this.activated = null;
                this._activatedRoute = null;
                this.deactivateEvents.emit(c);
            }
        };
        IonRouterOutlet.prototype.activateWith = function (activatedRoute, resolver) {
            var _this = this;
            if (this.isActivated) {
                throw new Error('Cannot activate an already activated outlet');
            }
            this._activatedRoute = activatedRoute;
            var cmpRef;
            var enteringView = this.stackCtrl.getExistingView(activatedRoute);
            if (enteringView && (!activatedRoute.routeConfig || !activatedRoute.routeConfig.data || !activatedRoute.routeConfig.data.noReuse)) {
                cmpRef = this.activated = enteringView.ref;
                var saved = enteringView.savedData;
                if (saved) {
                    // self-restore
                    var context = this.getContext();
                    context.children['contexts'] = saved;
                }
                // Updated activated route proxy for this component
                this.updateActivatedRouteProxy(cmpRef.instance, activatedRoute);
            }
            else {
                var snapshot = activatedRoute._futureSnapshot;
                var component = snapshot.routeConfig.component;
                resolver = resolver || this.resolver;
                var factory = resolver.resolveComponentFactory(component);
                var childContexts = this.parentContexts.getOrCreateContext(this.name).children;
                // We create an activated route proxy object that will maintain future updates for this component
                // over its lifecycle in the stack.
                var component$ = new rxjs.BehaviorSubject(null);
                var activatedRouteProxy = this.createActivatedRouteProxy(component$, activatedRoute);
                var injector = new OutletInjector(activatedRouteProxy, childContexts, this.location.injector);
                cmpRef = this.activated = this.location.createComponent(factory, this.location.length, injector);
                // Once the component is created we can push it to our local subject supplied to the proxy
                component$.next(cmpRef.instance);
                // Calling `markForCheck` to make sure we will run the change detection when the
                // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
                enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
                // Store references to the proxy by component
                this.proxyMap.set(cmpRef.instance, activatedRouteProxy);
                this.currentActivatedRoute$.next({ component: cmpRef.instance, activatedRoute: activatedRoute });
            }
            this.activatedView = enteringView;
            this.stackCtrl.setActive(enteringView).then(function (data) {
                _this.navCtrl.setTopOutlet(_this);
                _this.activateEvents.emit(cmpRef.instance);
                _this.stackEvents.emit(data);
            });
        };
        /**
         * Returns `true` if there are pages in the stack to go back.
         */
        IonRouterOutlet.prototype.canGoBack = function (deep, stackId) {
            if (deep === void 0) { deep = 1; }
            return this.stackCtrl.canGoBack(deep, stackId);
        };
        /**
         * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
         */
        IonRouterOutlet.prototype.pop = function (deep, stackId) {
            if (deep === void 0) { deep = 1; }
            return this.stackCtrl.pop(deep, stackId);
        };
        /**
         * Returns the URL of the active page of each stack.
         */
        IonRouterOutlet.prototype.getLastUrl = function (stackId) {
            var active = this.stackCtrl.getLastUrl(stackId);
            return active ? active.url : undefined;
        };
        /**
         * Returns the RouteView of the active page of each stack.
         * @internal
         */
        IonRouterOutlet.prototype.getLastRouteView = function (stackId) {
            return this.stackCtrl.getLastUrl(stackId);
        };
        /**
         * Returns the root view in the tab stack.
         * @internal
         */
        IonRouterOutlet.prototype.getRootView = function (stackId) {
            return this.stackCtrl.getRootUrl(stackId);
        };
        /**
         * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
         */
        IonRouterOutlet.prototype.getActiveStackId = function () {
            return this.stackCtrl.getActiveStackId();
        };
        /**
         * Since the activated route can change over the life time of a component in an ion router outlet, we create
         * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
         */
        IonRouterOutlet.prototype.createActivatedRouteProxy = function (component$, activatedRoute) {
            var proxy = new router.ActivatedRoute();
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
        };
        /**
         * Create a wrapped observable that will switch to the latest activated route matched by the given component
         */
        IonRouterOutlet.prototype.proxyObservable = function (component$, path) {
            var _this = this;
            return component$.pipe(
            // First wait until the component instance is pushed
            operators.filter(function (component) { return !!component; }), operators.switchMap(function (component) {
                return _this.currentActivatedRoute$.pipe(operators.filter(function (current) { return current !== null && current.component === component; }), operators.switchMap(function (current) { return current && current.activatedRoute[path]; }), operators.distinctUntilChanged());
            }));
        };
        /**
         * Updates the activated route proxy for the given component to the new incoming router state
         */
        IonRouterOutlet.prototype.updateActivatedRouteProxy = function (component, activatedRoute) {
            var proxy = this.proxyMap.get(component);
            if (!proxy) {
                throw new Error("Could not find activated route proxy for view");
            }
            proxy._futureSnapshot = activatedRoute._futureSnapshot;
            proxy._routerState = activatedRoute._routerState;
            proxy.snapshot = activatedRoute.snapshot;
            proxy.outlet = activatedRoute.outlet;
            proxy.component = activatedRoute.component;
            this.currentActivatedRoute$.next({ component: component, activatedRoute: activatedRoute });
        };
        IonRouterOutlet.ctorParameters = function () { return [
            { type: router.ChildrenOutletContexts },
            { type: core.ViewContainerRef },
            { type: core.ComponentFactoryResolver },
            { type: String, decorators: [{ type: core.Attribute, args: ['name',] }] },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Attribute, args: ['tabs',] }] },
            { type: Config },
            { type: NavController },
            { type: common.Location },
            { type: core.ElementRef },
            { type: router.Router },
            { type: core.NgZone },
            { type: router.ActivatedRoute },
            { type: IonRouterOutlet, decorators: [{ type: core.SkipSelf }, { type: core.Optional }] }
        ]; };
        __decorate([
            core.Output()
        ], IonRouterOutlet.prototype, "stackEvents", void 0);
        __decorate([
            core.Output('activate')
        ], IonRouterOutlet.prototype, "activateEvents", void 0);
        __decorate([
            core.Output('deactivate')
        ], IonRouterOutlet.prototype, "deactivateEvents", void 0);
        IonRouterOutlet = __decorate([
            core.Directive({
                selector: 'ion-router-outlet',
                exportAs: 'outlet',
                inputs: ['animated', 'animation', 'swipeGesture']
            }),
            __param(3, core.Attribute('name')),
            __param(4, core.Optional()), __param(4, core.Attribute('tabs')),
            __param(12, core.SkipSelf()), __param(12, core.Optional())
        ], IonRouterOutlet);
        return IonRouterOutlet;
    }());
    var OutletInjector = /** @class */ (function () {
        function OutletInjector(route, childContexts, parent) {
            this.route = route;
            this.childContexts = childContexts;
            this.parent = parent;
        }
        OutletInjector.prototype.get = function (token, notFoundValue) {
            if (token === router.ActivatedRoute) {
                return this.route;
            }
            if (token === router.ChildrenOutletContexts) {
                return this.childContexts;
            }
            // tslint:disable-next-line
            return this.parent.get(token, notFoundValue);
        };
        return OutletInjector;
    }());

    var IonTabs = /** @class */ (function () {
        function IonTabs(navCtrl) {
            this.navCtrl = navCtrl;
            this.ionTabsWillChange = new core.EventEmitter();
            this.ionTabsDidChange = new core.EventEmitter();
        }
        /**
         * @internal
         */
        IonTabs.prototype.onPageSelected = function (detail) {
            var stackId = detail.enteringView.stackId;
            if (detail.tabSwitch && stackId !== undefined) {
                if (this.tabBar) {
                    this.tabBar.selectedTab = stackId;
                }
                this.ionTabsWillChange.emit({ tab: stackId });
                this.ionTabsDidChange.emit({ tab: stackId });
            }
        };
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
        IonTabs.prototype.select = function (tab) {
            var alreadySelected = this.outlet.getActiveStackId() === tab;
            var tabRootUrl = this.outlet.tabsPrefix + "/" + tab;
            if (alreadySelected) {
                var activeStackId = this.outlet.getActiveStackId();
                var activeView = this.outlet.getLastRouteView(activeStackId);
                // If on root tab, do not navigate to root tab again
                if (activeView.url === tabRootUrl) {
                    return;
                }
                var rootView = this.outlet.getRootView(tab);
                var navigationExtras = rootView && tabRootUrl === rootView.url && rootView.savedExtras;
                return this.navCtrl.navigateRoot(tabRootUrl, __assign({}, (navigationExtras), { animated: true, animationDirection: 'back' }));
            }
            else {
                var lastRoute = this.outlet.getLastRouteView(tab);
                /**
                 * If there is a lastRoute, goto that, otherwise goto the fallback url of the
                 * selected tab
                 */
                var url = lastRoute && lastRoute.url || tabRootUrl;
                var navigationExtras = lastRoute && lastRoute.savedExtras;
                return this.navCtrl.navigateRoot(url, __assign({}, (navigationExtras), { animated: true, animationDirection: 'back' }));
            }
        };
        IonTabs.prototype.getSelected = function () {
            return this.outlet.getActiveStackId();
        };
        IonTabs.ctorParameters = function () { return [
            { type: NavController }
        ]; };
        __decorate([
            core.ViewChild('outlet', { read: IonRouterOutlet, static: false })
        ], IonTabs.prototype, "outlet", void 0);
        __decorate([
            core.ContentChild(IonTabBar, { static: false })
        ], IonTabs.prototype, "tabBar", void 0);
        __decorate([
            core.Output()
        ], IonTabs.prototype, "ionTabsWillChange", void 0);
        __decorate([
            core.Output()
        ], IonTabs.prototype, "ionTabsDidChange", void 0);
        __decorate([
            core.HostListener('ionTabButtonClick', ['$event.detail.tab'])
        ], IonTabs.prototype, "select", null);
        IonTabs = __decorate([
            core.Component({
                selector: 'ion-tabs',
                template: "\n    <ng-content select=\"[slot=top]\"></ng-content>\n    <div class=\"tabs-inner\">\n      <ion-router-outlet #outlet tabs=\"true\" (stackEvents)=\"onPageSelected($event)\"></ion-router-outlet>\n    </div>\n    <ng-content></ng-content>",
                styles: ["\n    :host {\n      display: flex;\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n\n      flex-direction: column;\n\n      width: 100%;\n      height: 100%;\n\n      contain: layout size style;\n      z-index: $z-index-page-container;\n    }\n    .tabs-inner {\n      position: relative;\n\n      flex: 1;\n\n      contain: layout size style;\n    }"]
            })
        ], IonTabs);
        return IonTabs;
    }());

    var IonBackButtonDelegate = /** @class */ (function () {
        function IonBackButtonDelegate(routerOutlet, navCtrl, config) {
            this.routerOutlet = routerOutlet;
            this.navCtrl = navCtrl;
            this.config = config;
        }
        /**
         * @internal
         */
        IonBackButtonDelegate.prototype.onClick = function (ev) {
            var defaultHref = this.defaultHref || this.config.get('backButtonDefaultHref');
            if (this.routerOutlet && this.routerOutlet.canGoBack()) {
                this.navCtrl.setDirection('back', undefined, undefined, this.routerAnimation);
                this.routerOutlet.pop();
                ev.preventDefault();
            }
            else if (defaultHref != null) {
                this.navCtrl.navigateBack(defaultHref, { animation: this.routerAnimation });
                ev.preventDefault();
            }
        };
        IonBackButtonDelegate.ctorParameters = function () { return [
            { type: IonRouterOutlet, decorators: [{ type: core.Optional }] },
            { type: NavController },
            { type: Config }
        ]; };
        __decorate([
            core.HostListener('click', ['$event'])
        ], IonBackButtonDelegate.prototype, "onClick", null);
        IonBackButtonDelegate = __decorate([
            core.Directive({
                selector: 'ion-back-button',
                inputs: ['defaultHref', 'routerAnimation'],
            }),
            __param(0, core.Optional())
        ], IonBackButtonDelegate);
        return IonBackButtonDelegate;
    }());

    var NavDelegate = /** @class */ (function () {
        function NavDelegate(ref, resolver, injector, angularDelegate, location) {
            this.el = ref.nativeElement;
            ref.nativeElement.delegate = angularDelegate.create(resolver, injector, location);
            proxyOutputs(this, this.el, ['ionNavDidChange', 'ionNavWillChange']);
        }
        NavDelegate.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ComponentFactoryResolver },
            { type: core.Injector },
            { type: AngularDelegate },
            { type: core.ViewContainerRef }
        ]; };
        NavDelegate = __decorate([
            ProxyCmp({
                inputs: ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'],
                methods: ['push', 'insert', 'insertPages', 'pop', 'popTo', 'popToRoot', 'removeIndex', 'setRoot', 'setPages', 'getActive', 'getByIndex', 'canGoBack', 'getPrevious']
            }),
            core.Directive({
                selector: 'ion-nav'
            })
        ], NavDelegate);
        return NavDelegate;
    }());

    var RouterLinkDelegate = /** @class */ (function () {
        function RouterLinkDelegate(locationStrategy, navCtrl, elementRef, router, routerLink) {
            this.locationStrategy = locationStrategy;
            this.navCtrl = navCtrl;
            this.elementRef = elementRef;
            this.router = router;
            this.routerLink = routerLink;
            this.routerDirection = 'forward';
        }
        RouterLinkDelegate.prototype.ngOnInit = function () {
            this.updateTargetUrlAndHref();
        };
        RouterLinkDelegate.prototype.ngOnChanges = function () {
            this.updateTargetUrlAndHref();
        };
        RouterLinkDelegate.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        RouterLinkDelegate.prototype.updateTargetUrlAndHref = function () {
            if (this.routerLink) {
                var href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
                this.elementRef.nativeElement.href = href;
            }
        };
        /**
         * @internal
         */
        RouterLinkDelegate.prototype.onClick = function (ev) {
            this.navCtrl.setDirection(this.routerDirection, undefined, undefined, this.routerAnimation);
            ev.preventDefault();
        };
        RouterLinkDelegate.ctorParameters = function () { return [
            { type: common.LocationStrategy },
            { type: NavController },
            { type: core.ElementRef },
            { type: router.Router },
            { type: router.RouterLink, decorators: [{ type: core.Optional }] }
        ]; };
        __decorate([
            core.HostListener('click', ['$event'])
        ], RouterLinkDelegate.prototype, "onClick", null);
        RouterLinkDelegate = __decorate([
            core.Directive({
                selector: '[routerLink]',
                inputs: ['routerDirection', 'routerAnimation']
            }),
            __param(4, core.Optional())
        ], RouterLinkDelegate);
        return RouterLinkDelegate;
    }());

    /**
     * @hidden
     */
    var VirtualFooter = /** @class */ (function () {
        function VirtualFooter(templateRef) {
            this.templateRef = templateRef;
        }
        VirtualFooter.ctorParameters = function () { return [
            { type: core.TemplateRef }
        ]; };
        VirtualFooter = __decorate([
            core.Directive({ selector: '[virtualFooter]' })
        ], VirtualFooter);
        return VirtualFooter;
    }());

    /**
     * @hidden
     */
    var VirtualHeader = /** @class */ (function () {
        function VirtualHeader(templateRef) {
            this.templateRef = templateRef;
        }
        VirtualHeader.ctorParameters = function () { return [
            { type: core.TemplateRef }
        ]; };
        VirtualHeader = __decorate([
            core.Directive({ selector: '[virtualHeader]' })
        ], VirtualHeader);
        return VirtualHeader;
    }());

    /**
     * @hidden
     */
    var VirtualItem = /** @class */ (function () {
        function VirtualItem(templateRef, viewContainer) {
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
        }
        VirtualItem.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: core.ViewContainerRef }
        ]; };
        VirtualItem = __decorate([
            core.Directive({ selector: '[virtualItem]' })
        ], VirtualItem);
        return VirtualItem;
    }());

    var IonVirtualScroll = /** @class */ (function () {
        function IonVirtualScroll(z, iterableDiffers, elementRef) {
            this.z = z;
            this.iterableDiffers = iterableDiffers;
            this.refMap = new WeakMap();
            this.el = elementRef.nativeElement;
            this.el.nodeRender = this.nodeRender.bind(this);
        }
        IonVirtualScroll.prototype.ngOnChanges = function (changes) {
            if (this.trackBy && 'items' in changes) {
                // React on virtualScroll changes only once all inputs have been initialized
                var value = changes['items'].currentValue;
                if (this.differ === undefined && value != null) {
                    try {
                        this.differ = this.iterableDiffers.find(value).create(this.trackBy);
                    }
                    catch (e) {
                        throw new Error("Cannot find a differ supporting object '" + value + "'. VirtualScroll only supports binding to Iterables such as Arrays.");
                    }
                }
            }
        };
        IonVirtualScroll.prototype.ngDoCheck = function () {
            // and if there actually are changes
            var changes = this.differ !== undefined && this.items ? this.differ.diff(this.items) : null;
            if (changes === null) {
                return;
            }
            // TODO: optimize
            this.checkRange(0);
        };
        IonVirtualScroll.prototype.nodeRender = function (el, cell, index) {
            var _this = this;
            return this.z.run(function () {
                var node;
                if (!el) {
                    node = _this.itmTmp.viewContainer.createEmbeddedView(_this.getComponent(cell.type), { $implicit: cell.value, index: index }, index);
                    el = getElement(node);
                    _this.refMap.set(el, node);
                }
                else {
                    node = _this.refMap.get(el);
                    var ctx = node.context;
                    ctx.$implicit = cell.value;
                    ctx.index = cell.index;
                }
                // run sync change detections
                node.detectChanges();
                return el;
            });
        };
        IonVirtualScroll.prototype.getComponent = function (type) {
            switch (type) {
                case 'item': return this.itmTmp.templateRef;
                case 'header': return this.hdrTmp.templateRef;
                case 'footer': return this.ftrTmp.templateRef;
            }
            throw new Error('template for virtual item was not provided');
        };
        IonVirtualScroll.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: core.IterableDiffers },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.ContentChild(VirtualItem, { static: false })
        ], IonVirtualScroll.prototype, "itmTmp", void 0);
        __decorate([
            core.ContentChild(VirtualHeader, { static: false })
        ], IonVirtualScroll.prototype, "hdrTmp", void 0);
        __decorate([
            core.ContentChild(VirtualFooter, { static: false })
        ], IonVirtualScroll.prototype, "ftrTmp", void 0);
        IonVirtualScroll = __decorate([
            ProxyCmp({
                inputs: ['approxItemHeight', 'approxHeaderHeight', 'approxFooterHeight', 'headerFn', 'footerFn', 'items', 'itemHeight', 'headerHeight', 'footerHeight'],
                methods: ['checkEnd', 'checkRange', 'positionForItem']
            }),
            core.Component({
                selector: 'ion-virtual-scroll',
                template: '<ng-content></ng-content>',
                changeDetection: core.ChangeDetectionStrategy.OnPush,
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
        return IonVirtualScroll;
    }());
    var getElement = function (view) {
        var rootNodes = view.rootNodes;
        for (var i = 0; i < rootNodes.length; i++) {
            if (rootNodes[i].nodeType === 1) {
                return rootNodes[i];
            }
        }
        throw new Error('virtual element was not created');
    };
    var ɵ0$7 = getElement;

    var OverlayBaseController = /** @class */ (function () {
        function OverlayBaseController(ctrl) {
            this.ctrl = ctrl;
        }
        /**
         * Creates a new overlay
         */
        OverlayBaseController.prototype.create = function (opts) {
            // TODO: next major release opts is not optional
            return this.ctrl.create((opts || {}));
        };
        /**
         * When `id` is not provided, it dismisses the top overlay.
         */
        OverlayBaseController.prototype.dismiss = function (data, role, id) {
            return this.ctrl.dismiss(data, role, id);
        };
        /**
         * Returns the top overlay.
         */
        OverlayBaseController.prototype.getTop = function () {
            return this.ctrl.getTop();
        };
        return OverlayBaseController;
    }());

    var ActionSheetController = /** @class */ (function (_super) {
        __extends(ActionSheetController, _super);
        function ActionSheetController() {
            return _super.call(this, core$1.actionSheetController) || this;
        }
        ActionSheetController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ActionSheetController_Factory() { return new ActionSheetController(); }, token: ActionSheetController, providedIn: "root" });
        ActionSheetController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], ActionSheetController);
        return ActionSheetController;
    }(OverlayBaseController));

    var AlertController = /** @class */ (function (_super) {
        __extends(AlertController, _super);
        function AlertController() {
            return _super.call(this, core$1.alertController) || this;
        }
        AlertController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AlertController_Factory() { return new AlertController(); }, token: AlertController, providedIn: "root" });
        AlertController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], AlertController);
        return AlertController;
    }(OverlayBaseController));

    var LoadingController = /** @class */ (function (_super) {
        __extends(LoadingController, _super);
        function LoadingController() {
            return _super.call(this, core$1.loadingController) || this;
        }
        LoadingController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function LoadingController_Factory() { return new LoadingController(); }, token: LoadingController, providedIn: "root" });
        LoadingController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], LoadingController);
        return LoadingController;
    }(OverlayBaseController));

    var MenuController = /** @class */ (function () {
        function MenuController() {
        }
        /**
         * Programmatically open the Menu.
         * @param [menuId]  Optionally get the menu by its id, or side.
         * @return returns a promise when the menu is fully opened
         */
        MenuController.prototype.open = function (menuId) {
            return core$1.menuController.open(menuId);
        };
        /**
         * Programmatically close the Menu. If no `menuId` is given as the first
         * argument then it'll close any menu which is open. If a `menuId`
         * is given then it'll close that exact menu.
         * @param [menuId]  Optionally get the menu by its id, or side.
         * @return returns a promise when the menu is fully closed
         */
        MenuController.prototype.close = function (menuId) {
            return core$1.menuController.close(menuId);
        };
        /**
         * Toggle the menu. If it's closed, it will open, and if opened, it
         * will close.
         * @param [menuId]  Optionally get the menu by its id, or side.
         * @return returns a promise when the menu has been toggled
         */
        MenuController.prototype.toggle = function (menuId) {
            return core$1.menuController.toggle(menuId);
        };
        /**
         * Used to enable or disable a menu. For example, there could be multiple
         * left menus, but only one of them should be able to be opened at the same
         * time. If there are multiple menus on the same side, then enabling one menu
         * will also automatically disable all the others that are on the same side.
         * @param [menuId]  Optionally get the menu by its id, or side.
         * @return Returns the instance of the menu, which is useful for chaining.
         */
        MenuController.prototype.enable = function (shouldEnable, menuId) {
            return core$1.menuController.enable(shouldEnable, menuId);
        };
        /**
         * Used to enable or disable the ability to swipe open the menu.
         * @param shouldEnable  True if it should be swipe-able, false if not.
         * @param [menuId]  Optionally get the menu by its id, or side.
         * @return Returns the instance of the menu, which is useful for chaining.
         */
        MenuController.prototype.swipeGesture = function (shouldEnable, menuId) {
            return core$1.menuController.swipeGesture(shouldEnable, menuId);
        };
        /**
         * @param [menuId] Optionally get the menu by its id, or side.
         * @return Returns true if the specified menu is currently open, otherwise false.
         * If the menuId is not specified, it returns true if ANY menu is currenly open.
         */
        MenuController.prototype.isOpen = function (menuId) {
            return core$1.menuController.isOpen(menuId);
        };
        /**
         * @param [menuId]  Optionally get the menu by its id, or side.
         * @return Returns true if the menu is currently enabled, otherwise false.
         */
        MenuController.prototype.isEnabled = function (menuId) {
            return core$1.menuController.isEnabled(menuId);
        };
        /**
         * Used to get a menu instance. If a `menuId` is not provided then it'll
         * return the first menu found. If a `menuId` is `left` or `right`, then
         * it'll return the enabled menu on that side. Otherwise, if a `menuId` is
         * provided, then it'll try to find the menu using the menu's `id`
         * property. If a menu is not found then it'll return `null`.
         * @param [menuId]  Optionally get the menu by its id, or side.
         * @return Returns the instance of the menu if found, otherwise `null`.
         */
        MenuController.prototype.get = function (menuId) {
            return core$1.menuController.get(menuId);
        };
        /**
         * @return Returns the instance of the menu already opened, otherwise `null`.
         */
        MenuController.prototype.getOpen = function () {
            return core$1.menuController.getOpen();
        };
        /**
         * @return Returns an array of all menu instances.
         */
        MenuController.prototype.getMenus = function () {
            return core$1.menuController.getMenus();
        };
        MenuController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function MenuController_Factory() { return new MenuController(); }, token: MenuController, providedIn: "root" });
        MenuController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], MenuController);
        return MenuController;
    }());

    var PickerController = /** @class */ (function (_super) {
        __extends(PickerController, _super);
        function PickerController() {
            return _super.call(this, core$1.pickerController) || this;
        }
        PickerController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PickerController_Factory() { return new PickerController(); }, token: PickerController, providedIn: "root" });
        PickerController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], PickerController);
        return PickerController;
    }(OverlayBaseController));

    var ModalController = /** @class */ (function (_super) {
        __extends(ModalController, _super);
        function ModalController(angularDelegate, resolver, injector) {
            var _this = _super.call(this, core$1.modalController) || this;
            _this.angularDelegate = angularDelegate;
            _this.resolver = resolver;
            _this.injector = injector;
            return _this;
        }
        ModalController.prototype.create = function (opts) {
            return _super.prototype.create.call(this, __assign({}, opts, { delegate: this.angularDelegate.create(this.resolver, this.injector) }));
        };
        ModalController.ctorParameters = function () { return [
            { type: AngularDelegate },
            { type: core.ComponentFactoryResolver },
            { type: core.Injector }
        ]; };
        ModalController = __decorate([
            core.Injectable()
        ], ModalController);
        return ModalController;
    }(OverlayBaseController));

    var PopoverController = /** @class */ (function (_super) {
        __extends(PopoverController, _super);
        function PopoverController(angularDelegate, resolver, injector) {
            var _this = _super.call(this, core$1.popoverController) || this;
            _this.angularDelegate = angularDelegate;
            _this.resolver = resolver;
            _this.injector = injector;
            return _this;
        }
        PopoverController.prototype.create = function (opts) {
            return _super.prototype.create.call(this, __assign({}, opts, { delegate: this.angularDelegate.create(this.resolver, this.injector) }));
        };
        PopoverController.ctorParameters = function () { return [
            { type: AngularDelegate },
            { type: core.ComponentFactoryResolver },
            { type: core.Injector }
        ]; };
        PopoverController = __decorate([
            core.Injectable()
        ], PopoverController);
        return PopoverController;
    }(OverlayBaseController));

    var ToastController = /** @class */ (function (_super) {
        __extends(ToastController, _super);
        function ToastController() {
            return _super.call(this, core$1.toastController) || this;
        }
        ToastController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ToastController_Factory() { return new ToastController(); }, token: ToastController, providedIn: "root" });
        ToastController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], ToastController);
        return ToastController;
    }(OverlayBaseController));

    var DomController = /** @class */ (function () {
        function DomController() {
        }
        /**
         * Schedules a task to run during the READ phase of the next frame.
         * This task should only read the DOM, but never modify it.
         */
        DomController.prototype.read = function (cb) {
            getQueue().read(cb);
        };
        /**
         * Schedules a task to run during the WRITE phase of the next frame.
         * This task should write the DOM, but never READ it.
         */
        DomController.prototype.write = function (cb) {
            getQueue().write(cb);
        };
        DomController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DomController_Factory() { return new DomController(); }, token: DomController, providedIn: "root" });
        DomController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], DomController);
        return DomController;
    }());
    var getQueue = function () {
        var win = typeof window !== 'undefined' ? window : null;
        if (win != null) {
            var Ionic = win.Ionic;
            if (Ionic && Ionic.queue) {
                return Ionic.queue;
            }
            return {
                read: function (cb) { return win.requestAnimationFrame(cb); },
                write: function (cb) { return win.requestAnimationFrame(cb); }
            };
        }
        return {
            read: function (cb) { return cb(); },
            write: function (cb) { return cb(); }
        };
    };
    var ɵ0$8 = getQueue;

    var AnimationController = /** @class */ (function () {
        function AnimationController() {
        }
        /**
         * Create a new animation
         */
        AnimationController.prototype.create = function (animationId) {
            return core$1.createAnimation(animationId);
        };
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
        AnimationController.prototype.easingTime = function (p0, p1, p2, p3, progression) {
            return core$1.getTimeGivenProgression(p0, p1, p2, p3, progression);
        };
        AnimationController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AnimationController_Factory() { return new AnimationController(); }, token: AnimationController, providedIn: "root" });
        AnimationController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], AnimationController);
        return AnimationController;
    }());

    var GestureController = /** @class */ (function () {
        function GestureController(zone) {
            this.zone = zone;
        }
        /**
         * Create a new gesture
         */
        GestureController.prototype.create = function (opts, runInsideAngularZone) {
            var _this = this;
            if (runInsideAngularZone === void 0) { runInsideAngularZone = false; }
            if (runInsideAngularZone) {
                Object.getOwnPropertyNames(opts).forEach(function (key) {
                    if (typeof opts[key] === 'function') {
                        var fn_1 = opts[key];
                        opts[key] = function () {
                            var props = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                props[_i] = arguments[_i];
                            }
                            return _this.zone.run(function () { return fn_1.apply(void 0, __spread(props)); });
                        };
                    }
                });
            }
            return core$1.createGesture(opts);
        };
        GestureController.ctorParameters = function () { return [
            { type: core.NgZone }
        ]; };
        GestureController.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function GestureController_Factory() { return new GestureController(core.ɵɵinject(core.NgZone)); }, token: GestureController, providedIn: "root" });
        GestureController = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], GestureController);
        return GestureController;
    }());

    var IonicRouteStrategy = /** @class */ (function () {
        function IonicRouteStrategy() {
        }
        IonicRouteStrategy.prototype.shouldDetach = function (_route) {
            return false;
        };
        IonicRouteStrategy.prototype.shouldAttach = function (_route) {
            return false;
        };
        IonicRouteStrategy.prototype.store = function (_route, _detachedTree) {
            return;
        };
        IonicRouteStrategy.prototype.retrieve = function (_route) {
            return null;
        };
        IonicRouteStrategy.prototype.shouldReuseRoute = function (future, curr) {
            var e_1, _a;
            if (future.routeConfig !== curr.routeConfig) {
                return false;
            }
            // checking router params
            var futureParams = future.params;
            var currentParams = curr.params;
            var keysA = Object.keys(futureParams);
            var keysB = Object.keys(currentParams);
            if (keysA.length !== keysB.length) {
                return false;
            }
            try {
                // Test for A's keys different from B.
                for (var keysA_1 = __values(keysA), keysA_1_1 = keysA_1.next(); !keysA_1_1.done; keysA_1_1 = keysA_1.next()) {
                    var key = keysA_1_1.value;
                    if (currentParams[key] !== futureParams[key]) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keysA_1_1 && !keysA_1_1.done && (_a = keysA_1.return)) _a.call(keysA_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        };
        return IonicRouteStrategy;
    }());

    var didInitialize = false;
    var appInitialize = function (config, doc, zone) {
        return function () {
            var win = doc.defaultView;
            if (win && typeof window !== 'undefined') {
                if (didInitialize) {
                    console.warn('Ionic Angular was already initialized. Make sure IonicModule.forRoot() is just called once.');
                }
                didInitialize = true;
                var Ionic = win.Ionic = win.Ionic || {};
                Ionic.config = __assign({}, config, { _zoneGate: function (h) { return zone.run(h); } });
                var aelFn_1 = '__zone_symbol__addEventListener' in doc.body
                    ? '__zone_symbol__addEventListener'
                    : 'addEventListener';
                return loader.applyPolyfills().then(function () {
                    return loader.defineCustomElements(win, {
                        exclude: ['ion-tabs', 'ion-tab'],
                        syncQueue: true,
                        raf: raf,
                        jmp: function (h) { return zone.runOutsideAngular(h); },
                        ael: function (elm, eventName, cb, opts) {
                            elm[aelFn_1](eventName, cb, opts);
                        },
                        rel: function (elm, eventName, cb, opts) {
                            elm.removeEventListener(eventName, cb, opts);
                        }
                    });
                });
            }
        };
    };

    var DECLARATIONS = [
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
    var IonicModule = /** @class */ (function () {
        function IonicModule() {
        }
        IonicModule_1 = IonicModule;
        IonicModule.forRoot = function (config) {
            return {
                ngModule: IonicModule_1,
                providers: [
                    {
                        provide: ConfigToken,
                        useValue: config
                    },
                    {
                        provide: core.APP_INITIALIZER,
                        useFactory: appInitialize,
                        multi: true,
                        deps: [
                            ConfigToken,
                            common.DOCUMENT,
                            core.NgZone
                        ]
                    }
                ]
            };
        };
        var IonicModule_1;
        IonicModule = IonicModule_1 = __decorate([
            core.NgModule({
                declarations: DECLARATIONS,
                exports: DECLARATIONS,
                providers: [AngularDelegate, ModalController, PopoverController],
                imports: [common.CommonModule]
            })
        ], IonicModule);
        return IonicModule;
    }());

    Object.defineProperty(exports, 'IonicSafeString', {
        enumerable: true,
        get: function () {
            return core$1.IonicSafeString;
        }
    });
    Object.defineProperty(exports, 'createAnimation', {
        enumerable: true,
        get: function () {
            return core$1.createAnimation;
        }
    });
    Object.defineProperty(exports, 'getPlatforms', {
        enumerable: true,
        get: function () {
            return core$1.getPlatforms;
        }
    });
    Object.defineProperty(exports, 'iosTransitionAnimation', {
        enumerable: true,
        get: function () {
            return core$1.iosTransitionAnimation;
        }
    });
    Object.defineProperty(exports, 'isPlatform', {
        enumerable: true,
        get: function () {
            return core$1.isPlatform;
        }
    });
    Object.defineProperty(exports, 'mdTransitionAnimation', {
        enumerable: true,
        get: function () {
            return core$1.mdTransitionAnimation;
        }
    });
    exports.ActionSheetController = ActionSheetController;
    exports.AlertController = AlertController;
    exports.AngularDelegate = AngularDelegate;
    exports.AnimationController = AnimationController;
    exports.BooleanValueAccessor = BooleanValueAccessor;
    exports.Config = Config;
    exports.DomController = DomController;
    exports.GestureController = GestureController;
    exports.IonApp = IonApp;
    exports.IonAvatar = IonAvatar;
    exports.IonBackButton = IonBackButton;
    exports.IonBackButtonDelegate = IonBackButtonDelegate;
    exports.IonBackdrop = IonBackdrop;
    exports.IonBadge = IonBadge;
    exports.IonButton = IonButton;
    exports.IonButtons = IonButtons;
    exports.IonCard = IonCard;
    exports.IonCardContent = IonCardContent;
    exports.IonCardHeader = IonCardHeader;
    exports.IonCardSubtitle = IonCardSubtitle;
    exports.IonCardTitle = IonCardTitle;
    exports.IonCheckbox = IonCheckbox;
    exports.IonChip = IonChip;
    exports.IonCol = IonCol;
    exports.IonContent = IonContent;
    exports.IonDatetime = IonDatetime;
    exports.IonFab = IonFab;
    exports.IonFabButton = IonFabButton;
    exports.IonFabList = IonFabList;
    exports.IonFooter = IonFooter;
    exports.IonGrid = IonGrid;
    exports.IonHeader = IonHeader;
    exports.IonIcon = IonIcon;
    exports.IonImg = IonImg;
    exports.IonInfiniteScroll = IonInfiniteScroll;
    exports.IonInfiniteScrollContent = IonInfiniteScrollContent;
    exports.IonInput = IonInput;
    exports.IonItem = IonItem;
    exports.IonItemDivider = IonItemDivider;
    exports.IonItemGroup = IonItemGroup;
    exports.IonItemOption = IonItemOption;
    exports.IonItemOptions = IonItemOptions;
    exports.IonItemSliding = IonItemSliding;
    exports.IonLabel = IonLabel;
    exports.IonList = IonList;
    exports.IonListHeader = IonListHeader;
    exports.IonMenu = IonMenu;
    exports.IonMenuButton = IonMenuButton;
    exports.IonMenuToggle = IonMenuToggle;
    exports.IonNav = IonNav;
    exports.IonNavLink = IonNavLink;
    exports.IonNote = IonNote;
    exports.IonProgressBar = IonProgressBar;
    exports.IonRadio = IonRadio;
    exports.IonRadioGroup = IonRadioGroup;
    exports.IonRange = IonRange;
    exports.IonRefresher = IonRefresher;
    exports.IonRefresherContent = IonRefresherContent;
    exports.IonReorder = IonReorder;
    exports.IonReorderGroup = IonReorderGroup;
    exports.IonRippleEffect = IonRippleEffect;
    exports.IonRouterOutlet = IonRouterOutlet;
    exports.IonRow = IonRow;
    exports.IonSearchbar = IonSearchbar;
    exports.IonSegment = IonSegment;
    exports.IonSegmentButton = IonSegmentButton;
    exports.IonSelect = IonSelect;
    exports.IonSelectOption = IonSelectOption;
    exports.IonSkeletonText = IonSkeletonText;
    exports.IonSlide = IonSlide;
    exports.IonSlides = IonSlides;
    exports.IonSpinner = IonSpinner;
    exports.IonSplitPane = IonSplitPane;
    exports.IonTabBar = IonTabBar;
    exports.IonTabButton = IonTabButton;
    exports.IonTabs = IonTabs;
    exports.IonText = IonText;
    exports.IonTextarea = IonTextarea;
    exports.IonThumbnail = IonThumbnail;
    exports.IonTitle = IonTitle;
    exports.IonToggle = IonToggle;
    exports.IonToolbar = IonToolbar;
    exports.IonVirtualScroll = IonVirtualScroll;
    exports.IonicModule = IonicModule;
    exports.IonicRouteStrategy = IonicRouteStrategy;
    exports.LoadingController = LoadingController;
    exports.MenuController = MenuController;
    exports.ModalController = ModalController;
    exports.NavController = NavController;
    exports.NavDelegate = NavDelegate;
    exports.NavParams = NavParams;
    exports.NumericValueAccessor = NumericValueAccessor;
    exports.PickerController = PickerController;
    exports.Platform = Platform;
    exports.PopoverController = PopoverController;
    exports.RadioValueAccessor = RadioValueAccessor;
    exports.RouterLinkDelegate = RouterLinkDelegate;
    exports.SelectValueAccessor = SelectValueAccessor;
    exports.TextValueAccessor = TextValueAccessor;
    exports.ToastController = ToastController;
    exports.VirtualFooter = VirtualFooter;
    exports.VirtualHeader = VirtualHeader;
    exports.VirtualItem = VirtualItem;
    exports.ɵa = ConfigToken;
    exports.ɵb = ValueAccessor;
    exports.ɵc = ProxyCmp;
    exports.ɵe = OverlayBaseController;
    exports.ɵf = appInitialize;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ionic-angular.umd.js.map
