import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { NavController } from '../../providers/nav-controller';
import { IonTabBar } from '../proxies';
import { IonRouterOutlet } from './ion-router-outlet';
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
export { IonTabs };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXRhYnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQXFDdEQsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztJQVFsQixZQUNVLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFKdEIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDeEQscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7SUFJN0QsQ0FBQztJQUVMOztPQUVHO0lBQ0gsY0FBYyxDQUFDLE1BQWtCO1FBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQzVDLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBRUgsTUFBTSxDQUFDLEdBQVc7UUFDaEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEdBQUcsQ0FBQztRQUMvRCxNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3RELElBQUksZUFBZSxFQUFFO1lBQ25CLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRS9ELG9EQUFvRDtZQUNwRCxJQUFJLFVBQVUsQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUU5QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsSUFBSSxVQUFVLEtBQUssUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3pGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxvQkFDdEMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUNyQixRQUFRLEVBQUUsSUFBSSxFQUNkLGtCQUFrQixFQUFFLE1BQU0sSUFDMUIsQ0FBQztTQUNKO2FBQU07WUFDTCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BEOzs7ZUFHRztZQUNILE1BQU0sR0FBRyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUNyRCxNQUFNLGdCQUFnQixHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDO1lBRTVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxvQkFDL0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUNyQixRQUFRLEVBQUUsSUFBSSxFQUNkLGtCQUFrQixFQUFFLE1BQU0sSUFDMUIsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0NBQ0YsQ0FBQTs7WUEzRW9CLGFBQWE7O0FBUCtCO0lBQTlELFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzt1Q0FBeUI7QUFDM0M7SUFBM0MsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzt1Q0FBK0I7QUFFaEU7SUFBVCxNQUFNLEVBQUU7a0RBQXlEO0FBQ3hEO0lBQVQsTUFBTSxFQUFFO2lEQUF3RDtBQXlDakU7SUFEQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3FDQWlDeEQ7QUEvRVUsT0FBTztJQWxDbkIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFOzs7Ozs4QkFLa0I7aUJBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXVCTDtLQUVMLENBQUM7R0FDVyxPQUFPLENBb0ZuQjtTQXBGWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTmF2Q29udHJvbGxlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9uYXYtY29udHJvbGxlcic7XHJcbmltcG9ydCB7IElvblRhYkJhciB9IGZyb20gJy4uL3Byb3hpZXMnO1xyXG5cclxuaW1wb3J0IHsgSW9uUm91dGVyT3V0bGV0IH0gZnJvbSAnLi9pb24tcm91dGVyLW91dGxldCc7XHJcbmltcG9ydCB7IFN0YWNrRXZlbnQgfSBmcm9tICcuL3N0YWNrLXV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW9uLXRhYnMnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD10b3BdXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPGRpdiBjbGFzcz1cInRhYnMtaW5uZXJcIj5cclxuICAgICAgPGlvbi1yb3V0ZXItb3V0bGV0ICNvdXRsZXQgdGFicz1cInRydWVcIiAoc3RhY2tFdmVudHMpPVwib25QYWdlU2VsZWN0ZWQoJGV2ZW50KVwiPjwvaW9uLXJvdXRlci1vdXRsZXQ+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICBib3R0b206IDA7XHJcblxyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuXHJcbiAgICAgIGNvbnRhaW46IGxheW91dCBzaXplIHN0eWxlO1xyXG4gICAgICB6LWluZGV4OiAkei1pbmRleC1wYWdlLWNvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIC50YWJzLWlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGNvbnRhaW46IGxheW91dCBzaXplIHN0eWxlO1xyXG4gICAgfWBcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb25UYWJzIHtcclxuXHJcbiAgQFZpZXdDaGlsZCgnb3V0bGV0JywgeyByZWFkOiBJb25Sb3V0ZXJPdXRsZXQsIHN0YXRpYzogZmFsc2UgfSkgb3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQ7XHJcbiAgQENvbnRlbnRDaGlsZChJb25UYWJCYXIsIHsgc3RhdGljOiBmYWxzZSB9KSB0YWJCYXI6IElvblRhYkJhciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgQE91dHB1dCgpIGlvblRhYnNXaWxsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHRhYjogc3RyaW5nIH0+KCk7XHJcbiAgQE91dHB1dCgpIGlvblRhYnNEaWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgdGFiOiBzdHJpbmcgfT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5hdkN0cmw6IE5hdkNvbnRyb2xsZXIsXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25QYWdlU2VsZWN0ZWQoZGV0YWlsOiBTdGFja0V2ZW50KSB7XHJcbiAgICBjb25zdCBzdGFja0lkID0gZGV0YWlsLmVudGVyaW5nVmlldy5zdGFja0lkO1xyXG4gICAgaWYgKGRldGFpbC50YWJTd2l0Y2ggJiYgc3RhY2tJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0aGlzLnRhYkJhcikge1xyXG4gICAgICAgIHRoaXMudGFiQmFyLnNlbGVjdGVkVGFiID0gc3RhY2tJZDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlvblRhYnNXaWxsQ2hhbmdlLmVtaXQoeyB0YWI6IHN0YWNrSWQgfSk7XHJcbiAgICAgIHRoaXMuaW9uVGFic0RpZENoYW5nZS5lbWl0KHsgdGFiOiBzdGFja0lkIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHRhYiBidXR0b24gaXMgY2xpY2tlZCwgdGhlcmUgYXJlIHNldmVyYWwgc2NlbmFyaW9zOlxyXG4gICAqIDEuIElmIHRoZSBzZWxlY3RlZCB0YWIgaXMgY3VycmVudGx5IGFjdGl2ZSAodGhlIHRhYiBidXR0b24gaGFzIGJlZW4gY2xpY2tlZFxyXG4gICAqICAgIGFnYWluKSwgdGhlbiBpdCBzaG91bGQgZ28gdG8gdGhlIHJvb3QgdmlldyBmb3IgdGhhdCB0YWIuXHJcbiAgICpcclxuICAgKiAgIGEuIEdldCB0aGUgc2F2ZWQgcm9vdCB2aWV3IGZyb20gdGhlIHJvdXRlciBvdXRsZXQuIElmIHRoZSBzYXZlZCByb290IHZpZXdcclxuICAgKiAgICAgIG1hdGNoZXMgdGhlIHRhYlJvb3RVcmwsIHNldCB0aGUgcm91dGUgdmlldyB0byB0aGlzIHZpZXcgaW5jbHVkaW5nIHRoZVxyXG4gICAqICAgICAgbmF2aWdhdGlvbiBleHRyYXMuXHJcbiAgICogICBiLiBJZiB0aGUgc2F2ZWQgcm9vdCB2aWV3IGZyb20gdGhlIHJvdXRlciBvdXRsZXQgZG9lc1xyXG4gICAqICAgICAgbm90IG1hdGNoLCBuYXZpZ2F0ZSB0byB0aGUgdGFiUm9vdFVybC4gTm8gbmF2aWdhdGlvbiBleHRyYXMgYXJlXHJcbiAgICogICAgICBpbmNsdWRlZC5cclxuICAgKlxyXG4gICAqIDIuIElmIHRoZSBjdXJyZW50IHRhYiB0YWIgaXMgbm90IGN1cnJlbnRseSBzZWxlY3RlZCwgZ2V0IHRoZSBsYXN0IHJvdXRlXHJcbiAgICogICAgdmlldyBmcm9tIHRoZSByb3V0ZXIgb3V0bGV0LlxyXG4gICAqXHJcbiAgICogICBhLiBJZiB0aGUgbGFzdCByb3V0ZSB2aWV3IGV4aXN0cywgbmF2aWdhdGUgdG8gdGhhdCB2aWV3IGluY2x1ZGluZyBhbnlcclxuICAgKiAgICAgIG5hdmlnYXRpb24gZXh0cmFzXHJcbiAgICogICBiLiBJZiB0aGUgbGFzdCByb3V0ZSB2aWV3IGRvZXNuJ3QgZXhpc3QsIHRoZW4gbmF2aWdhdGVcclxuICAgKiAgICAgIHRvIHRoZSBkZWZhdWx0IHRhYlJvb3RVcmxcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdpb25UYWJCdXR0b25DbGljaycsIFsnJGV2ZW50LmRldGFpbC50YWInXSlcclxuICBzZWxlY3QodGFiOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHRoaXMub3V0bGV0LmdldEFjdGl2ZVN0YWNrSWQoKSA9PT0gdGFiO1xyXG4gICAgY29uc3QgdGFiUm9vdFVybCA9IGAke3RoaXMub3V0bGV0LnRhYnNQcmVmaXh9LyR7dGFifWA7XHJcbiAgICBpZiAoYWxyZWFkeVNlbGVjdGVkKSB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZVN0YWNrSWQgPSB0aGlzLm91dGxldC5nZXRBY3RpdmVTdGFja0lkKCk7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZVZpZXcgPSB0aGlzLm91dGxldC5nZXRMYXN0Um91dGVWaWV3KGFjdGl2ZVN0YWNrSWQpO1xyXG5cclxuICAgICAgLy8gSWYgb24gcm9vdCB0YWIsIGRvIG5vdCBuYXZpZ2F0ZSB0byByb290IHRhYiBhZ2FpblxyXG4gICAgICBpZiAoYWN0aXZlVmlldy51cmwgPT09IHRhYlJvb3RVcmwpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBjb25zdCByb290VmlldyA9IHRoaXMub3V0bGV0LmdldFJvb3RWaWV3KHRhYik7XHJcbiAgICAgIGNvbnN0IG5hdmlnYXRpb25FeHRyYXMgPSByb290VmlldyAmJiB0YWJSb290VXJsID09PSByb290Vmlldy51cmwgJiYgcm9vdFZpZXcuc2F2ZWRFeHRyYXM7XHJcbiAgICAgIHJldHVybiB0aGlzLm5hdkN0cmwubmF2aWdhdGVSb290KHRhYlJvb3RVcmwsIHtcclxuICAgICAgICAuLi4obmF2aWdhdGlvbkV4dHJhcyksXHJcbiAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW5pbWF0aW9uRGlyZWN0aW9uOiAnYmFjaycsXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbGFzdFJvdXRlID0gdGhpcy5vdXRsZXQuZ2V0TGFzdFJvdXRlVmlldyh0YWIpO1xyXG4gICAgICAvKipcclxuICAgICAgICogSWYgdGhlcmUgaXMgYSBsYXN0Um91dGUsIGdvdG8gdGhhdCwgb3RoZXJ3aXNlIGdvdG8gdGhlIGZhbGxiYWNrIHVybCBvZiB0aGVcclxuICAgICAgICogc2VsZWN0ZWQgdGFiXHJcbiAgICAgICAqL1xyXG4gICAgICBjb25zdCB1cmwgPSBsYXN0Um91dGUgJiYgbGFzdFJvdXRlLnVybCB8fCB0YWJSb290VXJsO1xyXG4gICAgICBjb25zdCBuYXZpZ2F0aW9uRXh0cmFzID0gbGFzdFJvdXRlICYmIGxhc3RSb3V0ZS5zYXZlZEV4dHJhcztcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLm5hdkN0cmwubmF2aWdhdGVSb290KHVybCwge1xyXG4gICAgICAgIC4uLihuYXZpZ2F0aW9uRXh0cmFzKSxcclxuICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICBhbmltYXRpb25EaXJlY3Rpb246ICdiYWNrJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3RlZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMub3V0bGV0LmdldEFjdGl2ZVN0YWNrSWQoKTtcclxuICB9XHJcbn1cclxuIl19