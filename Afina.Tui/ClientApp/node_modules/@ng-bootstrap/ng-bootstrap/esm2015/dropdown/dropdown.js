/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Output, QueryList, Renderer2, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { positionElements } from '../util/positioning';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { NgbDropdownConfig } from './dropdown-config';
export class NgbNavbar {
}
NgbNavbar.decorators = [
    { type: Directive, args: [{ selector: '.navbar' },] }
];
/**
 * A directive you should put put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * \@since 4.1.0
 */
export class NgbDropdownItem {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._disabled = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = (/** @type {?} */ (value)) === '' || value === true; // accept an empty attribute as true
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
}
NgbDropdownItem.decorators = [
    { type: Directive, args: [{ selector: '[ngbDropdownItem]', host: { 'class': 'dropdown-item', '[class.disabled]': 'disabled' } },] }
];
/** @nocollapse */
NgbDropdownItem.ctorParameters = () => [
    { type: ElementRef }
];
NgbDropdownItem.propDecorators = {
    disabled: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbDropdownItem.prototype._disabled;
    /** @type {?} */
    NgbDropdownItem.prototype.elementRef;
}
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
export class NgbDropdownMenu {
    /**
     * @param {?} dropdown
     */
    constructor(dropdown) {
        this.dropdown = dropdown;
        this.placement = 'bottom';
        this.isOpen = false;
    }
}
NgbDropdownMenu.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownMenu]',
                host: {
                    '[class.dropdown-menu]': 'true',
                    '[class.show]': 'dropdown.isOpen()',
                    '[attr.x-placement]': 'placement',
                    '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                    '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                    '(keydown.Home)': 'dropdown.onKeyDown($event)',
                    '(keydown.End)': 'dropdown.onKeyDown($event)',
                    '(keydown.Enter)': 'dropdown.onKeyDown($event)',
                    '(keydown.Space)': 'dropdown.onKeyDown($event)'
                }
            },] }
];
/** @nocollapse */
NgbDropdownMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => NgbDropdown)),] }] }
];
NgbDropdownMenu.propDecorators = {
    menuItems: [{ type: ContentChildren, args: [NgbDropdownItem,] }]
};
if (false) {
    /** @type {?} */
    NgbDropdownMenu.prototype.placement;
    /** @type {?} */
    NgbDropdownMenu.prototype.isOpen;
    /** @type {?} */
    NgbDropdownMenu.prototype.menuItems;
    /** @type {?} */
    NgbDropdownMenu.prototype.dropdown;
}
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * \@since 1.1.0
 */
