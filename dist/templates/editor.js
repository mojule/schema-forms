"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = require("@mojule/h");
const meta_attributes_1 = require("../attributes/meta-attributes");
exports.Editor = (document) => {
    const { div } = H(document);
    const editor = (meta) => {
        const attributes = meta_attributes_1.metaAttributes(meta);
        const containerEl = div(attributes);
        containerEl.classList.add('editor');
        containerEl.classList.add('schema-node');
        return containerEl;
    };
    return editor;
};
//# sourceMappingURL=editor.js.map