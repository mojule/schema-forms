"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("@mojule/json-pointer");
const consts_1 = require("./consts");
exports.getData = (parent) => {
    const flat = {};
    const namedElements = Array.from(parent.querySelectorAll(consts_1.formElementSelector));
    namedElements.forEach(namedElement => {
        const [name] = namedElement.name.split('#');
        const editor = namedElement.closest('.editor');
        if (!editor)
            return;
        const type = editor.dataset.type;
        let value;
        if (namedElement.localName === 'select') {
            const select = namedElement;
            if (!select.willValidate)
                return;
            const options = Array.from(select.children);
            options.forEach(option => {
                if (option.selected)
                    value = option.value;
            });
        }
        else if (namedElement.localName === 'textarea') {
            const textarea = namedElement;
            if (!textarea.willValidate)
                return;
            value = textarea.value;
        }
        else if (namedElement.localName === 'input') {
            const input = namedElement;
            if (!input.willValidate)
                return;
            if (input.type === 'checkbox') {
                if (input.checked)
                    value = true;
            }
            else if (input.type === 'radio') {
                if (input.checked) {
                    value = input.value;
                }
                else {
                    return;
                }
            }
            else {
                value = input.value;
            }
        }
        if (value === '' && !namedElement.matches(':required'))
            return;
        if (type === 'integer')
            value = parseInt(value, 10);
        if (type === 'number')
            value = parseFloat(value);
        if (type === 'boolean')
            value = !!value;
        if (type === 'null')
            value = null;
        flat[name] = value;
    });
    const data = json_pointer_1.expand(flat);
    return data;
};
//# sourceMappingURL=get-data.js.map