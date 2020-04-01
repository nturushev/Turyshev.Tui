/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ContentChildren, QueryList, Directive, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbTabsetConfig } from './tabset-config';
/** @type {?} */
var nextId = 0;
/**
 * A directive to wrap tab titles that need to contain HTML markup or other directives.
 *
 * Alternatively you could use the `NgbTab.title` input for string titles.
 */
var NgbTabTitle = /** @class */ (function () {
    function NgbTabTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabTitle.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbTabTitle]' },] }
    ];
    /** @nocollapse */
    NgbTabTitle.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbTabTitle;
}());
export { NgbTabTitle };
if (false) {
    /** @type {?} */
    NgbTabTitle.prototype.templateRef;
}
/**
 * A directive to wrap content to be displayed in a tab.
 */
var NgbTabContent = /** @class */ (function () {
    function NgbTabContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabContent.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbTabContent]' },] }
    ];
    /** @nocollapse */
    NgbTabContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbTabContent;
}());
export { NgbTabContent };
if (false) {
    /** @type {?} */
    NgbTabContent.prototype.templateRef;
}
/**
 * A directive representing an individual tab.
 */
var NgbTab = /** @class */ (function () {
    function NgbTab() {
        /**
         * The tab identifier.
         *
         * Must be unique for the entire document for proper accessibility support.
         */
        this.id = "ngb-tab-" + nextId++;
        /**
         * If `true`, the current tab is disabled and can't be toggled.
         */
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    NgbTab.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.contentTpl = this.contentTpls.first;
    };
    NgbTab.decorators = [
        { type: Directive, args: [{ selector: 'ngb-tab' },] }
    ];
    NgbTab.propDecorators = {
        id: [{ type: Input }],
        title: [{ type: Input }],
        disabled: [{ type: Input }],
        titleTpls: [{ type: ContentChildren, args: [NgbTabTitle, { descendants: false },] }],
        contentTpls: [{ type: ContentChildren, args: [NgbTabContent, { descendants: false },] }]
    };
    return NgbTab;
}());
export { NgbTab };
if (false) {
    /**
     * The tab identifier.
     *
     * Must be unique for the entire document for proper accessibility support.
     * @type {?}
     */
    NgbTab.prototype.id;
    /**
     * The tab title.
     *
     * Use the [`NgbTabTitle`](#/components/tabset/api#NgbTabTitle) directive for non-string titles.
     * @type {?}
     */
    NgbTab.prototype.title;
    /**
     * If `true`, the current tab is disabled and can't be toggled.
     * @type {?}
     */
    NgbTab.prototype.disabled;
    /** @type {?} */
    NgbTab.prototype.titleTpl;
    /** @type {?} */
    NgbTab.prototype.contentTpl;
    /** @type {?} */
    NgbTab.prototype.titleTpls;
    /** @type {?} */
    NgbTab.prototype.contentTpls;
}
/**
 * The payload of the change event fired right before the tab change.
 * @record
 */
export function NgbTabChangeEvent() { }
if (false) {
    /**
     * The id of the currently active tab.
     * @type {?}
     */
    NgbTabChangeEvent.prototype.activeId;
    /**
     * The id of the newly selected tab.
     * @type {?}
     */
    NgbTabChangeEvent.prototype.nextId;
    /**
     * Calling this function will prevent tab switching.
     * @type {?}
     */
    NgbTabChangeEvent.prototype.preventDefault;
}
/**
 * A component that makes it easy to create tabbed interface.
 */
