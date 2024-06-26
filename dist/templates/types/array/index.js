"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayTemplate = void 0;
const tuple_1 = require("./tuple");
const array_list_1 = require("./array-list");
const ArrayTemplate = (document, templates = {}) => {
    const arrayTemplate = (schema = {}, name = '', value) => {
        if (typeof value === 'undefined' &&
            Array.isArray(schema.default)) {
            value = schema.default;
        }
        if (Array.isArray(schema.items)) {
            if (templates.tuple) {
                return templates.tuple(schema, name, value);
            }
            return (0, tuple_1.TupleTemplate)(document, templates)(schema, name, value);
        }
        if (templates.arrayList) {
            return templates.arrayList(schema, name, value);
        }
        return (0, array_list_1.ArrayListTemplate)(document, templates)(schema, name, value);
    };
    return arrayTemplate;
};
exports.ArrayTemplate = ArrayTemplate;
//# sourceMappingURL=index.js.map