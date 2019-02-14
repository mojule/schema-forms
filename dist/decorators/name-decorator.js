"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const consts_1 = require("../consts");
exports.nameDecorator = (editor) => {
    const input = utils_1.inclusiveSelect(editor, consts_1.formElementSelector);
    if (!input)
        return;
    const selectorAncestor = input.closest('.selector');
    if (selectorAncestor)
        return;
    const name = exports.getName(input);
    const typeAncestor = editor.closest('[data-type]');
    const type = typeAncestor ? typeAncestor.dataset.type : 'string';
    input.name = `${name}#${type}`;
};
exports.getName = (el) => {
    let name = '';
    let nextKeyEl = el.closest('[data-key]');
    while (nextKeyEl) {
        name = `/${nextKeyEl.dataset.key}${name}`;
        nextKeyEl = utils_1.exclusiveClosest(nextKeyEl, '[data-key]');
    }
    return name;
};
//# sourceMappingURL=name-decorator.js.map