import * as tslib_1 from "tslib";
import { Injectable, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
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
Config.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function Config_Factory() { return new Config(); }, token: Config, providedIn: "root" });
Config = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], Config);
export { Config };
export const ConfigToken = new InjectionToken('USERCONFIG');
const getConfig = () => {
    if (typeof window !== 'undefined') {
        const Ionic = window.Ionic;
        if (Ionic && Ionic.config) {
            return Ionic.config;
        }
    }
    return null;
};
const ɵ0 = getConfig;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwcm92aWRlcnMvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRM0QsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTTtJQUVqQixHQUFHLENBQUMsR0FBc0IsRUFBRSxRQUFjO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFzQixFQUFFLFFBQWtCO1FBQ25ELE1BQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFzQixFQUFFLFFBQWlCO1FBQ2pELE1BQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFzQixFQUFFLEtBQVc7UUFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxzTEFBc0wsQ0FBQyxDQUFDO1FBQ3JNLE1BQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7QUFqQ1ksTUFBTTtJQUhsQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csTUFBTSxDQWlDbEI7U0FqQ1ksTUFBTTtBQW1DbkIsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFNLFlBQVksQ0FBQyxDQUFDO0FBRWpFLE1BQU0sU0FBUyxHQUFHLEdBQXNCLEVBQUU7SUFDeEMsSUFBSSxPQUFRLE1BQWMsS0FBSyxXQUFXLEVBQUU7UUFDMUMsTUFBTSxLQUFLLEdBQUksTUFBNkIsQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDckI7S0FDRjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlnIGFzIENvcmVDb25maWcsIElvbmljQ29uZmlnIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSW9uaWNXaW5kb3cgfSBmcm9tICcuLi90eXBlcy9pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcblxyXG4gIGdldChrZXk6IGtleW9mIElvbmljQ29uZmlnLCBmYWxsYmFjaz86IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBjID0gZ2V0Q29uZmlnKCk7XHJcbiAgICBpZiAoYykge1xyXG4gICAgICByZXR1cm4gYy5nZXQoa2V5LCBmYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldEJvb2xlYW4oa2V5OiBrZXlvZiBJb25pY0NvbmZpZywgZmFsbGJhY2s/OiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBjID0gZ2V0Q29uZmlnKCk7XHJcbiAgICBpZiAoYykge1xyXG4gICAgICByZXR1cm4gYy5nZXRCb29sZWFuKGtleSwgZmFsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0TnVtYmVyKGtleToga2V5b2YgSW9uaWNDb25maWcsIGZhbGxiYWNrPzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGMgPSBnZXRDb25maWcoKTtcclxuICAgIGlmIChjKSB7XHJcbiAgICAgIHJldHVybiBjLmdldE51bWJlcihrZXksIGZhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgc2V0KGtleToga2V5b2YgSW9uaWNDb25maWcsIHZhbHVlPzogYW55KSB7XHJcbiAgICBjb25zb2xlLndhcm4oYFtERVBSRUNBVElPTl1bQ29uZmlnXTogVGhlIENvbmZpZy5zZXQoKSBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIElvbmljIEZyYW1ld29yayA2LjAuIFBsZWFzZSBzZWUgaHR0cHM6Ly9pb25pY2ZyYW1ld29yay5jb20vZG9jcy9hbmd1bGFyL2NvbmZpZyBmb3IgYWx0ZXJuYXRpdmVzLmApO1xyXG4gICAgY29uc3QgYyA9IGdldENvbmZpZygpO1xyXG4gICAgaWYgKGMpIHtcclxuICAgICAgYy5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ29uZmlnVG9rZW4gPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignVVNFUkNPTkZJRycpO1xyXG5cclxuY29uc3QgZ2V0Q29uZmlnID0gKCk6IENvcmVDb25maWcgfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mICh3aW5kb3cgYXMgYW55KSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGNvbnN0IElvbmljID0gKHdpbmRvdyBhcyBhbnkgYXMgSW9uaWNXaW5kb3cpLklvbmljO1xyXG4gICAgaWYgKElvbmljICYmIElvbmljLmNvbmZpZykge1xyXG4gICAgICByZXR1cm4gSW9uaWMuY29uZmlnO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuIl19