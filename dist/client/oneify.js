"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../templates/enum");
const label_decorator_1 = require("../decorators/label-decorator");
const name_decorator_1 = require("../decorators/name-decorator");
const fieldset_decorator_1 = require("../decorators/fieldset-decorator");
const on_mutate_1 = require("./on-mutate");
const utils_1 = require("../utils");
const enumEditor = enum_1.EnumEditor(document);
const labelDecorator = label_decorator_1.LabelDecorator(document);
const fieldsetDecorator = fieldset_decorator_1.FieldsetDecorator(document);
exports.oneify = (element) => {
    const oneOfEls = Array.from(element.querySelectorAll('[data-one-of], [data-any-of]'));
    oneOfEls.forEach(oneOfEl => {
        const itemEls = Array.from(oneOfEl.children);
        if (itemEls.length === 0)
            return;
        const titles = itemEls.map((el, i) => {
            const titleEl = utils_1.inclusiveSelect(el, '.editor');
            return titleEl.dataset.title || String(i + 1);
        });
        const selectorEnum = {
            title: oneOfEl.dataset.title || 'One Of',
            type: 'string',
            enum: titles
        };
        const selector = enumEditor({
            schema: selectorEnum,
            pointer: '',
            root: selectorEnum
        });
        selector.classList.add('selector');
        oneOfEl.appendChild(selector);
        labelDecorator(selector);
        itemEls.forEach((itemEl, i) => {
            delete itemEl.dataset.key;
            const template = document.createElement('template');
            template.dataset.index = String(i);
            template.content.appendChild(itemEl);
            oneOfEl.appendChild(template);
        });
        const choose = (index) => {
            const existing = Array.from(oneOfEl.children);
            existing.forEach(el => {
                if (el !== selector && el.localName !== 'template')
                    el.remove();
            });
            const template = oneOfEl.querySelector(`template[data-index="${index}"]`);
            const el = template.content.cloneNode(true);
            oneOfEl.appendChild(el);
            name_decorator_1.nameDecorator(oneOfEl);
            on_mutate_1.onMutate(oneOfEl);
        };
        // could be either radios or select
        const radios = Array.from(selector.querySelectorAll('input[type="radio"]'));
        radios.forEach((input, i) => {
            input.addEventListener('click', e => {
                radios.forEach(current => current.checked = current === input);
                choose(i);
            });
            if (i === 0)
                input.checked = true;
            choose(0);
        });
        const select = selector.querySelector('select');
        if (select) {
            select.onchange = () => {
                const i = select.selectedIndex;
                choose(i);
            };
            choose(0);
        }
    });
};
//# sourceMappingURL=oneify.js.map