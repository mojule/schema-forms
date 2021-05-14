"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaToFormElements = void 0;
__exportStar(require("./templates/api/array-list"), exports);
__exportStar(require("./templates/decorators/fieldset"), exports);
__exportStar(require("./templates/decorators/format"), exports);
__exportStar(require("./templates/decorators/label"), exports);
__exportStar(require("./templates/decorators/mutable-array-list"), exports);
__exportStar(require("./templates/types/array"), exports);
__exportStar(require("./templates/types/boolean"), exports);
__exportStar(require("./templates/types/number"), exports);
__exportStar(require("./templates/types/object"), exports);
__exportStar(require("./templates/types/string"), exports);
__exportStar(require("./templates/types/array/array-item"), exports);
__exportStar(require("./templates/types/array/array-list"), exports);
__exportStar(require("./templates/types/array/tuple"), exports);
__exportStar(require("./templates/types"), exports);
__exportStar(require("./templates/utils"), exports);
__exportStar(require("./templates"), exports);
const SchemaToFormElements = (templates) => {
    const schemaToFormElements = (schema, name = '', value) => {
        if (typeof schema.type !== 'string')
            throw Error('Expected type to be a string');
        if (!schemaTypeNames.includes(schema.type))
            throw Error(`Expected type to be one of ${schemaTypeNames}`);
        const template = templates[schema.type];
        if (!template)
            throw Error(`No template found for ${schema.type}`);
        return template(schema, name, value);
    };
    return schemaToFormElements;
};
exports.SchemaToFormElements = SchemaToFormElements;
const schemaTypeNames = [
    'array', 'boolean', 'number', 'integer', 'object', 'string'
];
//# sourceMappingURL=index.js.map