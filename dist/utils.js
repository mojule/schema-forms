"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclusiveClosest = (el, selector) => {
    if (!el.parentElement)
        return;
    return el.parentElement.closest(selector);
};
exports.inclusiveSelect = (el, selector) => {
    if (el.matches(selector))
        return el;
    return el.querySelector(selector);
};
exports.isContainer = ({ schema }) => (schema.type === 'object' || schema.type === 'array' || schema.oneOf ||
    schema.anyOf);
exports.isRequired = (meta) => {
    if (meta.keyIndex && meta.parentSchema &&
        Array.isArray(meta.parentSchema.required) &&
        meta.parentSchema.required.includes(String(meta.keyIndex)))
        return true;
    return false;
};
exports.pointerToSelector = (pointer) => pointer.replace(/\//g, '__');
exports.strictSelect = (el, selector) => {
    const result = el.querySelector(selector);
    if (!result)
        throw Error(`Expected ${selector}`);
    return result;
};
exports.strictData = (el, key) => {
    const result = el.dataset[key];
    if (!result)
        throw Error(`Expected dataset[ '${key}' ]`);
    return result;
};
exports.strictClosest = (el, selector) => {
    const result = el.closest(selector);
    if (!result)
        throw Error(`Expected ${selector}`);
    return result;
};
exports.randomId = () => '_' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
exports.isCheckbox = (el) => el.matches('input[type="checkbox"]');
exports.isInput = (el) => el.localName === 'input';
exports.isInputOrTextarea = (el) => exports.isInput(el) || el.localName === 'textarea';
//# sourceMappingURL=utils.js.map