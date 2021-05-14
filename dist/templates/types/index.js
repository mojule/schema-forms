"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeTemplates = void 0;
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const number_1 = require("./number");
const object_1 = require("./object");
const string_1 = require("./string");
const TypeTemplates = (document) => {
    const templates = {};
    templates.array = array_1.ArrayTemplate(document, templates);
    templates.boolean = boolean_1.BooleanTemplate(document);
    templates.number = number_1.NumberTemplate(document);
    templates.integer = templates.number;
    templates.object = object_1.ObjectTemplate(document, templates);
    templates.string = string_1.StringTemplate(document);
    return templates;
};
exports.TypeTemplates = TypeTemplates;
//# sourceMappingURL=index.js.map