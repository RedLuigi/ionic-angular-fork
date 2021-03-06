import { Location } from '@angular/common';
import { NavigationExtras, Router, UrlSerializer, UrlTree } from '@angular/router';
import { AnimationBuilder, NavDirection, RouterDirection } from '@ionic/core';
import { IonRouterOutlet } from '../directives/navigation/ion-router-outlet';
import { Platform } from './platform';
export interface AnimationOptions {
    animated?: boolean;
    animation?: AnimationBuilder;
    animationDirection?: 'forward' | 'back';
}
export interface NavigationOptions extends NavigationExtras, AnimationOptions {
}
export declare class NavController {
    private location;
    private serializer;
    private router?;
    private topOutlet?;
    private direction;
    private animated?;
    private animationBuilder?;
    private guessDirection;
    private guessAnimation?;
    private lastNavId;
    constructor(platform: Platform, location: Location, serializer: UrlSerializer, router?: Router);
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
    navigateForward(url: string | UrlTree | any[], options?: NavigationOptions): Promise<boolean>;
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
    navigateBack(url: string | UrlTree | any[], options?: NavigationOptions): Promise<boolean>;
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
    navigateRoot(url: string | UrlTree | any[], options?: NavigationOptions): Promise<boolean>;
    /**
     * Same as [Location](https://angular.io/api/common/Location)'s back() method.
     * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
     * by default.
     */
    back(options?: AnimationOptions): void;
    /**
     * This methods goes back in the context of Ionic's stack navigation.
     *
     * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
     * This is the recommended way to go back when you are using `ion-router-outlet`.
     */
    pop(): Promise<void>;
    /**
     * This methods specifies the direction of the next navigation performed by the Angular router.
     *
     * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
     *
     * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
     */
    setDirection(direction: RouterDirection, animated?: boolean, animationDirection?: 'forward' | 'back', animationBuilder?: AnimationBuilder): void;
    /**
     * @internal
     */
    setTopOutlet(outlet: IonRouterOutlet): void;
    /**
     * @internal
     */
    consumeTransition(): {
        direction: RouterDirection;
        animation: NavDirection;
        animationBuilder: AnimationBuilder;
    };
    private navigate;
}
