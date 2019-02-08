"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_data_1 = require("../get-data");
const on_mutate_1 = require("../client/on-mutate");
const schema_to_dom_1 = require("../schema-to-dom");
const schemas = require("./schema");
const data = require("./data");
const populate_schema_1 = require("../populate-schema");
document.addEventListener('DOMContentLoaded', () => {
    const { form, submit, select, schema, schemaSubmit, result } = init();
    submit.onclick = e => {
        e.preventDefault();
        onSubmit();
    };
    schemaSubmit.onclick = e => {
        e.preventDefault();
        onSchemaSubmit();
    };
    const onSubmit = () => {
        const value = get_data_1.getData(form);
        result.innerText = JSON.stringify(value, null, 2);
        const formData = new FormData(form);
        const entries = Array.from(formData.entries()).map(([key, value]) => [key, String(value)]);
        console.log(entries);
    };
    const onSelect = () => {
        const key = select.selectedOptions[0].value;
        let currentSchema = schemas[key];
        if (key in data) {
            currentSchema = populate_schema_1.populateSchema(data[key], currentSchema);
        }
        schema.value = JSON.stringify(currentSchema, null, 2);
        onSchemaSubmit();
    };
    const onSchemaSubmit = () => {
        const currentSchema = JSON.parse(schema.value);
        const schemaDom = schema_to_dom_1.schemaToDom(currentSchema, document);
        form.innerHTML = '';
        form.appendChild(schemaDom);
        const root = document.querySelector('[data-root]');
        if (!root)
            throw Error('Could not find [data-root]');
        on_mutate_1.onMutate(root);
        onSubmit();
    };
    select.onchange = onSelect;
    onSelect();
});
const init = () => {
    const form = createForm();
    const submit = createFormButton();
    const select = createSelect();
    const schema = document.querySelector('.schema textarea');
    const schemaSubmit = createSchemaButton();
    const result = document.querySelector('.result pre');
    return { form, submit, select, schema, schemaSubmit, result };
};
const createForm = () => {
    const formContainer = document.querySelector('.form');
    const form = document.createElement('form');
    formContainer.appendChild(form);
    return form;
};
const createFormButton = () => {
    const formButtonContainer = document.querySelector('.form-button');
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'View Result';
    formButtonContainer.appendChild(submit);
    return submit;
};
const createSchemaButton = () => {
    const schemaButtonContainer = document.querySelector('.schema-button');
    const schemaSubmit = document.createElement('input');
    schemaSubmit.type = 'submit';
    schemaSubmit.value = 'Create Form';
    schemaButtonContainer.appendChild(schemaSubmit);
    return schemaSubmit;
};
const createSelect = () => {
    const select = document.querySelector('header select');
    const keys = Object.keys(schemas);
    keys.forEach((key, i) => {
        const schema = schemas[key];
        const option = document.createElement('option');
        option.value = key;
        option.innerText = schema.title;
        option.selected = i === 0;
        select.appendChild(option);
    });
    return select;
};
//# sourceMappingURL=client.js.map