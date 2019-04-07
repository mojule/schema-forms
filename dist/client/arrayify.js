"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const on_mutate_1 = require("./on-mutate");
const name_decorator_1 = require("../decorators/name-decorator");
const utils_1 = require("../utils");
const populate_form_1 = require("../populate-form");
exports.arrayify = (element) => {
    const rootElement = utils_1.strictClosest(element, '[data-root]');
    rootElement.addEventListener('click', onAdd);
    rootElement.addEventListener('click', onDelete);
    const arrayEls = Array.from(element.querySelectorAll('[data-type="array"]'));
    arrayEls.forEach(arrayEl => {
        const children = Array.from(arrayEl.children);
        const itemEl = children.find(el => el.localName !== 'script');
        const defaultScriptEl = children.find(el => el.matches('script.default-value'));
        if (!itemEl || itemEl.classList.contains('array-children'))
            return;
        const name = name_decorator_1.getName(arrayEl);
        const id = utils_1.pointerToSelector(name) + '--array';
        const itemTitle = itemEl.dataset.title || 'Item';
        if (!rootElement.querySelector(`template#${id}`)) {
            const template = createTemplate(itemEl, itemTitle, id);
            rootElement.appendChild(template);
        }
        const ol = createArrayChildrenList(id);
        const addButton = createAddButton(itemTitle, id);
        arrayEl.appendChild(ol);
        arrayEl.appendChild(addButton);
        if (defaultScriptEl) {
            const defaultValue = JSON.parse(defaultScriptEl.innerText);
            if (!Array.isArray(defaultValue))
                throw Error('Expected default value to be array');
            addDefault(ol, defaultValue, name, id);
        }
        if (arrayEl.dataset.minItems) {
            const min = Number(arrayEl.dataset.minItems);
            ensureMin(ol, min, id);
        }
    });
};
const addDefault = (ol, defaultValue, name, id) => {
    console.log('adding defaults');
    defaultValue.forEach(() => add(id));
    populate_form_1.populateForm(ol, defaultValue, name);
};
const ensureMin = (ol, min, id) => {
    let count = ol.children.length;
    while (count < min) {
        add(id);
        count = ol.children.length;
    }
};
const createArrayChildrenList = (id) => {
    const ol = document.createElement('ol');
    ol.classList.add('array-children');
    ol.dataset.templateId = id;
    return ol;
};
const createTemplate = (itemEl, title, id) => {
    const template = document.createElement('template');
    template.id = id;
    const li = document.createElement('li');
    li.appendChild(itemEl);
    const deleteButton = createDeleteButton(title, id);
    li.appendChild(deleteButton);
    template.content.appendChild(li.cloneNode(true));
    return template;
};
const createAddButton = (title, id) => {
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.innerText = `Add ${title}`;
    addButton.dataset.action = 'add-array-item';
    addButton.dataset.templateId = id;
    return addButton;
};
const createDeleteButton = (title, id) => {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.innerText = `Delete ${title}`;
    deleteButton.dataset.action = 'delete-array-item';
    deleteButton.dataset.templateId = id;
    return deleteButton;
};
const setKeys = (ol) => {
    const children = Array.from(ol.children);
    children.forEach((child, index) => child.dataset.key = String(index));
};
const add = (templateId) => {
    const templateSelector = `template#${templateId}`;
    const olSelector = `ol[data-template-id="${templateId}"]`;
    const template = utils_1.strictSelect(document, templateSelector);
    const ol = utils_1.strictSelect(document, olSelector);
    const arrayEl = ol.closest('[data-type="array"]');
    if (arrayEl.dataset.maxItems) {
        const max = Number(arrayEl.dataset.maxItems);
        if (ol.children.length === max)
            return;
    }
    const fragment = template.content.cloneNode(true);
    const li = utils_1.strictSelect(fragment, 'li');
    ol.appendChild(li);
    setKeys(ol);
    on_mutate_1.onMutate(li);
    return li;
};
const deleteItem = (button) => {
    const li = button.closest('li');
    const ol = li.closest('ol');
    const arrayEl = ol.closest('[data-type="array"]');
    const templateId = utils_1.strictData(button, 'templateId');
    li.remove();
    setKeys(ol);
    on_mutate_1.onMutate(ol);
    if (arrayEl.dataset.minItems) {
        const min = Number(arrayEl.dataset.minItems);
        ensureMin(ol, min, templateId);
    }
};
const onAdd = (e) => {
    if (!(e.target instanceof HTMLElement))
        return;
    if (e.target.dataset.action !== 'add-array-item')
        return;
    e.preventDefault();
    const templateId = utils_1.strictData(e.target, 'templateId');
    add(templateId);
};
const onDelete = (e) => {
    if (!(e.target instanceof HTMLElement))
        return;
    if (e.target.dataset.action !== 'delete-array-item')
        return;
    e.preventDefault();
    deleteItem(e.target);
};
//# sourceMappingURL=arrayify.js.map