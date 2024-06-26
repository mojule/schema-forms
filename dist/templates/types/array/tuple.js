"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TupleTemplate = void 0;
const utils_1 = require("../../utils");
const TupleTemplate = (document, templates = {}) => {
    const tupleTemplate = (schema = {}, name = '', value, isRequired = false) => {
        const container = document.createElement('div');
        container.title = (0, utils_1.getTitle)(schema, name, 'Tuple');
        if (name)
            container.dataset.name = name;
        if (!Array.isArray(schema.items))
            return container;
        if (typeof value === 'undefined' && Array.isArray(schema.default))
            value = schema.default;
        schema.items.forEach((childSchema, key) => {
            if (typeof childSchema === 'boolean' ||
                typeof childSchema.type !== 'string')
                return;
            const template = templates[childSchema.type];
            if (!template)
                return;
            let childValue = undefined;
            if (Array.isArray(value)) {
                childValue = value[key];
            }
            const childName = (0, utils_1.getChildName)(name, key);
            const editor = template(childSchema, childName, childValue, isRequired);
            container.appendChild(editor);
        });
        return container;
    };
    return tupleTemplate;
};
exports.TupleTemplate = TupleTemplate;
//# sourceMappingURL=tuple.js.map