var NgbTabset = /** @class */ (function () {
    function NgbTabset(config) {
        /**
         * If `true`, non-visible tabs content will be removed from DOM. Otherwise it will just be hidden.
         */
        this.destroyOnHide = true;
        /**
         * A tab change event emitted right before the tab change happens.
         *
         * See [`NgbTabChangeEvent`](#/components/tabset/api#NgbTabChangeEvent) for payload details.
         */
        this.tabChange = new EventEmitter();
        this.type = config.type;
        this.justify = config.justify;
        this.orientation = config.orientation;
    }
    Object.defineProperty(NgbTabset.prototype, "justify", {
        /**
         * The horizontal alignment of the tabs with flexbox utilities.
         */
        set: /**
         * The horizontal alignment of the tabs with flexbox utilities.
         * @param {?} className
         * @return {?}
         */
        function (className) {
            if (className === 'fill' || className === 'justified') {
                this.justifyClass = "nav-" + className;
            }
            else {
                this.justifyClass = "justify-content-" + className;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects the tab with the given id and shows its associated content panel.
     *
     * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
     * hidden depending on the `destroyOnHide` value.
     */
    /**
     * Selects the tab with the given id and shows its associated content panel.
     *
     * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
     * hidden depending on the `destroyOnHide` value.
     * @param {?} tabId
     * @return {?}
     */
    NgbTabset.prototype.select = /**
     * Selects the tab with the given id and shows its associated content panel.
     *
     * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
     * hidden depending on the `destroyOnHide` value.
     * @param {?} tabId
     * @return {?}
     */
    function (tabId) {
        /** @type {?} */
        var selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            /** @type {?} */
            var defaultPrevented_1 = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: (/**
                 * @return {?}
                 */
                function () { defaultPrevented_1 = true; }) });
            if (!defaultPrevented_1) {
                this.activeId = selectedTab.id;
            }
        }
    };
    /**
     * @return {?}
     */
    NgbTabset.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // auto-correct activeId that might have been set incorrectly as input
        /** @type {?} */
        var activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    NgbTabset.prototype._getTabById = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var tabsWithId = this.tabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.id === id; }));
        return tabsWithId.length ? tabsWithId[0] : null;
    };
    NgbTabset.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-tabset',
                    exportAs: 'ngbTabset',
                    template: "\n    <ul [class]=\"'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let tab of tabs\">\n        <a [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\"\n          href (click)=\"select(tab.id); $event.preventDefault()\" role=\"tab\" [attr.tabindex]=\"(tab.disabled ? '-1': undefined)\"\n          [attr.aria-controls]=\"(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)\"\n          [attr.aria-expanded]=\"tab.id === activeId\" [attr.aria-disabled]=\"tab.disabled\">\n          {{tab.title}}<ng-template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef\"></ng-template>\n        </a>\n      </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n        <div\n          class=\"tab-pane {{tab.id === activeId ? 'active' : null}}\"\n          *ngIf=\"!destroyOnHide || tab.id === activeId\"\n          role=\"tabpanel\"\n          [attr.aria-labelledby]=\"tab.id\" id=\"{{tab.id}}-panel\"\n          [attr.aria-expanded]=\"tab.id === activeId\">\n          <ng-template [ngTemplateOutlet]=\"tab.contentTpl?.templateRef\"></ng-template>\n        </div>\n      </ng-template>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    NgbTabset.ctorParameters = function () { return [
        { type: NgbTabsetConfig }
    ]; };
    NgbTabset.propDecorators = {
        tabs: [{ type: ContentChildren, args: [NgbTab,] }],
        activeId: [{ type: Input }],
        destroyOnHide: [{ type: Input }],
        justify: [{ type: Input }],
        orientation: [{ type: Input }],
        type: [{ type: Input }],
        tabChange: [{ type: Output }]
    };
    return NgbTabset;
}());
export { NgbTabset };
if (false) {
    /** @type {?} */
    NgbTabset.prototype.justifyClass;
    /** @type {?} */
    NgbTabset.prototype.tabs;
    /**
     * The identifier of the tab that should be opened **initially**.
     *
     * For subsequent tab switches use the `.select()` method and the `(tabChange)` event.
     * @type {?}
     */
    NgbTabset.prototype.activeId;
    /**
     * If `true`, non-visible tabs content will be removed from DOM. Otherwise it will just be hidden.
     * @type {?}
     */
    NgbTabset.prototype.destroyOnHide;
    /**
     * The orientation of the tabset.
     * @type {?}
     */
    NgbTabset.prototype.orientation;
    /**
     * Type of navigation to be used for tabs.
     *
     * Currently Bootstrap supports only `"tabs"` and `"pills"`.
     *
     * Since `3.0.0` can also be an arbitrary string (ex. for custom themes).
     * @type {?}
     */
    NgbTabset.prototype.type;
    /**
     * A tab change event emitted right before the tab change happens.
     *
     * See [`NgbTabChangeEvent`](#/components/tabset/api#NgbTabChangeEvent) for payload details.
     * @type {?}
     */
    NgbTabset.prototype.tabChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0YWJzZXQvdGFic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBRVgsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0lBRTVDLE1BQU0sR0FBRyxDQUFDOzs7Ozs7QUFPZDtJQUVFLHFCQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDOztnQkFGckQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLDBCQUEwQixFQUFDOzs7O2dCQWQvQyxXQUFXOztJQWlCYixrQkFBQztDQUFBLEFBSEQsSUFHQztTQUZZLFdBQVc7OztJQUNWLGtDQUFvQzs7Ozs7QUFNbEQ7SUFFRSx1QkFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs7Z0JBRnJELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBQzs7OztnQkF0QmpELFdBQVc7O0lBeUJiLG9CQUFDO0NBQUEsQUFIRCxJQUdDO1NBRlksYUFBYTs7O0lBQ1osb0NBQW9DOzs7OztBQU1sRDtJQUFBOzs7Ozs7UUFPVyxPQUFFLEdBQUcsYUFBVyxNQUFNLEVBQUksQ0FBQzs7OztRQVkzQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBZ0I1QixDQUFDOzs7O0lBUkMsc0NBQXFCOzs7SUFBckI7UUFDRSw4RkFBOEY7UUFDOUYsOEVBQThFO1FBQzlFLGlFQUFpRTtRQUNqRSwyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNy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QUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBYixDQUFhLEVBQUM7UUFDakUsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsRCxDQUFDOztnQkFqSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLDZ4Q0F1QlQ7aUJBQ0Y7Ozs7Z0JBaEhPLGVBQWU7Ozt1QkFvSHBCLGVBQWUsU0FBQyxNQUFNOzJCQU90QixLQUFLO2dDQUtMLEtBQUs7MEJBS0wsS0FBSzs4QkFZTCxLQUFLO3VCQVNMLEtBQUs7NEJBT0wsTUFBTTs7SUFzQ1QsZ0JBQUM7Q0FBQSxBQWxIRCxJQWtIQztTQXRGWSxTQUFTOzs7SUFDcEIsaUNBQXFCOztJQUVyQix5QkFBaUQ7Ozs7Ozs7SUFPakQsNkJBQTBCOzs7OztJQUsxQixrQ0FBOEI7Ozs7O0lBaUI5QixnQ0FBZ0Q7Ozs7Ozs7OztJQVNoRCx5QkFBeUM7Ozs7Ozs7SUFPekMsOEJBQTREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIERpcmVjdGl2ZSxcbiAgVGVtcGxhdGVSZWYsXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JUYWJzZXRDb25maWd9IGZyb20gJy4vdGFic2V0LWNvbmZpZyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIHdyYXAgdGFiIHRpdGxlcyB0aGF0IG5lZWQgdG8gY29udGFpbiBIVE1MIG1hcmt1cCBvciBvdGhlciBkaXJlY3RpdmVzLlxuICpcbiAqIEFsdGVybmF0aXZlbHkgeW91IGNvdWxkIHVzZSB0aGUgYE5nYlRhYi50aXRsZWAgaW5wdXQgZm9yIHN0cmluZyB0aXRsZXMuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiVGFiVGl0bGVdJ30pXG5leHBvcnQgY2xhc3MgTmdiVGFiVGl0bGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gd3JhcCBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiBhIHRhYi5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlRhYkNvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgcmVwcmVzZW50aW5nIGFuIGluZGl2aWR1YWwgdGFiLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nYi10YWInfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgLyoqXG4gICAqIFRoZSB0YWIgaWRlbnRpZmllci5cbiAgICpcbiAgICogTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXG4gICAqL1xuICBASW5wdXQoKSBpZCA9IGBuZ2ItdGFiLSR7bmV4dElkKyt9YDtcblxuICAvKipcbiAgICogVGhlIHRhYiB0aXRsZS5cbiAgICpcbiAgICogVXNlIHRoZSBbYE5nYlRhYlRpdGxlYF0oIy9jb21wb25lbnRzL3RhYnNldC9hcGkjTmdiVGFiVGl0bGUpIGRpcmVjdGl2ZSBmb3Igbm9uLXN0cmluZyB0aXRsZXMuXG4gICAqL1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjdXJyZW50IHRhYiBpcyBkaXNhYmxlZCBhbmQgY2FuJ3QgYmUgdG9nZ2xlZC5cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgdGl0bGVUcGw6IE5nYlRhYlRpdGxlIHwgbnVsbDtcbiAgY29udGVudFRwbDogTmdiVGFiQ29udGVudCB8IG51bGw7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWJUaXRsZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIHRpdGxlVHBsczogUXVlcnlMaXN0PE5nYlRhYlRpdGxlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWJDb250ZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgY29udGVudFRwbHM6IFF1ZXJ5TGlzdDxOZ2JUYWJDb250ZW50PjtcblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGVudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgY2hhbmdlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlRhYkNoYW5nZUV2ZW50IHtcbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSB0YWIuXG4gICAqL1xuICBhY3RpdmVJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgaWQgb2YgdGhlIG5ld2x5IHNlbGVjdGVkIHRhYi5cbiAgICovXG4gIG5leHRJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDYWxsaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBwcmV2ZW50IHRhYiBzd2l0Y2hpbmcuXG4gICAqL1xuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IG1ha2VzIGl0IGVhc3kgdG8gY3JlYXRlIHRhYmJlZCBpbnRlcmZhY2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10YWJzZXQnLFxuICBleHBvcnRBczogJ25nYlRhYnNldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsIFtjbGFzc109XCInbmF2IG5hdi0nICsgdHlwZSArIChvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCc/ICAnICcgKyBqdXN0aWZ5Q2xhc3MgOiAnIGZsZXgtY29sdW1uJylcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIiAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnNcIj5cbiAgICAgICAgPGEgW2lkXT1cInRhYi5pZFwiIGNsYXNzPVwibmF2LWxpbmtcIiBbY2xhc3MuYWN0aXZlXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCJcbiAgICAgICAgICBocmVmIChjbGljayk9XCJzZWxlY3QodGFiLmlkKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiByb2xlPVwidGFiXCIgW2F0dHIudGFiaW5kZXhdPVwiKHRhYi5kaXNhYmxlZCA/ICctMSc6IHVuZGVmaW5lZClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiKCFkZXN0cm95T25IaWRlIHx8IHRhYi5pZCA9PT0gYWN0aXZlSWQgPyB0YWIuaWQgKyAnLXBhbmVsJyA6IG51bGwpXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbYXR0ci5hcmlhLWRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiPlxuICAgICAgICAgIHt7dGFiLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLnRpdGxlVHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtdGFiIFtuZ0Zvck9mXT1cInRhYnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwidGFiLXBhbmUge3t0YWIuaWQgPT09IGFjdGl2ZUlkID8gJ2FjdGl2ZScgOiBudWxsfX1cIlxuICAgICAgICAgICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgdGFiLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwidGFiLmlkXCIgaWQ9XCJ7e3RhYi5pZH19LXBhbmVsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRhYnNldCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBqdXN0aWZ5Q2xhc3M6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYikgdGFiczogUXVlcnlMaXN0PE5nYlRhYj47XG5cbiAgLyoqXG4gICAqIFRoZSBpZGVudGlmaWVyIG9mIHRoZSB0YWIgdGhhdCBzaG91bGQgYmUgb3BlbmVkICoqaW5pdGlhbGx5KiouXG4gICAqXG4gICAqIEZvciBzdWJzZXF1ZW50IHRhYiBzd2l0Y2hlcyB1c2UgdGhlIGAuc2VsZWN0KClgIG1ldGhvZCBhbmQgdGhlIGAodGFiQ2hhbmdlKWAgZXZlbnQuXG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmVJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIG5vbi12aXNpYmxlIHRhYnMgY29udGVudCB3aWxsIGJlIHJlbW92ZWQgZnJvbSBET00uIE90aGVyd2lzZSBpdCB3aWxsIGp1c3QgYmUgaGlkZGVuLlxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGFicyB3aXRoIGZsZXhib3ggdXRpbGl0aWVzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGp1c3RpZnkoY2xhc3NOYW1lOiAnc3RhcnQnIHwgJ2NlbnRlcicgfCAnZW5kJyB8ICdmaWxsJyB8ICdqdXN0aWZpZWQnKSB7XG4gICAgaWYgKGNsYXNzTmFtZSA9PT0gJ2ZpbGwnIHx8IGNsYXNzTmFtZSA9PT0gJ2p1c3RpZmllZCcpIHtcbiAgICAgIHRoaXMuanVzdGlmeUNsYXNzID0gYG5hdi0ke2NsYXNzTmFtZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmp1c3RpZnlDbGFzcyA9IGBqdXN0aWZ5LWNvbnRlbnQtJHtjbGFzc05hbWV9YDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSB0YWJzZXQuXG4gICAqL1xuICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcblxuICAvKipcbiAgICogVHlwZSBvZiBuYXZpZ2F0aW9uIHRvIGJlIHVzZWQgZm9yIHRhYnMuXG4gICAqXG4gICAqIEN1cnJlbnRseSBCb290c3RyYXAgc3VwcG9ydHMgb25seSBgXCJ0YWJzXCJgIGFuZCBgXCJwaWxsc1wiYC5cbiAgICpcbiAgICogU2luY2UgYDMuMC4wYCBjYW4gYWxzbyBiZSBhbiBhcmJpdHJhcnkgc3RyaW5nIChleC4gZm9yIGN1c3RvbSB0aGVtZXMpLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogJ3RhYnMnIHwgJ3BpbGxzJyB8IHN0cmluZztcblxuICAvKipcbiAgICogQSB0YWIgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgY2hhbmdlIGhhcHBlbnMuXG4gICAqXG4gICAqIFNlZSBbYE5nYlRhYkNoYW5nZUV2ZW50YF0oIy9jb21wb25lbnRzL3RhYnNldC9hcGkjTmdiVGFiQ2hhbmdlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG4gICAqL1xuICBAT3V0cHV0KCkgdGFiQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JUYWJDaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlRhYnNldENvbmZpZykge1xuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgIHRoaXMuanVzdGlmeSA9IGNvbmZpZy5qdXN0aWZ5O1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBjb25maWcub3JpZW50YXRpb247XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgdGFiIHdpdGggdGhlIGdpdmVuIGlkIGFuZCBzaG93cyBpdHMgYXNzb2NpYXRlZCBjb250ZW50IHBhbmVsLlxuICAgKlxuICAgKiBBbnkgb3RoZXIgdGFiIHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIHJlbW92ZWQgZnJvbSBET00gb3JcbiAgICogaGlkZGVuIGRlcGVuZGluZyBvbiB0aGUgYGRlc3Ryb3lPbkhpZGVgIHZhbHVlLlxuICAgKi9cbiAgc2VsZWN0KHRhYklkOiBzdHJpbmcpIHtcbiAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRhYklkKTtcbiAgICBpZiAoc2VsZWN0ZWRUYWIgJiYgIXNlbGVjdGVkVGFiLmRpc2FibGVkICYmIHRoaXMuYWN0aXZlSWQgIT09IHNlbGVjdGVkVGFiLmlkKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnRhYkNoYW5nZS5lbWl0KFxuICAgICAgICAgIHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkOiBzZWxlY3RlZFRhYi5pZCwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcblxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFRhYi5pZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gYXV0by1jb3JyZWN0IGFjdGl2ZUlkIHRoYXQgbWlnaHQgaGF2ZSBiZWVuIHNldCBpbmNvcnJlY3RseSBhcyBpbnB1dFxuICAgIGxldCBhY3RpdmVUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVUYWIgPyBhY3RpdmVUYWIuaWQgOiAodGhpcy50YWJzLmxlbmd0aCA/IHRoaXMudGFicy5maXJzdC5pZCA6IG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VGFiQnlJZChpZDogc3RyaW5nKTogTmdiVGFiIHtcbiAgICBsZXQgdGFic1dpdGhJZDogTmdiVGFiW10gPSB0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuaWQgPT09IGlkKTtcbiAgICByZXR1cm4gdGFic1dpdGhJZC5sZW5ndGggPyB0YWJzV2l0aElkWzBdIDogbnVsbDtcbiAgfVxufVxuIl19