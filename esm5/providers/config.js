import * as tslib_1 from "tslib";
import { Injectable, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
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
    Config.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function Config_Factory() { return new Config(); }, token: Config, providedIn: "root" });
    Config = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], Config);
    return Config;
}());
export { Config };
export var ConfigToken = new InjectionToken('USERCONFIG');
var getConfig = function () {
    if (typeof window !== 'undefined') {
        var Ionic = window.Ionic;
        if (Ionic && Ionic.config) {
            return Ionic.config;
        }
    }
    return null;
};
var ɵ0 = getConfig;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwcm92aWRlcnMvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRM0Q7SUFBQTtLQWlDQztJQS9CQyxvQkFBRyxHQUFILFVBQUksR0FBc0IsRUFBRSxRQUFjO1FBQ3hDLElBQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDJCQUFVLEdBQVYsVUFBVyxHQUFzQixFQUFFLFFBQWtCO1FBQ25ELElBQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELDBCQUFTLEdBQVQsVUFBVSxHQUFzQixFQUFFLFFBQWlCO1FBQ2pELElBQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELG9CQUFHLEdBQUgsVUFBSSxHQUFzQixFQUFFLEtBQVc7UUFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxzTEFBc0wsQ0FBQyxDQUFDO1FBQ3JNLElBQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDOztJQWhDVSxNQUFNO1FBSGxCLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxNQUFNLENBaUNsQjtpQkF6Q0Q7Q0F5Q0MsQUFqQ0QsSUFpQ0M7U0FqQ1ksTUFBTTtBQW1DbkIsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFNLFlBQVksQ0FBQyxDQUFDO0FBRWpFLElBQU0sU0FBUyxHQUFHO0lBQ2hCLElBQUksT0FBUSxNQUFjLEtBQUssV0FBVyxFQUFFO1FBQzFDLElBQU0sS0FBSyxHQUFJLE1BQTZCLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3JCO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbmZpZyBhcyBDb3JlQ29uZmlnLCBJb25pY0NvbmZpZyB9IGZyb20gJ0Bpb25pYy9jb3JlJztcclxuXHJcbmltcG9ydCB7IElvbmljV2luZG93IH0gZnJvbSAnLi4vdHlwZXMvaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb25maWcge1xyXG5cclxuICBnZXQoa2V5OiBrZXlvZiBJb25pY0NvbmZpZywgZmFsbGJhY2s/OiBhbnkpOiBhbnkge1xyXG4gICAgY29uc3QgYyA9IGdldENvbmZpZygpO1xyXG4gICAgaWYgKGMpIHtcclxuICAgICAgcmV0dXJuIGMuZ2V0KGtleSwgZmFsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRCb29sZWFuKGtleToga2V5b2YgSW9uaWNDb25maWcsIGZhbGxiYWNrPzogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgYyA9IGdldENvbmZpZygpO1xyXG4gICAgaWYgKGMpIHtcclxuICAgICAgcmV0dXJuIGMuZ2V0Qm9vbGVhbihrZXksIGZhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldE51bWJlcihrZXk6IGtleW9mIElvbmljQ29uZmlnLCBmYWxsYmFjaz86IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBjb25zdCBjID0gZ2V0Q29uZmlnKCk7XHJcbiAgICBpZiAoYykge1xyXG4gICAgICByZXR1cm4gYy5nZXROdW1iZXIoa2V5LCBmYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIHNldChrZXk6IGtleW9mIElvbmljQ29uZmlnLCB2YWx1ZT86IGFueSkge1xyXG4gICAgY29uc29sZS53YXJuKGBbREVQUkVDQVRJT05dW0NvbmZpZ106IFRoZSBDb25maWcuc2V0KCkgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBJb25pYyBGcmFtZXdvcmsgNi4wLiBQbGVhc2Ugc2VlIGh0dHBzOi8vaW9uaWNmcmFtZXdvcmsuY29tL2RvY3MvYW5ndWxhci9jb25maWcgZm9yIGFsdGVybmF0aXZlcy5gKTtcclxuICAgIGNvbnN0IGMgPSBnZXRDb25maWcoKTtcclxuICAgIGlmIChjKSB7XHJcbiAgICAgIGMuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IENvbmZpZ1Rva2VuID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ1VTRVJDT05GSUcnKTtcclxuXHJcbmNvbnN0IGdldENvbmZpZyA9ICgpOiBDb3JlQ29uZmlnIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHR5cGVvZiAod2luZG93IGFzIGFueSkgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBjb25zdCBJb25pYyA9ICh3aW5kb3cgYXMgYW55IGFzIElvbmljV2luZG93KS5Jb25pYztcclxuICAgIGlmIChJb25pYyAmJiBJb25pYy5jb25maWcpIHtcclxuICAgICAgcmV0dXJuIElvbmljLmNvbmZpZztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcbiJdfQ==