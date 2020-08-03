export class OverlayBaseController {
    constructor(ctrl) {
        this.ctrl = ctrl;
    }
    /**
     * Creates a new overlay
     */
    create(opts) {
        // TODO: next major release opts is not optional
        return this.ctrl.create((opts || {}));
    }
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data, role, id) {
        return this.ctrl.dismiss(data, role, id);
    }
    /**
     * Returns the top overlay.
     */
    getTop() {
        return this.ctrl.getTop();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbC9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBb0IsSUFBb0M7UUFBcEMsU0FBSSxHQUFKLElBQUksQ0FBZ0M7SUFBRyxDQUFDO0lBRTVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLElBQVc7UUFDaEIsZ0RBQWdEO1FBQ2hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsSUFBVSxFQUFFLElBQWEsRUFBRSxFQUFXO1FBQzVDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbnRlcmZhY2UgQ29udHJvbGxlclNoYXBlPE9wdHMsIEhUTUxFbG0+IHtcclxuICBjcmVhdGUob3B0aW9uczogT3B0cyk6IFByb21pc2U8SFRNTEVsbT47XHJcbiAgZGlzbWlzcyhkYXRhPzogYW55LCByb2xlPzogc3RyaW5nLCBpZD86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgZ2V0VG9wKCk6IFByb21pc2U8SFRNTEVsbSB8IHVuZGVmaW5lZD47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPdmVybGF5QmFzZUNvbnRyb2xsZXI8T3B0cywgT3ZlcmxheT4gaW1wbGVtZW50cyBDb250cm9sbGVyU2hhcGU8T3B0cywgT3ZlcmxheT4ge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY3RybDogQ29udHJvbGxlclNoYXBlPE9wdHMsIE92ZXJsYXk+KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IG92ZXJsYXlcclxuICAgKi9cclxuICBjcmVhdGUob3B0cz86IE9wdHMpIHtcclxuICAgIC8vIFRPRE86IG5leHQgbWFqb3IgcmVsZWFzZSBvcHRzIGlzIG5vdCBvcHRpb25hbFxyXG4gICAgcmV0dXJuIHRoaXMuY3RybC5jcmVhdGUoKG9wdHMgfHwge30pIGFzIGFueSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGBpZGAgaXMgbm90IHByb3ZpZGVkLCBpdCBkaXNtaXNzZXMgdGhlIHRvcCBvdmVybGF5LlxyXG4gICAqL1xyXG4gIGRpc21pc3MoZGF0YT86IGFueSwgcm9sZT86IHN0cmluZywgaWQ/OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmN0cmwuZGlzbWlzcyhkYXRhLCByb2xlLCBpZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB0b3Agb3ZlcmxheS5cclxuICAgKi9cclxuICBnZXRUb3AoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdHJsLmdldFRvcCgpO1xyXG4gIH1cclxufVxyXG4iXX0=