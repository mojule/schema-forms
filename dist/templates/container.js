"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = require("@mojule/h");
const meta_attributes_1 = require("../attributes/meta-attributes");
exports.Container = (document) => {
    const { div, script } = H(document);
    const container = (meta) => {
        const attributes = meta_attributes_1.metaAttributes(meta);
        if (meta.schema.minItems) {
            attributes.data.minItems = String(meta.schema.minItems);
        }
        if (meta.schema.maxItems) {
            attributes.data.maxItems = String(meta.schema.maxItems);
        }
        const containerEl = div(attributes);
        containerEl.classList.add('container');
        containerEl.classList.add('schema-node');
        if (meta.schema.default) {
            const json = JSON.stringify(meta.schema.default, null, 2);
            const scriptEl = script({ type: 'application/json', class: 'default-value' }, json);
            containerEl.appendChild(scriptEl);
        }
        return containerEl;
    };
    return container;
};
//# sourceMappingURL=container.js.map