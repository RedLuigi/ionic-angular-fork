import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { NavController } from '../../providers/nav-controller';
import { IonTabBar } from '../proxies';
import { IonRouterOutlet } from './ion-router-outlet';
var IonTabs = /** @class */ (function () {
    function IonTabs(navCtrl) {
        this.navCtrl = navCtrl;
        this.ionTabsWillChange = new EventEmitter();
        this.ionTabsDidChange = new EventEmitter();
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
            return this.navCtrl.navigateRoot(tabRootUrl, tslib_1.__assign({}, (navigationExtras), { animated: true, animationDirection: 'back' }));
        }
        else {
            var lastRoute = this.outlet.getLastRouteView(tab);
            /**
             * If there is a lastRoute, goto that, otherwise goto the fallback url of the
             * selected tab
             */
            var url = lastRoute && lastRoute.url || tabRootUrl;
            var navigationExtras = lastRoute && lastRoute.savedExtras;
            return this.navCtrl.navigateRoot(url, tslib_1.__assign({}, (navigationExtras), { animated: true, animationDirection: 'back' }));
        }
    };
    IonTabs.prototype.getSelected = function () {
        return this.outlet.getActiveStackId();
    };
    IonTabs.ctorParameters = function () { return [
        { type: NavController }
    ]; };
    tslib_1.__decorate([
        ViewChild('outlet', { read: IonRouterOutlet, static: false })
    ], IonTabs.prototype, "outlet", void 0);
    tslib_1.__decorate([
        ContentChild(IonTabBar, { static: false })
    ], IonTabs.prototype, "tabBar", void 0);
    tslib_1.__decorate([
        Output()
    ], IonTabs.prototype, "ionTabsWillChange", void 0);
    tslib_1.__decorate([
        Output()
    ], IonTabs.prototype, "ionTabsDidChange", void 0);
    tslib_1.__decorate([
        HostListener('ionTabButtonClick', ['$event.detail.tab'])
    ], IonTabs.prototype, "select", null);
    IonTabs = tslib_1.__decorate([
        Component({
            selector: 'ion-tabs',
            template: "\n    <ng-content select=\"[slot=top]\"></ng-content>\n    <div class=\"tabs-inner\">\n      <ion-router-outlet #outlet tabs=\"true\" (stackEvents)=\"onPageSelected($event)\"></ion-router-outlet>\n    </div>\n    <ng-content></ng-content>",
            styles: ["\n    :host {\n      display: flex;\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n\n      flex-direction: column;\n\n      width: 100%;\n      height: 100%;\n\n      contain: layout size style;\n      z-index: $z-index-page-container;\n    }\n    .tabs-inner {\n      position: relative;\n\n      flex: 1;\n\n      contain: layout size style;\n    }"]
        })
    ], IonTabs);
    return IonTabs;
}());
export { IonTabs };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXRhYnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQXFDdEQ7SUFRRSxpQkFDVSxPQUFzQjtRQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBSnRCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ3hELHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO0lBSTdELENBQUM7SUFFTDs7T0FFRztJQUNILGdDQUFjLEdBQWQsVUFBZSxNQUFrQjtRQUMvQixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUM1QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM3QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUVILHdCQUFNLEdBQU4sVUFBTyxHQUFXO1FBQ2hCLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxHQUFHLENBQUM7UUFDL0QsSUFBTSxVQUFVLEdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLFNBQUksR0FBSyxDQUFDO1FBQ3RELElBQUksZUFBZSxFQUFFO1lBQ25CLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNyRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRS9ELG9EQUFvRDtZQUNwRCxJQUFJLFVBQVUsQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUU5QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxJQUFNLGdCQUFnQixHQUFHLFFBQVEsSUFBSSxVQUFVLEtBQUssUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3pGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSx1QkFDdEMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUNyQixRQUFRLEVBQUUsSUFBSSxFQUNkLGtCQUFrQixFQUFFLE1BQU0sSUFDMUIsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BEOzs7ZUFHRztZQUNILElBQU0sR0FBRyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUNyRCxJQUFNLGdCQUFnQixHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDO1lBRTVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyx1QkFDL0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUNyQixRQUFRLEVBQUUsSUFBSSxFQUNkLGtCQUFrQixFQUFFLE1BQU0sSUFDMUIsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELDZCQUFXLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN4QyxDQUFDOztnQkExRWtCLGFBQWE7O0lBUCtCO1FBQTlELFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzsyQ0FBeUI7SUFDM0M7UUFBM0MsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzsyQ0FBK0I7SUFFaEU7UUFBVCxNQUFNLEVBQUU7c0RBQXlEO0lBQ3hEO1FBQVQsTUFBTSxFQUFFO3FEQUF3RDtJQXlDakU7UUFEQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3lDQWlDeEQ7SUEvRVUsT0FBTztRQWxDbkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLGdQQUtrQjtxQkFDbkIsK1lBdUJMO1NBRUwsQ0FBQztPQUNXLE9BQU8sQ0FvRm5CO0lBQUQsY0FBQztDQUFBLEFBcEZELElBb0ZDO1NBcEZZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL25hdi1jb250cm9sbGVyJztcclxuaW1wb3J0IHsgSW9uVGFiQmFyIH0gZnJvbSAnLi4vcHJveGllcyc7XHJcblxyXG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuL2lvbi1yb3V0ZXItb3V0bGV0JztcclxuaW1wb3J0IHsgU3RhY2tFdmVudCB9IGZyb20gJy4vc3RhY2stdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpb24tdGFicycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXRvcF1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGFicy1pbm5lclwiPlxyXG4gICAgICA8aW9uLXJvdXRlci1vdXRsZXQgI291dGxldCB0YWJzPVwidHJ1ZVwiIChzdGFja0V2ZW50cyk9XCJvblBhZ2VTZWxlY3RlZCgkZXZlbnQpXCI+PC9pb24tcm91dGVyLW91dGxldD5cclxuICAgIDwvZGl2PlxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgIGJvdHRvbTogMDtcclxuXHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgICAgY29udGFpbjogbGF5b3V0IHNpemUgc3R5bGU7XHJcbiAgICAgIHotaW5kZXg6ICR6LWluZGV4LXBhZ2UtY29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgLnRhYnMtaW5uZXIge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICAgICBmbGV4OiAxO1xyXG5cclxuICAgICAgY29udGFpbjogbGF5b3V0IHNpemUgc3R5bGU7XHJcbiAgICB9YFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElvblRhYnMge1xyXG5cclxuICBAVmlld0NoaWxkKCdvdXRsZXQnLCB7IHJlYWQ6IElvblJvdXRlck91dGxldCwgc3RhdGljOiBmYWxzZSB9KSBvdXRsZXQ6IElvblJvdXRlck91dGxldDtcclxuICBAQ29udGVudENoaWxkKElvblRhYkJhciwgeyBzdGF0aWM6IGZhbHNlIH0pIHRhYkJhcjogSW9uVGFiQmFyIHwgdW5kZWZpbmVkO1xyXG5cclxuICBAT3V0cHV0KCkgaW9uVGFic1dpbGxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgdGFiOiBzdHJpbmcgfT4oKTtcclxuICBAT3V0cHV0KCkgaW9uVGFic0RpZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB0YWI6IHN0cmluZyB9PigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlcixcclxuICApIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblBhZ2VTZWxlY3RlZChkZXRhaWw6IFN0YWNrRXZlbnQpIHtcclxuICAgIGNvbnN0IHN0YWNrSWQgPSBkZXRhaWwuZW50ZXJpbmdWaWV3LnN0YWNrSWQ7XHJcbiAgICBpZiAoZGV0YWlsLnRhYlN3aXRjaCAmJiBzdGFja0lkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKHRoaXMudGFiQmFyKSB7XHJcbiAgICAgICAgdGhpcy50YWJCYXIuc2VsZWN0ZWRUYWIgPSBzdGFja0lkO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW9uVGFic1dpbGxDaGFuZ2UuZW1pdCh7IHRhYjogc3RhY2tJZCB9KTtcclxuICAgICAgdGhpcy5pb25UYWJzRGlkQ2hhbmdlLmVtaXQoeyB0YWI6IHN0YWNrSWQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgdGFiIGJ1dHRvbiBpcyBjbGlja2VkLCB0aGVyZSBhcmUgc2V2ZXJhbCBzY2VuYXJpb3M6XHJcbiAgICogMS4gSWYgdGhlIHNlbGVjdGVkIHRhYiBpcyBjdXJyZW50bHkgYWN0aXZlICh0aGUgdGFiIGJ1dHRvbiBoYXMgYmVlbiBjbGlja2VkXHJcbiAgICogICAgYWdhaW4pLCB0aGVuIGl0IHNob3VsZCBnbyB0byB0aGUgcm9vdCB2aWV3IGZvciB0aGF0IHRhYi5cclxuICAgKlxyXG4gICAqICAgYS4gR2V0IHRoZSBzYXZlZCByb290IHZpZXcgZnJvbSB0aGUgcm91dGVyIG91dGxldC4gSWYgdGhlIHNhdmVkIHJvb3Qgdmlld1xyXG4gICAqICAgICAgbWF0Y2hlcyB0aGUgdGFiUm9vdFVybCwgc2V0IHRoZSByb3V0ZSB2aWV3IHRvIHRoaXMgdmlldyBpbmNsdWRpbmcgdGhlXHJcbiAgICogICAgICBuYXZpZ2F0aW9uIGV4dHJhcy5cclxuICAgKiAgIGIuIElmIHRoZSBzYXZlZCByb290IHZpZXcgZnJvbSB0aGUgcm91dGVyIG91dGxldCBkb2VzXHJcbiAgICogICAgICBub3QgbWF0Y2gsIG5hdmlnYXRlIHRvIHRoZSB0YWJSb290VXJsLiBObyBuYXZpZ2F0aW9uIGV4dHJhcyBhcmVcclxuICAgKiAgICAgIGluY2x1ZGVkLlxyXG4gICAqXHJcbiAgICogMi4gSWYgdGhlIGN1cnJlbnQgdGFiIHRhYiBpcyBub3QgY3VycmVudGx5IHNlbGVjdGVkLCBnZXQgdGhlIGxhc3Qgcm91dGVcclxuICAgKiAgICB2aWV3IGZyb20gdGhlIHJvdXRlciBvdXRsZXQuXHJcbiAgICpcclxuICAgKiAgIGEuIElmIHRoZSBsYXN0IHJvdXRlIHZpZXcgZXhpc3RzLCBuYXZpZ2F0ZSB0byB0aGF0IHZpZXcgaW5jbHVkaW5nIGFueVxyXG4gICAqICAgICAgbmF2aWdhdGlvbiBleHRyYXNcclxuICAgKiAgIGIuIElmIHRoZSBsYXN0IHJvdXRlIHZpZXcgZG9lc24ndCBleGlzdCwgdGhlbiBuYXZpZ2F0ZVxyXG4gICAqICAgICAgdG8gdGhlIGRlZmF1bHQgdGFiUm9vdFVybFxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2lvblRhYkJ1dHRvbkNsaWNrJywgWyckZXZlbnQuZGV0YWlsLnRhYiddKVxyXG4gIHNlbGVjdCh0YWI6IHN0cmluZykge1xyXG4gICAgY29uc3QgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5vdXRsZXQuZ2V0QWN0aXZlU3RhY2tJZCgpID09PSB0YWI7XHJcbiAgICBjb25zdCB0YWJSb290VXJsID0gYCR7dGhpcy5vdXRsZXQudGFic1ByZWZpeH0vJHt0YWJ9YDtcclxuICAgIGlmIChhbHJlYWR5U2VsZWN0ZWQpIHtcclxuICAgICAgY29uc3QgYWN0aXZlU3RhY2tJZCA9IHRoaXMub3V0bGV0LmdldEFjdGl2ZVN0YWNrSWQoKTtcclxuICAgICAgY29uc3QgYWN0aXZlVmlldyA9IHRoaXMub3V0bGV0LmdldExhc3RSb3V0ZVZpZXcoYWN0aXZlU3RhY2tJZCk7XHJcblxyXG4gICAgICAvLyBJZiBvbiByb290IHRhYiwgZG8gbm90IG5hdmlnYXRlIHRvIHJvb3QgdGFiIGFnYWluXHJcbiAgICAgIGlmIChhY3RpdmVWaWV3LnVybCA9PT0gdGFiUm9vdFVybCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIGNvbnN0IHJvb3RWaWV3ID0gdGhpcy5vdXRsZXQuZ2V0Um9vdFZpZXcodGFiKTtcclxuICAgICAgY29uc3QgbmF2aWdhdGlvbkV4dHJhcyA9IHJvb3RWaWV3ICYmIHRhYlJvb3RVcmwgPT09IHJvb3RWaWV3LnVybCAmJiByb290Vmlldy5zYXZlZEV4dHJhcztcclxuICAgICAgcmV0dXJuIHRoaXMubmF2Q3RybC5uYXZpZ2F0ZVJvb3QodGFiUm9vdFVybCwge1xyXG4gICAgICAgIC4uLihuYXZpZ2F0aW9uRXh0cmFzKSxcclxuICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICBhbmltYXRpb25EaXJlY3Rpb246ICdiYWNrJyxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBsYXN0Um91dGUgPSB0aGlzLm91dGxldC5nZXRMYXN0Um91dGVWaWV3KHRhYik7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBJZiB0aGVyZSBpcyBhIGxhc3RSb3V0ZSwgZ290byB0aGF0LCBvdGhlcndpc2UgZ290byB0aGUgZmFsbGJhY2sgdXJsIG9mIHRoZVxyXG4gICAgICAgKiBzZWxlY3RlZCB0YWJcclxuICAgICAgICovXHJcbiAgICAgIGNvbnN0IHVybCA9IGxhc3RSb3V0ZSAmJiBsYXN0Um91dGUudXJsIHx8IHRhYlJvb3RVcmw7XHJcbiAgICAgIGNvbnN0IG5hdmlnYXRpb25FeHRyYXMgPSBsYXN0Um91dGUgJiYgbGFzdFJvdXRlLnNhdmVkRXh0cmFzO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMubmF2Q3RybC5uYXZpZ2F0ZVJvb3QodXJsLCB7XHJcbiAgICAgICAgLi4uKG5hdmlnYXRpb25FeHRyYXMpLFxyXG4gICAgICAgIGFuaW1hdGVkOiB0cnVlLFxyXG4gICAgICAgIGFuaW1hdGlvbkRpcmVjdGlvbjogJ2JhY2snLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGVkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5vdXRsZXQuZ2V0QWN0aXZlU3RhY2tJZCgpO1xyXG4gIH1cclxufVxyXG4iXX0=