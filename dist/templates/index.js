"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = require("./boolean");
const const_1 = require("./const");
const container_1 = require("./container");
const editor_1 = require("./editor");
const enum_1 = require("./enum");
const number_1 = require("./number");
const string_1 = require("./string");
exports.Templates = (document) => {
    const booleanEditor = boolean_1.BooleanEditor(document);
    const constEditor = const_1.ConstEditor(document);
    const container = container_1.Container(document);
    const editor = editor_1.Editor(document);
    const enumEditor = enum_1.EnumEditor(document);
    const numberEditor = number_1.NumberEditor(document);
    const stringEditor = string_1.StringEditor(document);
    return {
        booleanEditor, constEditor, container, editor, enumEditor, numberEditor,
        stringEditor
    };
};
//# sourceMappingURL=index.js.map