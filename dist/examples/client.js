"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const get_data_1 = require("../get-data");
const on_mutate_1 = require("../client/on-mutate");
const schema_to_dom_1 = require("../schema-to-dom");
const schemas = require("./schema");
const data = require("./data");
const populate_schema_1 = require("../populate-schema");
const valid = '✔️';
const invalid = '❌';
const unknown = '❓';
const ajv = new Ajv({
    schemaId: 'id',
    allErrors: true,
    jsonPointers: true
});
ajv.addMetaSchema(schemas.meta);
ajv.addFormat('multiline', () => true);
ajv.addFormat('password', () => true);
ajv.addFormat('tel', () => true);
ajv.addFormat('color', /^\#[a-f0-9]{6}$/);
ajv.addFormat('month', /^\d{4}-\d{2}$/);
document.addEventListener('DOMContentLoaded', () => {
    const { form, submit, select, schema, schemaSubmit, result, resultSubmit, schemaValid, formValid, resultValid } = init();
    submit.onclick = e => {
        e.preventDefault();
        onFormSubmit();
    };
    schemaSubmit.onclick = e => {
        e.preventDefault();
        onSchemaSubmit();
    };
    resultSubmit.onclick = e => {
        e.preventDefault();
        onResultSubmit();
    };
    const onFormSubmit = () => {
        const value = get_data_1.getData(form);
        result.value = JSON.stringify(value, null, 2);
        const formData = new FormData(form);
        const entries = Array.from(formData.entries()).map(([key, value]) => [key, String(value)]);
        console.log(entries);
        const isValid = isResultValid();
        resultValid.innerText = isValid ? valid : invalid;
    };
    const onSelect = () => {
        const key = select.selectedOptions[0].value;
        let currentSchema = schemas[key];
        if (key in data) {
            currentSchema = populate_schema_1.populateSchema(data[key], currentSchema);
        }
        schema.value = JSON.stringify(currentSchema, null, 2);
        form.innerHTML = '';
        result.value = '';
        onSchemaChange();
    };
    const onSchemaChange = () => {
        const isValid = isSchemaValid();
        schemaValid.innerText = isValid ? valid : invalid;
        if (!isValid) {
            form.innerHTML = '';
            result.value = '';
            formValid.innerText = unknown;
            resultValid.innerText = unknown;
            return;
        }
        onSchemaSubmit();
    };
    const onSchemaSubmit = () => {
        const currentSchema = JSON.parse(schema.value);
        const schemaDom = schema_to_dom_1.schemaToDom(currentSchema, document);
        form.innerHTML = '';
        result.value = '';
        form.appendChild(schemaDom);
        const root = document.querySelector('[data-root]');
        if (!root)
            throw Error('Could not find [data-root]');
        on_mutate_1.onMutate(root);
        onFormChange();
    };
    const onFormChange = () => {
        const isValid = isFormValid();
        formValid.innerText = isValid ? valid : invalid;
        if (!isValid) {
            const currentFocus = document.activeElement;
            form.reportValidity();
            if (currentFocus !== null)
                currentFocus.focus();
            resultValid.innerText = unknown;
            result.value = '';
            return;
        }
        onFormSubmit();
    };
    const onResultSubmit = () => {
        const resultValue = JSON.parse(result.value);
        let currentSchema = JSON.parse(schema.value);
        currentSchema = populate_schema_1.populateSchema(resultValue, currentSchema);
        schema.value = JSON.stringify(currentSchema, null, 2);
        onSchemaSubmit();
    };
    schema.oninput = onSchemaChange;
    form.oninput = onFormChange;
    select.onchange = onSelect;
    onSelect();
});
const isSchemaValid = () => {
    const schema = getCurrentSchema();
    if (!schema)
        return false;
    return ajv.validate('http://json-schema.org/draft-04/schema#', schema);
};
const isFormValid = () => {
    const form = getForm();
    if (!form)
        return false;
    return form.checkValidity();
};
const isResultValid = () => {
    const result = getResult();
    if (!result)
        return false;
    if (!isSchemaValid())
        return false;
    const currentSchema = getCurrentSchema();
    if (!currentSchema)
        return false;
    return ajv.validate(currentSchema, result);
};
const getCurrentSchema = () => {
    try {
        const schema = document.querySelector('.schema textarea');
        return JSON.parse(schema.value);
    }
    catch (_a) {
        return;
    }
};
const getForm = () => {
    const form = document.querySelector('.form form');
    if (form)
        return form;
};
const getResult = () => {
    try {
        const result = document.querySelector('.result textarea');
        return JSON.parse(result.value);
    }
    catch (_a) {
        return;
    }
};
const init = () => {
    const form = createForm();
    const submit = createFormButton();
    const select = createSelect();
    const schema = document.querySelector('.schema textarea');
    const schemaSubmit = createSchemaButton();
    const result = document.querySelector('.result textarea');
    const resultSubmit = createResultButton();
    const schemaValid = document.querySelector('.schema-valid');
    const formValid = document.querySelector('.form-valid');
    const resultValid = document.querySelector('.result-valid');
    return {
        form, submit, select, schema, schemaSubmit, result, resultSubmit,
        schemaValid, formValid, resultValid
    };
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
    submit.value = 'Update Results';
    formButtonContainer.appendChild(submit);
    return submit;
};
const createSchemaButton = () => {
    const schemaButtonContainer = document.querySelector('.schema-button');
    const schemaSubmit = document.createElement('input');
    schemaSubmit.type = 'submit';
    schemaSubmit.value = 'Update Form';
    schemaButtonContainer.appendChild(schemaSubmit);
    return schemaSubmit;
};
const createResultButton = () => {
    const resultButtonContainer = document.querySelector('.result-button');
    const resultSubmit = document.createElement('input');
    resultSubmit.type = 'submit';
    resultSubmit.value = 'Update Schema Defaults';
    resultButtonContainer.appendChild(resultSubmit);
    return resultSubmit;
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