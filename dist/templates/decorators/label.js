"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelDecorator = void 0;
const utils_1 = require("../utils");
const LabelDecorator = (document, inputTemplate, isSuffix = false) => {
    const labelDecorator = (schema = {}, name = '', value, isRequired = false) => {
        const editor = inputTemplate(schema, name, value, isRequired);
        const input = (editor.matches('input') ? editor :
            editor.querySelector('input'));
        if (input && input.type === 'hidden')
            return editor;
        const label = document.createElement('label');
        const span = document.createElement('span');
        span.innerHTML =
            `${(0, utils_1.getTitle)(schema, name, 'Input')}${isRequired ? '*' : ''}`;
        if (isSuffix) {
            label.appendChild(editor);
            label.appendChild(span);
        }
        else {
            label.appendChild(span);
            label.appendChild(editor);
        }
        return label;
    };
    return labelDecorator;
};
exports.LabelDecorator = LabelDecorator;
//# sourceMappingURL=label.js.map