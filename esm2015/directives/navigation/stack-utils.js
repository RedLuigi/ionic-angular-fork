export const insertView = (views, view, direction) => {
    if (direction === 'root') {
        return setRoot(views, view);
    }
    else if (direction === 'forward') {
        return setForward(views, view);
    }
    else {
        return setBack(views, view);
    }
};
const setRoot = (views, view) => {
    views = views.filter(v => v.stackId !== view.stackId);
    views.push(view);
    return views;
};
const ɵ0 = setRoot;
const setForward = (views, view) => {
    const index = views.indexOf(view);
    if (index >= 0) {
        views = views.filter(v => v.stackId !== view.stackId || v.id <= view.id);
    }
    else {
        views.push(view);
    }
    return views;
};
const ɵ1 = setForward;
const setBack = (views, view) => {
    const index = views.indexOf(view);
    if (index >= 0) {
        return views.filter(v => v.stackId !== view.stackId || v.id <= view.id);
    }
    else {
        return setRoot(views, view);
    }
};
const ɵ2 = setBack;
export const getUrl = (router, activatedRoute) => {
    const urlTree = router.createUrlTree(['.'], { relativeTo: activatedRoute });
    return router.serializeUrl(urlTree);
};
export const isTabSwitch = (enteringView, leavingView) => {
    if (!leavingView) {
        return true;
    }
    return enteringView.stackId !== leavingView.stackId;
};
export const computeStackId = (prefixUrl, url) => {
    if (!prefixUrl) {
        return undefined;
    }
    const segments = toSegments(url);
    for (let i = 0; i < segments.length; i++) {
        if (i >= prefixUrl.length) {
            return segments[i];
        }
        if (segments[i] !== prefixUrl[i]) {
            return undefined;
        }
    }
    return undefined;
};
export const toSegments = (path) => {
    return path
        .split('/')
        .map(s => s.trim())
        .filter(s => s !== '');
};
export const destroyView = (view) => {
    if (view) {
        // TODO lifecycle event
        view.ref.destroy();
        view.unlistenEvents();
    }
};
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stdXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW9uaWMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmF2aWdhdGlvbi9zdGFjay11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFrQixFQUFFLElBQWUsRUFBRSxTQUEwQixFQUFFLEVBQUU7SUFDNUYsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1FBQ3hCLE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM3QjtTQUFNLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUNsQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDaEM7U0FBTTtRQUNMLE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM3QjtBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBa0IsRUFBRSxJQUFlLEVBQUUsRUFBRTtJQUN0RCxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7O0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFrQixFQUFFLElBQWUsRUFBRSxFQUFFO0lBQ3pELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQ2QsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLElB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ZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXMsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkJ1aWxkZXIsIE5hdkRpcmVjdGlvbiwgUm91dGVyRGlyZWN0aW9uIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGluc2VydFZpZXcgPSAodmlld3M6IFJvdXRlVmlld1tdLCB2aWV3OiBSb3V0ZVZpZXcsIGRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uKSA9PiB7XHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gJ3Jvb3QnKSB7XHJcbiAgICByZXR1cm4gc2V0Um9vdCh2aWV3cywgdmlldyk7XHJcbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xyXG4gICAgcmV0dXJuIHNldEZvcndhcmQodmlld3MsIHZpZXcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gc2V0QmFjayh2aWV3cywgdmlldyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgc2V0Um9vdCA9ICh2aWV3czogUm91dGVWaWV3W10sIHZpZXc6IFJvdXRlVmlldykgPT4ge1xyXG4gIHZpZXdzID0gdmlld3MuZmlsdGVyKHYgPT4gdi5zdGFja0lkICE9PSB2aWV3LnN0YWNrSWQpO1xyXG4gIHZpZXdzLnB1c2godmlldyk7XHJcbiAgcmV0dXJuIHZpZXdzO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0Rm9yd2FyZCA9ICh2aWV3czogUm91dGVWaWV3W10sIHZpZXc6IFJvdXRlVmlldykgPT4ge1xyXG4gIGNvbnN0IGluZGV4ID0gdmlld3MuaW5kZXhPZih2aWV3KTtcclxuICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgdmlld3MgPSB2aWV3cy5maWx0ZXIodiA9PiB2LnN0YWNrSWQgIT09IHZpZXcuc3RhY2tJZCB8fCB2LmlkIDw9IHZpZXcuaWQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2aWV3cy5wdXNoKHZpZXcpO1xyXG4gIH1cclxuICByZXR1cm4gdmlld3M7XHJcbn07XHJcblxyXG5jb25zdCBzZXRCYWNrID0gKHZpZXdzOiBSb3V0ZVZpZXdbXSwgdmlldzogUm91dGVWaWV3KSA9PiB7XHJcbiAgY29uc3QgaW5kZXggPSB2aWV3cy5pbmRleE9mKHZpZXcpO1xyXG4gIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICByZXR1cm4gdmlld3MuZmlsdGVyKHYgPT4gdi5zdGFja0lkICE9PSB2aWV3LnN0YWNrSWQgfHwgdi5pZCA8PSB2aWV3LmlkKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHNldFJvb3Qodmlld3MsIHZpZXcpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVcmwgPSAocm91dGVyOiBSb3V0ZXIsIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgPT4ge1xyXG4gIGNvbnN0IHVybFRyZWUgPSByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy4nXSwgeyByZWxhdGl2ZVRvOiBhY3RpdmF0ZWRSb3V0ZSB9KTtcclxuICByZXR1cm4gcm91dGVyLnNlcmlhbGl6ZVVybCh1cmxUcmVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1RhYlN3aXRjaCA9IChlbnRlcmluZ1ZpZXc6IFJvdXRlVmlldywgbGVhdmluZ1ZpZXc6IFJvdXRlVmlldyB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gIGlmICghbGVhdmluZ1ZpZXcpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZW50ZXJpbmdWaWV3LnN0YWNrSWQgIT09IGxlYXZpbmdWaWV3LnN0YWNrSWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29tcHV0ZVN0YWNrSWQgPSAocHJlZml4VXJsOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCwgdXJsOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXByZWZpeFVybCkge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgY29uc3Qgc2VnbWVudHMgPSB0b1NlZ21lbnRzKHVybCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGkgPj0gcHJlZml4VXJsLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gc2VnbWVudHNbaV07XHJcbiAgICB9XHJcbiAgICBpZiAoc2VnbWVudHNbaV0gIT09IHByZWZpeFVybFtpXSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvU2VnbWVudHMgPSAocGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuIHBhdGhcclxuICAgIC5zcGxpdCgnLycpXHJcbiAgICAubWFwKHMgPT4gcy50cmltKCkpXHJcbiAgICAuZmlsdGVyKHMgPT4gcyAhPT0gJycpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlc3Ryb3lWaWV3ID0gKHZpZXc6IFJvdXRlVmlldyB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gIGlmICh2aWV3KSB7XHJcbiAgICAvLyBUT0RPIGxpZmVjeWNsZSBldmVudFxyXG4gICAgdmlldy5yZWYuZGVzdHJveSgpO1xyXG4gICAgdmlldy51bmxpc3RlbkV2ZW50cygpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tFdmVudCB7XHJcbiAgZW50ZXJpbmdWaWV3OiBSb3V0ZVZpZXc7XHJcbiAgZGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb247XHJcbiAgYW5pbWF0aW9uOiBOYXZEaXJlY3Rpb24gfCB1bmRlZmluZWQ7XHJcbiAgdGFiU3dpdGNoOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlVmlldyB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB1cmw6IHN0cmluZztcclxuICBzdGFja0lkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgcmVmOiBDb21wb25lbnRSZWY8YW55PjtcclxuICBzYXZlZERhdGE/OiBhbnk7XHJcbiAgc2F2ZWRFeHRyYXM/OiBOYXZpZ2F0aW9uRXh0cmFzO1xyXG4gIHVubGlzdGVuRXZlbnRzOiAoKSA9PiB2b2lkO1xyXG4gIGFuaW1hdGlvbkJ1aWxkZXI/OiBBbmltYXRpb25CdWlsZGVyO1xyXG59XHJcbiJdfQ==