"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traverse = require("@entity-schema/json-schema-traverse");
const H = require("@mojule/h");
const templates_1 = require("./templates");
const name_decorator_1 = require("./decorators/name-decorator");
const label_decorator_1 = require("./decorators/label-decorator");
const fieldset_decorator_1 = require("./decorators/fieldset-decorator");
exports.schemaToDom = (schema, document, templates = templates_1.Templates(document)) => {
    const { documentFragment } = H(document);
    const fragment = documentFragment();
    const parentMap = new Map();
    const labelDecorator = label_decorator_1.LabelDecorator(document);
    const fieldsetDecorator = fieldset_decorator_1.FieldsetDecorator(document);
    const { container, editor, constEditor, enumEditor, stringEditor, numberEditor, booleanEditor } = templates;
    const getFormElement = (meta) => {
        const { schema } = meta;
        if (schema.enum) {
            if (schema.enum.length === 1) {
                return constEditor(meta);
            }
            else if (schema.enum.length > 1) {
                return enumEditor(meta);
            }
        }
        else if (schema.type === 'string') {
            return stringEditor(meta);
        }
        else if (schema.type === 'number' || schema.type === 'integer') {
            return numberEditor(meta);
        }
        else if (schema.type === 'boolean') {
            return booleanEditor(meta);
        }
        else if (schema.type === 'null') {
            schema.enum = [null];
            return constEditor(meta);
        }
    };
    const addSchema = (meta) => {
        const { schema, parentSchema } = meta;
        const parentElement = parentSchema && parentMap.has(parentSchema) ?
            parentMap.get(parentSchema) : fragment;
        let element;
        let isFieldset = false;
        if (isContainer(meta)) {
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
        if (!isContainer(meta)) {
            name_decorator_1.nameDecorator(element);
            labelDecorator(element);
        }
        if (isFieldset) {
            fieldsetDecorator(element);
        }
    };
    const onSchema = (schema, pointer, root, parentPointer, parentKeyword, parentSchema, keyIndex) => {
        const meta = {
            schema, pointer, root, parentPointer, parentKeyword, parentSchema,
            keyIndex
        };
        addSchema(meta);
    };
    traverse(schema, { cb: onSchema });
    return fragment;
};
const isContainer = ({ schema }) => (schema.type === 'object' || schema.type === 'array' || schema.oneOf ||
    schema.anyOf);
//# sourceMappingURL=schema-to-dom.js.map