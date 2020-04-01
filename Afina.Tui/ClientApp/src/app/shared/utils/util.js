"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toInteger(value) {
    return parseInt("" + value, 10);
}
exports.toInteger = toInteger;
function toString(value) {
    return (value !== undefined && value !== null) ? "" + value : '';
}
exports.toString = toString;
function getValueInRange(value, max, min) {
    if (min === void 0) { min = 0; }
    return Math.max(Math.min(value, max), min);
}
exports.getValueInRange = getValueInRange;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isNumber(value) {
    return !isNaN(toInteger(value));
}
exports.isNumber = isNumber;
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
exports.isInteger = isInteger;
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function padNumber(value) {
    if (isNumber(value)) {
        return ("0" + value).slice(-2);
    }
    else {
        return '';
    }
}
exports.padNumber = padNumber;
function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
exports.regExpEscape = regExpEscape;
function hasClassName(element, className) {
    return element && element.className && element.className.split &&
        element.className.split(/\s+/).indexOf(className) >= 0;
}
exports.hasClassName = hasClassName;
if (typeof Element !== 'undefined' && !Element.prototype.closest) {
    // Polyfill for ie10+
    if (!Element.prototype.matches) {
        // IE uses the non-standard name: msMatchesSelector
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) {
            return null;
        }
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
function closest(element, selector) {
    if (!selector) {
        return null;
    }
    return element.closest(selector);
}
exports.closest = closest;
function getDateString(dateT) {
    var dateTStr = dateT.day + "." + dateT.month + "." + dateT.year;
    return dateTStr;
}
exports.getDateString = getDateString;
//# sourceMappingURL=util.js.map