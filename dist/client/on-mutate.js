"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrayify_1 = require("./arrayify");
const selectify_1 = require("./selectify");
exports.onMutate = (element) => {
    selectify_1.selectify(element);
    arrayify_1.arrayify(element);
};
//# sourceMappingURL=on-mutate.js.map