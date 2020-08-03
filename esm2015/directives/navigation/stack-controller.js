import * as tslib_1 from "tslib";
import { bindLifecycleEvents } from '../../providers/angular-delegate';
import { computeStackId, destroyView, getUrl, insertView, isTabSwitch, toSegments } from './stack-utils';
export class StackController {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
const ɵ0 = cleanupAsync;
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
const ɵ1 = cleanup;
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL3N0YWNrLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3ZFLE9BQU8sRUFBeUIsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEksTUFBTSxPQUFPLGVBQWU7SUFTMUIsWUFDRSxVQUE4QixFQUN0QixXQUF1QyxFQUN2QyxNQUFjLEVBQ2QsT0FBc0IsRUFDdEIsSUFBWSxFQUNaLFFBQWtCO1FBSmxCLGdCQUFXLEdBQVgsV0FBVyxDQUE0QjtRQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUN0QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWJwQixVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUV4QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUd2QixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBVWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDbEYsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFzQixFQUFFLGNBQThCO1FBQy9ELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQWdCLENBQUM7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QixFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUM3RyxhQUFhO1NBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV4QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25COzs7Ozs7OztXQVFHO1FBQ0gsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sdUJBQXVCLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBFLElBQUksSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLHVCQUF1QixFQUFFO1lBQ2hFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENvbXBvbmVudFJlZiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyLCBSb3V0ZXJEaXJlY3Rpb24gfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBiaW5kTGlmZWN5Y2xlRXZlbnRzIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2FuZ3VsYXItZGVsZWdhdGUnO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL25hdi1jb250cm9sbGVyJztcclxuXHJcbmltcG9ydCB7IFJvdXRlVmlldywgU3RhY2tFdmVudCwgY29tcHV0ZVN0YWNrSWQsIGRlc3Ryb3lWaWV3LCBnZXRVcmwsIGluc2VydFZpZXcsIGlzVGFiU3dpdGNoLCB0b1NlZ21lbnRzIH0gZnJvbSAnLi9zdGFjay11dGlscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhY2tDb250cm9sbGVyIHtcclxuXHJcbiAgcHJpdmF0ZSB2aWV3czogUm91dGVWaWV3W10gPSBbXTtcclxuICBwcml2YXRlIHJ1bm5pbmdUYXNrPzogUHJvbWlzZTxhbnk+O1xyXG4gIHByaXZhdGUgc2tpcFRyYW5zaXRpb24gPSBmYWxzZTtcclxuICBwcml2YXRlIHRhYnNQcmVmaXg6IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgYWN0aXZlVmlldzogUm91dGVWaWV3IHwgdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgbmV4dElkID0gMDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICB0YWJzUHJlZml4OiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBwcml2YXRlIGNvbnRhaW5lckVsOiBIVE1MSW9uUm91dGVyT3V0bGV0RWxlbWVudCxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG5hdkN0cmw6IE5hdkNvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uXHJcbiAgKSB7XHJcbiAgICB0aGlzLnRhYnNQcmVmaXggPSB0YWJzUHJlZml4ICE9PSB1bmRlZmluZWQgPyB0b1NlZ21lbnRzKHRhYnNQcmVmaXgpIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVmlldyhyZWY6IENvbXBvbmVudFJlZjxhbnk+LCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpOiBSb3V0ZVZpZXcge1xyXG4gICAgY29uc3QgdXJsID0gZ2V0VXJsKHRoaXMucm91dGVyLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gKHJlZiAmJiByZWYubG9jYXRpb24gJiYgcmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgdW5saXN0ZW5FdmVudHMgPSBiaW5kTGlmZWN5Y2xlRXZlbnRzKHRoaXMuem9uZSwgcmVmLmluc3RhbmNlLCBlbGVtZW50KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiB0aGlzLm5leHRJZCsrLFxyXG4gICAgICBzdGFja0lkOiBjb21wdXRlU3RhY2tJZCh0aGlzLnRhYnNQcmVmaXgsIHVybCksXHJcbiAgICAgIHVubGlzdGVuRXZlbnRzLFxyXG4gICAgICBlbGVtZW50LFxyXG4gICAgICByZWYsXHJcbiAgICAgIHVybCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRFeGlzdGluZ1ZpZXcoYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKTogUm91dGVWaWV3IHwgdW5kZWZpbmVkIHtcclxuICAgIGNvbnN0IGFjdGl2YXRlZFVybEtleSA9IGdldFVybCh0aGlzLnJvdXRlciwgYWN0aXZhdGVkUm91dGUpO1xyXG4gICAgY29uc3QgdmlldyA9IHRoaXMudmlld3MuZmluZCh2dyA9PiB2dy51cmwgPT09IGFjdGl2YXRlZFVybEtleSk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnJlZi5jaGFuZ2VEZXRlY3RvclJlZi5yZWF0dGFjaCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZpZXc7XHJcbiAgfVxyXG5cclxuICBzZXRBY3RpdmUoZW50ZXJpbmdWaWV3OiBSb3V0ZVZpZXcpOiBQcm9taXNlPFN0YWNrRXZlbnQ+IHtcclxuICAgIGNvbnN0IGNvbnN1bWVSZXN1bHQgPSB0aGlzLm5hdkN0cmwuY29uc3VtZVRyYW5zaXRpb24oKTtcclxuICAgIGxldCB7IGRpcmVjdGlvbiwgYW5pbWF0aW9uLCBhbmltYXRpb25CdWlsZGVyIH0gPSBjb25zdW1lUmVzdWx0O1xyXG4gICAgY29uc3QgbGVhdmluZ1ZpZXcgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBjb25zdCB0YWJTd2l0Y2ggPSBpc1RhYlN3aXRjaChlbnRlcmluZ1ZpZXcsIGxlYXZpbmdWaWV3KTtcclxuICAgIGlmICh0YWJTd2l0Y2gpIHtcclxuICAgICAgZGlyZWN0aW9uID0gJ2JhY2snO1xyXG4gICAgICBhbmltYXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgdmlld3NTbmFwc2hvdCA9IHRoaXMudmlld3Muc2xpY2UoKTtcclxuXHJcbiAgICBsZXQgY3VycmVudE5hdmlnYXRpb247XHJcblxyXG4gICAgY29uc3Qgcm91dGVyID0gKHRoaXMucm91dGVyIGFzIGFueSk7XHJcblxyXG4gICAgLy8gQW5ndWxhciA+PSA3LjIuMFxyXG4gICAgaWYgKHJvdXRlci5nZXRDdXJyZW50TmF2aWdhdGlvbikge1xyXG4gICAgICBjdXJyZW50TmF2aWdhdGlvbiA9IHJvdXRlci5nZXRDdXJyZW50TmF2aWdhdGlvbigpO1xyXG5cclxuICAgICAgLy8gQW5ndWxhciA8IDcuMi4wXHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICByb3V0ZXIubmF2aWdhdGlvbnMgJiZcclxuICAgICAgcm91dGVyLm5hdmlnYXRpb25zLnZhbHVlXHJcbiAgICApIHtcclxuICAgICAgY3VycmVudE5hdmlnYXRpb24gPSByb3V0ZXIubmF2aWdhdGlvbnMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUgbmF2aWdhdGlvbiBhY3Rpb25cclxuICAgICAqIHNldHMgYHJlcGxhY2VVcmw6IHRydWVgXHJcbiAgICAgKiB0aGVuIHdlIG5lZWQgdG8gbWFrZSBzdXJlXHJcbiAgICAgKiB3ZSByZW1vdmUgdGhlIGxhc3QgaXRlbVxyXG4gICAgICogZnJvbSBvdXIgdmlld3Mgc3RhY2tcclxuICAgICAqL1xyXG4gICAgaWYgKFxyXG4gICAgICBjdXJyZW50TmF2aWdhdGlvbiAmJlxyXG4gICAgICBjdXJyZW50TmF2aWdhdGlvbi5leHRyYXMgJiZcclxuICAgICAgY3VycmVudE5hdmlnYXRpb24uZXh0cmFzLnJlcGxhY2VVcmxcclxuICAgICkge1xyXG4gICAgICBpZiAodGhpcy52aWV3cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy52aWV3cy5zcGxpY2UoLTEsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmV1c2VkID0gdGhpcy52aWV3cy5pbmNsdWRlcyhlbnRlcmluZ1ZpZXcpO1xyXG4gICAgY29uc3Qgdmlld3MgPSB0aGlzLmluc2VydFZpZXcoZW50ZXJpbmdWaWV3LCBkaXJlY3Rpb24pO1xyXG5cclxuICAgIC8vIFRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBiZWZvcmUgdHJhbnNpdGlvbiBzdGFydHNcclxuICAgIC8vIFRoaXMgd2lsbCBjYWxsIG5nT25Jbml0KCkgdGhlIGZpcnN0IHRpbWUgdG9vLCBqdXN0IGFmdGVyIHRoZSB2aWV3XHJcbiAgICAvLyB3YXMgYXR0YWNoZWQgdG8gdGhlIGRvbSwgYnV0IEJFRk9SRSB0aGUgdHJhbnNpdGlvbiBzdGFydHNcclxuICAgIGlmICghcmV1c2VkKSB7XHJcbiAgICAgIGVudGVyaW5nVmlldy5yZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgd2UgYXJlIGdvaW5nIGJhY2sgZnJvbSBhIHBhZ2UgdGhhdFxyXG4gICAgICogd2FzIHByZXNlbnRlZCB1c2luZyBhIGN1c3RvbSBhbmltYXRpb25cclxuICAgICAqIHdlIHNob3VsZCBkZWZhdWx0IHRvIHVzaW5nIHRoYXRcclxuICAgICAqIHVubGVzcyB0aGUgZGV2ZWxvcGVyIGV4cGxpY2l0bHlcclxuICAgICAqIHByb3ZpZGVkIGFub3RoZXIgYW5pbWF0aW9uLlxyXG4gICAgICovXHJcbiAgICBjb25zdCBjdXN0b21BbmltYXRpb24gPSBlbnRlcmluZ1ZpZXcuYW5pbWF0aW9uQnVpbGRlcjtcclxuICAgIGlmIChcclxuICAgICAgYW5pbWF0aW9uQnVpbGRlciA9PT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGRpcmVjdGlvbiA9PT0gJ2JhY2snICYmXHJcbiAgICAgICF0YWJTd2l0Y2ggJiZcclxuICAgICAgY3VzdG9tQW5pbWF0aW9uICE9PSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgICBhbmltYXRpb25CdWlsZGVyID0gY3VzdG9tQW5pbWF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZSBhbnkgY3VzdG9tIGFuaW1hdGlvbiBzbyB0aGF0IG5hdmlnYXRpbmdcclxuICAgICAqIGJhY2sgd2lsbCB1c2UgdGhpcyBjdXN0b20gYW5pbWF0aW9uIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cclxuICAgIGlmIChsZWF2aW5nVmlldykge1xyXG4gICAgICBsZWF2aW5nVmlldy5hbmltYXRpb25CdWlsZGVyID0gYW5pbWF0aW9uQnVpbGRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBXYWl0IHVudGlsIHByZXZpb3VzIHRyYW5zaXRpb25zIGZpbmlzaFxyXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLndhaXQoKCkgPT4ge1xyXG4gICAgICAgIC8vIGRpc2Nvbm5lY3QgbGVhdmluZyBwYWdlIGZyb20gY2hhbmdlIGRldGVjdGlvbiB0b1xyXG4gICAgICAgIC8vIHJlZHVjZSBqYW5rIGR1cmluZyB0aGUgcGFnZSB0cmFuc2l0aW9uXHJcbiAgICAgICAgaWYgKGxlYXZpbmdWaWV3KSB7XHJcbiAgICAgICAgICBsZWF2aW5nVmlldy5yZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0YWNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEluIGNhc2UgdGhlIGVudGVyaW5nVmlldyBpcyB0aGUgc2FtZSBhcyB0aGUgbGVhdmluZ1BhZ2Ugd2UgbmVlZCB0byByZWF0dGFjaCgpXHJcbiAgICAgICAgZW50ZXJpbmdWaWV3LnJlZi5jaGFuZ2VEZXRlY3RvclJlZi5yZWF0dGFjaCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uKGVudGVyaW5nVmlldywgbGVhdmluZ1ZpZXcsIGFuaW1hdGlvbiwgdGhpcy5jYW5Hb0JhY2soMSksIGZhbHNlLCBhbmltYXRpb25CdWlsZGVyKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4gY2xlYW51cEFzeW5jKGVudGVyaW5nVmlldywgdmlld3MsIHZpZXdzU25hcHNob3QsIHRoaXMubG9jYXRpb24pKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4gKHtcclxuICAgICAgICAgICAgZW50ZXJpbmdWaWV3LFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24sXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbixcclxuICAgICAgICAgICAgdGFiU3dpdGNoXHJcbiAgICAgICAgICB9KSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjYW5Hb0JhY2soZGVlcDogbnVtYmVyLCBzdGFja0lkID0gdGhpcy5nZXRBY3RpdmVTdGFja0lkKCkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmdldFN0YWNrKHN0YWNrSWQpLmxlbmd0aCA+IGRlZXA7XHJcbiAgfVxyXG5cclxuICBwb3AoZGVlcDogbnVtYmVyLCBzdGFja0lkID0gdGhpcy5nZXRBY3RpdmVTdGFja0lkKCkpIHtcclxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgY29uc3Qgdmlld3MgPSB0aGlzLmdldFN0YWNrKHN0YWNrSWQpO1xyXG4gICAgICBpZiAodmlld3MubGVuZ3RoIDw9IGRlZXApIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB2aWV3ID0gdmlld3Nbdmlld3MubGVuZ3RoIC0gZGVlcCAtIDFdO1xyXG4gICAgICBsZXQgdXJsID0gdmlldy51cmw7XHJcblxyXG4gICAgICBjb25zdCB2aWV3U2F2ZWREYXRhID0gdmlldy5zYXZlZERhdGE7XHJcbiAgICAgIGlmICh2aWV3U2F2ZWREYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcHJpbWFyeU91dGxldCA9IHZpZXdTYXZlZERhdGEuZ2V0KCdwcmltYXJ5Jyk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcHJpbWFyeU91dGxldCAmJlxyXG4gICAgICAgICAgcHJpbWFyeU91dGxldC5yb3V0ZSAmJlxyXG4gICAgICAgICAgcHJpbWFyeU91dGxldC5yb3V0ZS5fcm91dGVyU3RhdGUgJiZcclxuICAgICAgICAgIHByaW1hcnlPdXRsZXQucm91dGUuX3JvdXRlclN0YXRlLnNuYXBzaG90ICYmXHJcbiAgICAgICAgICBwcmltYXJ5T3V0bGV0LnJvdXRlLl9yb3V0ZXJTdGF0ZS5zbmFwc2hvdC51cmxcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHVybCA9IHByaW1hcnlPdXRsZXQucm91dGUuX3JvdXRlclN0YXRlLnNuYXBzaG90LnVybDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyBhbmltYXRpb25CdWlsZGVyIH0gPSB0aGlzLm5hdkN0cmwuY29uc3VtZVRyYW5zaXRpb24oKTtcclxuICAgICAgcmV0dXJuIHRoaXMubmF2Q3RybC5uYXZpZ2F0ZUJhY2sodXJsLCB7IC4uLnZpZXcuc2F2ZWRFeHRyYXMsIGFuaW1hdGlvbjogYW5pbWF0aW9uQnVpbGRlciB9KS50aGVuKCgpID0+IHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGFydEJhY2tUcmFuc2l0aW9uKCkge1xyXG4gICAgY29uc3QgbGVhdmluZ1ZpZXcgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBpZiAobGVhdmluZ1ZpZXcpIHtcclxuICAgICAgY29uc3Qgdmlld3MgPSB0aGlzLmdldFN0YWNrKGxlYXZpbmdWaWV3LnN0YWNrSWQpO1xyXG4gICAgICBjb25zdCBlbnRlcmluZ1ZpZXcgPSB2aWV3c1t2aWV3cy5sZW5ndGggLSAyXTtcclxuICAgICAgY29uc3QgY3VzdG9tQW5pbWF0aW9uID0gZW50ZXJpbmdWaWV3LmFuaW1hdGlvbkJ1aWxkZXI7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy53YWl0KCgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uKFxyXG4gICAgICAgICAgZW50ZXJpbmdWaWV3LCAvLyBlbnRlcmluZyB2aWV3XHJcbiAgICAgICAgICBsZWF2aW5nVmlldywgLy8gbGVhdmluZyB2aWV3XHJcbiAgICAgICAgICAnYmFjaycsXHJcbiAgICAgICAgICB0aGlzLmNhbkdvQmFjaygyKSxcclxuICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICBjdXN0b21BbmltYXRpb25cclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICB9XHJcblxyXG4gIGVuZEJhY2tUcmFuc2l0aW9uKHNob3VsZENvbXBsZXRlOiBib29sZWFuKSB7XHJcbiAgICBpZiAoc2hvdWxkQ29tcGxldGUpIHtcclxuICAgICAgdGhpcy5za2lwVHJhbnNpdGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMucG9wKDEpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVZpZXcpIHtcclxuICAgICAgY2xlYW51cCh0aGlzLmFjdGl2ZVZpZXcsIHRoaXMudmlld3MsIHRoaXMudmlld3MsIHRoaXMubG9jYXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TGFzdFVybChzdGFja0lkPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB2aWV3cyA9IHRoaXMuZ2V0U3RhY2soc3RhY2tJZCk7XHJcbiAgICByZXR1cm4gdmlld3MubGVuZ3RoID4gMCA/IHZpZXdzW3ZpZXdzLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0Um9vdFVybChzdGFja0lkPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB2aWV3cyA9IHRoaXMuZ2V0U3RhY2soc3RhY2tJZCk7XHJcbiAgICByZXR1cm4gdmlld3MubGVuZ3RoID4gMCA/IHZpZXdzWzBdIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWN0aXZlU3RhY2tJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVmlldyA/IHRoaXMuYWN0aXZlVmlldy5zdGFja0lkIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29udGFpbmVyRWwgPSB1bmRlZmluZWQhO1xyXG4gICAgdGhpcy52aWV3cy5mb3JFYWNoKGRlc3Ryb3lWaWV3KTtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMudmlld3MgPSBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U3RhY2soc3RhY2tJZDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3cy5maWx0ZXIodiA9PiB2LnN0YWNrSWQgPT09IHN0YWNrSWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRWaWV3KGVudGVyaW5nVmlldzogUm91dGVWaWV3LCBkaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbikge1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3ID0gZW50ZXJpbmdWaWV3O1xyXG4gICAgdGhpcy52aWV3cyA9IGluc2VydFZpZXcodGhpcy52aWV3cywgZW50ZXJpbmdWaWV3LCBkaXJlY3Rpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMudmlld3Muc2xpY2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNpdGlvbihcclxuICAgIGVudGVyaW5nVmlldzogUm91dGVWaWV3IHwgdW5kZWZpbmVkLFxyXG4gICAgbGVhdmluZ1ZpZXc6IFJvdXRlVmlldyB8IHVuZGVmaW5lZCxcclxuICAgIGRpcmVjdGlvbjogJ2ZvcndhcmQnIHwgJ2JhY2snIHwgdW5kZWZpbmVkLFxyXG4gICAgc2hvd0dvQmFjazogYm9vbGVhbixcclxuICAgIHByb2dyZXNzQW5pbWF0aW9uOiBib29sZWFuLFxyXG4gICAgYW5pbWF0aW9uQnVpbGRlcj86IEFuaW1hdGlvbkJ1aWxkZXJcclxuICApIHtcclxuICAgIGlmICh0aGlzLnNraXBUcmFuc2l0aW9uKSB7XHJcbiAgICAgIHRoaXMuc2tpcFRyYW5zaXRpb24gPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBpZiAobGVhdmluZ1ZpZXcgPT09IGVudGVyaW5nVmlldykge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGVudGVyaW5nRWwgPSBlbnRlcmluZ1ZpZXcgPyBlbnRlcmluZ1ZpZXcuZWxlbWVudCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGxlYXZpbmdFbCA9IGxlYXZpbmdWaWV3ID8gbGVhdmluZ1ZpZXcuZWxlbWVudCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy5jb250YWluZXJFbDtcclxuICAgIGlmIChlbnRlcmluZ0VsICYmIGVudGVyaW5nRWwgIT09IGxlYXZpbmdFbCkge1xyXG4gICAgICBlbnRlcmluZ0VsLmNsYXNzTGlzdC5hZGQoJ2lvbi1wYWdlJyk7XHJcbiAgICAgIGVudGVyaW5nRWwuY2xhc3NMaXN0LmFkZCgnaW9uLXBhZ2UtaW52aXNpYmxlJyk7XHJcbiAgICAgIGlmIChlbnRlcmluZ0VsLnBhcmVudEVsZW1lbnQgIT09IGNvbnRhaW5lckVsKSB7XHJcbiAgICAgICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQoZW50ZXJpbmdFbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgoY29udGFpbmVyRWwgYXMgYW55KS5jb21taXQpIHtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyRWwuY29tbWl0KGVudGVyaW5nRWwsIGxlYXZpbmdFbCwge1xyXG4gICAgICAgICAgZGVlcFdhaXQ6IHRydWUsXHJcbiAgICAgICAgICBkdXJhdGlvbjogZGlyZWN0aW9uID09PSB1bmRlZmluZWQgPyAwIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgZGlyZWN0aW9uLFxyXG4gICAgICAgICAgc2hvd0dvQmFjayxcclxuICAgICAgICAgIHByb2dyZXNzQW5pbWF0aW9uLFxyXG4gICAgICAgICAgYW5pbWF0aW9uQnVpbGRlclxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgd2FpdDxUPih0YXNrOiAoKSA9PiBQcm9taXNlPFQ+KTogUHJvbWlzZTxUPiB7XHJcbiAgICBpZiAodGhpcy5ydW5uaW5nVGFzayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucnVubmluZ1Rhc2s7XHJcbiAgICAgIHRoaXMucnVubmluZ1Rhc2sgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5ydW5uaW5nVGFzayA9IHRhc2soKTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY2xlYW51cEFzeW5jID0gKGFjdGl2ZVJvdXRlOiBSb3V0ZVZpZXcsIHZpZXdzOiBSb3V0ZVZpZXdbXSwgdmlld3NTbmFwc2hvdDogUm91dGVWaWV3W10sIGxvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xyXG4gIGlmICh0eXBlb2YgKHJlcXVlc3RBbmltYXRpb25GcmFtZSBhcyBhbnkpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PihyZXNvbHZlID0+IHtcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICBjbGVhbnVwKGFjdGl2ZVJvdXRlLCB2aWV3cywgdmlld3NTbmFwc2hvdCwgbG9jYXRpb24pO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG59O1xyXG5cclxuY29uc3QgY2xlYW51cCA9IChhY3RpdmVSb3V0ZTogUm91dGVWaWV3LCB2aWV3czogUm91dGVWaWV3W10sIHZpZXdzU25hcHNob3Q6IFJvdXRlVmlld1tdLCBsb2NhdGlvbjogTG9jYXRpb24pID0+IHtcclxuICB2aWV3c1NuYXBzaG90XHJcbiAgICAuZmlsdGVyKHZpZXcgPT4gIXZpZXdzLmluY2x1ZGVzKHZpZXcpKVxyXG4gICAgLmZvckVhY2goZGVzdHJveVZpZXcpO1xyXG5cclxuICB2aWV3cy5mb3JFYWNoKHZpZXcgPT4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbiB0aGUgZXZlbnQgdGhhdCBhIHVzZXIgbmF2aWdhdGVkIG11bHRpcGxlXHJcbiAgICAgKiB0aW1lcyBpbiByYXBpZCBzdWNjZXNzaW9uLCB3ZSB3YW50IHRvIG1ha2Ugc3VyZVxyXG4gICAgICogd2UgZG9uJ3QgcHJlLWVtcHRpdmVseSBkZXRhY2ggYSB2aWV3IHdoaWxlXHJcbiAgICAgKiBpdCBpcyBpbiBtaWQtdHJhbnNpdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBJbiB0aGlzIGluc3RhbmNlIHdlIGFsc28gZG8gbm90IGNhcmUgYWJvdXQgcXVlcnlcclxuICAgICAqIHBhcmFtcyBvciBmcmFnbWVudHMgYXMgaXQgd2lsbCBiZSB0aGUgc2FtZSB2aWV3IHJlZ2FyZGxlc3NcclxuICAgICAqL1xyXG4gICAgY29uc3QgbG9jYXRpb25XaXRob3V0UGFyYW1zID0gbG9jYXRpb24ucGF0aCgpLnNwbGl0KCc/JylbMF07XHJcbiAgICBjb25zdCBsb2NhdGlvbldpdGhvdXRGcmFnbWVudCA9IGxvY2F0aW9uV2l0aG91dFBhcmFtcy5zcGxpdCgnIycpWzBdO1xyXG5cclxuICAgIGlmICh2aWV3ICE9PSBhY3RpdmVSb3V0ZSAmJiB2aWV3LnVybCAhPT0gbG9jYXRpb25XaXRob3V0RnJhZ21lbnQpIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IHZpZXcuZWxlbWVudDtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpb24tcGFnZS1oaWRkZW4nKTtcclxuICAgICAgdmlldy5yZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0YWNoKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==