export class NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} _elementRef
     */
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this.anchorEl = _elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    getNativeElement() { return this._elementRef.nativeElement; }
}
NgbDropdownAnchor.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownAnchor]',
                host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
            },] }
];
/** @nocollapse */
NgbDropdownAnchor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => NgbDropdown)),] }] },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    NgbDropdownAnchor.prototype.anchorEl;
    /** @type {?} */
    NgbDropdownAnchor.prototype.dropdown;
    /**
     * @type {?}
     * @private
     */
    NgbDropdownAnchor.prototype._elementRef;
}
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
export class NgbDropdownToggle extends NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} elementRef
     */
    constructor(dropdown, elementRef) {
        super(dropdown, elementRef);
    }
}
NgbDropdownToggle.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownToggle]',
                host: {
                    'class': 'dropdown-toggle',
                    'aria-haspopup': 'true',
                    '[attr.aria-expanded]': 'dropdown.isOpen()',
                    '(click)': 'dropdown.toggle()',
                    '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                    '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                    '(keydown.Home)': 'dropdown.onKeyDown($event)',
                    '(keydown.End)': 'dropdown.onKeyDown($event)'
                },
                providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgbDropdownToggle)) }]
            },] }
];
/** @nocollapse */
NgbDropdownToggle.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => NgbDropdown)),] }] },
    { type: ElementRef }
];
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
export class NgbDropdown {
    /**
     * @param {?} _changeDetector
     * @param {?} config
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} ngbNavbar
     */
    constructor(_changeDetector, config, _document, _ngZone, _elementRef, _renderer, ngbNavbar) {
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._closed$ = new Subject();
        /**
         * Defines whether or not the dropdown menu is opened initially.
         */
        this._open = false;
        /**
         * An event fired when the dropdown is opened or closed.
         *
         * The event payload is a `boolean`:
         * * `true` - the dropdown was opened
         * * `false` - the dropdown was closed
         */
        this.openChange = new EventEmitter();
        this.placement = config.placement;
        this.container = config.container;
        this.autoClose = config.autoClose;
        this.display = ngbNavbar ? 'static' : 'dynamic';
        this._zoneSubscription = _ngZone.onStable.subscribe((/**
         * @return {?}
         */
        () => { this._positionMenu(); }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._applyPlacementClasses();
        if (this._open) {
            this._setCloseHandlers();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.isFirstChange) {
            this._applyPlacementClasses();
        }
    }
    /**
     * Checks if the dropdown menu is open.
     * @return {?}
     */
    isOpen() { return this._open; }
    /**
     * Opens the dropdown menu.
     * @return {?}
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _setCloseHandlers() {
        ngbAutoClose(this._ngZone, this._document, this.autoClose, (/**
         * @return {?}
         */
        () => this.close()), this._closed$, this._menu ? [this._menuElement.nativeElement] : [], this._anchor ? [this._anchor.getNativeElement()] : [], '.dropdown-item,.dropdown-divider');
    }
    /**
     * Closes the dropdown menu.
     * @return {?}
     */
    close() {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._closed$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the dropdown menu.
     * @return {?}
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._resetContainer();
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        const key = event.which;
        /** @type {?} */
        const itemElements = this._getMenuElements();
        /** @type {?} */
        let position = -1;
        /** @type {?} */
        let isEventFromItems = false;
        /** @type {?} */
        const isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle && itemElements.length) {
            itemElements.forEach((/**
             * @param {?} itemElement
             * @param {?} index
             * @return {?}
             */
            (itemElement, index) => {
                if (itemElement.contains((/** @type {?} */ (event.target)))) {
                    isEventFromItems = true;
                }
                if (itemElement === this._document.activeElement) {
                    position = index;
                }
            }));
        }
        // closing on Enter / Space
        if (key === Key.Space || key === Key.Enter) {
            if (isEventFromItems && (this.autoClose === true || this.autoClose === 'inside')) {
                this.close();
            }
            return;
        }
        // opening / navigating
        if (isEventFromToggle || isEventFromItems) {
            this.open();
            if (itemElements.length) {
                switch (key) {
                    case Key.ArrowDown:
                        position = Math.min(position + 1, itemElements.length - 1);
                        break;
                    case Key.ArrowUp:
                        if (this._isDropup() && position === -1) {
                            position = itemElements.length - 1;
                            break;
                        }
                        position = Math.max(position - 1, 0);
                        break;
                    case Key.Home:
                        position = 0;
                        break;
                    case Key.End:
                        position = itemElements.length - 1;
                        break;
                }
                itemElements[position].focus();
            }
            event.preventDefault();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _isDropup() { return this._elementRef.nativeElement.classList.contains('dropup'); }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _isEventFromToggle(event) {
        return this._anchor.getNativeElement().contains((/** @type {?} */ (event.target)));
    }
    /**
     * @private
     * @return {?}
     */
    _getMenuElements() {
        if (this._menu == null) {
            return [];
        }
        return this._menu.menuItems.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !item.disabled)).map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.elementRef.nativeElement));
    }
    /**
     * @private
     * @return {?}
     */
    _positionMenu() {
        if (this.isOpen() && this._menu) {
            this._applyPlacementClasses(this.display === 'dynamic' ?
                positionElements(this._anchor.anchorEl, this._bodyContainer || this._menuElement.nativeElement, this.placement, this.container === 'body') :
                this._getFirstPlacement(this.placement));
        }
    }
    /**
     * @private
     * @param {?} placement
     * @return {?}
     */
    _getFirstPlacement(placement) {
        return Array.isArray(placement) ? placement[0] : (/** @type {?} */ (placement.split(' ')[0]));
    }
    /**
     * @private
     * @return {?}
     */
    _resetContainer() {
        /** @type {?} */
        const renderer = this._renderer;
        if (this._menuElement) {
            /** @type {?} */
            const dropdownElement = this._elementRef.nativeElement;
            /** @type {?} */
            const dropdownMenuElement = this._menuElement.nativeElement;
            renderer.appendChild(dropdownElement, dropdownMenuElement);
            renderer.removeStyle(dropdownMenuElement, 'position');
            renderer.removeStyle(dropdownMenuElement, 'transform');
        }
        if (this._bodyContainer) {
            renderer.removeChild(this._document.body, this._bodyContainer);
            this._bodyContainer = null;
        }
    }
    /**
     * @private
     * @param {?=} container
     * @return {?}
     */
    _applyContainer(container = null) {
        this._resetContainer();
        if (container === 'body') {
            /** @type {?} */
            const renderer = this._renderer;
            /** @type {?} */
            const dropdownMenuElement = this._menuElement.nativeElement;
            /** @type {?} */
            const bodyContainer = this._bodyContainer = this._bodyContainer || renderer.createElement('div');
            // Override some styles to have the positionning working
            renderer.setStyle(bodyContainer, 'position', 'absolute');
            renderer.setStyle(dropdownMenuElement, 'position', 'static');
            renderer.setStyle(bodyContainer, 'z-index', '1050');
            renderer.appendChild(bodyContainer, dropdownMenuElement);
            renderer.appendChild(this._document.body, bodyContainer);
        }
    }
    /**
     * @private
     * @param {?=} placement
     * @return {?}
     */
    _applyPlacementClasses(placement) {
        if (this._menu) {
            if (!placement) {
                placement = this._getFirstPlacement(this.placement);
            }
            /** @type {?} */
            const renderer = this._renderer;
            /** @type {?} */
            const dropdownElement = this._elementRef.nativeElement;
            // remove the current placement classes
            renderer.removeClass(dropdownElement, 'dropup');
            renderer.removeClass(dropdownElement, 'dropdown');
            this._menu.placement = placement;
            /*
                  * apply the new placement
                  * in case of top use up-arrow or down-arrow otherwise
                  */
            /** @type {?} */
            const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            renderer.addClass(dropdownElement, dropdownClass);
            /** @type {?} */
            const bodyContainer = this._bodyContainer;
            if (bodyContainer) {
                renderer.removeClass(bodyContainer, 'dropup');
                renderer.removeClass(bodyContainer, 'dropdown');
                renderer.addClass(bodyContainer, dropdownClass);
            }
        }
    }
}
NgbDropdown.decorators = [
    { type: Directive, args: [{ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } },] }
];
/** @nocollapse */
NgbDropdown.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgbDropdownConfig },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgbNavbar, decorators: [{ type: Optional }] }
];
NgbDropdown.propDecorators = {
    _menu: [{ type: ContentChild, args: [NgbDropdownMenu, { static: true },] }],
    _menuElement: [{ type: ContentChild, args: [NgbDropdownMenu, { read: ElementRef, static: true },] }],
    _anchor: [{ type: ContentChild, args: [NgbDropdownAnchor, { static: true },] }],
    autoClose: [{ type: Input }],
    _open: [{ type: Input, args: ['open',] }],
    placement: [{ type: Input }],
    container: [{ type: Input }],
    display: [{ type: Input }],
    openChange: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._closed$;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._zoneSubscription;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._bodyContainer;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._menu;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._menuElement;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._anchor;
    /**
     * Indicates whether the dropdown should be closed when clicking one of dropdown items or pressing ESC.
     *
     * * `true` - the dropdown will close on both outside and inside (menu) clicks.
     * * `false` - the dropdown can only be closed manually via `close()` or `toggle()` methods.
     * * `"inside"` - the dropdown will close on inside menu clicks, but not outside clicks.
     * * `"outside"` - the dropdown will close only on the outside clicks and not on menu clicks.
     * @type {?}
     */
    NgbDropdown.prototype.autoClose;
    /**
     * Defines whether or not the dropdown menu is opened initially.
     * @type {?}
     */
    NgbDropdown.prototype._open;
    /**
     * The preferred placement of the dropdown.
     *
     * Possible values are `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`,
     * `"bottom-right"`, `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`,
     * `"right-bottom"`
     *
     * Accepts an array of strings or a string with space separated possible values.
     *
     * The default order of preference is `"bottom-left bottom-right top-left top-right"`
     *
     * Please see the [positioning overview](#/positioning) for more details.
     * @type {?}
     */
    NgbDropdown.prototype.placement;
    /**
     * A selector specifying the element the dropdown should be appended to.
     * Currently only supports "body".
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbDropdown.prototype.container;
    /**
     * Enable or disable the dynamic positioning
     *
     * \@since 4.2.0
     * @type {?}
     */
    NgbDropdown.prototype.display;
    /**
     * An event fired when the dropdown is opened or closed.
     *
     * The event payload is a `boolean`:
     * * `true` - the dropdown was opened
     * * `false` - the dropdown was closed
     * @type {?}
     */
    NgbDropdown.prototype.openChange;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._changeDetector;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._document;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    NgbDropdown.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUVULFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQTRCLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFaEMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHcEQsTUFBTSxPQUFPLFNBQVM7OztZQURyQixTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFDOzs7Ozs7OztBQVdoQyxNQUFNLE9BQU8sZUFBZTs7OztJQVUxQixZQUFtQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQVQ5QyxjQUFTLEdBQUcsS0FBSyxDQUFDO0lBUytCLENBQUM7Ozs7O0lBUDFELElBQ0ksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBSyxLQUFLLEVBQUEsS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFFLG9DQUFvQztJQUM3RixDQUFDOzs7O0lBRUQsSUFBSSxRQUFR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QTdEUCwrQkFBdUM7Ozs7O0lBQ3ZDLHdDQUF3Qzs7Ozs7SUFDeEMscUNBQW9DOzs7OztJQUVwQyw0QkFBOEU7Ozs7O0lBQzlFLG1DQUFrRzs7Ozs7SUFFbEcsOEJBQW9GOzs7Ozs7Ozs7O0lBVXBGLGdDQUFtRDs7Ozs7SUFLbkQsNEJBQTZCOzs7Ozs7Ozs7Ozs7Ozs7SUFlN0IsZ0NBQW1DOzs7Ozs7OztJQVFuQyxnQ0FBa0M7Ozs7Ozs7SUFPbEMsOEJBQXVDOzs7Ozs7Ozs7SUFTdkMsaUNBQW1EOzs7OztJQUcvQyxzQ0FBMEM7Ozs7O0lBQTZCLGdDQUF3Qzs7Ozs7SUFDL0csOEJBQXVCOzs7OztJQUFFLGtDQUE0Qzs7Ozs7SUFBRSxnQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7UGxhY2VtZW50LCBQbGFjZW1lbnRBcnJheSwgcG9zaXRpb25FbGVtZW50c30gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQge25nYkF1dG9DbG9zZX0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcblxuaW1wb3J0IHtOZ2JEcm9wZG93bkNvbmZpZ30gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJy5uYXZiYXInfSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZiYXIge1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHlvdSBzaG91bGQgcHV0IHB1dCBvbiBhIGRyb3Bkb3duIGl0ZW0gdG8gZW5hYmxlIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gKiBBcnJvdyBrZXlzIHdpbGwgbW92ZSBmb2N1cyBiZXR3ZWVuIGl0ZW1zIG1hcmtlZCB3aXRoIHRoaXMgZGlyZWN0aXZlLlxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkl0ZW1dJywgaG9zdDogeydjbGFzcyc6ICdkcm9wZG93bi1pdGVtJywgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnfX0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25JdGVtIHtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IDxhbnk+dmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSB0cnVlOyAgLy8gYWNjZXB0IGFuIGVtcHR5IGF0dHJpYnV0ZSBhcyB0cnVlXG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIGRyb3Bkb3duIG1lbnUgY29udGVudCBhbmQgZHJvcGRvd24gaXRlbXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bk1lbnVdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5zaG93XSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG4gICAgJ1thdHRyLngtcGxhY2VtZW50XSc6ICdwbGFjZW1lbnQnLFxuICAgICcoa2V5ZG93bi5BcnJvd1VwKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkFycm93RG93biknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5Ib21lKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkVuZCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5FbnRlciknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5TcGFjZSknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25NZW51IHtcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnQgPSAnYm90dG9tJztcbiAgaXNPcGVuID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JEcm9wZG93bkl0ZW0pIG1lbnVJdGVtczogUXVlcnlMaXN0PE5nYkRyb3Bkb3duSXRlbT47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgcHVibGljIGRyb3Bkb3duKSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hcmsgYW4gZWxlbWVudCB0byB3aGljaCBkcm9wZG93biBtZW51IHdpbGwgYmUgYW5jaG9yZWQuXG4gKlxuICogVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uIG9mIHRoZSBgTmdiRHJvcGRvd25Ub2dnbGVgIGRpcmVjdGl2ZS5cbiAqIEl0IHBsYXlzIHRoZSBzYW1lIHJvbGUsIGJ1dCBkb2Vzbid0IGxpc3RlbiB0byBjbGljayBldmVudHMgdG8gdG9nZ2xlIGRyb3Bkb3duIG1lbnUgdGh1cyBlbmFibGluZyBzdXBwb3J0XG4gKiBmb3IgZXZlbnRzIG90aGVyIHRoYW4gY2xpY2suXG4gKlxuICogQHNpbmNlIDEuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkFuY2hvcl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLCAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZHJvcGRvd24uaXNPcGVuKCknfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkFuY2hvciB7XG4gIGFuY2hvckVsO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIHB1YmxpYyBkcm9wZG93biwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB0aGlzLmFuY2hvckVsID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGdldE5hdGl2ZUVsZW1lbnQoKSB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7IH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXJrIGFuIGVsZW1lbnQgdGhhdCB3aWxsIHRvZ2dsZSBkcm9wZG93biB2aWEgdGhlIGBjbGlja2AgZXZlbnQuXG4gKlxuICogWW91IGNhbiBhbHNvIHVzZSBgTmdiRHJvcGRvd25BbmNob3JgIGFzIGFuIGFsdGVybmF0aXZlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25Ub2dnbGVdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLFxuICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG4gICAgJyhjbGljayknOiAnZHJvcGRvd24udG9nZ2xlKCknLFxuICAgICcoa2V5ZG93bi5BcnJvd1VwKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkFycm93RG93biknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5Ib21lKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkVuZCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBOZ2JEcm9wZG93bkFuY2hvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd25Ub2dnbGUpfV1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Ub2dnbGUgZXh0ZW5kcyBOZ2JEcm9wZG93bkFuY2hvciB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIGRyb3Bkb3duLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHN1cGVyKGRyb3Bkb3duLCBlbGVtZW50UmVmKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgcHJvdmlkZXMgY29udGV4dHVhbCBvdmVybGF5cyBmb3IgZGlzcGxheWluZyBsaXN0cyBvZiBsaW5rcyBhbmQgbW9yZS5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiRHJvcGRvd25dJywgZXhwb3J0QXM6ICduZ2JEcm9wZG93bicsIGhvc3Q6IHsnW2NsYXNzLnNob3ddJzogJ2lzT3BlbigpJ319KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9ib2R5Q29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duTWVudSwge3N0YXRpYzogdHJ1ZX0pIHByaXZhdGUgX21lbnU6IE5nYkRyb3Bkb3duTWVudTtcbiAgQENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bk1lbnUsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWV9KSBwcml2YXRlIF9tZW51RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duQW5jaG9yLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSBfYW5jaG9yOiBOZ2JEcm9wZG93bkFuY2hvcjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBiZSBjbG9zZWQgd2hlbiBjbGlja2luZyBvbmUgb2YgZHJvcGRvd24gaXRlbXMgb3IgcHJlc3NpbmcgRVNDLlxuICAgKlxuICAgKiAqIGB0cnVlYCAtIHRoZSBkcm9wZG93biB3aWxsIGNsb3NlIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIChtZW51KSBjbGlja3MuXG4gICAqICogYGZhbHNlYCAtIHRoZSBkcm9wZG93biBjYW4gb25seSBiZSBjbG9zZWQgbWFudWFsbHkgdmlhIGBjbG9zZSgpYCBvciBgdG9nZ2xlKClgIG1ldGhvZHMuXG4gICAqICogYFwiaW5zaWRlXCJgIC0gdGhlIGRyb3Bkb3duIHdpbGwgY2xvc2Ugb24gaW5zaWRlIG1lbnUgY2xpY2tzLCBidXQgbm90IG91dHNpZGUgY2xpY2tzLlxuICAgKiAqIGBcIm91dHNpZGVcImAgLSB0aGUgZHJvcGRvd24gd2lsbCBjbG9zZSBvbmx5IG9uIHRoZSBvdXRzaWRlIGNsaWNrcyBhbmQgbm90IG9uIG1lbnUgY2xpY2tzLlxuICAgKi9cbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ291dHNpZGUnIHwgJ2luc2lkZSc7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgd2hldGhlciBvciBub3QgdGhlIGRyb3Bkb3duIG1lbnUgaXMgb3BlbmVkIGluaXRpYWxseS5cbiAgICovXG4gIEBJbnB1dCgnb3BlbicpIF9vcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBwcmVmZXJyZWQgcGxhY2VtZW50IG9mIHRoZSBkcm9wZG93bi5cbiAgICpcbiAgICogUG9zc2libGUgdmFsdWVzIGFyZSBgXCJ0b3BcImAsIGBcInRvcC1sZWZ0XCJgLCBgXCJ0b3AtcmlnaHRcImAsIGBcImJvdHRvbVwiYCwgYFwiYm90dG9tLWxlZnRcImAsXG4gICAqIGBcImJvdHRvbS1yaWdodFwiYCwgYFwibGVmdFwiYCwgYFwibGVmdC10b3BcImAsIGBcImxlZnQtYm90dG9tXCJgLCBgXCJyaWdodFwiYCwgYFwicmlnaHQtdG9wXCJgLFxuICAgKiBgXCJyaWdodC1ib3R0b21cImBcbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiBzdHJpbmdzIG9yIGEgc3RyaW5nIHdpdGggc3BhY2Ugc2VwYXJhdGVkIHBvc3NpYmxlIHZhbHVlcy5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQgb3JkZXIgb2YgcHJlZmVyZW5jZSBpcyBgXCJib3R0b20tbGVmdCBib3R0b20tcmlnaHQgdG9wLWxlZnQgdG9wLXJpZ2h0XCJgXG4gICAqXG4gICAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cbiAgLyoqXG4gICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBkcm9wZG93biBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICpcbiAgKiBAc2luY2UgNC4xLjBcbiAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBudWxsIHwgJ2JvZHknO1xuXG4gIC8qKlxuICAgKiBFbmFibGUgb3IgZGlzYWJsZSB0aGUgZHluYW1pYyBwb3NpdGlvbmluZ1xuICAgKlxuICAgKiBAc2luY2UgNC4yLjBcbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXk6ICdkeW5hbWljJyB8ICdzdGF0aWMnO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQgb3IgY2xvc2VkLlxuICAgKlxuICAgKiBUaGUgZXZlbnQgcGF5bG9hZCBpcyBhIGBib29sZWFuYDpcbiAgICogKiBgdHJ1ZWAgLSB0aGUgZHJvcGRvd24gd2FzIG9wZW5lZFxuICAgKiAqIGBmYWxzZWAgLSB0aGUgZHJvcGRvd24gd2FzIGNsb3NlZFxuICAgKi9cbiAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNvbmZpZzogTmdiRHJvcGRvd25Db25maWcsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICBAT3B0aW9uYWwoKSBuZ2JOYXZiYXI6IE5nYk5hdmJhcikge1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xuXG4gICAgdGhpcy5kaXNwbGF5ID0gbmdiTmF2YmFyID8gJ3N0YXRpYycgOiAnZHluYW1pYyc7XG5cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLl9wb3NpdGlvbk1lbnUoKTsgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoKTtcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jb250YWluZXIgJiYgdGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fYXBwbHlDb250YWluZXIodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnBsYWNlbWVudCAmJiAhY2hhbmdlcy5wbGFjZW1lbnQuaXNGaXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZHJvcGRvd24gbWVudSBpcyBvcGVuLlxuICAgKi9cbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fb3BlbjsgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgZHJvcGRvd24gbWVudS5cbiAgICovXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2FwcGx5Q29udGFpbmVyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldENsb3NlSGFuZGxlcnMoKSB7XG4gICAgbmdiQXV0b0Nsb3NlKFxuICAgICAgICB0aGlzLl9uZ1pvbmUsIHRoaXMuX2RvY3VtZW50LCB0aGlzLmF1dG9DbG9zZSwgKCkgPT4gdGhpcy5jbG9zZSgpLCB0aGlzLl9jbG9zZWQkLFxuICAgICAgICB0aGlzLl9tZW51ID8gW3RoaXMuX21lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnRdIDogW10sIHRoaXMuX2FuY2hvciA/IFt0aGlzLl9hbmNob3IuZ2V0TmF0aXZlRWxlbWVudCgpXSA6IFtdLFxuICAgICAgICAnLmRyb3Bkb3duLWl0ZW0sLmRyb3Bkb3duLWRpdmlkZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGRyb3Bkb3duIG1lbnUuXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fcmVzZXRDb250YWluZXIoKTtcbiAgICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGRyb3Bkb3duIG1lbnUuXG4gICAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fcmVzZXRDb250YWluZXIoKTtcblxuICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xuICAgIGNvbnN0IGl0ZW1FbGVtZW50cyA9IHRoaXMuX2dldE1lbnVFbGVtZW50cygpO1xuXG4gICAgbGV0IHBvc2l0aW9uID0gLTE7XG4gICAgbGV0IGlzRXZlbnRGcm9tSXRlbXMgPSBmYWxzZTtcbiAgICBjb25zdCBpc0V2ZW50RnJvbVRvZ2dsZSA9IHRoaXMuX2lzRXZlbnRGcm9tVG9nZ2xlKGV2ZW50KTtcblxuICAgIGlmICghaXNFdmVudEZyb21Ub2dnbGUgJiYgaXRlbUVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgaXRlbUVsZW1lbnRzLmZvckVhY2goKGl0ZW1FbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgIGlzRXZlbnRGcm9tSXRlbXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtRWxlbWVudCA9PT0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHBvc2l0aW9uID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNsb3Npbmcgb24gRW50ZXIgLyBTcGFjZVxuICAgIGlmIChrZXkgPT09IEtleS5TcGFjZSB8fCBrZXkgPT09IEtleS5FbnRlcikge1xuICAgICAgaWYgKGlzRXZlbnRGcm9tSXRlbXMgJiYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlIHx8IHRoaXMuYXV0b0Nsb3NlID09PSAnaW5zaWRlJykpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG9wZW5pbmcgLyBuYXZpZ2F0aW5nXG4gICAgaWYgKGlzRXZlbnRGcm9tVG9nZ2xlIHx8IGlzRXZlbnRGcm9tSXRlbXMpIHtcbiAgICAgIHRoaXMub3BlbigpO1xuXG4gICAgICBpZiAoaXRlbUVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4ocG9zaXRpb24gKyAxLCBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRHJvcHVwKCkgJiYgcG9zaXRpb24gPT09IC0xKSB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uID0gaXRlbUVsZW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zaXRpb24gPSBNYXRoLm1heChwb3NpdGlvbiAtIDEsIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgS2V5LkVuZDpcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaXRlbUVsZW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpdGVtRWxlbWVudHNbcG9zaXRpb25dLmZvY3VzKCk7XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzRHJvcHVwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHVwJyk7IH1cblxuICBwcml2YXRlIF9pc0V2ZW50RnJvbVRvZ2dsZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9hbmNob3IuZ2V0TmF0aXZlRWxlbWVudCgpLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRNZW51RWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgaWYgKHRoaXMuX21lbnUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbWVudS5tZW51SXRlbXMuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0uZGlzYWJsZWQpLm1hcChpdGVtID0+IGl0ZW0uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Bvc2l0aW9uTWVudSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSAmJiB0aGlzLl9tZW51KSB7XG4gICAgICB0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoXG4gICAgICAgICAgdGhpcy5kaXNwbGF5ID09PSAnZHluYW1pYycgP1xuICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgICAgICAgdGhpcy5fYW5jaG9yLmFuY2hvckVsLCB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHRoaXMuX21lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5JykgOlxuICAgICAgICAgICAgICB0aGlzLl9nZXRGaXJzdFBsYWNlbWVudCh0aGlzLnBsYWNlbWVudCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldEZpcnN0UGxhY2VtZW50KHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkpOiBQbGFjZW1lbnQge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBsYWNlbWVudCkgPyBwbGFjZW1lbnRbMF0gOiBwbGFjZW1lbnQuc3BsaXQoJyAnKVswXSBhcyBQbGFjZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldENvbnRhaW5lcigpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgIGlmICh0aGlzLl9tZW51RWxlbWVudCkge1xuICAgICAgY29uc3QgZHJvcGRvd25FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgY29uc3QgZHJvcGRvd25NZW51RWxlbWVudCA9IHRoaXMuX21lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGRyb3Bkb3duRWxlbWVudCwgZHJvcGRvd25NZW51RWxlbWVudCk7XG4gICAgICByZW5kZXJlci5yZW1vdmVTdHlsZShkcm9wZG93bk1lbnVFbGVtZW50LCAncG9zaXRpb24nKTtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZVN0eWxlKGRyb3Bkb3duTWVudUVsZW1lbnQsICd0cmFuc2Zvcm0nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2JvZHlDb250YWluZXIpIHtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2RvY3VtZW50LmJvZHksIHRoaXMuX2JvZHlDb250YWluZXIpO1xuICAgICAgdGhpcy5fYm9keUNvbnRhaW5lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlDb250YWluZXIoY29udGFpbmVyOiBudWxsIHwgJ2JvZHknID0gbnVsbCkge1xuICAgIHRoaXMuX3Jlc2V0Q29udGFpbmVyKCk7XG4gICAgaWYgKGNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgICAgY29uc3QgZHJvcGRvd25NZW51RWxlbWVudCA9IHRoaXMuX21lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBib2R5Q29udGFpbmVyID0gdGhpcy5fYm9keUNvbnRhaW5lciA9IHRoaXMuX2JvZHlDb250YWluZXIgfHwgcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIC8vIE92ZXJyaWRlIHNvbWUgc3R5bGVzIHRvIGhhdmUgdGhlIHBvc2l0aW9ubmluZyB3b3JraW5nXG4gICAgICByZW5kZXJlci5zZXRTdHlsZShib2R5Q29udGFpbmVyLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duTWVudUVsZW1lbnQsICdwb3NpdGlvbicsICdzdGF0aWMnKTtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGJvZHlDb250YWluZXIsICd6LWluZGV4JywgJzEwNTAnKTtcblxuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoYm9keUNvbnRhaW5lciwgZHJvcGRvd25NZW51RWxlbWVudCk7XG4gICAgICByZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9kb2N1bWVudC5ib2R5LCBib2R5Q29udGFpbmVyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hcHBseVBsYWNlbWVudENsYXNzZXMocGxhY2VtZW50PzogUGxhY2VtZW50KSB7XG4gICAgaWYgKHRoaXMuX21lbnUpIHtcbiAgICAgIGlmICghcGxhY2VtZW50KSB7XG4gICAgICAgIHBsYWNlbWVudCA9IHRoaXMuX2dldEZpcnN0UGxhY2VtZW50KHRoaXMucGxhY2VtZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICAgIGNvbnN0IGRyb3Bkb3duRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IHBsYWNlbWVudCBjbGFzc2VzXG4gICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhkcm9wZG93bkVsZW1lbnQsICdkcm9wdXAnKTtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duRWxlbWVudCwgJ2Ryb3Bkb3duJyk7XG4gICAgICB0aGlzLl9tZW51LnBsYWNlbWVudCA9IHBsYWNlbWVudDtcblxuICAgICAgLypcbiAgICAgICogYXBwbHkgdGhlIG5ldyBwbGFjZW1lbnRcbiAgICAgICogaW4gY2FzZSBvZiB0b3AgdXNlIHVwLWFycm93IG9yIGRvd24tYXJyb3cgb3RoZXJ3aXNlXG4gICAgICAqL1xuICAgICAgY29uc3QgZHJvcGRvd25DbGFzcyA9IHBsYWNlbWVudC5zZWFyY2goJ150b3AnKSAhPT0gLTEgPyAnZHJvcHVwJyA6ICdkcm9wZG93bic7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyhkcm9wZG93bkVsZW1lbnQsIGRyb3Bkb3duQ2xhc3MpO1xuXG4gICAgICBjb25zdCBib2R5Q29udGFpbmVyID0gdGhpcy5fYm9keUNvbnRhaW5lcjtcbiAgICAgIGlmIChib2R5Q29udGFpbmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHlDb250YWluZXIsICdkcm9wdXAnKTtcbiAgICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keUNvbnRhaW5lciwgJ2Ryb3Bkb3duJyk7XG4gICAgICAgIHJlbmRlcmVyLmFkZENsYXNzKGJvZHlDb250YWluZXIsIGRyb3Bkb3duQ2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19