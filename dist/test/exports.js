"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const dom_1 = require("../server/dom");
const __1 = require("..");
describe('schema-forms', () => {
    describe('exports', () => {
        describe('TypeTemplates', () => {
            const typeTemplates = (0, __1.TypeTemplates)(dom_1.document);
            const localNames = {
                array: 'div',
                boolean: 'input',
                number: 'input',
                integer: 'input',
                object: 'div',
                string: 'input'
            };
            it('has all templates', () => {
                assert(Object.keys(localNames).every(key => key in typeTemplates));
                assert(Object.keys(typeTemplates).every(key => key in localNames));
            });
            Object.keys(typeTemplates).forEach(name => {
                it(name, () => {
                    const template = typeTemplates[name];
                    const result = template({});
                    assert.strictEqual(result.localName, localNames[name]);
                });
            });
        });
        describe('ServerFormTemplates', () => {
            const formTemplates = (0, __1.ServerFormTemplates)(dom_1.document);
            const localNames = {
                array: 'fieldset',
                boolean: 'label',
                number: 'label',
                integer: 'label',
                object: 'fieldset',
                string: 'label'
            };
            it('has all templates', () => {
                assert(Object.keys(localNames).every(key => key in formTemplates));
                assert(Object.keys(formTemplates).every(key => key in localNames));
            });
            Object.keys(formTemplates).forEach(name => {
                it(name, () => {
                    const template = formTemplates[name];
                    const result = template();
                    assert.strictEqual(result.localName, localNames[name]);
                });
            });
        });
        describe('ClientFormTemplates', () => {
            const clientFormTemplates = (0, __1.ClientFormTemplates)(dom_1.document, dom_1.Event);
            const localNames = {
                array: 'fieldset',
                boolean: 'label',
                number: 'label',
                integer: 'label',
                object: 'fieldset',
                string: 'label',
                arrayList: 'fieldset',
                arrayItem: 'li'
            };
            const schemas = {
                array: { items: { type: 'string' } },
                arrayList: { items: { type: 'string' } }
            };
            it('has all templates', () => {
                assert(Object.keys(localNames).every(key => key in clientFormTemplates));
                assert(Object.keys(clientFormTemplates).every(key => key in localNames));
            });
            Object.keys(clientFormTemplates).forEach(name => {
                it(name, () => {
                    const template = clientFormTemplates[name];
                    const result = (schemas[name] ?
                        template(schemas[name]) :
                        template());
                    assert.strictEqual(result.localName, localNames[name]);
                });
            });
        });
        describe('SchemaToFormElements', () => {
            const server = (0, __1.SchemaToFormElements)((0, __1.ServerFormTemplates)(dom_1.document));
            const client = (0, __1.SchemaToFormElements)((0, __1.ClientFormTemplates)(dom_1.document, dom_1.Event));
            describe('server', () => {
                const localNames = {
                    array: 'fieldset',
                    boolean: 'label',
                    number: 'label',
                    integer: 'label',
                    object: 'fieldset',
                    string: 'label'
                };
                Object.keys(localNames).forEach(name => {
                    it(name, () => {
                        const result = server({ type: name });
                        assert.strictEqual(result.localName, localNames[name]);
                    });
                });
            });
            describe('client', () => {
                const localNames = {
                    array: 'fieldset',
                    boolean: 'label',
                    number: 'label',
                    integer: 'label',
                    object: 'fieldset',
                    string: 'label'
                };
                const schemas = {
                    array: { items: { type: 'string' } }
                };
                Object.keys(localNames).forEach(name => {
                    it(name, () => {
                        const schema = schemas[name] || {};
                        const result = client(Object.assign({ type: name }, schema));
                        assert.strictEqual(result.localName, localNames[name]);
                    });
                });
            });
            it('schema type must be a string', () => {
                assert.throws(() => server({}));
            });
            it('schema type must be a valid JSON schema type', () => {
                assert.throws(() => server({ type: 'arrayItem' }));
            });
            it('must have template for type', () => {
                const templates = { string: (0, __1.StringTemplate)(dom_1.document) };
                assert.throws(() => (0, __1.SchemaToFormElements)(templates)({ type: 'number' }));
            });
        });
    });
});
//# sourceMappingURL=exports.js.map