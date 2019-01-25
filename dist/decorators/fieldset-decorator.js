"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = require("@mojule/h");
exports.FieldsetDecorator = (document) => {
    const { fieldset, legend } = H(document);
    const fieldsetDecorator = (element) => {
        const { title } = element.dataset;
        const fieldsetEl = fieldset(legend(title));
        element.before(fieldsetEl);
        fieldsetEl.appendChild(element);
        fieldsetEl.dataset.title = title;
    };
    return fieldsetDecorator;
};
//# sourceMappingURL=fieldset-decorator.js.map