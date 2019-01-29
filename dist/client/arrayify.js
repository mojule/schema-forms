"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const on_mutate_1 = require("./on-mutate");
const name_decorator_1 = require("../decorators/name-decorator");
const utils_1 = require("../utils");
exports.arrayify = (element) => {
    const rootElement = utils_1.strictClosest(element, '[data-root]');
    rootElement.addEventListener('click', onAdd);
    rootElement.addEventListener('click', onDelete);
    const arrayEls = Array.from(element.querySelectorAll('[data-type="array"]'));
    arrayEls.forEach(arrayEl => {
        const itemEl = arrayEl.firstElementChild;
        if (!itemEl || itemEl.classList.contains('array-children'))
            return;
        const name = name_decorator_1.getName(arrayEl);
        const id = utils_1.pointerToSelector(name) + '--array';
        const title = arrayEl.dataset.title || 'Array';
        if (!rootElement.querySelector(`template#${id}`)) {
            const template = createTemplate(itemEl, title, id);
            rootElement.appendChild(template);
        }
        const ol = createArrayChildrenList(id);
        const addButton = createAddButton(title, id);
        arrayEl.appendChild(ol);
        arrayEl.appendChild(addButton);
    });
    name_decorator_1.nameDecorator(element);
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
    const deleteButton = createDeleteButton(title);
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
const createDeleteButton = (title) => {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.innerText = `Delete ${title}`;
    deleteButton.dataset.action = 'delete-array-item';
    return deleteButton;
};
const setKeys = (ol) => {
    const children = Array.from(ol.children);
    children.forEach((child, index) => child.dataset.key = String(index));
};
const onAdd = (e) => {
    if (!(e.target instanceof HTMLElement))
        return;
    if (e.target.dataset.action !== 'add-array-item')
        return;
    e.preventDefault();
    const templateId = utils_1.strictData(e.target, 'templateId');
    const templateSelector = `template#${templateId}`;
    const olSelector = `ol[data-template-id="${templateId}"]`;
    const template = utils_1.strictSelect(document, templateSelector);
    const ol = utils_1.strictSelect(document, olSelector);
    const fragment = template.content.cloneNode(true);
    const li = utils_1.strictSelect(fragment, 'li');
    ol.appendChild(li);
    setKeys(ol);
    on_mutate_1.onMutate(li);
};
const onDelete = (e) => {
    if (!(e.target instanceof HTMLElement))
        return;
    if (e.target.dataset.action !== 'delete-array-item')
        return;
    e.preventDefault();
    const li = e.target.closest('li');
    const ol = li.closest('ol');
    li.remove();
    setKeys(ol);
    on_mutate_1.onMutate(ol);
};
//# sourceMappingURL=arrayify.js.map