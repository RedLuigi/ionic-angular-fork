import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';
import { raf } from './util/util';
let didInitialize = false;
export const appInitialize = (config, doc, zone) => {
    return () => {
        const win = doc.defaultView;
        if (win && typeof window !== 'undefined') {
            if (didInitialize) {
                console.warn('Ionic Angular was already initialized. Make sure IonicModule.forRoot() is just called once.');
            }
            didInitialize = true;
            const Ionic = win.Ionic = win.Ionic || {};
            Ionic.config = Object.assign({}, config, { _zoneGate: (h) => zone.run(h) });
            const aelFn = '__zone_symbol__addEventListener' in doc.body
                ? '__zone_symbol__addEventListener'
                : 'addEventListener';
            return applyPolyfills().then(() => {
                return defineCustomElements(win, {
                    exclude: ['ion-tabs', 'ion-tab'],
                    syncQueue: true,
                    raf,
                    jmp: (h) => zone.runOutsideAngular(h),
                    ael(elm, eventName, cb, opts) {
                        elm[aelFn](eventName, cb, opts);
                    },
                    rel(elm, eventName, cb, opts) {
                        elm.removeEventListener(eventName, cb, opts);
                    }
                });
            });
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWluaXRpYWxpemUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFwcC1pbml0aWFsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUkxRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWxDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUUxQixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFjLEVBQUUsR0FBYSxFQUFFLElBQVksRUFBRSxFQUFFO0lBQzNFLE9BQU8sR0FBUSxFQUFFO1FBQ2YsTUFBTSxHQUFHLEdBQTRCLEdBQUcsQ0FBQyxXQUFrQixDQUFDO1FBQzVELElBQUksR0FBRyxJQUFJLE9BQVEsTUFBYyxLQUFLLFdBQVcsRUFBRTtZQUNqRCxJQUFJLGFBQWEsRUFBRTtnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyw2RkFBNkYsQ0FBQyxDQUFDO2FBQzdHO1lBQ0QsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBRTFDLEtBQUssQ0FBQyxNQUFNLHFCQUNQLE1BQU0sSUFDVCxTQUFTLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQ25DLENBQUM7WUFFRixNQUFNLEtBQUssR0FBRyxpQ0FBaUMsSUFBSyxHQUFHLENBQUMsSUFBWTtnQkFDbEUsQ0FBQyxDQUFDLGlDQUFpQztnQkFDbkMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1lBRXZCLE9BQU8sY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDaEMsT0FBTyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUU7b0JBQy9CLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUM7b0JBQ2hDLFNBQVMsRUFBRSxJQUFJO29CQUNmLEdBQUc7b0JBQ0gsR0FBRyxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSTt3QkFDekIsR0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQ0QsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUk7d0JBQzFCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMvQyxDQUFDO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgYXBwbHlQb2x5ZmlsbHMsIGRlZmluZUN1c3RvbUVsZW1lbnRzIH0gZnJvbSAnQGlvbmljL2NvcmUvbG9hZGVyJztcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbmZpZyc7XHJcbmltcG9ydCB7IElvbmljV2luZG93IH0gZnJvbSAnLi90eXBlcy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgcmFmIH0gZnJvbSAnLi91dGlsL3V0aWwnO1xyXG5cclxubGV0IGRpZEluaXRpYWxpemUgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBjb25zdCBhcHBJbml0aWFsaXplID0gKGNvbmZpZzogQ29uZmlnLCBkb2M6IERvY3VtZW50LCB6b25lOiBOZ1pvbmUpID0+IHtcclxuICByZXR1cm4gKCk6IGFueSA9PiB7XHJcbiAgICBjb25zdCB3aW46IElvbmljV2luZG93IHwgdW5kZWZpbmVkID0gZG9jLmRlZmF1bHRWaWV3IGFzIGFueTtcclxuICAgIGlmICh3aW4gJiYgdHlwZW9mICh3aW5kb3cgYXMgYW55KSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgaWYgKGRpZEluaXRpYWxpemUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0lvbmljIEFuZ3VsYXIgd2FzIGFscmVhZHkgaW5pdGlhbGl6ZWQuIE1ha2Ugc3VyZSBJb25pY01vZHVsZS5mb3JSb290KCkgaXMganVzdCBjYWxsZWQgb25jZS4nKTtcclxuICAgICAgfVxyXG4gICAgICBkaWRJbml0aWFsaXplID0gdHJ1ZTtcclxuICAgICAgY29uc3QgSW9uaWMgPSB3aW4uSW9uaWMgPSB3aW4uSW9uaWMgfHwge307XHJcblxyXG4gICAgICBJb25pYy5jb25maWcgPSB7XHJcbiAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgIF96b25lR2F0ZTogKGg6IGFueSkgPT4gem9uZS5ydW4oaClcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IGFlbEZuID0gJ19fem9uZV9zeW1ib2xfX2FkZEV2ZW50TGlzdGVuZXInIGluIChkb2MuYm9keSBhcyBhbnkpXHJcbiAgICAgICAgPyAnX196b25lX3N5bWJvbF9fYWRkRXZlbnRMaXN0ZW5lcidcclxuICAgICAgICA6ICdhZGRFdmVudExpc3RlbmVyJztcclxuXHJcbiAgICAgIHJldHVybiBhcHBseVBvbHlmaWxscygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBkZWZpbmVDdXN0b21FbGVtZW50cyh3aW4sIHtcclxuICAgICAgICAgIGV4Y2x1ZGU6IFsnaW9uLXRhYnMnLCAnaW9uLXRhYiddLFxyXG4gICAgICAgICAgc3luY1F1ZXVlOiB0cnVlLFxyXG4gICAgICAgICAgcmFmLFxyXG4gICAgICAgICAgam1wOiAoaDogYW55KSA9PiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKGgpLFxyXG4gICAgICAgICAgYWVsKGVsbSwgZXZlbnROYW1lLCBjYiwgb3B0cykge1xyXG4gICAgICAgICAgICAoZWxtIGFzIGFueSlbYWVsRm5dKGV2ZW50TmFtZSwgY2IsIG9wdHMpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlbChlbG0sIGV2ZW50TmFtZSwgY2IsIG9wdHMpIHtcclxuICAgICAgICAgICAgZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYiwgb3B0cyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcbiJdfQ==