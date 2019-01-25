"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const on_mutate_1 = require("./on-mutate");
const name_decorator_1 = require("../decorators/name-decorator");
exports.arrayify = (element) => {
    const arrayEls = Array.from(element.querySelectorAll('[data-type="array"]'));
    arrayEls.forEach(arrayEl => {
        const itemEl = arrayEl.firstElementChild;
        if (!itemEl)
            return;
        const title = arrayEl.dataset.title || 'Array';
        const template = document.createElement('template');
        const ol = document.createElement('ol');
        const li = document.createElement('li');
        li.appendChild(itemEl);
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerText = `Delete ${title}`;
        deleteButton.classList.add('action-delete');
        li.appendChild(deleteButton);
        template.content.appendChild(li.cloneNode(true));
        arrayEl.appendChild(ol);
        arrayEl.appendChild(template);
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.innerText = `Add ${title}`;
        addButton.onclick = e => {
            e.preventDefault();
            const fragment = template.content.cloneNode(true);
            const li = fragment.querySelector('li');
            ol.appendChild(li);
            setKeys(ol);
            on_mutate_1.onMutate(li);
        };
        arrayEl.appendChild(addButton);
    });
    const deleteButtons = Array.from(document.querySelectorAll('button.action-delete'));
    deleteButtons.forEach(button => {
        button.onclick = e => {
            e.preventDefault();
            const li = button.closest('li');
            const ol = li.closest('ol');
            li.remove();
            setKeys(ol);
            on_mutate_1.onMutate(ol);
        };
    });
    name_decorator_1.nameDecorator(element);
};
const setKeys = (ol) => {
    const children = Array.from(ol.children);
    children.forEach((child, index) => child.dataset.key = String(index));
};
//# sourceMappingURL=arrayify.js.map