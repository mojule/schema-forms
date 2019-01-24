"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = require("@mojule/h");
const utils_1 = require("../utils");
exports.NumberEditor = (document) => {
    const { input } = H(document);
    const numberEditor = (meta) => {
        const { schema } = meta;
        const title = schema.title || 'Number';
        const attributes = { type: 'number', title };
        if (utils_1.isRequired(meta))
            attributes.required = '';
        if (schema.type === 'integer') {
            attributes.step = String(schema.multipleOf || 1);
        }
        else if (schema.multipleOf) {
            attributes.step = String(schema.multipleOf);
        }
        if ('minimum' in schema) {
            attributes.min = String(schema.minimum);
        }
        if ('maximum' in schema) {
            attributes.max = String(schema.maximum);
        }
        if (attributes.min && attributes.max && schema.format === 'range') {
            attributes.type = 'range';
        }
        if (schema.default)
            attributes.value = String(schema.default);
        const element = input(attributes);
        return element;
    };
    return numberEditor;
};
//# sourceMappingURL=number.js.map