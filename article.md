# Creating HTML forms with JSON Schema

Provides a toolkit that is flexible enough to use for a number of different
scenarios:

- Create very simple forms without writing any schema
- Create simple forms by writing basic schema
- Create advanced forms from schema
- Extend the functionality yourself to cover any use case

Use just what you need. Works in the browser or on the server.

## The simplest case

Create individual input elements:

```js
import { StringTemplate } from '@mojule/schema-forms'

// if on the server, use jsdom or similar to get a document instance
const createTextInput = StringTemplate( window.document )

// myInput is just a DOM element
const myInput = createTextInput()

console.log( myInput.outerHTML )
```

```html
<input type="text">
```

Create a named input element:

```js
// the first argument is an empty JSON schema, the second the element's name
const foo = inputText( {}, 'foo' )
```

```html
<input type="text" name="foo">
```
