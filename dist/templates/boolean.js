"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = require("@mojule/h");
exports.BooleanEditor = (document) => {
    const { input } = H(document);
    const booleanEditor = ({ schema }) => {
        const title = schema.title || 'Boolean';
        const attributes = { type: 'checkbox', title };
        if (schema.default) {
            attributes.checked = '';
        }
        const element = input(attributes);
        return element;
    };
    return booleanEditor;
};
//# sourceMappingURL=boolean.js.map