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
export class NgbModalStack {
    /**
     * @param {?} _applicationRef
     * @param {?} _injector
     * @param {?} _document
     * @param {?} _scrollBar
     * @param {?} _rendererFactory
     */
    constructor(_applicationRef, _injector, _document, _scrollBar, _rendererFactory) {
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
        () => {
            if (this._windowCmpts.length) {
                /** @type {?} */
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
                this._revertAriaHidden();
                this._setAriaHidden(activeWindowCmpt.location.nativeElement);
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
    open(moduleCFR, contentInjector, content, options) {
        /** @type {?} */
        const containerEl = isDefined(options.container) ? this._document.querySelector(options.container) : this._document.body;
        /** @type {?} */
        const renderer = this._rendererFactory.createRenderer(null, null);
        /** @type {?} */
        const revertPaddingForScrollBar = this._scrollBar.compensate();
        /** @type {?} */
        const removeBodyClass = (/**
         * @return {?}
         */
        () => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
                this._revertAriaHidden();
            }
        });
        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        /** @type {?} */
        const activeModal = new NgbActiveModal();
        /** @type {?} */
        const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);
        /** @type {?} */
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : null;
        /** @type {?} */
        let windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        /** @type {?} */
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = (/**
         * @param {?} result
         * @return {?}
         */
        (result) => { ngbModalRef.close(result); });
        activeModal.dismiss = (/**
         * @param {?} reason
         * @return {?}
         */
        (reason) => { ngbModalRef.dismiss(reason); });
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    }
    /**
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalRefs.forEach((/**
     * @param {?} ngbModalRef
     * @return {?}
     */
    ngbModalRef => ngbModalRef.dismiss(reason))); }
    /**
     * @return {?}
     */
    hasOpenModals() { return this._modalRefs.length > 0; }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    _attachBackdrop(moduleCFR, containerEl) {
        /** @type {?} */
        let backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        /** @type {?} */
        let backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    _attachWindowComponent(moduleCFR, containerEl, contentRef) {
        /** @type {?} */
        let windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        /** @type {?} */
        let windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    /**
     * @private
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    _applyWindowOptions(windowInstance, options) {
        this._windowAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        (optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        }));
    }
    /**
     * @private
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    _applyBackdropOptions(backdropInstance, options) {
        this._backdropAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        (optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        }));
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    _getContentRef(moduleCFR, contentInjector, content, activeModal) {
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
    }
    /**
     * @private
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    _createFromTemplateRef(content, activeModal) {
        /** @type {?} */
        const context = {
            $implicit: activeModal,
            /**
             * @param {?} result
             * @return {?}
             */
            close(result) { activeModal.close(result); },
            /**
             * @param {?} reason
             * @return {?}
             */
            dismiss(reason) { activeModal.dismiss(reason); }
        };
        /** @type {?} */
        const viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    _createFromString(content) {
        /** @type {?} */
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @return {?}
     */
    _createFromComponent(moduleCFR, contentInjector, content, context) {
        /** @type {?} */
        const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        /** @type {?} */
        const modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        /** @type {?} */
        const componentRef = contentCmptFactory.create(modalContentInjector);
        this._applicationRef.attachView(componentRef.hostView);
        return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    _setAriaHidden(element) {
        /** @type {?} */
        const parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach((/**
             * @param {?} sibling
             * @return {?}
             */
            sibling => {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }));
            this._setAriaHidden(parent);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _revertAriaHidden() {
        this._ariaHiddenValues.forEach((/**
         * @param {?} value
         * @param {?} element
         * @return {?}
         */
        (value, element) => {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        }));
        this._ariaHiddenValues.clear();
    }
    /**
     * @private
     * @param {?} ngbModalRef
     * @return {?}
     */
    _registerModalRef(ngbModalRef) {
        /** @type {?} */
        const unregisterModalRef = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
            }
        });
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    /**
     * @private
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        }));
    }
}
NgbModalStack.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
NgbModalStack.ctorParameters = () => [
    { type: ApplicationRef },
    { type: Injector },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ScrollBar },
    { type: RendererFactory2 }
];
/** @nocollapse */ NgbModalStack.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i2.ScrollBar), i0.ɵɵinject(i0.RendererFactory2)); }, token: NgbModalStack, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc3RhY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFHZCxNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUc5QyxNQUFNLE9BQU8sYUFBYTs7Ozs7Ozs7SUFTeEIsWUFDWSxlQUErQixFQUFVLFNBQW1CLEVBQTRCLFNBQWMsRUFDdEcsVUFBcUIsRUFBVSxnQkFBa0M7UUFEakUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUE0QixjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQ3RHLGVBQVUsR0FBVixVQUFVLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBVnJFLGdDQUEyQixHQUFHLElBQUksT0FBTyxF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Q0FBQyxDQUFDO1FBQ2xDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsYUFBMkM7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksRUFBRSxDQUFDO1FBRXhDLGFBQWEsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7O2tCQUNyQixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ3RELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3pDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFoTUYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OztZQW5COUIsY0FBYztZQUtkLFFBQVE7NENBeUJtRSxNQUFNLFNBQUMsUUFBUTtZQWpCcEYsU0FBUztZQVBmLGdCQUFnQjs7Ozs7Ozs7SUFlaEIsb0RBQW9EOzs7OztJQUNwRCwwQ0FBNEQ7Ozs7O0lBQzVELDRDQUFnRDs7Ozs7SUFDaEQsbUNBQXVDOzs7OztJQUN2QywwQ0FDZ0c7Ozs7O0lBQ2hHLHFDQUEwRDs7Ozs7SUFHdEQsd0NBQXVDOzs7OztJQUFFLGtDQUEyQjs7Ozs7SUFBRSxrQ0FBd0M7Ozs7O0lBQzlHLG1DQUE2Qjs7Ozs7SUFBRSx5Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBSZW5kZXJlckZhY3RvcnkyLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge25nYkZvY3VzVHJhcH0gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcbmltcG9ydCB7Q29udGVudFJlZn0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQge1Njcm9sbEJhcn0gZnJvbSAnLi4vdXRpbC9zY3JvbGxiYXInO1xuaW1wb3J0IHtpc0RlZmluZWQsIGlzU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcbmltcG9ydCB7TmdiQWN0aXZlTW9kYWwsIE5nYk1vZGFsUmVmfSBmcm9tICcuL21vZGFsLXJlZic7XG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsU3RhY2sge1xuICBwcml2YXRlIF9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2FyaWFIaWRkZW5WYWx1ZXM6IE1hcDxFbGVtZW50LCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuICBwcml2YXRlIF9iYWNrZHJvcEF0dHJpYnV0ZXMgPSBbJ2JhY2tkcm9wQ2xhc3MnXTtcbiAgcHJpdmF0ZSBfbW9kYWxSZWZzOiBOZ2JNb2RhbFJlZltdID0gW107XG4gIHByaXZhdGUgX3dpbmRvd0F0dHJpYnV0ZXMgPVxuICAgICAgWydhcmlhTGFiZWxsZWRCeScsICdiYWNrZHJvcCcsICdjZW50ZXJlZCcsICdrZXlib2FyZCcsICdzY3JvbGxhYmxlJywgJ3NpemUnLCAnd2luZG93Q2xhc3MnXTtcbiAgcHJpdmF0ZSBfd2luZG93Q21wdHM6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9zY3JvbGxCYXI6IFNjcm9sbEJhciwgcHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7XG4gICAgLy8gVHJhcCBmb2N1cyBvbiBhY3RpdmUgV2luZG93Q21wdFxuICAgIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fd2luZG93Q21wdHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVdpbmRvd0NtcHQgPSB0aGlzLl93aW5kb3dDbXB0c1t0aGlzLl93aW5kb3dDbXB0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgbmdiRm9jdXNUcmFwKGFjdGl2ZVdpbmRvd0NtcHQubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQpO1xuICAgICAgICB0aGlzLl9yZXZlcnRBcmlhSGlkZGVuKCk7XG4gICAgICAgIHRoaXMuX3NldEFyaWFIaWRkZW4oYWN0aXZlV2luZG93Q21wdC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4obW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSwgb3B0aW9ucyk6IE5nYk1vZGFsUmVmIHtcbiAgICBjb25zdCBjb250YWluZXJFbCA9XG4gICAgICAgIGlzRGVmaW5lZChvcHRpb25zLmNvbnRhaW5lcikgPyB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuY29udGFpbmVyKSA6IHRoaXMuX2RvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG5cbiAgICBjb25zdCByZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyID0gdGhpcy5fc2Nyb2xsQmFyLmNvbXBlbnNhdGUoKTtcbiAgICBjb25zdCByZW1vdmVCb2R5Q2xhc3MgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX21vZGFsUmVmcy5sZW5ndGgpIHtcbiAgICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJ0QXJpYUhpZGRlbigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoIWNvbnRhaW5lckVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzcGVjaWZpZWQgbW9kYWwgY29udGFpbmVyIFwiJHtvcHRpb25zLmNvbnRhaW5lciB8fCAnYm9keSd9XCIgd2FzIG5vdCBmb3VuZCBpbiB0aGUgRE9NLmApO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZU1vZGFsID0gbmV3IE5nYkFjdGl2ZU1vZGFsKCk7XG4gICAgY29uc3QgY29udGVudFJlZiA9IHRoaXMuX2dldENvbnRlbnRSZWYobW9kdWxlQ0ZSLCBvcHRpb25zLmluamVjdG9yIHx8IGNvbnRlbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlTW9kYWwpO1xuXG4gICAgbGV0IGJhY2tkcm9wQ21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+ID1cbiAgICAgICAgb3B0aW9ucy5iYWNrZHJvcCAhPT0gZmFsc2UgPyB0aGlzLl9hdHRhY2hCYWNrZHJvcChtb2R1bGVDRlIsIGNvbnRhaW5lckVsKSA6IG51bGw7XG4gICAgbGV0IHdpbmRvd0NtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4gPSB0aGlzLl9hdHRhY2hXaW5kb3dDb21wb25lbnQobW9kdWxlQ0ZSLCBjb250YWluZXJFbCwgY29udGVudFJlZik7XG4gICAgbGV0IG5nYk1vZGFsUmVmOiBOZ2JNb2RhbFJlZiA9IG5ldyBOZ2JNb2RhbFJlZih3aW5kb3dDbXB0UmVmLCBjb250ZW50UmVmLCBiYWNrZHJvcENtcHRSZWYsIG9wdGlvbnMuYmVmb3JlRGlzbWlzcyk7XG5cbiAgICB0aGlzLl9yZWdpc3Rlck1vZGFsUmVmKG5nYk1vZGFsUmVmKTtcbiAgICB0aGlzLl9yZWdpc3RlcldpbmRvd0NtcHQod2luZG93Q21wdFJlZik7XG4gICAgbmdiTW9kYWxSZWYucmVzdWx0LnRoZW4ocmV2ZXJ0UGFkZGluZ0ZvclNjcm9sbEJhciwgcmV2ZXJ0UGFkZGluZ0ZvclNjcm9sbEJhcik7XG4gICAgbmdiTW9kYWxSZWYucmVzdWx0LnRoZW4ocmVtb3ZlQm9keUNsYXNzLCByZW1vdmVCb2R5Q2xhc3MpO1xuICAgIGFjdGl2ZU1vZGFsLmNsb3NlID0gKHJlc3VsdDogYW55KSA9PiB7IG5nYk1vZGFsUmVmLmNsb3NlKHJlc3VsdCk7IH07XG4gICAgYWN0aXZlTW9kYWwuZGlzbWlzcyA9IChyZWFzb246IGFueSkgPT4geyBuZ2JNb2RhbFJlZi5kaXNtaXNzKHJlYXNvbik7IH07XG5cbiAgICB0aGlzLl9hcHBseVdpbmRvd09wdGlvbnMod2luZG93Q21wdFJlZi5pbnN0YW5jZSwgb3B0aW9ucyk7XG4gICAgaWYgKHRoaXMuX21vZGFsUmVmcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgfVxuXG4gICAgaWYgKGJhY2tkcm9wQ21wdFJlZiAmJiBiYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2FwcGx5QmFja2Ryb3BPcHRpb25zKGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBuZ2JNb2RhbFJlZjtcbiAgfVxuXG4gIGRpc21pc3NBbGwocmVhc29uPzogYW55KSB7IHRoaXMuX21vZGFsUmVmcy5mb3JFYWNoKG5nYk1vZGFsUmVmID0+IG5nYk1vZGFsUmVmLmRpc21pc3MocmVhc29uKSk7IH1cblxuICBoYXNPcGVuTW9kYWxzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbW9kYWxSZWZzLmxlbmd0aCA+IDA7IH1cblxuICBwcml2YXRlIF9hdHRhY2hCYWNrZHJvcChtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGFpbmVyRWw6IGFueSk6IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPiB7XG4gICAgbGV0IGJhY2tkcm9wRmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JNb2RhbEJhY2tkcm9wKTtcbiAgICBsZXQgYmFja2Ryb3BDbXB0UmVmID0gYmFja2Ryb3BGYWN0b3J5LmNyZWF0ZSh0aGlzLl9pbmplY3Rvcik7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhiYWNrZHJvcENtcHRSZWYuaG9zdFZpZXcpO1xuICAgIGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKGJhY2tkcm9wQ21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICByZXR1cm4gYmFja2Ryb3BDbXB0UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNoV2luZG93Q29tcG9uZW50KG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250YWluZXJFbDogYW55LCBjb250ZW50UmVmOiBhbnkpOlxuICAgICAgQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiB7XG4gICAgbGV0IHdpbmRvd0ZhY3RvcnkgPSBtb2R1bGVDRlIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdiTW9kYWxXaW5kb3cpO1xuICAgIGxldCB3aW5kb3dDbXB0UmVmID0gd2luZG93RmFjdG9yeS5jcmVhdGUodGhpcy5faW5qZWN0b3IsIGNvbnRlbnRSZWYubm9kZXMpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcod2luZG93Q21wdFJlZi5ob3N0Vmlldyk7XG4gICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQod2luZG93Q21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICByZXR1cm4gd2luZG93Q21wdFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5V2luZG93T3B0aW9ucyh3aW5kb3dJbnN0YW5jZTogTmdiTW9kYWxXaW5kb3csIG9wdGlvbnM6IE9iamVjdCk6IHZvaWQge1xuICAgIHRoaXMuX3dpbmRvd0F0dHJpYnV0ZXMuZm9yRWFjaCgob3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoaXNEZWZpbmVkKG9wdGlvbnNbb3B0aW9uTmFtZV0pKSB7XG4gICAgICAgIHdpbmRvd0luc3RhbmNlW29wdGlvbk5hbWVdID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5QmFja2Ryb3BPcHRpb25zKGJhY2tkcm9wSW5zdGFuY2U6IE5nYk1vZGFsQmFja2Ryb3AsIG9wdGlvbnM6IE9iamVjdCk6IHZvaWQge1xuICAgIHRoaXMuX2JhY2tkcm9wQXR0cmlidXRlcy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcbiAgICAgICAgYmFja2Ryb3BJbnN0YW5jZVtvcHRpb25OYW1lXSA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb250ZW50UmVmKFxuICAgICAgbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSxcbiAgICAgIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtdKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZihjb250ZW50LCBhY3RpdmVNb2RhbCk7XG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tQ29tcG9uZW50KG1vZHVsZUNGUiwgY29udGVudEluamVjdG9yLCBjb250ZW50LCBhY3RpdmVNb2RhbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbVRlbXBsYXRlUmVmKGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT4sIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAkaW1wbGljaXQ6IGFjdGl2ZU1vZGFsLFxuICAgICAgY2xvc2UocmVzdWx0KSB7IGFjdGl2ZU1vZGFsLmNsb3NlKHJlc3VsdCk7IH0sXG4gICAgICBkaXNtaXNzKHJlYXNvbikgeyBhY3RpdmVNb2RhbC5kaXNtaXNzKHJlYXNvbik7IH1cbiAgICB9O1xuICAgIGNvbnN0IHZpZXdSZWYgPSBjb250ZW50LmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0KTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHZpZXdSZWYpO1xuICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudDogc3RyaW5nKTogQ29udGVudFJlZiB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7Y29udGVudH1gKTtcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnRdXSk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVGcm9tQ29tcG9uZW50KFxuICAgICAgbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSxcbiAgICAgIGNvbnRleHQ6IE5nYkFjdGl2ZU1vZGFsKTogQ29udGVudFJlZiB7XG4gICAgY29uc3QgY29udGVudENtcHRGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbnRlbnQpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudEluamVjdG9yID1cbiAgICAgICAgSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogTmdiQWN0aXZlTW9kYWwsIHVzZVZhbHVlOiBjb250ZXh0fV0sIHBhcmVudDogY29udGVudEluamVjdG9yfSk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gY29udGVudENtcHRGYWN0b3J5LmNyZWF0ZShtb2RhbENvbnRlbnRJbmplY3Rvcik7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbW2NvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XV0sIGNvbXBvbmVudFJlZi5ob3N0VmlldywgY29tcG9uZW50UmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEFyaWFIaWRkZW4oZWxlbWVudDogRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBpZiAocGFyZW50ICYmIGVsZW1lbnQgIT09IHRoaXMuX2RvY3VtZW50LmJvZHkpIHtcbiAgICAgIEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKS5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICBpZiAoc2libGluZyAhPT0gZWxlbWVudCAmJiBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU0NSSVBUJykge1xuICAgICAgICAgIHRoaXMuX2FyaWFIaWRkZW5WYWx1ZXMuc2V0KHNpYmxpbmcsIHNpYmxpbmcuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpKTtcbiAgICAgICAgICBzaWJsaW5nLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fc2V0QXJpYUhpZGRlbihwYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JldmVydEFyaWFIaWRkZW4oKSB7XG4gICAgdGhpcy5fYXJpYUhpZGRlblZhbHVlcy5mb3JFYWNoKCh2YWx1ZSwgZWxlbWVudCkgPT4ge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2FyaWFIaWRkZW5WYWx1ZXMuY2xlYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyTW9kYWxSZWYobmdiTW9kYWxSZWY6IE5nYk1vZGFsUmVmKSB7XG4gICAgY29uc3QgdW5yZWdpc3Rlck1vZGFsUmVmID0gKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9tb2RhbFJlZnMuaW5kZXhPZihuZ2JNb2RhbFJlZik7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLl9tb2RhbFJlZnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuX21vZGFsUmVmcy5wdXNoKG5nYk1vZGFsUmVmKTtcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbih1bnJlZ2lzdGVyTW9kYWxSZWYsIHVucmVnaXN0ZXJNb2RhbFJlZik7XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3RlcldpbmRvd0NtcHQobmdiV2luZG93Q21wdDogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93Pikge1xuICAgIHRoaXMuX3dpbmRvd0NtcHRzLnB1c2gobmdiV2luZG93Q21wdCk7XG4gICAgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQubmV4dCgpO1xuXG4gICAgbmdiV2luZG93Q21wdC5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl93aW5kb3dDbXB0cy5pbmRleE9mKG5nYldpbmRvd0NtcHQpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5fd2luZG93Q21wdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQubmV4dCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=