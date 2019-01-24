"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const form_element_selector_1 = require("../form-element-selector");
exports.nameDecorator = (editor) => {
    const input = utils_1.inclusiveSelect(editor, form_element_selector_1.formElementSelector);
    if (!input)
        return;
    const name = getName(input);
    const { type } = editor.dataset;
    input.name = `${name}#${type}`;
};
const getName = (el) => {
    let name = '';
    let nextKeyEl = el.closest('[data-key]');
    while (nextKeyEl) {
        name = `/${nextKeyEl.dataset.key}${name}`;
        nextKeyEl = utils_1.exclusiveClosest(nextKeyEl, '[data-key]');
    }
    return name;
};
//# sourceMappingURL=name-decorator.js.map