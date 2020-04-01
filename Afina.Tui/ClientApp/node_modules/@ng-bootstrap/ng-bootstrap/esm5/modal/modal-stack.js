/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Inject, Injectable, Injector, RendererFactory2, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { ngbFocusTrap } from '../util/focus-trap';
import { ContentRef } from '../util/popup';
import { ScrollBar } from '../util/scrollbar';
import { isDefined, isString } from '../util/util';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../util/scrollbar";
var NgbModalStack = /** @class */ (function () {
    function NgbModalStack(_applicationRef, _injector, _document, _scrollBar, _rendererFactory) {
        var _this = this;
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._backdropAttributes = ['backdropClass'];
        this._modalRefs = [];
        this._windowAttributes = ['ariaLabelledBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size', 'windowClass'];
        this._windowCmpts = [];
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this._windowCmpts.length) {
                /** @type {?} */
                var activeWindowCmpt = _this._windowCmpts[_this._windowCmpts.length - 1];
                ngbFocusTrap(activeWindowCmpt.location.nativeElement, _this._activeWindowCmptHasChanged);
                _this._revertAriaHidden();
                _this._setAriaHidden(activeWindowCmpt.location.nativeElement);
            }
        }));
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype.open = /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, options) {
        var _this = this;
        /** @type {?} */
        var containerEl = isDefined(options.container) ? this._document.querySelector(options.container) : this._document.body;
        /** @type {?} */
        var renderer = this._rendererFactory.createRenderer(null, null);
        /** @type {?} */
        var revertPaddingForScrollBar = this._scrollBar.compensate();
        /** @type {?} */
        var removeBodyClass = (/**
         * @return {?}
         */
        function () {
            if (!_this._modalRefs.length) {
                renderer.removeClass(_this._document.body, 'modal-open');
                _this._revertAriaHidden();
            }
        });
        if (!containerEl) {
            throw new Error("The specified modal container \"" + (options.container || 'body') + "\" was not found in the DOM.");
        }
        /** @type {?} */
        var activeModal = new NgbActiveModal();
        /** @type {?} */
        var contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);
        /** @type {?} */
        var backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : null;
        /** @type {?} */
        var windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        /** @type {?} */
        var ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = (/**
         * @param {?} result
         * @return {?}
         */
        function (result) { ngbModalRef.close(result); });
        activeModal.dismiss = (/**
         * @param {?} reason
         * @return {?}
         */
        function (reason) { ngbModalRef.dismiss(reason); });
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    };
    /**
     * @param {?=} reason
     * @return {?}
     */
    NgbModalStack.prototype.dismissAll = /**
     * @param {?=} reason
     * @return {?}
     */
    function (reason) { this._modalRefs.forEach((/**
     * @param {?} ngbModalRef
     * @return {?}
     */
    function (ngbModalRef) { return ngbModalRef.dismiss(reason); })); };
    /**
     * @return {?}
     */
    NgbModalStack.prototype.hasOpenModals = /**
     * @return {?}
     */
    function () { return this._modalRefs.length > 0; };
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    NgbModalStack.prototype._attachBackdrop = /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    function (moduleCFR, containerEl) {
        /** @type {?} */
        var backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        /** @type {?} */
        var backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    };
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    NgbModalStack.prototype._attachWindowComponent = /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    function (moduleCFR, containerEl, contentRef) {
        /** @type {?} */
        var windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        /** @type {?} */
        var windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    };
    /**
     * @private
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype._applyWindowOptions = /**
     * @private
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    function (windowInstance, options) {
        this._windowAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        function (optionName) {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        }));
    };
    /**
     * @private
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype._applyBackdropOptions = /**
     * @private
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    function (backdropInstance, options) {
        this._backdropAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        function (optionName) {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        }));
    };
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    NgbModalStack.prototype._getContentRef = /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, activeModal) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal);
        }
    };
    /**
     * @private
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    NgbModalStack.prototype._createFromTemplateRef = /**
     * @private
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    function (content, activeModal) {
        /** @type {?} */
        var context = {
            $implicit: activeModal,
            close: /**
             * @param {?} result
             * @return {?}
             */
            function (result) { activeModal.close(result); },
            dismiss: /**
             * @param {?} reason
             * @return {?}
             */
            function (reason) { activeModal.dismiss(reason); }
        };
        /** @type {?} */
        var viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    };
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    NgbModalStack.prototype._createFromString = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var component = this._document.createTextNode("" + content);
        return new ContentRef([[component]]);
    };
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @return {?}
     */
    NgbModalStack.prototype._createFromComponent = /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, context) {
        /** @type {?} */
        var contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        /** @type {?} */
        var modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        /** @type {?} */
        var componentRef = contentCmptFactory.create(modalContentInjector);
        this._applicationRef.attachView(componentRef.hostView);
        return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    NgbModalStack.prototype._setAriaHidden = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        /** @type {?} */
        var parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach((/**
             * @param {?} sibling
             * @return {?}
             */
            function (sibling) {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    _this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }));
            this._setAriaHidden(parent);
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgbModalStack.prototype._revertAriaHidden = /**
     * @private
     * @return {?}
     */
    function () {
        this._ariaHiddenValues.forEach((/**
         * @param {?} value
         * @param {?} element
         * @return {?}
         */
        function (value, element) {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        }));
        this._ariaHiddenValues.clear();
    };
    /**
     * @private
     * @param {?} ngbModalRef
     * @return {?}
     */
    NgbModalStack.prototype._registerModalRef = /**
     * @private
     * @param {?} ngbModalRef
     * @return {?}
     */
    function (ngbModalRef) {
        var _this = this;
        /** @type {?} */
        var unregisterModalRef = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = _this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                _this._modalRefs.splice(index, 1);
            }
        });
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    };
    /**
     * @private
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    NgbModalStack.prototype._registerWindowCmpt = /**
     * @private
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    function (ngbWindowCmpt) {
        var _this = this;
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = _this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                _this._windowCmpts.splice(index, 1);
                _this._activeWindowCmptHasChanged.next();
            }
        }));
    };
    NgbModalStack.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    NgbModalStack.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: Injector },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ScrollBar },
        { type: RendererFactory2 }
    ]; };
    /** @nocollapse */ NgbModalStack.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i2.ScrollBar), i0.ɵɵinject(i0.RendererFactory2)); }, token: NgbModalStack, providedIn: "root" });
    return NgbModalStack;
}());
export { NgbModalStack };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._activeWindowCmptHasChanged;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._ariaHiddenValues;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._backdropAttributes;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._modalRefs;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._windowAttributes;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._windowCmpts;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._applicationRef;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._document;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._scrollBar;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._rendererFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc3RhY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFHZCxNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUU5QztJQVVFLHVCQUNZLGVBQStCLEVBQVUsU0FBbUIsRUFBNEIsU0FBYyxFQUN0RyxVQUFxQixFQUFVLGdCQUFrQztRQUY3RSxpQkFZQztRQVhXLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBNEIsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUN0RyxlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVZyRSxnQ0FBMkIsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FB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a0NBQXdDOzs7OztJQUM5RyxtQ0FBNkI7Ozs7O0lBQUUseUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgUmVuZGVyZXJGYWN0b3J5MixcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtuZ2JGb2N1c1RyYXB9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5pbXBvcnQge0NvbnRlbnRSZWZ9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHtTY3JvbGxCYXJ9IGZyb20gJy4uL3V0aWwvc2Nyb2xsYmFyJztcbmltcG9ydCB7aXNEZWZpbmVkLCBpc1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQge05nYkFjdGl2ZU1vZGFsLCBOZ2JNb2RhbFJlZn0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuaW1wb3J0IHtOZ2JNb2RhbFdpbmRvd30gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFN0YWNrIHtcbiAgcHJpdmF0ZSBfYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIF9hcmlhSGlkZGVuVmFsdWVzOiBNYXA8RWxlbWVudCwgc3RyaW5nPiA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSBfYmFja2Ryb3BBdHRyaWJ1dGVzID0gWydiYWNrZHJvcENsYXNzJ107XG4gIHByaXZhdGUgX21vZGFsUmVmczogTmdiTW9kYWxSZWZbXSA9IFtdO1xuICBwcml2YXRlIF93aW5kb3dBdHRyaWJ1dGVzID1cbiAgICAgIFsnYXJpYUxhYmVsbGVkQnknLCAnYmFja2Ryb3AnLCAnY2VudGVyZWQnLCAna2V5Ym9hcmQnLCAnc2Nyb2xsYWJsZScsICdzaXplJywgJ3dpbmRvd0NsYXNzJ107XG4gIHByaXZhdGUgX3dpbmRvd0NtcHRzOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2FwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZiwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgICAgcHJpdmF0ZSBfc2Nyb2xsQmFyOiBTY3JvbGxCYXIsIHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mikge1xuICAgIC8vIFRyYXAgZm9jdXMgb24gYWN0aXZlIFdpbmRvd0NtcHRcbiAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhY3RpdmVXaW5kb3dDbXB0ID0gdGhpcy5fd2luZG93Q21wdHNbdGhpcy5fd2luZG93Q21wdHMubGVuZ3RoIC0gMV07XG4gICAgICAgIG5nYkZvY3VzVHJhcChhY3RpdmVXaW5kb3dDbXB0LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJ0QXJpYUhpZGRlbigpO1xuICAgICAgICB0aGlzLl9zZXRBcmlhSGlkZGVuKGFjdGl2ZVdpbmRvd0NtcHQubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvcGVuKG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksIG9wdGlvbnMpOiBOZ2JNb2RhbFJlZiB7XG4gICAgY29uc3QgY29udGFpbmVyRWwgPVxuICAgICAgICBpc0RlZmluZWQob3B0aW9ucy5jb250YWluZXIpID8gdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmNvbnRhaW5lcikgOiB0aGlzLl9kb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuXG4gICAgY29uc3QgcmV2ZXJ0UGFkZGluZ0ZvclNjcm9sbEJhciA9IHRoaXMuX3Njcm9sbEJhci5jb21wZW5zYXRlKCk7XG4gICAgY29uc3QgcmVtb3ZlQm9keUNsYXNzID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9tb2RhbFJlZnMubGVuZ3RoKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgICAgIHRoaXMuX3JldmVydEFyaWFIaWRkZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFjb250YWluZXJFbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc3BlY2lmaWVkIG1vZGFsIGNvbnRhaW5lciBcIiR7b3B0aW9ucy5jb250YWluZXIgfHwgJ2JvZHknfVwiIHdhcyBub3QgZm91bmQgaW4gdGhlIERPTS5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVNb2RhbCA9IG5ldyBOZ2JBY3RpdmVNb2RhbCgpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSB0aGlzLl9nZXRDb250ZW50UmVmKG1vZHVsZUNGUiwgb3B0aW9ucy5pbmplY3RvciB8fCBjb250ZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsKTtcblxuICAgIGxldCBiYWNrZHJvcENtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPiA9XG4gICAgICAgIG9wdGlvbnMuYmFja2Ryb3AgIT09IGZhbHNlID8gdGhpcy5fYXR0YWNoQmFja2Ryb3AobW9kdWxlQ0ZSLCBjb250YWluZXJFbCkgOiBudWxsO1xuICAgIGxldCB3aW5kb3dDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+ID0gdGhpcy5fYXR0YWNoV2luZG93Q29tcG9uZW50KG1vZHVsZUNGUiwgY29udGFpbmVyRWwsIGNvbnRlbnRSZWYpO1xuICAgIGxldCBuZ2JNb2RhbFJlZjogTmdiTW9kYWxSZWYgPSBuZXcgTmdiTW9kYWxSZWYod2luZG93Q21wdFJlZiwgY29udGVudFJlZiwgYmFja2Ryb3BDbXB0UmVmLCBvcHRpb25zLmJlZm9yZURpc21pc3MpO1xuXG4gICAgdGhpcy5fcmVnaXN0ZXJNb2RhbFJlZihuZ2JNb2RhbFJlZik7XG4gICAgdGhpcy5fcmVnaXN0ZXJXaW5kb3dDbXB0KHdpbmRvd0NtcHRSZWYpO1xuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIsIHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIpO1xuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHJlbW92ZUJvZHlDbGFzcywgcmVtb3ZlQm9keUNsYXNzKTtcbiAgICBhY3RpdmVNb2RhbC5jbG9zZSA9IChyZXN1bHQ6IGFueSkgPT4geyBuZ2JNb2RhbFJlZi5jbG9zZShyZXN1bHQpOyB9O1xuICAgIGFjdGl2ZU1vZGFsLmRpc21pc3MgPSAocmVhc29uOiBhbnkpID0+IHsgbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pOyB9O1xuXG4gICAgdGhpcy5fYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0NtcHRSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgIGlmICh0aGlzLl9tb2RhbFJlZnMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuICAgIH1cblxuICAgIGlmIChiYWNrZHJvcENtcHRSZWYgJiYgYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9hcHBseUJhY2tkcm9wT3B0aW9ucyhiYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gbmdiTW9kYWxSZWY7XG4gIH1cblxuICBkaXNtaXNzQWxsKHJlYXNvbj86IGFueSkgeyB0aGlzLl9tb2RhbFJlZnMuZm9yRWFjaChuZ2JNb2RhbFJlZiA9PiBuZ2JNb2RhbFJlZi5kaXNtaXNzKHJlYXNvbikpOyB9XG5cbiAgaGFzT3Blbk1vZGFscygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX21vZGFsUmVmcy5sZW5ndGggPiAwOyB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNoQmFja2Ryb3AobW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRhaW5lckVsOiBhbnkpOiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4ge1xuICAgIGxldCBiYWNrZHJvcEZhY3RvcnkgPSBtb2R1bGVDRlIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdiTW9kYWxCYWNrZHJvcCk7XG4gICAgbGV0IGJhY2tkcm9wQ21wdFJlZiA9IGJhY2tkcm9wRmFjdG9yeS5jcmVhdGUodGhpcy5faW5qZWN0b3IpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoYmFja2Ryb3BDbXB0UmVmLmhvc3RWaWV3KTtcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZChiYWNrZHJvcENtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgcmV0dXJuIGJhY2tkcm9wQ21wdFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaFdpbmRvd0NvbXBvbmVudChtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGFpbmVyRWw6IGFueSwgY29udGVudFJlZjogYW55KTpcbiAgICAgIENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4ge1xuICAgIGxldCB3aW5kb3dGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nYk1vZGFsV2luZG93KTtcbiAgICBsZXQgd2luZG93Q21wdFJlZiA9IHdpbmRvd0ZhY3RvcnkuY3JlYXRlKHRoaXMuX2luamVjdG9yLCBjb250ZW50UmVmLm5vZGVzKTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHdpbmRvd0NtcHRSZWYuaG9zdFZpZXcpO1xuICAgIGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHdpbmRvd0NtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgcmV0dXJuIHdpbmRvd0NtcHRSZWY7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseVdpbmRvd09wdGlvbnMod2luZG93SW5zdGFuY2U6IE5nYk1vZGFsV2luZG93LCBvcHRpb25zOiBPYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLl93aW5kb3dBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xuICAgICAgICB3aW5kb3dJbnN0YW5jZVtvcHRpb25OYW1lXSA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUJhY2tkcm9wT3B0aW9ucyhiYWNrZHJvcEluc3RhbmNlOiBOZ2JNb2RhbEJhY2tkcm9wLCBvcHRpb25zOiBPYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLl9iYWNrZHJvcEF0dHJpYnV0ZXMuZm9yRWFjaCgob3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoaXNEZWZpbmVkKG9wdGlvbnNbb3B0aW9uTmFtZV0pKSB7XG4gICAgICAgIGJhY2tkcm9wSW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29udGVudFJlZihcbiAgICAgIG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksXG4gICAgICBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XG4gICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudCwgYWN0aXZlTW9kYWwpO1xuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlRnJvbUNvbXBvbmVudChtb2R1bGVDRlIsIGNvbnRlbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlTW9kYWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZihjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+LCBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgJGltcGxpY2l0OiBhY3RpdmVNb2RhbCxcbiAgICAgIGNsb3NlKHJlc3VsdCkgeyBhY3RpdmVNb2RhbC5jbG9zZShyZXN1bHQpOyB9LFxuICAgICAgZGlzbWlzcyhyZWFzb24pIHsgYWN0aXZlTW9kYWwuZGlzbWlzcyhyZWFzb24pOyB9XG4gICAgfTtcbiAgICBjb25zdCB2aWV3UmVmID0gY29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCk7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh2aWV3UmVmKTtcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW3ZpZXdSZWYucm9vdE5vZGVzXSwgdmlld1JlZik7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IENvbnRlbnRSZWYge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2NvbnRlbnR9YCk7XG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50XV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbUNvbXBvbmVudChcbiAgICAgIG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksXG4gICAgICBjb250ZXh0OiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xuICAgIGNvbnN0IGNvbnRlbnRDbXB0RmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb250ZW50KTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnRJbmplY3RvciA9XG4gICAgICAgIEluamVjdG9yLmNyZWF0ZSh7cHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5nYkFjdGl2ZU1vZGFsLCB1c2VWYWx1ZTogY29udGV4dH1dLCBwYXJlbnQ6IGNvbnRlbnRJbmplY3Rvcn0pO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbnRlbnRDbXB0RmFjdG9yeS5jcmVhdGUobW9kYWxDb250ZW50SW5qZWN0b3IpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dLCBjb21wb25lbnRSZWYuaG9zdFZpZXcsIGNvbXBvbmVudFJlZik7XG4gIH1cblxuICBwcml2YXRlIF9zZXRBcmlhSGlkZGVuKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudCAmJiBlbGVtZW50ICE9PSB0aGlzLl9kb2N1bWVudC5ib2R5KSB7XG4gICAgICBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgICAgaWYgKHNpYmxpbmcgIT09IGVsZW1lbnQgJiYgc2libGluZy5ub2RlTmFtZSAhPT0gJ1NDUklQVCcpIHtcbiAgICAgICAgICB0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLnNldChzaWJsaW5nLCBzaWJsaW5nLmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSk7XG4gICAgICAgICAgc2libGluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3NldEFyaWFIaWRkZW4ocGFyZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXZlcnRBcmlhSGlkZGVuKCkge1xuICAgIHRoaXMuX2FyaWFIaWRkZW5WYWx1ZXMuZm9yRWFjaCgodmFsdWUsIGVsZW1lbnQpID0+IHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3Rlck1vZGFsUmVmKG5nYk1vZGFsUmVmOiBOZ2JNb2RhbFJlZikge1xuICAgIGNvbnN0IHVucmVnaXN0ZXJNb2RhbFJlZiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbW9kYWxSZWZzLmluZGV4T2YobmdiTW9kYWxSZWYpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5fbW9kYWxSZWZzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLl9tb2RhbFJlZnMucHVzaChuZ2JNb2RhbFJlZik7XG4gICAgbmdiTW9kYWxSZWYucmVzdWx0LnRoZW4odW5yZWdpc3Rlck1vZGFsUmVmLCB1bnJlZ2lzdGVyTW9kYWxSZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJXaW5kb3dDbXB0KG5nYldpbmRvd0NtcHQ6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4pIHtcbiAgICB0aGlzLl93aW5kb3dDbXB0cy5wdXNoKG5nYldpbmRvd0NtcHQpO1xuICAgIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLm5leHQoKTtcblxuICAgIG5nYldpbmRvd0NtcHQub25EZXN0cm95KCgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fd2luZG93Q21wdHMuaW5kZXhPZihuZ2JXaW5kb3dDbXB0KTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuX3dpbmRvd0NtcHRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLm5leHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19