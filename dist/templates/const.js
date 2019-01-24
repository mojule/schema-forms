"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = require("@mojule/h");
exports.ConstEditor = (document) => {
    const { input } = H(document);
    const constEditor = ({ schema }) => {
        const attributes = { type: 'hidden' };
        if (schema.enum && schema.enum.length === 1) {
            attributes.value = String(schema.enum[0]);
        }
        else if (schema.default) {
            attributes.value = String(schema.default);
        }
        else {
            throw Error('No value provided for input[hidden]');
        }
        const element = input(attributes);
        return element;
    };
    return constEditor;
};
//# sourceMappingURL=const.js.map