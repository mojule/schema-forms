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
//# sourceMappingURL=utils.js.map