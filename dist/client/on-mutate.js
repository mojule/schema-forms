"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrayify_1 = require("./arrayify");
const selectify_1 = require("./selectify");
const name_decorator_1 = require("../decorators/name-decorator");
const consts_1 = require("../consts");
exports.onMutate = (element) => {
    arrayify_1.arrayify(element);
    selectify_1.selectify(element);
    const namedElements = element.querySelectorAll(consts_1.formElementSelector);
    namedElements.forEach(el => name_decorator_1.nameDecorator(el));
    exports.triggerInputOnForm(element);
};
exports.triggerInputOnForm = (el) => {
    const form = el.closest('form');
    if (form) {
        const event = new Event('input');
        form.dispatchEvent(event);
    }
};
//# sourceMappingURL=on-mutate.js.map