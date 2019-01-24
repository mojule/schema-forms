"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_data_1 = require("../get-data");
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const submit = document.querySelector('input[type="submit"]');
    submit.onclick = e => {
        e.preventDefault();
        const value = get_data_1.getData(form);
        console.log(value);
        const formData = new FormData(form);
        const entries = Array.from(formData.entries()).map(([key, value]) => [key, String(value)]);
        console.log(entries);
    };
});
//# sourceMappingURL=client.js.map