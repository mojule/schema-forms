"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traverse = require("@entity-schema/json-schema-traverse");
const json_pointer_1 = require("@mojule/json-pointer");
exports.populateSchema = (value, schema) => {
    schema = JSON.parse(JSON.stringify(schema));
    const parentMap = new Map();
    const keyIndexMap = new Map();
    const getPointer = (schema) => {
        let path = keyIndexMap.has(schema) ? keyIndexMap.get(schema) : '';
        const parent = parentMap.get(schema);
        if (parent)
            return getPointer(parent) + '/' + path;
        return path;
    };
    const onSchema = (schema, pointer, root, parentPointer, parentKeyword, parentSchema, keyIndex) => {
        if (parentSchema) {
            parentMap.set(schema, parentSchema);
        }
        if (keyIndex) {
            keyIndexMap.set(schema, String(keyIndex));
        }
        const valuePointer = getPointer(schema);
        if (valuePointer !== '') {
            const currentValue = json_pointer_1.get(value, valuePointer);
            if (currentValue !== undefined) {
                schema.default = currentValue;
            }
        }
    };
    traverse(schema, { cb: onSchema });
    return schema;
};
//# sourceMappingURL=populate-schema.js.map