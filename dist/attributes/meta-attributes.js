"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaAttributes = (meta) => {
    const { schema, keyIndex, pointer } = meta;
    const { id, title } = schema;
    let type = schema.type;
    if (type === 'array' && Array.isArray(schema.items))
        type = 'tuple';
    const data = { title, pointer };
    if (type)
        data.type = type;
    if (id)
        data.id = id;
    if (keyIndex !== undefined)
        data.key = String(keyIndex);
    if (schema.enum && schema.enum.length > 1)
        data.enum = '';
    if (schema.oneOf)
        data.oneOf = '';
    if (schema.anyOf)
        data.anyOf = '';
    return { data };
};
//# sourceMappingURL=meta-attributes.js.map