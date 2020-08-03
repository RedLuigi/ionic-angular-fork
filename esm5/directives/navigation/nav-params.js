/**
 * @description
 * NavParams are an object that exists on a page and can contain data for that particular view.
 * Similar to how data was pass to a view in V1 with `$stateParams`, NavParams offer a much more flexible
 * option with a simple `get` method.
 *
 * @usage
 * ```ts
 * import { NavParams } from '@ionic/angular';
 *
 * export class MyClass{
 *
 *  constructor(navParams: NavParams){
 *    // userParams is an object we have in our nav-parameters
 *    navParams.get('userParams');
 *  }
 *
 * }
 * ```
 */
var NavParams = /** @class */ (function () {
    function NavParams(data) {
        if (data === void 0) { data = {}; }
        this.data = data;
    }
    /**
     * Get the value of a nav-parameter for the current view
     *
     * ```ts
     * import { NavParams } from 'ionic-angular';
     *
     * export class MyClass{
     *  constructor(public navParams: NavParams){
     *    // userParams is an object we have in our nav-parameters
     *    this.navParams.get('userParams');
     *  }
     * }
     * ```
     *
     * @param param Which param you want to look up
     */
    NavParams.prototype.get = function (param) {
        return this.data[param];
    };
    return NavParams;
}());
export { NavParams };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LXBhcmFtcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL25hdi1wYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSDtJQUVFLG1CQUFtQixJQUErQjtRQUEvQixxQkFBQSxFQUFBLFNBQStCO1FBQS9CLFNBQUksR0FBSixJQUFJLENBQTJCO0lBQUcsQ0FBQztJQUV0RDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCx1QkFBRyxHQUFILFVBQWEsS0FBYTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogTmF2UGFyYW1zIGFyZSBhbiBvYmplY3QgdGhhdCBleGlzdHMgb24gYSBwYWdlIGFuZCBjYW4gY29udGFpbiBkYXRhIGZvciB0aGF0IHBhcnRpY3VsYXIgdmlldy5cclxuICogU2ltaWxhciB0byBob3cgZGF0YSB3YXMgcGFzcyB0byBhIHZpZXcgaW4gVjEgd2l0aCBgJHN0YXRlUGFyYW1zYCwgTmF2UGFyYW1zIG9mZmVyIGEgbXVjaCBtb3JlIGZsZXhpYmxlXHJcbiAqIG9wdGlvbiB3aXRoIGEgc2ltcGxlIGBnZXRgIG1ldGhvZC5cclxuICpcclxuICogQHVzYWdlXHJcbiAqIGBgYHRzXHJcbiAqIGltcG9ydCB7IE5hdlBhcmFtcyB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuICpcclxuICogZXhwb3J0IGNsYXNzIE15Q2xhc3N7XHJcbiAqXHJcbiAqICBjb25zdHJ1Y3RvcihuYXZQYXJhbXM6IE5hdlBhcmFtcyl7XHJcbiAqICAgIC8vIHVzZXJQYXJhbXMgaXMgYW4gb2JqZWN0IHdlIGhhdmUgaW4gb3VyIG5hdi1wYXJhbWV0ZXJzXHJcbiAqICAgIG5hdlBhcmFtcy5nZXQoJ3VzZXJQYXJhbXMnKTtcclxuICogIH1cclxuICpcclxuICogfVxyXG4gKiBgYGBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBOYXZQYXJhbXMge1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSB7fSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSB2YWx1ZSBvZiBhIG5hdi1wYXJhbWV0ZXIgZm9yIHRoZSBjdXJyZW50IHZpZXdcclxuICAgKlxyXG4gICAqIGBgYHRzXHJcbiAgICogaW1wb3J0IHsgTmF2UGFyYW1zIH0gZnJvbSAnaW9uaWMtYW5ndWxhcic7XHJcbiAgICpcclxuICAgKiBleHBvcnQgY2xhc3MgTXlDbGFzc3tcclxuICAgKiAgY29uc3RydWN0b3IocHVibGljIG5hdlBhcmFtczogTmF2UGFyYW1zKXtcclxuICAgKiAgICAvLyB1c2VyUGFyYW1zIGlzIGFuIG9iamVjdCB3ZSBoYXZlIGluIG91ciBuYXYtcGFyYW1ldGVyc1xyXG4gICAqICAgIHRoaXMubmF2UGFyYW1zLmdldCgndXNlclBhcmFtcycpO1xyXG4gICAqICB9XHJcbiAgICogfVxyXG4gICAqIGBgYFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHBhcmFtIFdoaWNoIHBhcmFtIHlvdSB3YW50IHRvIGxvb2sgdXBcclxuICAgKi9cclxuICBnZXQ8VCA9IGFueT4ocGFyYW06IHN0cmluZyk6IFQge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVtwYXJhbV07XHJcbiAgfVxyXG59XHJcbiJdfQ==