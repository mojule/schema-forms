"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormExample = void 0;
const contactForm = require("../schema/contact-form.schema.json");
const object_1 = require("../templates/types/object");
const string_1 = require("../templates/types/string");
const label_1 = require("../templates/decorators/label");
const fieldset_1 = require("../templates/decorators/fieldset");
const format_1 = require("../templates/decorators/format");
const utils_1 = require("../templates/utils");
const dom_1 = require("../server/dom");
const schema = contactForm;
const stringTemplate = (0, string_1.StringTemplate)(dom_1.document);
const objectTemplate = (0, object_1.ObjectTemplate)(dom_1.document, { string: stringTemplate });
const unnamed = objectTemplate(schema);
const named = objectTemplate(schema, 'contact');
const multilineStringTemplate = (0, string_1.StringTemplate)(dom_1.document, true);
const formattedStringTemplate = (0, format_1.FormatDecorator)(dom_1.document, {
    string: stringTemplate,
    multiline: multilineStringTemplate
});
const labelledStringTemplate = (0, label_1.LabelDecorator)(dom_1.document, formattedStringTemplate);
const labelledObjectTemplate = (0, object_1.ObjectTemplate)(dom_1.document, { string: labelledStringTemplate });
const fieldsetObjectTemplate = (0, fieldset_1.FieldsetDecorator)(dom_1.document, labelledObjectTemplate);
const decorated = fieldsetObjectTemplate(schema);
const unnamedEntries = (0, utils_1.getEntries)((0, dom_1.form)({}, unnamed));
const namedEntries = (0, utils_1.getEntries)((0, dom_1.form)({}, unnamed));
exports.contactFormExample = {
    'Unnamed Contact Form': unnamed.outerHTML,
    'Named Contact Form': named.outerHTML,
    'Decorated Contact Form': decorated.outerHTML,
    'Unnamed Contact Form Data': JSON.stringify(unnamedEntries, null, 2),
    'Named Contact Form Data': JSON.stringify(namedEntries, null, 2),
    "Unnamed Contact Form Pointers": JSON.stringify((0, utils_1.entriesToPointers)(unnamedEntries), null, 2),
    "Named Contact Form Pointers": JSON.stringify((0, utils_1.entriesToPointers)(namedEntries), null, 2)
};
//# sourceMappingURL=contact-form.js.map