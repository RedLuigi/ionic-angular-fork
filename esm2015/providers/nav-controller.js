import * as tslib_1 from "tslib";
import { Location } from '@angular/common';
import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, NavigationStart, Router, UrlSerializer, UrlTree } from '@angular/router';
import { Platform } from './platform';
import * as i0 from "@angular/core";
import * as i1 from "./platform";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
NavController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NavController_Factory() { return new NavController(i0.ɵɵinject(i1.Platform), i0.ɵɵinject(i2.Location), i0.ɵɵinject(i3.UrlSerializer), i0.ɵɵinject(i3.Router, 8)); }, token: NavController, providedIn: "root" });
NavController = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    }),
    tslib_1.__param(3, Optional())
], NavController);
export { NavController };
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
const ɵ0 = getAnimation;
const DEFAULT_DIRECTION = 'auto';
const DEFAULT_ANIMATED = undefined;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb3ZpZGVycy9uYXYtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUtwRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7OztBQWF0QyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBVXhCLFlBQ0UsUUFBa0IsRUFDVixRQUFrQixFQUNsQixVQUF5QixFQUNiLE1BQWU7UUFGM0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQVg3QixjQUFTLEdBQXlDLGlCQUFpQixDQUFDO1FBQ3BFLGFBQVEsR0FBa0IsZ0JBQWdCLENBQUM7UUFFM0MsbUJBQWMsR0FBb0IsU0FBUyxDQUFDO1FBRTVDLGNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQVFyQixpREFBaUQ7UUFDakQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxFQUFFLFlBQVksZUFBZSxFQUFFO29CQUNqQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3RFLElBQUksQ0FBQyxjQUFj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ZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvbkV4dHJhcywgTmF2aWdhdGlvblN0YXJ0LCBSb3V0ZXIsIFVybFNlcmlhbGl6ZXIsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyLCBOYXZEaXJlY3Rpb24sIFJvdXRlckRpcmVjdGlvbiB9IGZyb20gJ0Bpb25pYy9jb3JlJztcclxuXHJcbmltcG9ydCB7IElvblJvdXRlck91dGxldCB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tcm91dGVyLW91dGxldCc7XHJcblxyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vcGxhdGZvcm0nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25PcHRpb25zIHtcclxuICBhbmltYXRlZD86IGJvb2xlYW47XHJcbiAgYW5pbWF0aW9uPzogQW5pbWF0aW9uQnVpbGRlcjtcclxuICBhbmltYXRpb25EaXJlY3Rpb24/OiAnZm9yd2FyZCcgfCAnYmFjayc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmF2aWdhdGlvbk9wdGlvbnMgZXh0ZW5kcyBOYXZpZ2F0aW9uRXh0cmFzLCBBbmltYXRpb25PcHRpb25zIHt9XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF2Q29udHJvbGxlciB7XHJcblxyXG4gIHByaXZhdGUgdG9wT3V0bGV0PzogSW9uUm91dGVyT3V0bGV0O1xyXG4gIHByaXZhdGUgZGlyZWN0aW9uOiAnZm9yd2FyZCcgfCAnYmFjaycgfCAncm9vdCcgfCAnYXV0bycgPSBERUZBVUxUX0RJUkVDVElPTjtcclxuICBwcml2YXRlIGFuaW1hdGVkPzogTmF2RGlyZWN0aW9uID0gREVGQVVMVF9BTklNQVRFRDtcclxuICBwcml2YXRlIGFuaW1hdGlvbkJ1aWxkZXI/OiBBbmltYXRpb25CdWlsZGVyO1xyXG4gIHByaXZhdGUgZ3Vlc3NEaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiA9ICdmb3J3YXJkJztcclxuICBwcml2YXRlIGd1ZXNzQW5pbWF0aW9uPzogTmF2RGlyZWN0aW9uO1xyXG4gIHByaXZhdGUgbGFzdE5hdklkID0gLTE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtLFxyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICBwcml2YXRlIHNlcmlhbGl6ZXI6IFVybFNlcmlhbGl6ZXIsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcj86IFJvdXRlcixcclxuICApIHtcclxuICAgIC8vIFN1YnNjcmliZSB0byByb3V0ZXIgZXZlbnRzIHRvIGRldGVjdCBkaXJlY3Rpb25cclxuICAgIGlmIChyb3V0ZXIpIHtcclxuICAgICAgcm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXYgPT4ge1xyXG4gICAgICAgIGlmIChldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xyXG4gICAgICAgICAgY29uc3QgaWQgPSAoZXYucmVzdG9yZWRTdGF0ZSkgPyBldi5yZXN0b3JlZFN0YXRlLm5hdmlnYXRpb25JZCA6IGV2LmlkO1xyXG4gICAgICAgICAgdGhpcy5ndWVzc0RpcmVjdGlvbiA9IGlkIDwgdGhpcy5sYXN0TmF2SWQgPyAnYmFjaycgOiAnZm9yd2FyZCc7XHJcbiAgICAgICAgICB0aGlzLmd1ZXNzQW5pbWF0aW9uID0gIWV2LnJlc3RvcmVkU3RhdGUgPyB0aGlzLmd1ZXNzRGlyZWN0aW9uIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgdGhpcy5sYXN0TmF2SWQgPSB0aGlzLmd1ZXNzRGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBldi5pZCA6IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3Vic2NyaWJlIHRvIGJhY2tCdXR0b24gZXZlbnRzXHJcbiAgICBwbGF0Zm9ybS5iYWNrQnV0dG9uLnN1YnNjcmliZVdpdGhQcmlvcml0eSgwLCBwcm9jZXNzTmV4dEhhbmRsZXIgPT4ge1xyXG4gICAgICB0aGlzLnBvcCgpO1xyXG4gICAgICBwcm9jZXNzTmV4dEhhbmRsZXIoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgdXNlcyBBbmd1bGFyJ3MgW1JvdXRlcl0oaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9yb3V0ZXIvUm91dGVyKSB1bmRlciB0aGUgaG9vZCxcclxuICAgKiBpdCdzIGVxdWl2YWxlbnQgdG8gY2FsbGluZyBgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgpYCwgYnV0IGl0J3MgZXhwbGljaXQgYWJvdXQgdGhlICoqZGlyZWN0aW9uKiogb2YgdGhlIHRyYW5zaXRpb24uXHJcbiAgICpcclxuICAgKiBHb2luZyAqKmZvcndhcmQqKiBtZWFucyB0aGF0IGEgbmV3IHBhZ2UgaXMgZ29pbmcgdG8gYmUgcHVzaGVkIHRvIHRoZSBzdGFjayBvZiB0aGUgb3V0bGV0IChpb24tcm91dGVyLW91dGxldCksXHJcbiAgICogYW5kIHRoYXQgaXQgd2lsbCBzaG93IGEgXCJmb3J3YXJkXCIgYW5pbWF0aW9uIGJ5IGRlZmF1bHQuXHJcbiAgICpcclxuICAgKiBOYXZpZ2F0aW5nIGZvcndhcmQgY2FuIGFsc28gYmUgdHJpZ2dlcmVkIGluIGEgZGVjbGFyYXRpdmUgbWFubmVyIGJ5IHVzaW5nIHRoZSBgW3JvdXRlckRpcmVjdGlvbl1gIGRpcmVjdGl2ZTpcclxuICAgKlxyXG4gICAqIGBgYGh0bWxcclxuICAgKiA8YSByb3V0ZXJMaW5rPVwiL3BhdGgvdG8vcGFnZVwiIHJvdXRlckRpcmVjdGlvbj1cImZvcndhcmRcIj5MaW5rPC9hPlxyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIG5hdmlnYXRlRm9yd2FyZCh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9uczogTmF2aWdhdGlvbk9wdGlvbnMgPSB7fSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ2ZvcndhcmQnLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbiwgb3B0aW9ucy5hbmltYXRpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGUodXJsLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIHVzZXMgQW5ndWxhcidzIFtSb3V0ZXJdKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvcm91dGVyL1JvdXRlcikgdW5kZXIgdGhlIGhvb2QsXHJcbiAgICogaXQncyBlcXVpdmFsZW50IHRvIGNhbGxpbmc6XHJcbiAgICpcclxuICAgKiBgYGB0c1xyXG4gICAqIHRoaXMubmF2Q29udHJvbGxlci5zZXREaXJlY3Rpb24oJ2JhY2snKTtcclxuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHBhdGgpO1xyXG4gICAqIGBgYFxyXG4gICAqXHJcbiAgICogR29pbmcgKipiYWNrKiogbWVhbnMgdGhhdCBhbGwgdGhlIHBhZ2VzIGluIHRoZSBzdGFjayB1bnRpbCB0aGUgbmF2aWdhdGVkIHBhZ2UgaXMgZm91bmQgd2lsbCBiZSBwb3BwZWQsXHJcbiAgICogYW5kIHRoYXQgaXQgd2lsbCBzaG93IGEgXCJiYWNrXCIgYW5pbWF0aW9uIGJ5IGRlZmF1bHQuXHJcbiAgICpcclxuICAgKiBOYXZpZ2F0aW5nIGJhY2sgY2FuIGFsc28gYmUgdHJpZ2dlcmVkIGluIGEgZGVjbGFyYXRpdmUgbWFubmVyIGJ5IHVzaW5nIHRoZSBgW3JvdXRlckRpcmVjdGlvbl1gIGRpcmVjdGl2ZTpcclxuICAgKlxyXG4gICAqIGBgYGh0bWxcclxuICAgKiA8YSByb3V0ZXJMaW5rPVwiL3BhdGgvdG8vcGFnZVwiIHJvdXRlckRpcmVjdGlvbj1cImJhY2tcIj5MaW5rPC9hPlxyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIG5hdmlnYXRlQmFjayh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9uczogTmF2aWdhdGlvbk9wdGlvbnMgPSB7fSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ2JhY2snLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbiwgb3B0aW9ucy5hbmltYXRpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGUodXJsLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIHVzZXMgQW5ndWxhcidzIFtSb3V0ZXJdKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvcm91dGVyL1JvdXRlcikgdW5kZXIgdGhlIGhvb2QsXHJcbiAgICogaXQncyBlcXVpdmFsZW50IHRvIGNhbGxpbmc6XHJcbiAgICpcclxuICAgKiBgYGB0c1xyXG4gICAqIHRoaXMubmF2Q29udHJvbGxlci5zZXREaXJlY3Rpb24oJ3Jvb3QnKTtcclxuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHBhdGgpO1xyXG4gICAqIGBgYFxyXG4gICAqXHJcbiAgICogR29pbmcgKipyb290KiogbWVhbnMgdGhhdCBhbGwgZXhpc3RpbmcgcGFnZXMgaW4gdGhlIHN0YWNrIHdpbGwgYmUgcmVtb3ZlZCxcclxuICAgKiBhbmQgdGhlIG5hdmlnYXRlZCBwYWdlIHdpbGwgYmVjb21lIHRoZSBzaW5nbGUgcGFnZSBpbiB0aGUgc3RhY2suXHJcbiAgICpcclxuICAgKiBOYXZpZ2F0aW5nIHJvb3QgY2FuIGFsc28gYmUgdHJpZ2dlcmVkIGluIGEgZGVjbGFyYXRpdmUgbWFubmVyIGJ5IHVzaW5nIHRoZSBgW3JvdXRlckRpcmVjdGlvbl1gIGRpcmVjdGl2ZTpcclxuICAgKlxyXG4gICAqIGBgYGh0bWxcclxuICAgKiA8YSByb3V0ZXJMaW5rPVwiL3BhdGgvdG8vcGFnZVwiIHJvdXRlckRpcmVjdGlvbj1cInJvb3RcIj5MaW5rPC9hPlxyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIG5hdmlnYXRlUm9vdCh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9uczogTmF2aWdhdGlvbk9wdGlvbnMgPSB7fSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ3Jvb3QnLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbiwgb3B0aW9ucy5hbmltYXRpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGUodXJsLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNhbWUgYXMgW0xvY2F0aW9uXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9Mb2NhdGlvbikncyBiYWNrKCkgbWV0aG9kLlxyXG4gICAqIEl0IHdpbGwgdXNlIHRoZSBzdGFuZGFyZCBgd2luZG93Lmhpc3RvcnkuYmFjaygpYCB1bmRlciB0aGUgaG9vZCwgYnV0IGZlYXR1cmluZyBhIGBiYWNrYCBhbmltYXRpb25cclxuICAgKiBieSBkZWZhdWx0LlxyXG4gICAqL1xyXG4gIGJhY2sob3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyA9IHsgYW5pbWF0ZWQ6IHRydWUsIGFuaW1hdGlvbkRpcmVjdGlvbjogJ2JhY2snIH0pIHtcclxuICAgIHRoaXMuc2V0RGlyZWN0aW9uKCdiYWNrJywgb3B0aW9ucy5hbmltYXRlZCwgb3B0aW9ucy5hbmltYXRpb25EaXJlY3Rpb24sIG9wdGlvbnMuYW5pbWF0aW9uKTtcclxuICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kcyBnb2VzIGJhY2sgaW4gdGhlIGNvbnRleHQgb2YgSW9uaWMncyBzdGFjayBuYXZpZ2F0aW9uLlxyXG4gICAqXHJcbiAgICogSXQgcmVjdXJzaXZlbHkgZmluZHMgdGhlIHRvcCBhY3RpdmUgYGlvbi1yb3V0ZXItb3V0bGV0YCBhbmQgY2FsbHMgYHBvcCgpYC5cclxuICAgKiBUaGlzIGlzIHRoZSByZWNvbW1lbmRlZCB3YXkgdG8gZ28gYmFjayB3aGVuIHlvdSBhcmUgdXNpbmcgYGlvbi1yb3V0ZXItb3V0bGV0YC5cclxuICAgKi9cclxuICBhc3luYyBwb3AoKSB7XHJcbiAgICBsZXQgb3V0bGV0ID0gdGhpcy50b3BPdXRsZXQ7XHJcblxyXG4gICAgd2hpbGUgKG91dGxldCkge1xyXG4gICAgICBpZiAoYXdhaXQgb3V0bGV0LnBvcCgpKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3V0bGV0ID0gb3V0bGV0LnBhcmVudE91dGxldDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2RzIHNwZWNpZmllcyB0aGUgZGlyZWN0aW9uIG9mIHRoZSBuZXh0IG5hdmlnYXRpb24gcGVyZm9ybWVkIGJ5IHRoZSBBbmd1bGFyIHJvdXRlci5cclxuICAgKlxyXG4gICAqIGBzZXREaXJlY3Rpb24oKWAgZG9lcyBub3QgdHJpZ2dlciBhbnkgdHJhbnNpdGlvbiwgaXQganVzdCBzZXRzIHNvbWUgZmxhZ3MgdG8gYmUgY29uc3VtZWQgYnkgYGlvbi1yb3V0ZXItb3V0bGV0YC5cclxuICAgKlxyXG4gICAqIEl0J3MgcmVjb21tZW5kZWQgdG8gdXNlIGBuYXZpZ2F0ZUZvcndhcmQoKWAsIGBuYXZpZ2F0ZUJhY2soKWAgYW5kIGBuYXZpZ2F0ZVJvb3QoKWAgaW5zdGVhZCBvZiBgc2V0RGlyZWN0aW9uKClgLlxyXG4gICAqL1xyXG4gIHNldERpcmVjdGlvbihkaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiwgYW5pbWF0ZWQ/OiBib29sZWFuLCBhbmltYXRpb25EaXJlY3Rpb24/OiAnZm9yd2FyZCcgfCAnYmFjaycsIGFuaW1hdGlvbkJ1aWxkZXI/OiBBbmltYXRpb25CdWlsZGVyKSB7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgIHRoaXMuYW5pbWF0ZWQgPSBnZXRBbmltYXRpb24oZGlyZWN0aW9uLCBhbmltYXRlZCwgYW5pbWF0aW9uRGlyZWN0aW9uKTtcclxuICAgIHRoaXMuYW5pbWF0aW9uQnVpbGRlciA9IGFuaW1hdGlvbkJ1aWxkZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzZXRUb3BPdXRsZXQob3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQpIHtcclxuICAgIHRoaXMudG9wT3V0bGV0ID0gb3V0bGV0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgY29uc3VtZVRyYW5zaXRpb24oKSB7XHJcbiAgICBsZXQgZGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24gPSAncm9vdCc7XHJcbiAgICBsZXQgYW5pbWF0aW9uOiBOYXZEaXJlY3Rpb24gfCB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBhbmltYXRpb25CdWlsZGVyID0gdGhpcy5hbmltYXRpb25CdWlsZGVyO1xyXG5cclxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgIGRpcmVjdGlvbiA9IHRoaXMuZ3Vlc3NEaXJlY3Rpb247XHJcbiAgICAgIGFuaW1hdGlvbiA9IHRoaXMuZ3Vlc3NBbmltYXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGVkO1xyXG4gICAgICBkaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcclxuICAgIH1cclxuICAgIHRoaXMuZGlyZWN0aW9uID0gREVGQVVMVF9ESVJFQ1RJT047XHJcbiAgICB0aGlzLmFuaW1hdGVkID0gREVGQVVMVF9BTklNQVRFRDtcclxuICAgIHRoaXMuYW5pbWF0aW9uQnVpbGRlciA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkaXJlY3Rpb24sXHJcbiAgICAgIGFuaW1hdGlvbixcclxuICAgICAgYW5pbWF0aW9uQnVpbGRlclxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbmF2aWdhdGUodXJsOiBzdHJpbmcgfCBVcmxUcmVlIHwgYW55W10sIG9wdGlvbnM6IE5hdmlnYXRpb25PcHRpb25zKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh1cmwpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvdXRlciEubmF2aWdhdGUodXJsLCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogbmF2aWdhdGVCeVVybCBpZ25vcmVzIGFueSBwcm9wZXJ0aWVzIHRoYXRcclxuICAgICAgICogd291bGQgY2hhbmdlIHRoZSB1cmwsIHNvIHRoaW5ncyBsaWtlIHF1ZXJ5UGFyYW1zXHJcbiAgICAgICAqIHdvdWxkIGJlIGlnbm9yZWQgdW5sZXNzIHdlIGNyZWF0ZSBhIHVybCB0cmVlXHJcbiAgICAgICAqIE1vcmUgSW5mbzogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTg3OThcclxuICAgICAgICovXHJcbiAgICAgIGNvbnN0IHVybFRyZWUgPSB0aGlzLnNlcmlhbGl6ZXIucGFyc2UodXJsLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnMucXVlcnlQYXJhbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHVybFRyZWUucXVlcnlQYXJhbXMgPSB7IC4uLm9wdGlvbnMucXVlcnlQYXJhbXMgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMuZnJhZ21lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHVybFRyZWUuZnJhZ21lbnQgPSBvcHRpb25zLmZyYWdtZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogYG5hdmlnYXRlQnlVcmxgIHdpbGwgc3RpbGwgYXBwbHkgYE5hdmlnYXRpb25FeHRyYXNgIHByb3BlcnRpZXNcclxuICAgICAgICogdGhhdCBkbyBub3QgbW9kaWZ5IHRoZSB1cmwsIHN1Y2ggYXMgYHJlcGxhY2VVcmxgIHdoaWNoIGlzIHdoeVxyXG4gICAgICAgKiBgb3B0aW9uc2AgaXMgcGFzc2VkIGluIGhlcmUuXHJcbiAgICAgICAqL1xyXG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZXIhLm5hdmlnYXRlQnlVcmwodXJsVHJlZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRBbmltYXRpb24gPSAoZGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24sIGFuaW1hdGVkOiBib29sZWFuIHwgdW5kZWZpbmVkLCBhbmltYXRpb25EaXJlY3Rpb246ICdmb3J3YXJkJyB8ICdiYWNrJyB8IHVuZGVmaW5lZCk6IE5hdkRpcmVjdGlvbiB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgaWYgKGFuaW1hdGVkID09PSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgaWYgKGFuaW1hdGlvbkRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gYW5pbWF0aW9uRGlyZWN0aW9uO1xyXG4gIH1cclxuICBpZiAoZGlyZWN0aW9uID09PSAnZm9yd2FyZCcgfHwgZGlyZWN0aW9uID09PSAnYmFjaycpIHtcclxuICAgIHJldHVybiBkaXJlY3Rpb247XHJcbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyb290JyAmJiBhbmltYXRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuICdmb3J3YXJkJztcclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufTtcclxuXHJcbmNvbnN0IERFRkFVTFRfRElSRUNUSU9OID0gJ2F1dG8nO1xyXG5jb25zdCBERUZBVUxUX0FOSU1BVEVEID0gdW5kZWZpbmVkO1xyXG4iXX0=