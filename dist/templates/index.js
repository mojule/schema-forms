"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFormTemplates = exports.ServerFormTemplates = void 0;
const array_1 = require("./types/array");
const boolean_1 = require("./types/boolean");
const number_1 = require("./types/number");
const object_1 = require("./types/object");
const string_1 = require("./types/string");
const fieldset_1 = require("./decorators/fieldset");
const format_1 = require("./decorators/format");
const label_1 = require("./decorators/label");
const mutable_array_list_1 = require("./decorators/mutable-array-list");
const array_list_1 = require("./types/array/array-list");
const array_item_1 = require("./types/array/array-item");
const select_1 = require("./decorators/select");
const const_1 = require("./decorators/const");
const ServerFormTemplates = (document) => {
    const templates = {};
    templates.array = (0, fieldset_1.FieldsetDecorator)(document, (0, array_1.ArrayTemplate)(document, templates));
    templates.boolean = (0, label_1.LabelDecorator)(document, (0, boolean_1.BooleanTemplate)(document), true);
    templates.number = (0, label_1.LabelDecorator)(document, (0, const_1.ConstDecorator)(document, (0, number_1.NumberTemplate)(document)));
    templates.integer = templates.number;
    templates.object = (0, fieldset_1.FieldsetDecorator)(document, (0, object_1.ObjectTemplate)(document, templates));
    templates.string = (0, label_1.LabelDecorator)(document, (0, const_1.ConstDecorator)(document, (0, select_1.SelectDecorator)(document, (0, format_1.FormatDecorator)(document, {
        string: (0, string_1.StringTemplate)(document),
        multiline: (0, string_1.StringTemplate)(document, true)
    }), schema => Array.isArray(schema.enum) && schema.enum.length > 1)));
    return templates;
};
exports.ServerFormTemplates = ServerFormTemplates;
const ClientFormTemplates = (document, Event) => {
    const templates = (0, exports.ServerFormTemplates)(document);
    templates.arrayList = (0, fieldset_1.FieldsetDecorator)(document, (0, mutable_array_list_1.MutableArrayListDecorator)(document, Event, (0, array_list_1.ArrayListTemplate)(document, templates), templates));
    templates.arrayItem = (0, mutable_array_list_1.MutableArrayItemDecorator)(document, (0, array_item_1.ArrayItemTemplate)(document, templates));
    return templates;
};
exports.ClientFormTemplates = ClientFormTemplates;
//# sourceMappingURL=index.js.map