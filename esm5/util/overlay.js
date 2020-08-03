var OverlayBaseController = /** @class */ (function () {
    function OverlayBaseController(ctrl) {
        this.ctrl = ctrl;
    }
    /**
     * Creates a new overlay
     */
    OverlayBaseController.prototype.create = function (opts) {
        // TODO: next major release opts is not optional
        return this.ctrl.create((opts || {}));
    };
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    OverlayBaseController.prototype.dismiss = function (data, role, id) {
        return this.ctrl.dismiss(data, role, id);
    };
    /**
     * Returns the top overlay.
     */
    OverlayBaseController.prototype.getTop = function () {
        return this.ctrl.getTop();
    };
    return OverlayBaseController;
}());
export { OverlayBaseController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbC9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BO0lBQ0UsK0JBQW9CLElBQW9DO1FBQXBDLFNBQUksR0FBSixJQUFJLENBQWdDO0lBQUcsQ0FBQztJQUU1RDs7T0FFRztJQUNILHNDQUFNLEdBQU4sVUFBTyxJQUFXO1FBQ2hCLGdEQUFnRDtRQUNoRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUNBQU8sR0FBUCxVQUFRLElBQVUsRUFBRSxJQUFhLEVBQUUsRUFBVztRQUM1QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsc0NBQU0sR0FBTjtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmludGVyZmFjZSBDb250cm9sbGVyU2hhcGU8T3B0cywgSFRNTEVsbT4ge1xyXG4gIGNyZWF0ZShvcHRpb25zOiBPcHRzKTogUHJvbWlzZTxIVE1MRWxtPjtcclxuICBkaXNtaXNzKGRhdGE/OiBhbnksIHJvbGU/OiBzdHJpbmcsIGlkPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcclxuICBnZXRUb3AoKTogUHJvbWlzZTxIVE1MRWxtIHwgdW5kZWZpbmVkPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE92ZXJsYXlCYXNlQ29udHJvbGxlcjxPcHRzLCBPdmVybGF5PiBpbXBsZW1lbnRzIENvbnRyb2xsZXJTaGFwZTxPcHRzLCBPdmVybGF5PiB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjdHJsOiBDb250cm9sbGVyU2hhcGU8T3B0cywgT3ZlcmxheT4pIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgb3ZlcmxheVxyXG4gICAqL1xyXG4gIGNyZWF0ZShvcHRzPzogT3B0cykge1xyXG4gICAgLy8gVE9ETzogbmV4dCBtYWpvciByZWxlYXNlIG9wdHMgaXMgbm90IG9wdGlvbmFsXHJcbiAgICByZXR1cm4gdGhpcy5jdHJsLmNyZWF0ZSgob3B0cyB8fCB7fSkgYXMgYW55KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYGlkYCBpcyBub3QgcHJvdmlkZWQsIGl0IGRpc21pc3NlcyB0aGUgdG9wIG92ZXJsYXkuXHJcbiAgICovXHJcbiAgZGlzbWlzcyhkYXRhPzogYW55LCByb2xlPzogc3RyaW5nLCBpZD86IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuY3RybC5kaXNtaXNzKGRhdGEsIHJvbGUsIGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHRvcCBvdmVybGF5LlxyXG4gICAqL1xyXG4gIGdldFRvcCgpIHtcclxuICAgIHJldHVybiB0aGlzLmN0cmwuZ2V0VG9wKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==