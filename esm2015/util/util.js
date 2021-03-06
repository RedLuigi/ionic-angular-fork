export const raf = (h) => {
    if (typeof __zone_symbol__requestAnimationFrame === 'function') {
        return __zone_symbol__requestAnimationFrame(h);
    }
    if (typeof requestAnimationFrame === 'function') {
        return requestAnimationFrame(h);
    }
    return setTimeout(h);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbC91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO0lBQzVCLElBQUksT0FBTyxvQ0FBb0MsS0FBSyxVQUFVLEVBQUU7UUFDOUQsT0FBTyxvQ0FBb0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoRDtJQUNELElBQUksT0FBTyxxQkFBcUIsS0FBSyxVQUFVLEVBQUU7UUFDL0MsT0FBTyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQztJQUNELE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5kZWNsYXJlIGNvbnN0IF9fem9uZV9zeW1ib2xfX3JlcXVlc3RBbmltYXRpb25GcmFtZTogYW55O1xyXG5kZWNsYXJlIGNvbnN0IHJlcXVlc3RBbmltYXRpb25GcmFtZTogYW55O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJhZiA9IChoOiBhbnkpID0+IHtcclxuICBpZiAodHlwZW9mIF9fem9uZV9zeW1ib2xfX3JlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgcmV0dXJuIF9fem9uZV9zeW1ib2xfX3JlcXVlc3RBbmltYXRpb25GcmFtZShoKTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaCk7XHJcbiAgfVxyXG4gIHJldHVybiBzZXRUaW1lb3V0KGgpO1xyXG59O1xyXG4iXX0=