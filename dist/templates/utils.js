"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entriesToPointers = exports.keyToJsonPointer = exports.getEntries = exports.Form = exports.H = exports.getChildName = exports.getTitle = void 0;
const getTitle = (schema, name = '', fallback = 'Schema') => schema.title || name || fallback;
exports.getTitle = getTitle;
const getChildName = (name, key) => name ? `${name}[${key}]` : String(key);
exports.getChildName = getChildName;
const H = (document, name) => (attributes = {}, ...children) => {
    const el = document.createElement(name);
    Object.keys(attributes).forEach(name => el.setAttribute(name, String(attributes[name])));
    children.forEach(child => el.appendChild(child));
    return el;
};
exports.H = H;
const Form = (document) => (0, exports.H)(document, 'form');
exports.Form = Form;
const getEntries = (form, allowEmptyValue = true) => {
    const result = [];
    const editors = Array.from(form.querySelectorAll('input, textarea, select'));
    editors.forEach(editor => {
        let { name, value } = editor;
        if (!value && !allowEmptyValue) {
            return;
        }
        let typedValue = value;
        if (name.endsWith('__number') ||
            name.endsWith('__string') ||
            name.endsWith('__boolean')) {
            name = name.split('__')[0];
        }
        if (editor.type === 'number')
            typedValue = Number(typedValue);
        if (editor.type === 'checkbox')
            typedValue = editor.checked;
        result.push([name, typedValue]);
    });
    return result;
};
exports.getEntries = getEntries;
const keyToJsonPointer = (key) => {
    key = key.replace(/\]\[/g, '/');
    key = key.replace(/\[/g, '/');
    key = key.replace(/\]/g, '/');
    if (key[key.length - 1] === '/')
        key = key.substr(0, key.length - 1);
    if (!key.startsWith('/'))
        key = '/' + key;
    return key;
};
exports.keyToJsonPointer = keyToJsonPointer;
const entriesToPointers = (entries) => entries.map(([key, value]) => [(0, exports.keyToJsonPointer)(key), value]);
exports.entriesToPointers = entriesToPointers;
//# sourceMappingURL=utils.js.map