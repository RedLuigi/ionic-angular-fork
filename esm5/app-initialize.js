import * as tslib_1 from "tslib";
import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';
import { raf } from './util/util';
var didInitialize = false;
export var appInitialize = function (config, doc, zone) {
    return function () {
        var win = doc.defaultView;
        if (win && typeof window !== 'undefined') {
            if (didInitialize) {
                console.warn('Ionic Angular was already initialized. Make sure IonicModule.forRoot() is just called once.');
            }
            didInitialize = true;
            var Ionic = win.Ionic = win.Ionic || {};
            Ionic.config = tslib_1.__assign({}, config, { _zoneGate: function (h) { return zone.run(h); } });
            var aelFn_1 = '__zone_symbol__addEventListener' in doc.body
                ? '__zone_symbol__addEventListener'
                : 'addEventListener';
            return applyPolyfills().then(function () {
                return defineCustomElements(win, {
                    exclude: ['ion-tabs', 'ion-tab'],
                    syncQueue: true,
                    raf: raf,
                    jmp: function (h) { return zone.runOutsideAngular(h); },
                    ael: function (elm, eventName, cb, opts) {
                        elm[aelFn_1](eventName, cb, opts);
                    },
                    rel: function (elm, eventName, cb, opts) {
                        elm.removeEventListener(eventName, cb, opts);
                    }
                });
            });
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWluaXRpYWxpemUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFwcC1pbml0aWFsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFJMUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVsQyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFFMUIsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLFVBQUMsTUFBYyxFQUFFLEdBQWEsRUFBRSxJQUFZO0lBQ3ZFLE9BQU87UUFDTCxJQUFNLEdBQUcsR0FBNEIsR0FBRyxDQUFDLFdBQWtCLENBQUM7UUFDNUQsSUFBSSxHQUFHLElBQUksT0FBUSxNQUFjLEtBQUssV0FBVyxFQUFFO1lBQ2pELElBQUksYUFBYSxFQUFFO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLDZGQUE2RixDQUFDLENBQUM7YUFDN0c7WUFDRCxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFFMUMsS0FBSyxDQUFDLE1BQU0sd0JBQ1AsTUFBTSxJQUNULFNBQVMsRUFBRSxVQUFDLENBQU0sSUFBSyxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxHQUNuQyxDQUFDO1lBRUYsSUFBTSxPQUFLLEdBQUcsaUNBQWlDLElBQUssR0FBRyxDQUFDLElBQVk7Z0JBQ2xFLENBQUMsQ0FBQyxpQ0FBaUM7Z0JBQ25DLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztZQUV2QixPQUFPLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDM0IsT0FBTyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUU7b0JBQy9CLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUM7b0JBQ2hDLFNBQVMsRUFBRSxJQUFJO29CQUNmLEdBQUcsS0FBQTtvQkFDSCxHQUFHLEVBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCO29CQUMxQyxHQUFHLEVBQUgsVUFBSSxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJO3dCQUN6QixHQUFXLENBQUMsT0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxHQUFHLFlBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSTt3QkFDMUIsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQy9DLENBQUM7aUJBQ0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBhcHBseVBvbHlmaWxscywgZGVmaW5lQ3VzdG9tRWxlbWVudHMgfSBmcm9tICdAaW9uaWMvY29yZS9sb2FkZXInO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9wcm92aWRlcnMvY29uZmlnJztcclxuaW1wb3J0IHsgSW9uaWNXaW5kb3cgfSBmcm9tICcuL3R5cGVzL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyByYWYgfSBmcm9tICcuL3V0aWwvdXRpbCc7XHJcblxyXG5sZXQgZGlkSW5pdGlhbGl6ZSA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwcEluaXRpYWxpemUgPSAoY29uZmlnOiBDb25maWcsIGRvYzogRG9jdW1lbnQsIHpvbmU6IE5nWm9uZSkgPT4ge1xyXG4gIHJldHVybiAoKTogYW55ID0+IHtcclxuICAgIGNvbnN0IHdpbjogSW9uaWNXaW5kb3cgfCB1bmRlZmluZWQgPSBkb2MuZGVmYXVsdFZpZXcgYXMgYW55O1xyXG4gICAgaWYgKHdpbiAmJiB0eXBlb2YgKHdpbmRvdyBhcyBhbnkpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBpZiAoZGlkSW5pdGlhbGl6ZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignSW9uaWMgQW5ndWxhciB3YXMgYWxyZWFkeSBpbml0aWFsaXplZC4gTWFrZSBzdXJlIElvbmljTW9kdWxlLmZvclJvb3QoKSBpcyBqdXN0IGNhbGxlZCBvbmNlLicpO1xyXG4gICAgICB9XHJcbiAgICAgIGRpZEluaXRpYWxpemUgPSB0cnVlO1xyXG4gICAgICBjb25zdCBJb25pYyA9IHdpbi5Jb25pYyA9IHdpbi5Jb25pYyB8fCB7fTtcclxuXHJcbiAgICAgIElvbmljLmNvbmZpZyA9IHtcclxuICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgX3pvbmVHYXRlOiAoaDogYW55KSA9PiB6b25lLnJ1bihoKVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgYWVsRm4gPSAnX196b25lX3N5bWJvbF9fYWRkRXZlbnRMaXN0ZW5lcicgaW4gKGRvYy5ib2R5IGFzIGFueSlcclxuICAgICAgICA/ICdfX3pvbmVfc3ltYm9sX19hZGRFdmVudExpc3RlbmVyJ1xyXG4gICAgICAgIDogJ2FkZEV2ZW50TGlzdGVuZXInO1xyXG5cclxuICAgICAgcmV0dXJuIGFwcGx5UG9seWZpbGxzKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRlZmluZUN1c3RvbUVsZW1lbnRzKHdpbiwge1xyXG4gICAgICAgICAgZXhjbHVkZTogWydpb24tdGFicycsICdpb24tdGFiJ10sXHJcbiAgICAgICAgICBzeW5jUXVldWU6IHRydWUsXHJcbiAgICAgICAgICByYWYsXHJcbiAgICAgICAgICBqbXA6IChoOiBhbnkpID0+IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoaCksXHJcbiAgICAgICAgICBhZWwoZWxtLCBldmVudE5hbWUsIGNiLCBvcHRzKSB7XHJcbiAgICAgICAgICAgIChlbG0gYXMgYW55KVthZWxGbl0oZXZlbnROYW1lLCBjYiwgb3B0cyk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVsKGVsbSwgZXZlbnROYW1lLCBjYiwgb3B0cykge1xyXG4gICAgICAgICAgICBlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNiLCBvcHRzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuIl19