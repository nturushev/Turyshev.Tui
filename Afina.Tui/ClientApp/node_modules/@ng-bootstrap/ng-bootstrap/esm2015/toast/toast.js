/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Attribute, Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { NgbToastConfig } from './toast-config';
/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * \@since 5.0.0
 */
export class NgbToastHeader {
}
NgbToastHeader.decorators = [
    { type: Directive, args: [{ selector: '[ngbToastHeader]' },] }
];
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * \@since 5.0.0
 */
export class NgbToast {
    /**
     * @param {?} ariaLive
     * @param {?} config
     */
    constructor(ariaLive, config) {
        this.ariaLive = ariaLive;
        /**
         * A template like `<ng-template ngbToastHeader></ng-template>` can be
         * used in the projected content to allow markup usage.
         */
        this.contentHeaderTpl = null;
        /**
         * An event fired immediately when toast's `hide()` method has been called.
         * It can only occur in 2 different scenarios:
         * - `autohide` timeout fires
         * - user clicks on a closing cross (&times)
         *
         * Additionally this output is purely informative. The toast won't disappear. It's up to the user to take care of
         * that.
         */
        this.hideOutput = new EventEmitter();
        if (this.ariaLive == null) {
            this.ariaLive = config.ariaLive;
        }
        this.delay = config.delay;
        this.autohide = config.autohide;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.autohide) {
            this._timeoutID = setTimeout((/**
             * @return {?}
             */
            () => this.hide()), this.delay);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this.ngAfterContentInit();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this._clearTimeout();
        this.hideOutput.emit();
    }
    /**
     * @private
     * @return {?}
     */
    _clearTimeout() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }
}
NgbToast.decorators = [
    { type: Component, args: [{
                selector: 'ngb-toast',
                exportAs: 'ngbToast',
                encapsulation: ViewEncapsulation.None,
                host: {
                    'role': 'alert',
                    '[attr.aria-live]': 'ariaLive',
                    'aria-atomic': 'true',
                    '[class.toast]': 'true',
                    '[class.show]': 'true',
                    '[class.autohide]': 'autohide',
                },
                template: `
    <ng-template #headerTpl>
      <strong class="mr-auto">{{header}}</strong>
    </ng-template>
    <ng-template [ngIf]="contentHeaderTpl || header">
      <div class="toast-header">
        <ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
        <button type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.toast.close-aria" (click)="hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </ng-template>
    <div class="toast-body">
      <ng-content></ng-content>
    </div>
  `,
                styles: [".ngb-toasts{position:fixed;top:0;right:0;margin:.5em;z-index:1200}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}"]
            }] }
];
/** @nocollapse */
NgbToast.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['aria-live',] }] },
    { type: NgbToastConfig }
];
NgbToast.propDecorators = {
    delay: [{ type: Input }],
    autohide: [{ type: Input }],
    header: [{ type: Input }],
    contentHeaderTpl: [{ type: ContentChild, args: [NgbToastHeader, { read: TemplateRef, static: true },] }],
    hideOutput: [{ type: Output, args: ['hide',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbToast.prototype._timeoutID;
    /**
     * Delay after which the toast will hide (ms).
     * default: `500` (ms) (inherited from NgbToastConfig)
     * @type {?}
     */
    NgbToast.prototype.delay;
    /**
     * Auto hide the toast after a delay in ms.
     * default: `true` (inherited from NgbToastConfig)
     * @type {?}
     */
    NgbToast.prototype.autohide;
    /**
     * Text to be used as toast's header.
     * Ignored if a ContentChild template is specified at the same time.
     * @type {?}
     */
    NgbToast.prototype.header;
    /**
     * A template like `<ng-template ngbToastHeader></ng-template>` can be
     * used in the projected content to allow markup usage.
     * @type {?}
     */
    NgbToast.prototype.contentHeaderTpl;
    /**
     * An event fired immediately when toast's `hide()` method has been called.
     * It can only occur in 2 different scenarios:
     * - `autohide` timeout fires
     * - user clicks on a closing cross (&times)
     *
     * Additionally this output is purely informative. The toast won't disappear. It's up to the user to take care of
     * that.
     * @type {?}
     */
    NgbToast.prototype.hideOutput;
    /** @type {?} */
    NgbToast.prototype.ariaLive;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRvYXN0L3RvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLFdBQVcsRUFDWCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBUzlDLE1BQU0sT0FBTyxjQUFjOzs7WUFEMUIsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFDOzs7Ozs7OztBQXdDekMsTUFBTSxPQUFPLFFBQVE7Ozs7O0lBdUNuQixZQUEyQyxRQUFnQixFQUFFLE1BQXNCO1FBQXhDLGFBQVEsR0FBUixRQUFRLENBQVE7Ozs7O1FBYk0scUJBQWdCLEdBQTJCLElBQUksQ0FBQzs7Ozs7Ozs7OztRQVdqRyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUdwRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxVQUFVLElBQUksT0FBTyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFTyxhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7O1lBcEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osTUFBTSxFQUFFLE9BQU87b0JBQ2Ysa0JBQWtCLEVBQUUsVUFBVTtvQkFDOUIsYUFBYSxFQUFFLE1BQU07b0JBQ3JCLGVBQWUsRUFBRSxNQUFNO29CQUN2QixjQUFjLEVBQUUsTUFBTTtvQkFDdEIsa0JBQWtCLEVBQUUsVUFBVTtpQkFDL0I7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDs7YUFFRjs7Ozt5Q0F3Q2MsU0FBUyxTQUFDLFdBQVc7WUF2RjVCLGNBQWM7OztvQkF3RG5CLEtBQUs7dUJBTUwsS0FBSztxQkFNTCxLQUFLOytCQU1MLFlBQVksU0FBQyxjQUFjLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7eUJBVzlELE1BQU0sU0FBQyxNQUFNOzs7Ozs7O0lBbkNkLDhCQUFtQjs7Ozs7O0lBTW5CLHlCQUF1Qjs7Ozs7O0lBTXZCLDRCQUEyQjs7Ozs7O0lBTTNCLDBCQUF3Qjs7Ozs7O0lBTXhCLG9DQUFpSDs7Ozs7Ozs7Ozs7SUFXakgsOEJBQXNEOztJQUUxQyw0QkFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge05nYlRvYXN0Q29uZmlnfSBmcm9tICcuL3RvYXN0LWNvbmZpZyc7XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgYWxsb3dzIHRoZSB1c2FnZSBvZiBIVE1MIG1hcmt1cCBvciBvdGhlciBkaXJlY3RpdmVzXG4gKiBpbnNpZGUgb2YgdGhlIHRvYXN0J3MgaGVhZGVyLlxuICpcbiAqIEBzaW5jZSA1LjAuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JUb2FzdEhlYWRlcl0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JUb2FzdEhlYWRlciB7XG59XG5cbi8qKlxuICogVG9hc3RzIHByb3ZpZGUgZmVlZGJhY2sgbWVzc2FnZXMgYXMgbm90aWZpY2F0aW9ucyB0byB0aGUgdXNlci5cbiAqIEdvYWwgaXMgdG8gbWltaWMgdGhlIHB1c2ggbm90aWZpY2F0aW9ucyBhdmFpbGFibGUgYm90aCBvbiBtb2JpbGUgYW5kIGRlc2t0b3Agb3BlcmF0aW5nIHN5c3RlbXMuXG4gKlxuICogQHNpbmNlIDUuMC4wXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10b2FzdCcsXG4gIGV4cG9ydEFzOiAnbmdiVG9hc3QnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnYWxlcnQnLFxuICAgICdbYXR0ci5hcmlhLWxpdmVdJzogJ2FyaWFMaXZlJyxcbiAgICAnYXJpYS1hdG9taWMnOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy50b2FzdF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5zaG93XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmF1dG9oaWRlXSc6ICdhdXRvaGlkZScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNoZWFkZXJUcGw+XG4gICAgICA8c3Ryb25nIGNsYXNzPVwibXItYXV0b1wiPnt7aGVhZGVyfX08L3N0cm9uZz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJjb250ZW50SGVhZGVyVHBsIHx8IGhlYWRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWhlYWRlclwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudEhlYWRlclRwbCB8fCBoZWFkZXJUcGxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudG9hc3QuY2xvc2UtYXJpYVwiIChjbGljayk9XCJoaWRlKClcIj5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LWJvZHlcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vdG9hc3Quc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRvYXN0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBPbkNoYW5nZXMge1xuICBwcml2YXRlIF90aW1lb3V0SUQ7XG5cbiAgLyoqXG4gICAqIERlbGF5IGFmdGVyIHdoaWNoIHRoZSB0b2FzdCB3aWxsIGhpZGUgKG1zKS5cbiAgICogZGVmYXVsdDogYDUwMGAgKG1zKSAoaW5oZXJpdGVkIGZyb20gTmdiVG9hc3RDb25maWcpXG4gICAqL1xuICBASW5wdXQoKSBkZWxheTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBdXRvIGhpZGUgdGhlIHRvYXN0IGFmdGVyIGEgZGVsYXkgaW4gbXMuXG4gICAqIGRlZmF1bHQ6IGB0cnVlYCAoaW5oZXJpdGVkIGZyb20gTmdiVG9hc3RDb25maWcpXG4gICAqL1xuICBASW5wdXQoKSBhdXRvaGlkZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGV4dCB0byBiZSB1c2VkIGFzIHRvYXN0J3MgaGVhZGVyLlxuICAgKiBJZ25vcmVkIGlmIGEgQ29udGVudENoaWxkIHRlbXBsYXRlIGlzIHNwZWNpZmllZCBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgbGlrZSBgPG5nLXRlbXBsYXRlIG5nYlRvYXN0SGVhZGVyPjwvbmctdGVtcGxhdGU+YCBjYW4gYmVcbiAgICogdXNlZCBpbiB0aGUgcHJvamVjdGVkIGNvbnRlbnQgdG8gYWxsb3cgbWFya3VwIHVzYWdlLlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChOZ2JUb2FzdEhlYWRlciwge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWV9KSBjb250ZW50SGVhZGVyVHBsOiBUZW1wbGF0ZVJlZjxhbnk+fCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgaW1tZWRpYXRlbHkgd2hlbiB0b2FzdCdzIGBoaWRlKClgIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gICAqIEl0IGNhbiBvbmx5IG9jY3VyIGluIDIgZGlmZmVyZW50IHNjZW5hcmlvczpcbiAgICogLSBgYXV0b2hpZGVgIHRpbWVvdXQgZmlyZXNcbiAgICogLSB1c2VyIGNsaWNrcyBvbiBhIGNsb3NpbmcgY3Jvc3MgKCZ0aW1lcylcbiAgICpcbiAgICogQWRkaXRpb25hbGx5IHRoaXMgb3V0cHV0IGlzIHB1cmVseSBpbmZvcm1hdGl2ZS4gVGhlIHRvYXN0IHdvbid0IGRpc2FwcGVhci4gSXQncyB1cCB0byB0aGUgdXNlciB0byB0YWtlIGNhcmUgb2ZcbiAgICogdGhhdC5cbiAgICovXG4gIEBPdXRwdXQoJ2hpZGUnKSBoaWRlT3V0cHV0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScpIHB1YmxpYyBhcmlhTGl2ZTogc3RyaW5nLCBjb25maWc6IE5nYlRvYXN0Q29uZmlnKSB7XG4gICAgaWYgKHRoaXMuYXJpYUxpdmUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5hcmlhTGl2ZSA9IGNvbmZpZy5hcmlhTGl2ZTtcbiAgICB9XG4gICAgdGhpcy5kZWxheSA9IGNvbmZpZy5kZWxheTtcbiAgICB0aGlzLmF1dG9oaWRlID0gY29uZmlnLmF1dG9oaWRlO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9oaWRlKSB7XG4gICAgICB0aGlzLl90aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLmRlbGF5KTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCdhdXRvaGlkZScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fY2xlYXJUaW1lb3V0KCk7XG4gICAgICB0aGlzLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5fY2xlYXJUaW1lb3V0KCk7XG4gICAgdGhpcy5oaWRlT3V0cHV0LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NsZWFyVGltZW91dCgpIHtcbiAgICBpZiAodGhpcy5fdGltZW91dElEKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dElEKTtcbiAgICAgIHRoaXMuX3RpbWVvdXRJRCA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=