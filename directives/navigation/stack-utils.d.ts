import { ComponentRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationBuilder, NavDirection, RouterDirection } from '@ionic/core';
export declare const insertView: (views: RouteView[], view: RouteView, direction: RouterDirection) => RouteView[];
export declare const getUrl: (router: Router, activatedRoute: ActivatedRoute) => string;
export declare const isTabSwitch: (enteringView: RouteView, leavingView: RouteView) => boolean;
export declare const computeStackId: (prefixUrl: string[], url: string) => string;
export declare const toSegments: (path: string) => string[];
export declare const destroyView: (view: RouteView) => void;
export interface StackEvent {
    enteringView: RouteView;
    direction: RouterDirection;
    animation: NavDirection | undefined;
    tabSwitch: boolean;
}
export interface RouteView {
    id: number;
    url: string;
    stackId: string | undefined;
    element: HTMLElement;
    ref: ComponentRef<any>;
    savedData?: any;
    savedExtras?: NavigationExtras;
    unlistenEvents: () => void;
    animationBuilder?: AnimationBuilder;
}
