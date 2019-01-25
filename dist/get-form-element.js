"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFormElement = (templates) => {
    const { constEditor, enumEditor, stringEditor, numberEditor, booleanEditor } = templates;
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
    return getFormElement;
};
//# sourceMappingURL=get-form-element.js.map