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
export class NavParams {
    constructor(data = {}) {
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
    get(param) {
        return this.data[param];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LXBhcmFtcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL25hdi1wYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQUVwQixZQUFtQixPQUE2QixFQUFFO1FBQS9CLFNBQUksR0FBSixJQUFJLENBQTJCO0lBQUcsQ0FBQztJQUV0RDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxHQUFHLENBQVUsS0FBYTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBOYXZQYXJhbXMgYXJlIGFuIG9iamVjdCB0aGF0IGV4aXN0cyBvbiBhIHBhZ2UgYW5kIGNhbiBjb250YWluIGRhdGEgZm9yIHRoYXQgcGFydGljdWxhciB2aWV3LlxyXG4gKiBTaW1pbGFyIHRvIGhvdyBkYXRhIHdhcyBwYXNzIHRvIGEgdmlldyBpbiBWMSB3aXRoIGAkc3RhdGVQYXJhbXNgLCBOYXZQYXJhbXMgb2ZmZXIgYSBtdWNoIG1vcmUgZmxleGlibGVcclxuICogb3B0aW9uIHdpdGggYSBzaW1wbGUgYGdldGAgbWV0aG9kLlxyXG4gKlxyXG4gKiBAdXNhZ2VcclxuICogYGBgdHNcclxuICogaW1wb3J0IHsgTmF2UGFyYW1zIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG4gKlxyXG4gKiBleHBvcnQgY2xhc3MgTXlDbGFzc3tcclxuICpcclxuICogIGNvbnN0cnVjdG9yKG5hdlBhcmFtczogTmF2UGFyYW1zKXtcclxuICogICAgLy8gdXNlclBhcmFtcyBpcyBhbiBvYmplY3Qgd2UgaGF2ZSBpbiBvdXIgbmF2LXBhcmFtZXRlcnNcclxuICogICAgbmF2UGFyYW1zLmdldCgndXNlclBhcmFtcycpO1xyXG4gKiAgfVxyXG4gKlxyXG4gKiB9XHJcbiAqIGBgYFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5hdlBhcmFtcyB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIGEgbmF2LXBhcmFtZXRlciBmb3IgdGhlIGN1cnJlbnQgdmlld1xyXG4gICAqXHJcbiAgICogYGBgdHNcclxuICAgKiBpbXBvcnQgeyBOYXZQYXJhbXMgfSBmcm9tICdpb25pYy1hbmd1bGFyJztcclxuICAgKlxyXG4gICAqIGV4cG9ydCBjbGFzcyBNeUNsYXNze1xyXG4gICAqICBjb25zdHJ1Y3RvcihwdWJsaWMgbmF2UGFyYW1zOiBOYXZQYXJhbXMpe1xyXG4gICAqICAgIC8vIHVzZXJQYXJhbXMgaXMgYW4gb2JqZWN0IHdlIGhhdmUgaW4gb3VyIG5hdi1wYXJhbWV0ZXJzXHJcbiAgICogICAgdGhpcy5uYXZQYXJhbXMuZ2V0KCd1c2VyUGFyYW1zJyk7XHJcbiAgICogIH1cclxuICAgKiB9XHJcbiAgICogYGBgXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGFyYW0gV2hpY2ggcGFyYW0geW91IHdhbnQgdG8gbG9vayB1cFxyXG4gICAqL1xyXG4gIGdldDxUID0gYW55PihwYXJhbTogc3RyaW5nKTogVCB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhW3BhcmFtXTtcclxuICB9XHJcbn1cclxuIl19