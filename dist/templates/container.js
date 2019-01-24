"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = require("@mojule/h");
const meta_attributes_1 = require("../attributes/meta-attributes");
exports.Container = (document) => {
    const { div } = H(document);
    const container = (meta) => {
        const attributes = meta_attributes_1.metaAttributes(meta);
        const containerEl = div(attributes);
        containerEl.classList.add('container');
        containerEl.classList.add('schema-node');
        return containerEl;
    };
    return container;
};
//# sourceMappingURL=container.js.map