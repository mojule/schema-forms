"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectTemplate = void 0;
const utils_1 = require("../utils");
const ObjectTemplate = (document, templates = {}) => {
    const objectTemplate = (schema = {}, name = '', value) => {
        const container = document.createElement('div');
        container.title = (0, utils_1.getTitle)(schema, name, 'Object');
        if (name)
            container.dataset.name = name;
        if (!schema.properties)
            return container;
        if (typeof value === 'undefined' && typeof schema.default !== 'undefined')
            value = schema.default;
        const required = schema.required || [];
        Object.keys(schema.properties).forEach(key => {
            const childSchema = schema.properties[key];
            if (typeof childSchema === 'boolean' ||
                typeof childSchema.type !== 'string')
                return;
            const template = templates[childSchema.type];
            if (!template)
                return;
            let childValue = undefined;
            if (typeof value === 'object') {
                childValue = value[key];
            }
            const isRequired = required.includes(key);
            const childName = (0, utils_1.getChildName)(name, key);
            const editor = template(childSchema, childName, childValue, isRequired);
            container.appendChild(editor);
        });
        return container;
    };
    return objectTemplate;
};
exports.ObjectTemplate = ObjectTemplate;
//# sourceMappingURL=object.js.map