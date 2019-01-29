"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrayify_1 = require("./arrayify");
const selectify_1 = require("./selectify");
exports.onMutate = (element) => {
    arrayify_1.arrayify(element);
    selectify_1.selectify(element);
};
//# sourceMappingURL=on-mutate.js.map