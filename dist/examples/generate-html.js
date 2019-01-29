"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const fs_1 = require("fs");
const schema_to_dom_1 = require("../schema-to-dom");
const schema_1 = require("./schema");
const { writeFile } = fs_1.promises;
const jsdom = (new jsdom_1.JSDOM(`<!doctype html>
<html>
<head>
  <meta charset="utf8">
  <title>Sandbox</title>
  <link rel="stylesheet" href="main.css">
</head>
<body>
  <form></form>
  <script src="client.js"></script>
</body>
</html>
`));
const { document } = jsdom.window;
const start = async () => {
    try {
        const formEl = document.querySelector('form');
        const schemaDom = schema_to_dom_1.schemaToDom(schema_1.all, document);
        formEl.appendChild(schemaDom);
        const submit = document.createElement('input');
        submit.type = 'submit';
        formEl.appendChild(submit);
        const html = jsdom.serialize();
        await writeFile('./examples/index.html', html, 'utf8');
    }
    catch (err) {
        console.error(err);
    }
};
start();
//# sourceMappingURL=generate-html.js.map