"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringTemplate = void 0;
const utils_1 = require("../utils");
const StringTemplate = (document, isMultiline = false) => {
    const stringTemplate = (schema = {}, name = '', value, isRequired = false) => {
        let editor;
        if (isMultiline) {
            editor = document.createElement('textarea');
        }
        else {
            editor = document.createElement('input');
            editor.type = 'text';
            if (schema.pattern) {
                editor.pattern = schema.pattern;
            }
        }
        editor.title = (0, utils_1.getTitle)(schema, name, 'String');
        if (isRequired)
            editor.setAttribute('required', '');
        if (name)
            editor.name = name;
        if (typeof value === 'string') {
            editor.defaultValue = value;
        }
        else if (typeof schema.default === 'string') {
            editor.defaultValue = schema.default;
        }
        if (typeof schema.minLength === 'number') {
            editor.minLength = schema.minLength;
        }
        if (typeof schema.maxLength === 'number') {
            editor.maxLength = schema.maxLength;
        }
        return editor;
    };
    return stringTemplate;
};
exports.StringTemplate = StringTemplate;
//# sourceMappingURL=string.js.map