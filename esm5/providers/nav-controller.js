import * as tslib_1 from "tslib";
import { Location } from '@angular/common';
import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, NavigationStart, Router, UrlSerializer, UrlTree } from '@angular/router';
import { Platform } from './platform';
import * as i0 from "@angular/core";
import * as i1 from "./platform";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
var NavController = /** @class */ (function () {
    function NavController(platform, location, serializer, router) {
        var _this = this;
        this.location = location;
        this.serializer = serializer;
        this.router = router;
        this.direction = DEFAULT_DIRECTION;
        this.animated = DEFAULT_ANIMATED;
        this.guessDirection = 'forward';
        this.lastNavId = -1;
        // Subscribe to router events to detect direction
        if (router) {
            router.events.subscribe(function (ev) {
                if (ev instanceof NavigationStart) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var outlet;
            return tslib_1.__generator(this, function (_a) {
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
                urlTree.queryParams = tslib_1.__assign({}, options.queryParams);
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
        { type: Location },
        { type: UrlSerializer },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
    NavController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NavController_Factory() { return new NavController(i0.ɵɵinject(i1.Platform), i0.ɵɵinject(i2.Location), i0.ɵɵinject(i3.UrlSerializer), i0.ɵɵinject(i3.Router, 8)); }, token: NavController, providedIn: "root" });
    NavController = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__param(3, Optional())
    ], NavController);
    return NavController;
}());
export { NavController };
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
var ɵ0 = getAnimation;
var DEFAULT_DIRECTION = 'auto';
var DEFAULT_ANIMATED = undefined;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9uYXYtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUtwRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7OztBQWF0QztJQVVFLHVCQUNFLFFBQWtCLEVBQ1YsUUFBa0IsRUFDbEIsVUFBeUIsRUFDYixNQUFlO1FBSnJDLGlCQXVCQztRQXJCUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDYixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBWDdCLGNBQVMsR0FBeUMsaUJBQWlCLENBQUM7UUFDcEUsYUFBUSxHQUFrQixnQkFBZ0IsQ0FBQztRQUUzQyxtQkFBYyxHQUFvQixTQUFTLENBQUM7UUFFNUMsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBUXJCLGlEQUFpRDtRQUNqRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsRUFBRTtnQkFDeEIsSUFBSSxFQUFFLFlBQVksZUFBZSxFQUFFO29CQUNqQyxJQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3RFLEtBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxHQUFHLEtB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Q3BELE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyxDQUFDOztBQUVGLElBQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBQ2pDLElBQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uRXh0cmFzLCBOYXZpZ2F0aW9uU3RhcnQsIFJvdXRlciwgVXJsU2VyaWFsaXplciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkJ1aWxkZXIsIE5hdkRpcmVjdGlvbiwgUm91dGVyRGlyZWN0aW9uIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSW9uUm91dGVyT3V0bGV0IH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL2lvbi1yb3V0ZXItb3V0bGV0JztcclxuXHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9wbGF0Zm9ybSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvbk9wdGlvbnMge1xyXG4gIGFuaW1hdGVkPzogYm9vbGVhbjtcclxuICBhbmltYXRpb24/OiBBbmltYXRpb25CdWlsZGVyO1xyXG4gIGFuaW1hdGlvbkRpcmVjdGlvbj86ICdmb3J3YXJkJyB8ICdiYWNrJztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOYXZpZ2F0aW9uT3B0aW9ucyBleHRlbmRzIE5hdmlnYXRpb25FeHRyYXMsIEFuaW1hdGlvbk9wdGlvbnMge31cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOYXZDb250cm9sbGVyIHtcclxuXHJcbiAgcHJpdmF0ZSB0b3BPdXRsZXQ/OiBJb25Sb3V0ZXJPdXRsZXQ7XHJcbiAgcHJpdmF0ZSBkaXJlY3Rpb246ICdmb3J3YXJkJyB8ICdiYWNrJyB8ICdyb290JyB8ICdhdXRvJyA9IERFRkFVTFRfRElSRUNUSU9OO1xyXG4gIHByaXZhdGUgYW5pbWF0ZWQ/OiBOYXZEaXJlY3Rpb24gPSBERUZBVUxUX0FOSU1BVEVEO1xyXG4gIHByaXZhdGUgYW5pbWF0aW9uQnVpbGRlcj86IEFuaW1hdGlvbkJ1aWxkZXI7XHJcbiAgcHJpdmF0ZSBndWVzc0RpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uID0gJ2ZvcndhcmQnO1xyXG4gIHByaXZhdGUgZ3Vlc3NBbmltYXRpb24/OiBOYXZEaXJlY3Rpb247XHJcbiAgcHJpdmF0ZSBsYXN0TmF2SWQgPSAtMTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgIHByaXZhdGUgc2VyaWFsaXplcjogVXJsU2VyaWFsaXplcixcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyPzogUm91dGVyLFxyXG4gICkge1xyXG4gICAgLy8gU3Vic2NyaWJlIHRvIHJvdXRlciBldmVudHMgdG8gZGV0ZWN0IGRpcmVjdGlvblxyXG4gICAgaWYgKHJvdXRlcikge1xyXG4gICAgICByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShldiA9PiB7XHJcbiAgICAgICAgaWYgKGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IChldi5yZXN0b3JlZFN0YXRlKSA/IGV2LnJlc3RvcmVkU3RhdGUubmF2aWdhdGlvbklkIDogZXYuaWQ7XHJcbiAgICAgICAgICB0aGlzLmd1ZXNzRGlyZWN0aW9uID0gaWQgPCB0aGlzLmxhc3ROYXZJZCA/ICdiYWNrJyA6ICdmb3J3YXJkJztcclxuICAgICAgICAgIHRoaXMuZ3Vlc3NBbmltYXRpb24gPSAhZXYucmVzdG9yZWRTdGF0ZSA/IHRoaXMuZ3Vlc3NEaXJlY3Rpb24gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB0aGlzLmxhc3ROYXZJZCA9IHRoaXMuZ3Vlc3NEaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IGV2LmlkIDogaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gYmFja0J1dHRvbiBldmVudHNcclxuICAgIHBsYXRmb3JtLmJhY2tCdXR0b24uc3Vic2NyaWJlV2l0aFByaW9yaXR5KDAsIHByb2Nlc3NOZXh0SGFuZGxlciA9PiB7XHJcbiAgICAgIHRoaXMucG9wKCk7XHJcbiAgICAgIHByb2Nlc3NOZXh0SGFuZGxlcigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCB1c2VzIEFuZ3VsYXIncyBbUm91dGVyXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXIpIHVuZGVyIHRoZSBob29kLFxyXG4gICAqIGl0J3MgZXF1aXZhbGVudCB0byBjYWxsaW5nIGB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKClgLCBidXQgaXQncyBleHBsaWNpdCBhYm91dCB0aGUgKipkaXJlY3Rpb24qKiBvZiB0aGUgdHJhbnNpdGlvbi5cclxuICAgKlxyXG4gICAqIEdvaW5nICoqZm9yd2FyZCoqIG1lYW5zIHRoYXQgYSBuZXcgcGFnZSBpcyBnb2luZyB0byBiZSBwdXNoZWQgdG8gdGhlIHN0YWNrIG9mIHRoZSBvdXRsZXQgKGlvbi1yb3V0ZXItb3V0bGV0KSxcclxuICAgKiBhbmQgdGhhdCBpdCB3aWxsIHNob3cgYSBcImZvcndhcmRcIiBhbmltYXRpb24gYnkgZGVmYXVsdC5cclxuICAgKlxyXG4gICAqIE5hdmlnYXRpbmcgZm9yd2FyZCBjYW4gYWxzbyBiZSB0cmlnZ2VyZWQgaW4gYSBkZWNsYXJhdGl2ZSBtYW5uZXIgYnkgdXNpbmcgdGhlIGBbcm91dGVyRGlyZWN0aW9uXWAgZGlyZWN0aXZlOlxyXG4gICAqXHJcbiAgICogYGBgaHRtbFxyXG4gICAqIDxhIHJvdXRlckxpbms9XCIvcGF0aC90by9wYWdlXCIgcm91dGVyRGlyZWN0aW9uPVwiZm9yd2FyZFwiPkxpbms8L2E+XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgbmF2aWdhdGVGb3J3YXJkKHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zOiBOYXZpZ2F0aW9uT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICB0aGlzLnNldERpcmVjdGlvbignZm9yd2FyZCcsIG9wdGlvbnMuYW5pbWF0ZWQsIG9wdGlvbnMuYW5pbWF0aW9uRGlyZWN0aW9uLCBvcHRpb25zLmFuaW1hdGlvbik7XHJcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZSh1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgdXNlcyBBbmd1bGFyJ3MgW1JvdXRlcl0oaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9yb3V0ZXIvUm91dGVyKSB1bmRlciB0aGUgaG9vZCxcclxuICAgKiBpdCdzIGVxdWl2YWxlbnQgdG8gY2FsbGluZzpcclxuICAgKlxyXG4gICAqIGBgYHRzXHJcbiAgICogdGhpcy5uYXZDb250cm9sbGVyLnNldERpcmVjdGlvbignYmFjaycpO1xyXG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwocGF0aCk7XHJcbiAgICogYGBgXHJcbiAgICpcclxuICAgKiBHb2luZyAqKmJhY2sqKiBtZWFucyB0aGF0IGFsbCB0aGUgcGFnZXMgaW4gdGhlIHN0YWNrIHVudGlsIHRoZSBuYXZpZ2F0ZWQgcGFnZSBpcyBmb3VuZCB3aWxsIGJlIHBvcHBlZCxcclxuICAgKiBhbmQgdGhhdCBpdCB3aWxsIHNob3cgYSBcImJhY2tcIiBhbmltYXRpb24gYnkgZGVmYXVsdC5cclxuICAgKlxyXG4gICAqIE5hdmlnYXRpbmcgYmFjayBjYW4gYWxzbyBiZSB0cmlnZ2VyZWQgaW4gYSBkZWNsYXJhdGl2ZSBtYW5uZXIgYnkgdXNpbmcgdGhlIGBbcm91dGVyRGlyZWN0aW9uXWAgZGlyZWN0aXZlOlxyXG4gICAqXHJcbiAgICogYGBgaHRtbFxyXG4gICAqIDxhIHJvdXRlckxpbms9XCIvcGF0aC90by9wYWdlXCIgcm91dGVyRGlyZWN0aW9uPVwiYmFja1wiPkxpbms8L2E+XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgbmF2aWdhdGVCYWNrKHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zOiBOYXZpZ2F0aW9uT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICB0aGlzLnNldERpcmVjdGlvbignYmFjaycsIG9wdGlvbnMuYW5pbWF0ZWQsIG9wdGlvbnMuYW5pbWF0aW9uRGlyZWN0aW9uLCBvcHRpb25zLmFuaW1hdGlvbik7XHJcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZSh1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgdXNlcyBBbmd1bGFyJ3MgW1JvdXRlcl0oaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9yb3V0ZXIvUm91dGVyKSB1bmRlciB0aGUgaG9vZCxcclxuICAgKiBpdCdzIGVxdWl2YWxlbnQgdG8gY2FsbGluZzpcclxuICAgKlxyXG4gICAqIGBgYHRzXHJcbiAgICogdGhpcy5uYXZDb250cm9sbGVyLnNldERpcmVjdGlvbigncm9vdCcpO1xyXG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwocGF0aCk7XHJcbiAgICogYGBgXHJcbiAgICpcclxuICAgKiBHb2luZyAqKnJvb3QqKiBtZWFucyB0aGF0IGFsbCBleGlzdGluZyBwYWdlcyBpbiB0aGUgc3RhY2sgd2lsbCBiZSByZW1vdmVkLFxyXG4gICAqIGFuZCB0aGUgbmF2aWdhdGVkIHBhZ2Ugd2lsbCBiZWNvbWUgdGhlIHNpbmdsZSBwYWdlIGluIHRoZSBzdGFjay5cclxuICAgKlxyXG4gICAqIE5hdmlnYXRpbmcgcm9vdCBjYW4gYWxzbyBiZSB0cmlnZ2VyZWQgaW4gYSBkZWNsYXJhdGl2ZSBtYW5uZXIgYnkgdXNpbmcgdGhlIGBbcm91dGVyRGlyZWN0aW9uXWAgZGlyZWN0aXZlOlxyXG4gICAqXHJcbiAgICogYGBgaHRtbFxyXG4gICAqIDxhIHJvdXRlckxpbms9XCIvcGF0aC90by9wYWdlXCIgcm91dGVyRGlyZWN0aW9uPVwicm9vdFwiPkxpbms8L2E+XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgbmF2aWdhdGVSb290KHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zOiBOYXZpZ2F0aW9uT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICB0aGlzLnNldERpcmVjdGlvbigncm9vdCcsIG9wdGlvbnMuYW5pbWF0ZWQsIG9wdGlvbnMuYW5pbWF0aW9uRGlyZWN0aW9uLCBvcHRpb25zLmFuaW1hdGlvbik7XHJcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZSh1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2FtZSBhcyBbTG9jYXRpb25dKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29tbW9uL0xvY2F0aW9uKSdzIGJhY2soKSBtZXRob2QuXHJcbiAgICogSXQgd2lsbCB1c2UgdGhlIHN0YW5kYXJkIGB3aW5kb3cuaGlzdG9yeS5iYWNrKClgIHVuZGVyIHRoZSBob29kLCBidXQgZmVhdHVyaW5nIGEgYGJhY2tgIGFuaW1hdGlvblxyXG4gICAqIGJ5IGRlZmF1bHQuXHJcbiAgICovXHJcbiAgYmFjayhvcHRpb25zOiBBbmltYXRpb25PcHRpb25zID0geyBhbmltYXRlZDogdHJ1ZSwgYW5pbWF0aW9uRGlyZWN0aW9uOiAnYmFjaycgfSkge1xyXG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ2JhY2snLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbiwgb3B0aW9ucy5hbmltYXRpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2RzIGdvZXMgYmFjayBpbiB0aGUgY29udGV4dCBvZiBJb25pYydzIHN0YWNrIG5hdmlnYXRpb24uXHJcbiAgICpcclxuICAgKiBJdCByZWN1cnNpdmVseSBmaW5kcyB0aGUgdG9wIGFjdGl2ZSBgaW9uLXJvdXRlci1vdXRsZXRgIGFuZCBjYWxscyBgcG9wKClgLlxyXG4gICAqIFRoaXMgaXMgdGhlIHJlY29tbWVuZGVkIHdheSB0byBnbyBiYWNrIHdoZW4geW91IGFyZSB1c2luZyBgaW9uLXJvdXRlci1vdXRsZXRgLlxyXG4gICAqL1xyXG4gIGFzeW5jIHBvcCgpIHtcclxuICAgIGxldCBvdXRsZXQgPSB0aGlzLnRvcE91dGxldDtcclxuXHJcbiAgICB3aGlsZSAob3V0bGV0KSB7XHJcbiAgICAgIGlmIChhd2FpdCBvdXRsZXQucG9wKCkpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvdXRsZXQgPSBvdXRsZXQucGFyZW50T3V0bGV0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZHMgc3BlY2lmaWVzIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG5leHQgbmF2aWdhdGlvbiBwZXJmb3JtZWQgYnkgdGhlIEFuZ3VsYXIgcm91dGVyLlxyXG4gICAqXHJcbiAgICogYHNldERpcmVjdGlvbigpYCBkb2VzIG5vdCB0cmlnZ2VyIGFueSB0cmFuc2l0aW9uLCBpdCBqdXN0IHNldHMgc29tZSBmbGFncyB0byBiZSBjb25zdW1lZCBieSBgaW9uLXJvdXRlci1vdXRsZXRgLlxyXG4gICAqXHJcbiAgICogSXQncyByZWNvbW1lbmRlZCB0byB1c2UgYG5hdmlnYXRlRm9yd2FyZCgpYCwgYG5hdmlnYXRlQmFjaygpYCBhbmQgYG5hdmlnYXRlUm9vdCgpYCBpbnN0ZWFkIG9mIGBzZXREaXJlY3Rpb24oKWAuXHJcbiAgICovXHJcbiAgc2V0RGlyZWN0aW9uKGRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uLCBhbmltYXRlZD86IGJvb2xlYW4sIGFuaW1hdGlvbkRpcmVjdGlvbj86ICdmb3J3YXJkJyB8ICdiYWNrJywgYW5pbWF0aW9uQnVpbGRlcj86IEFuaW1hdGlvbkJ1aWxkZXIpIHtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgdGhpcy5hbmltYXRlZCA9IGdldEFuaW1hdGlvbihkaXJlY3Rpb24sIGFuaW1hdGVkLCBhbmltYXRpb25EaXJlY3Rpb24pO1xyXG4gICAgdGhpcy5hbmltYXRpb25CdWlsZGVyID0gYW5pbWF0aW9uQnVpbGRlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHNldFRvcE91dGxldChvdXRsZXQ6IElvblJvdXRlck91dGxldCkge1xyXG4gICAgdGhpcy50b3BPdXRsZXQgPSBvdXRsZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBjb25zdW1lVHJhbnNpdGlvbigpIHtcclxuICAgIGxldCBkaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiA9ICdyb290JztcclxuICAgIGxldCBhbmltYXRpb246IE5hdkRpcmVjdGlvbiB8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGFuaW1hdGlvbkJ1aWxkZXIgPSB0aGlzLmFuaW1hdGlvbkJ1aWxkZXI7XHJcblxyXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAnYXV0bycpIHtcclxuICAgICAgZGlyZWN0aW9uID0gdGhpcy5ndWVzc0RpcmVjdGlvbjtcclxuICAgICAgYW5pbWF0aW9uID0gdGhpcy5ndWVzc0FuaW1hdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0ZWQ7XHJcbiAgICAgIGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBERUZBVUxUX0RJUkVDVElPTjtcclxuICAgIHRoaXMuYW5pbWF0ZWQgPSBERUZBVUxUX0FOSU1BVEVEO1xyXG4gICAgdGhpcy5hbmltYXRpb25CdWlsZGVyID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGRpcmVjdGlvbixcclxuICAgICAgYW5pbWF0aW9uLFxyXG4gICAgICBhbmltYXRpb25CdWlsZGVyXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuYXZpZ2F0ZSh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9uczogTmF2aWdhdGlvbk9wdGlvbnMpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHVybCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucm91dGVyIS5uYXZpZ2F0ZSh1cmwsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBuYXZpZ2F0ZUJ5VXJsIGlnbm9yZXMgYW55IHByb3BlcnRpZXMgdGhhdFxyXG4gICAgICAgKiB3b3VsZCBjaGFuZ2UgdGhlIHVybCwgc28gdGhpbmdzIGxpa2UgcXVlcnlQYXJhbXNcclxuICAgICAgICogd291bGQgYmUgaWdub3JlZCB1bmxlc3Mgd2UgY3JlYXRlIGEgdXJsIHRyZWVcclxuICAgICAgICogTW9yZSBJbmZvOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xODc5OFxyXG4gICAgICAgKi9cclxuICAgICAgY29uc3QgdXJsVHJlZSA9IHRoaXMuc2VyaWFsaXplci5wYXJzZSh1cmwudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5xdWVyeVBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdXJsVHJlZS5xdWVyeVBhcmFtcyA9IHsgLi4ub3B0aW9ucy5xdWVyeVBhcmFtcyB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5mcmFnbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdXJsVHJlZS5mcmFnbWVudCA9IG9wdGlvbnMuZnJhZ21lbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBgbmF2aWdhdGVCeVVybGAgd2lsbCBzdGlsbCBhcHBseSBgTmF2aWdhdGlvbkV4dHJhc2AgcHJvcGVydGllc1xyXG4gICAgICAgKiB0aGF0IGRvIG5vdCBtb2RpZnkgdGhlIHVybCwgc3VjaCBhcyBgcmVwbGFjZVVybGAgd2hpY2ggaXMgd2h5XHJcbiAgICAgICAqIGBvcHRpb25zYCBpcyBwYXNzZWQgaW4gaGVyZS5cclxuICAgICAgICovXHJcbiAgICAgIHJldHVybiB0aGlzLnJvdXRlciEubmF2aWdhdGVCeVVybCh1cmxUcmVlLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdldEFuaW1hdGlvbiA9IChkaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiwgYW5pbWF0ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQsIGFuaW1hdGlvbkRpcmVjdGlvbjogJ2ZvcndhcmQnIHwgJ2JhY2snIHwgdW5kZWZpbmVkKTogTmF2RGlyZWN0aW9uIHwgdW5kZWZpbmVkID0+IHtcclxuICBpZiAoYW5pbWF0ZWQgPT09IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBpZiAoYW5pbWF0aW9uRGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBhbmltYXRpb25EaXJlY3Rpb247XHJcbiAgfVxyXG4gIGlmIChkaXJlY3Rpb24gPT09ICdmb3J3YXJkJyB8fCBkaXJlY3Rpb24gPT09ICdiYWNrJykge1xyXG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcclxuICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3Jvb3QnICYmIGFuaW1hdGVkID09PSB0cnVlKSB7XHJcbiAgICByZXR1cm4gJ2ZvcndhcmQnO1xyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuY29uc3QgREVGQVVMVF9ESVJFQ1RJT04gPSAnYXV0byc7XHJcbmNvbnN0IERFRkFVTFRfQU5JTUFURUQgPSB1bmRlZmluZWQ7XHJcbiJdfQ==