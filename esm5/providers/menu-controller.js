import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { menuController } from '@ionic/core';
import * as i0 from "@angular/core";
var MenuController = /** @class */ (function () {
    function MenuController() {
    }
    /**
     * Programmatically open the Menu.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu is fully opened
     */
    MenuController.prototype.open = function (menuId) {
        return menuController.open(menuId);
    };
    /**
     * Programmatically close the Menu. If no `menuId` is given as the first
     * argument then it'll close any menu which is open. If a `menuId`
     * is given then it'll close that exact menu.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu is fully closed
     */
    MenuController.prototype.close = function (menuId) {
        return menuController.close(menuId);
    };
    /**
     * Toggle the menu. If it's closed, it will open, and if opened, it
     * will close.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu has been toggled
     */
    MenuController.prototype.toggle = function (menuId) {
        return menuController.toggle(menuId);
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
        return menuController.enable(shouldEnable, menuId);
    };
    /**
     * Used to enable or disable the ability to swipe open the menu.
     * @param shouldEnable  True if it should be swipe-able, false if not.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns the instance of the menu, which is useful for chaining.
     */
    MenuController.prototype.swipeGesture = function (shouldEnable, menuId) {
        return menuController.swipeGesture(shouldEnable, menuId);
    };
    /**
     * @param [menuId] Optionally get the menu by its id, or side.
     * @return Returns true if the specified menu is currently open, otherwise false.
     * If the menuId is not specified, it returns true if ANY menu is currenly open.
     */
    MenuController.prototype.isOpen = function (menuId) {
        return menuController.isOpen(menuId);
    };
    /**
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns true if the menu is currently enabled, otherwise false.
     */
    MenuController.prototype.isEnabled = function (menuId) {
        return menuController.isEnabled(menuId);
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
        return menuController.get(menuId);
    };
    /**
     * @return Returns the instance of the menu already opened, otherwise `null`.
     */
    MenuController.prototype.getOpen = function () {
        return menuController.getOpen();
    };
    /**
     * @return Returns an array of all menu instances.
     */
    MenuController.prototype.getMenus = function () {
        return menuController.getMenus();
    };
    MenuController.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function MenuController_Factory() { return new MenuController(); }, token: MenuController, providedIn: "root" });
    MenuController = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        })
    ], MenuController);
    return MenuController;
}());
export { MenuController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwcm92aWRlcnMvbWVudS1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBSzdDO0lBQUE7S0FpR0M7SUEvRkM7Ozs7T0FJRztJQUNILDZCQUFJLEdBQUosVUFBSyxNQUFlO1FBQ2xCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsOEJBQUssR0FBTCxVQUFNLE1BQWU7UUFDbkIsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILCtCQUFNLEdBQU4sVUFBTyxNQUFlO1FBQ3BCLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILCtCQUFNLEdBQU4sVUFBTyxZQUFxQixFQUFFLE1BQWU7UUFDM0MsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxxQ0FBWSxHQUFaLFVBQWEsWUFBcUIsRUFBRSxNQUFlO1FBQ2pELE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwrQkFBTSxHQUFOLFVBQU8sTUFBZTtRQUNwQixPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtDQUFTLEdBQVQsVUFBVSxNQUFlO1FBQ3ZCLE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCw0QkFBRyxHQUFILFVBQUksTUFBZTtRQUNqQixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0NBQU8sR0FBUDtRQUNFLE9BQU8sY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILGlDQUFRLEdBQVI7UUFDRSxPQUFPLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztJQWhHVSxjQUFjO1FBSDFCLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxjQUFjLENBaUcxQjt5QkF2R0Q7Q0F1R0MsQUFqR0QsSUFpR0M7U0FqR1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWVudUNvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVudUNvbnRyb2xsZXIge1xyXG5cclxuICAvKipcclxuICAgKiBQcm9ncmFtbWF0aWNhbGx5IG9wZW4gdGhlIE1lbnUuXHJcbiAgICogQHBhcmFtIFttZW51SWRdICBPcHRpb25hbGx5IGdldCB0aGUgbWVudSBieSBpdHMgaWQsIG9yIHNpZGUuXHJcbiAgICogQHJldHVybiByZXR1cm5zIGEgcHJvbWlzZSB3aGVuIHRoZSBtZW51IGlzIGZ1bGx5IG9wZW5lZFxyXG4gICAqL1xyXG4gIG9wZW4obWVudUlkPzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbWVudUNvbnRyb2xsZXIub3BlbihtZW51SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvZ3JhbW1hdGljYWxseSBjbG9zZSB0aGUgTWVudS4gSWYgbm8gYG1lbnVJZGAgaXMgZ2l2ZW4gYXMgdGhlIGZpcnN0XHJcbiAgICogYXJndW1lbnQgdGhlbiBpdCdsbCBjbG9zZSBhbnkgbWVudSB3aGljaCBpcyBvcGVuLiBJZiBhIGBtZW51SWRgXHJcbiAgICogaXMgZ2l2ZW4gdGhlbiBpdCdsbCBjbG9zZSB0aGF0IGV4YWN0IG1lbnUuXHJcbiAgICogQHBhcmFtIFttZW51SWRdICBPcHRpb25hbGx5IGdldCB0aGUgbWVudSBieSBpdHMgaWQsIG9yIHNpZGUuXHJcbiAgICogQHJldHVybiByZXR1cm5zIGEgcHJvbWlzZSB3aGVuIHRoZSBtZW51IGlzIGZ1bGx5IGNsb3NlZFxyXG4gICAqL1xyXG4gIGNsb3NlKG1lbnVJZD86IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG1lbnVDb250cm9sbGVyLmNsb3NlKG1lbnVJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgdGhlIG1lbnUuIElmIGl0J3MgY2xvc2VkLCBpdCB3aWxsIG9wZW4sIGFuZCBpZiBvcGVuZWQsIGl0XHJcbiAgICogd2lsbCBjbG9zZS5cclxuICAgKiBAcGFyYW0gW21lbnVJZF0gIE9wdGlvbmFsbHkgZ2V0IHRoZSBtZW51IGJ5IGl0cyBpZCwgb3Igc2lkZS5cclxuICAgKiBAcmV0dXJuIHJldHVybnMgYSBwcm9taXNlIHdoZW4gdGhlIG1lbnUgaGFzIGJlZW4gdG9nZ2xlZFxyXG4gICAqL1xyXG4gIHRvZ2dsZShtZW51SWQ/OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBtZW51Q29udHJvbGxlci50b2dnbGUobWVudUlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZW5hYmxlIG9yIGRpc2FibGUgYSBtZW51LiBGb3IgZXhhbXBsZSwgdGhlcmUgY291bGQgYmUgbXVsdGlwbGVcclxuICAgKiBsZWZ0IG1lbnVzLCBidXQgb25seSBvbmUgb2YgdGhlbSBzaG91bGQgYmUgYWJsZSB0byBiZSBvcGVuZWQgYXQgdGhlIHNhbWVcclxuICAgKiB0aW1lLiBJZiB0aGVyZSBhcmUgbXVsdGlwbGUgbWVudXMgb24gdGhlIHNhbWUgc2lkZSwgdGhlbiBlbmFibGluZyBvbmUgbWVudVxyXG4gICAqIHdpbGwgYWxzbyBhdXRvbWF0aWNhbGx5IGRpc2FibGUgYWxsIHRoZSBvdGhlcnMgdGhhdCBhcmUgb24gdGhlIHNhbWUgc2lkZS5cclxuICAgKiBAcGFyYW0gW21lbnVJZF0gIE9wdGlvbmFsbHkgZ2V0IHRoZSBtZW51IGJ5IGl0cyBpZCwgb3Igc2lkZS5cclxuICAgKiBAcmV0dXJuIFJldHVybnMgdGhlIGluc3RhbmNlIG9mIHRoZSBtZW51LCB3aGljaCBpcyB1c2VmdWwgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGVuYWJsZShzaG91bGRFbmFibGU6IGJvb2xlYW4sIG1lbnVJZD86IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG1lbnVDb250cm9sbGVyLmVuYWJsZShzaG91bGRFbmFibGUsIG1lbnVJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGVuYWJsZSBvciBkaXNhYmxlIHRoZSBhYmlsaXR5IHRvIHN3aXBlIG9wZW4gdGhlIG1lbnUuXHJcbiAgICogQHBhcmFtIHNob3VsZEVuYWJsZSAgVHJ1ZSBpZiBpdCBzaG91bGQgYmUgc3dpcGUtYWJsZSwgZmFsc2UgaWYgbm90LlxyXG4gICAqIEBwYXJhbSBbbWVudUlkXSAgT3B0aW9uYWxseSBnZXQgdGhlIG1lbnUgYnkgaXRzIGlkLCBvciBzaWRlLlxyXG4gICAqIEByZXR1cm4gUmV0dXJucyB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1lbnUsIHdoaWNoIGlzIHVzZWZ1bCBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgc3dpcGVHZXN0dXJlKHNob3VsZEVuYWJsZTogYm9vbGVhbiwgbWVudUlkPzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbWVudUNvbnRyb2xsZXIuc3dpcGVHZXN0dXJlKHNob3VsZEVuYWJsZSwgbWVudUlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBbbWVudUlkXSBPcHRpb25hbGx5IGdldCB0aGUgbWVudSBieSBpdHMgaWQsIG9yIHNpZGUuXHJcbiAgICogQHJldHVybiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBtZW51IGlzIGN1cnJlbnRseSBvcGVuLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAgICogSWYgdGhlIG1lbnVJZCBpcyBub3Qgc3BlY2lmaWVkLCBpdCByZXR1cm5zIHRydWUgaWYgQU5ZIG1lbnUgaXMgY3VycmVubHkgb3Blbi5cclxuICAgKi9cclxuICBpc09wZW4obWVudUlkPzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbWVudUNvbnRyb2xsZXIuaXNPcGVuKG1lbnVJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gW21lbnVJZF0gIE9wdGlvbmFsbHkgZ2V0IHRoZSBtZW51IGJ5IGl0cyBpZCwgb3Igc2lkZS5cclxuICAgKiBAcmV0dXJuIFJldHVybnMgdHJ1ZSBpZiB0aGUgbWVudSBpcyBjdXJyZW50bHkgZW5hYmxlZCwgb3RoZXJ3aXNlIGZhbHNlLlxyXG4gICAqL1xyXG4gIGlzRW5hYmxlZChtZW51SWQ/OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBtZW51Q29udHJvbGxlci5pc0VuYWJsZWQobWVudUlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZ2V0IGEgbWVudSBpbnN0YW5jZS4gSWYgYSBgbWVudUlkYCBpcyBub3QgcHJvdmlkZWQgdGhlbiBpdCdsbFxyXG4gICAqIHJldHVybiB0aGUgZmlyc3QgbWVudSBmb3VuZC4gSWYgYSBgbWVudUlkYCBpcyBgbGVmdGAgb3IgYHJpZ2h0YCwgdGhlblxyXG4gICAqIGl0J2xsIHJldHVybiB0aGUgZW5hYmxlZCBtZW51IG9uIHRoYXQgc2lkZS4gT3RoZXJ3aXNlLCBpZiBhIGBtZW51SWRgIGlzXHJcbiAgICogcHJvdmlkZWQsIHRoZW4gaXQnbGwgdHJ5IHRvIGZpbmQgdGhlIG1lbnUgdXNpbmcgdGhlIG1lbnUncyBgaWRgXHJcbiAgICogcHJvcGVydHkuIElmIGEgbWVudSBpcyBub3QgZm91bmQgdGhlbiBpdCdsbCByZXR1cm4gYG51bGxgLlxyXG4gICAqIEBwYXJhbSBbbWVudUlkXSAgT3B0aW9uYWxseSBnZXQgdGhlIG1lbnUgYnkgaXRzIGlkLCBvciBzaWRlLlxyXG4gICAqIEByZXR1cm4gUmV0dXJucyB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1lbnUgaWYgZm91bmQsIG90aGVyd2lzZSBgbnVsbGAuXHJcbiAgICovXHJcbiAgZ2V0KG1lbnVJZD86IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG1lbnVDb250cm9sbGVyLmdldChtZW51SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybiBSZXR1cm5zIHRoZSBpbnN0YW5jZSBvZiB0aGUgbWVudSBhbHJlYWR5IG9wZW5lZCwgb3RoZXJ3aXNlIGBudWxsYC5cclxuICAgKi9cclxuICBnZXRPcGVuKCkge1xyXG4gICAgcmV0dXJuIG1lbnVDb250cm9sbGVyLmdldE9wZW4oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4gUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgbWVudSBpbnN0YW5jZXMuXHJcbiAgICovXHJcbiAgZ2V0TWVudXMoKSB7XHJcbiAgICByZXR1cm4gbWVudUNvbnRyb2xsZXIuZ2V0TWVudXMoKTtcclxuICB9XHJcbn1cclxuIl19