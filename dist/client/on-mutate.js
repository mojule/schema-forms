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
};
//# sourceMappingURL=on-mutate.js.map