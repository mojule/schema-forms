"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../templates/enum");
const label_decorator_1 = require("../decorators/label-decorator");
const name_decorator_1 = require("../decorators/name-decorator");
const on_mutate_1 = require("./on-mutate");
const utils_1 = require("../utils");
const enumEditor = enum_1.EnumEditor(document);
const labelDecorator = label_decorator_1.LabelDecorator(document);
exports.selectify = (element) => {
    const rootElement = utils_1.strictClosest(element, '[data-root]');
    rootElement.addEventListener('change', onChange);
    const selectableEls = Array.from(element.querySelectorAll('[data-one-of], [data-any-of]'));
    selectableEls.forEach(selectableEl => {
        const itemEls = Array.from(selectableEl.children);
        if (itemEls.length === 0 ||
            itemEls.some(el => el.classList.contains('selection')))
            return;
        const name = name_decorator_1.getName(selectableEl);
        const id = utils_1.pointerToSelector(name);
        const selector = createSelector(selectableEl, itemEls, id);
        selectableEl.appendChild(selector);
        labelDecorator(selector);
        const selection = createSelection(id);
        selectableEl.appendChild(selection);
        itemEls.forEach((itemEl, i) => {
            const keyEl = utils_1.inclusiveSelect(itemEl, '[data-key]');
            if (!keyEl)
                throw Error(`Expected [data-key]`);
            delete keyEl.dataset.key;
            const itemId = `${id}__${i}`;
            const template = createTemplate(itemEl, itemId);
            rootElement.appendChild(template);
        });
        choose(selection, id, '0');
    });
};
const createSelection = (id) => {
    const selection = document.createElement('div');
    selection.classList.add('selection');
    selection.id = id + '__selection';
    return selection;
};
const createSelector = (selectableEl, itemEls, id) => {
    const titles = itemEls.map((el, i) => {
        const titleEl = utils_1.inclusiveSelect(el, '[data-title]');
        return titleEl.dataset.title || String(i + 1);
    });
    const selectorEnum = {
        title: selectableEl.dataset.title || 'One Of',
        type: 'number',
        enum: Array.from(titles.keys()),
        default: 0
    };
    selectorEnum['_esTitles'] = titles;
    const selector = enumEditor({
        schema: selectorEnum,
        pointer: '',
        root: selectorEnum
    });
    selector.classList.add('selector');
    selector.dataset.templateId = id;
    selector.dataset.key = '__selector';
    return selector;
};
const createTemplate = (itemEl, id) => {
    const template = document.createElement('template');
    itemEl.classList.add('select-child');
    template.content.appendChild(itemEl);
    template.id = id;
    return template;
};
const onChange = (e) => {
    if (!(e.target instanceof HTMLElement))
        return;
    const selector = e.target.closest('.selector');
    if (!selector)
        return;
    const selection = utils_1.strictSelect(selector.parentElement, '.selection');
    const templateId = utils_1.strictData(selector, 'templateId');
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        choose(selection, templateId, e.target.value);
        const radioEls = Array.from(selector.querySelectorAll('input[type="radio"]'));
        radioEls.forEach(radioEl => {
            radioEl.checked = radioEl === e.target;
        });
    }
};
const choose = (selection, id, key) => {
    selection.innerHTML = '';
    const template = utils_1.strictSelect(document, `#${id}__${key}`);
    const fragment = template.content.cloneNode(true);
    selection.appendChild(fragment);
    name_decorator_1.nameDecorator(selection);
    on_mutate_1.onMutate(selection);
};
//# sourceMappingURL=selectify.js.map