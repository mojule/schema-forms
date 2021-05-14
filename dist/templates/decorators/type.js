"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDecorator = void 0;
const TypeDecorator = (_document, inputTemplate) => {
    const typeDecorator = (schema = {}, name = '', value, isRequired = false) => {
        if (typeof schema.type === 'string')
            name = `${name}__${schema.type}`;
        return inputTemplate(schema, name, value, isRequired);
    };
    return typeDecorator;
};
exports.TypeDecorator = TypeDecorator;
//# sourceMappingURL=type.js.map