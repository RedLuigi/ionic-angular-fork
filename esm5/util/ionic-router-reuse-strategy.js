import * as tslib_1 from "tslib";
var IonicRouteStrategy = /** @class */ (function () {
    function IonicRouteStrategy() {
    }
    IonicRouteStrategy.prototype.shouldDetach = function (_route) {
        return false;
    };
    IonicRouteStrategy.prototype.shouldAttach = function (_route) {
        return false;
    };
    IonicRouteStrategy.prototype.store = function (_route, _detachedTree) {
        return;
    };
    IonicRouteStrategy.prototype.retrieve = function (_route) {
        return null;
    };
    IonicRouteStrategy.prototype.shouldReuseRoute = function (future, curr) {
        var e_1, _a;
        if (future.routeConfig !== curr.routeConfig) {
            return false;
        }
        // checking router params
        var futureParams = future.params;
        var currentParams = curr.params;
        var keysA = Object.keys(futureParams);
        var keysB = Object.keys(currentParams);
        if (keysA.length !== keysB.length) {
            return false;
        }
        try {
            // Test for A's keys different from B.
            for (var keysA_1 = tslib_1.__values(keysA), keysA_1_1 = keysA_1.next(); !keysA_1_1.done; keysA_1_1 = keysA_1.next()) {
                var key = keysA_1_1.value;
                if (currentParams[key] !== futureParams[key]) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keysA_1_1 && !keysA_1_1.done && (_a = keysA_1.return)) _a.call(keysA_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    return IonicRouteStrategy;
}());
export { IonicRouteStrategy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtcm91dGVyLXJldXNlLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlsL2lvbmljLXJvdXRlci1yZXVzZS1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFBQTtJQTRDQSxDQUFDO0lBMUNDLHlDQUFZLEdBQVosVUFBYSxNQUE4QjtRQUN6QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx5Q0FBWSxHQUFaLFVBQWEsTUFBOEI7UUFDekMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsa0NBQUssR0FBTCxVQUFNLE1BQThCLEVBQUUsYUFBa0M7UUFDdEUsT0FBTztJQUNULENBQUM7SUFFRCxxQ0FBUSxHQUFSLFVBQVMsTUFBOEI7UUFDckMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsNkNBQWdCLEdBQWhCLFVBQ0UsTUFBOEIsRUFDOUIsSUFBNEI7O1FBRTVCLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCx5QkFBeUI7UUFDekIsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV6QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQyxPQUFPLEtBQUssQ0FBQztTQUNkOztZQUVELHNDQUFzQztZQUN0QyxLQUFrQixJQUFBLFVBQUEsaUJBQUEsS0FBSyxDQUFBLDRCQUFBLCtDQUFFO2dCQUFwQixJQUFNLEdBQUcsa0JBQUE7Z0JBQ1osSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM1QyxPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBEZXRhY2hlZFJvdXRlSGFuZGxlLCBSb3V0ZVJldXNlU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIElvbmljUm91dGVTdHJhdGVneSBpbXBsZW1lbnRzIFJvdXRlUmV1c2VTdHJhdGVneSB7XHJcblxyXG4gIHNob3VsZERldGFjaChfcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNob3VsZEF0dGFjaChfcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0b3JlKF9yb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgX2RldGFjaGVkVHJlZTogRGV0YWNoZWRSb3V0ZUhhbmRsZSk6IHZvaWQge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmV0cmlldmUoX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogRGV0YWNoZWRSb3V0ZUhhbmRsZSB8IG51bGwge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBzaG91bGRSZXVzZVJvdXRlKFxyXG4gICAgZnV0dXJlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gICAgY3VycjogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFxyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGZ1dHVyZS5yb3V0ZUNvbmZpZyAhPT0gY3Vyci5yb3V0ZUNvbmZpZykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2tpbmcgcm91dGVyIHBhcmFtc1xyXG4gICAgY29uc3QgZnV0dXJlUGFyYW1zID0gZnV0dXJlLnBhcmFtcztcclxuICAgIGNvbnN0IGN1cnJlbnRQYXJhbXMgPSBjdXJyLnBhcmFtcztcclxuICAgIGNvbnN0IGtleXNBID0gT2JqZWN0LmtleXMoZnV0dXJlUGFyYW1zKTtcclxuICAgIGNvbnN0IGtleXNCID0gT2JqZWN0LmtleXMoY3VycmVudFBhcmFtcyk7XHJcblxyXG4gICAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUZXN0IGZvciBBJ3Mga2V5cyBkaWZmZXJlbnQgZnJvbSBCLlxyXG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5c0EpIHtcclxuICAgICAgaWYgKGN1cnJlbnRQYXJhbXNba2V5XSAhPT0gZnV0dXJlUGFyYW1zW2tleV0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=