"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traverse = require("@entity-schema/json-schema-traverse");
const H = require("@mojule/h");
const templates_1 = require("../templates");
const name_decorator_1 = require("../decorators/name-decorator");
const label_decorator_1 = require("../decorators/label-decorator");
const fieldset_decorator_1 = require("../decorators/fieldset-decorator");
const add_schema_1 = require("./add-schema");
exports.schemaToDom = (schema, document, templates = templates_1.Templates(document)) => {
    const { documentFragment } = H(document);
    const fragment = documentFragment();
    const parentMap = new Map();
    const labelDecorator = label_decorator_1.LabelDecorator(document);
    const fieldsetDecorator = fieldset_decorator_1.FieldsetDecorator(document);
    const decorators = {
        fieldsetDecorator, labelDecorator, nameDecorator: name_decorator_1.nameDecorator
    };
    const addSchema = add_schema_1.AddSchema(parentMap, fragment, templates, decorators);
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
//# sourceMappingURL=index.js.map