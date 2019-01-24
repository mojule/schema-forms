"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const fs = require("fs");
const schema_to_dom_1 = require("../schema-to-dom");
const fixtures_1 = require("../test/fixtures");
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
    const formEl = document.querySelector('form');
    const fragment = schema_to_dom_1.schemaToDom(fixtures_1.all, document);
    formEl.appendChild(fragment);
    const submit = document.createElement('input');
    submit.type = 'submit';
    formEl.appendChild(submit);
    const html = jsdom.serialize();
    fs.writeFileSync('./sandbox/index.html', html, 'utf8');
};
start();
//# sourceMappingURL=generate-html.js.map