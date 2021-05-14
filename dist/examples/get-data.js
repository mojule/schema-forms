"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const utils_1 = require("../templates/utils");
const json_pointer_1 = require("@mojule/json-pointer");
const getData = (form) => {
    const entries = utils_1.getEntries(form, false);
    const pointers = utils_1.entriesToPointers(entries);
    const map = {};
    pointers.forEach(([pointer, value]) => {
        map[pointer] = value;
    });
    return json_pointer_1.expand(map);
};
exports.getData = getData;
//# sourceMappingURL=get-data.js.map