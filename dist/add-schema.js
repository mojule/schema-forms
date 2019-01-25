"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const get_form_element_1 = require("./get-form-element");
exports.AddSchema = (parentMap, fragment, templates, decorators) => {
    const { container, editor } = templates;
    const { fieldsetDecorator, labelDecorator, nameDecorator } = decorators;
    const getFormElement = get_form_element_1.GetFormElement(templates);
    const addSchema = (meta) => {
        const { schema, parentSchema } = meta;
        const parentElement = parentSchema && parentMap.has(parentSchema) ?
            parentMap.get(parentSchema) : fragment;
        let element;
        let isFieldset = false;
        if (utils_1.isContainer(meta)) {
            element = container(meta);
            parentMap.set(schema, element);
            isFieldset = true;
        }
        else {
            const formElement = getFormElement(meta);
            if (formElement) {
                element = editor(meta);
                element.appendChild(formElement);
                if (formElement.dataset.enumType === 'radio') {
                    isFieldset = true;
                }
            }
        }
        if (!element)
            return;
        parentElement.appendChild(element);
        if (!utils_1.isContainer(meta)) {
            nameDecorator(element);
            labelDecorator(element);
        }
        if (isFieldset) {
            fieldsetDecorator(element);
        }
    };
    return addSchema;
};
//# sourceMappingURL=add-schema.js.map