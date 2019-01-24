import { JSDOM } from 'jsdom'
import * as fs from 'fs'
import { schemaToDom } from '../schema-to-dom';
import { all } from '../test/fixtures';

const jsdom = ( new JSDOM( `<!doctype html>
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
` ) )

const { document } = jsdom.window

const start = async () => {
  const formEl = document.querySelector( 'form' )!
  const fragment = schemaToDom( all, document )

  formEl.appendChild( fragment )

  const submit = document.createElement( 'input' )
  submit.type = 'submit'

  formEl.appendChild( submit )

  const html = jsdom.serialize()

  fs.writeFileSync( './sandbox/index.html', html, 'utf8' )
}

start()
