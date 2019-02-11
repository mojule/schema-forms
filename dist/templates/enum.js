"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = require("@mojule/h");
const utils_1 = require("../utils");
exports.EnumEditor = (document) => {
    const { select, option, div, input } = H(document);
    const enumEditor = (meta) => {
        const { schema } = meta;
        if (schema.enum === undefined || schema.enum.length < 2)
            throw Error('enum should have at least 2 members');
        if (schema.format && schema.format === 'radio') {
            return radioEditor(meta);
        }
        if (schema.enum.length < 5) {
            return radioEditor(meta);
        }
        return selectEditor(meta);
    };
    const radioEditor = ({ schema }) => {
        const container = div({ data: { enumType: 'radio' } });
        schema.enum.forEach((enumValue, i) => {
            const title = (schema._esTitles ?
                schema._esTitles[i] :
                String(enumValue));
            const attributes = {
                type: 'radio',
                value: String(enumValue),
                title
            };
            if (enumValue === schema.default) {
                attributes.checked = '';
            }
            const radio = input(attributes);
            container.appendChild(radio);
        });
        return container;
    };
    const selectEditor = (meta) => {
        const { schema } = meta;
        const attributes = {
            data: { enumType: 'select' }
        };
        if (utils_1.isRequired(meta))
            attributes.required = '';
        const element = select(attributes);
        if (!utils_1.isRequired(meta))
            element.appendChild(option());
        schema.enum.forEach((enumValue, i) => {
            const title = (schema._esTitles ?
                schema._esTitles[i] :
                String(enumValue));
            const optionAttributes = { value: String(enumValue) };
            if (enumValue === schema.default) {
                optionAttributes.selected = '';
            }
            const item = option(optionAttributes, title);
            element.appendChild(item);
        });
        return element;
    };
    return enumEditor;
};
//# sourceMappingURL=enum.js.map