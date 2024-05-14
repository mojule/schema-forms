"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanTemplate = void 0;
const utils_1 = require("../utils");
const BooleanTemplate = (document) => {
    const booleanTemplate = (schema = {}, name = '', value) => {
        const editor = document.createElement('input');
        editor.type = 'checkbox';
        editor.title = (0, utils_1.getTitle)(schema, name, 'Boolean');
        if (Array.isArray(schema.enum) &&
            schema.enum.length === 1 &&
            schema.enum[0] === true)
            editor.setAttribute('required', '');
        if (name)
            editor.name = name;
        if (typeof value === 'boolean') {
            if (value)
                editor.setAttribute('checked', '');
        }
        else if (typeof schema.default === 'boolean') {
            if (schema.default)
                editor.setAttribute('checked', '');
        }
        return editor;
    };
    return booleanTemplate;
};
exports.BooleanTemplate = BooleanTemplate;
//# sourceMappingURL=boolean.js.map