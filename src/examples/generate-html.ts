import { JSDOM } from 'jsdom'
import { promises } from 'fs'
import { schemaToDom } from '../schema-to-dom'
import { all } from './schema'

const { writeFile } = promises

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
  try {
    const formEl = document.querySelector( 'form' )!
    const schemaDom = schemaToDom( all, document )

    formEl.appendChild( schemaDom )

    const submit = document.createElement( 'input' )
    submit.type = 'submit'

    formEl.appendChild( submit )

    const html = jsdom.serialize()

    await writeFile( './examples/index.html', html, 'utf8' )

  } catch( err ){
    console.error( err )
  }
}

start()
