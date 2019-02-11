"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("@mojule/json-pointer");
const utils_1 = require("./utils");
exports.populateForm = (root, value, pointerPrefix = '') => {
    const flat = json_pointer_1.flatten(value);
    Object.keys(flat).forEach(pointer => {
        const currentValue = flat[pointer];
        const formPointer = pointerPrefix + pointer;
        const el = root.querySelector(`[name^="${formPointer}#"]`);
        if (!el)
            return;
        // check for select, enums etc
        if (utils_1.isCheckbox(el)) {
            el.checked = currentValue;
        }
        else if (utils_1.isInputOrTextarea(el)) {
            el.value = String(currentValue);
        }
        console.log('Populating', formPointer, currentValue, el);
    });
};
//# sourceMappingURL=populate-form.js.map