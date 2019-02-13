import { expand } from '@mojule/json-pointer'
import { NamedFormElement } from './types'
import { formElementSelector } from './consts'

export const getData = ( parent: ParentNode ) => {
  const flat: any = {}

  const namedElements = <NamedFormElement[]>Array.from(
    parent.querySelectorAll( formElementSelector )
  )

  namedElements.forEach( namedElement => {
    const [ name ] = namedElement.name.split( '#' )
    const editor = <HTMLElement>namedElement.closest( '.editor' )

    if( !editor ) return

    const type = editor.dataset.type!

    let value: any

    if ( namedElement.localName === 'select' ) {
      const select = <HTMLSelectElement>namedElement

      if( !select.willValidate ) return

      const options = <HTMLOptionElement[]>Array.from( select.children )

      options.forEach( option => {
        if( option.selected ) value = option.value
      })
    } else if ( namedElement.localName === 'textarea' ) {
      const textarea = <HTMLTextAreaElement>namedElement

      if ( !textarea.willValidate ) return

      value = textarea.value
    } else if ( namedElement.localName === 'input' ) {
      const input = <HTMLInputElement>namedElement

      if ( !input.willValidate ) return

      if ( input.type === 'checkbox' ) {
        if( input.checked ) value = true
      } else if( input.type === 'radio' ) {
        if ( input.checked ){
          value = input.value
        } else {
          return
        }
      } else {
        value = input.value
      }
    }

    if( value === '' && !namedElement.matches( ':required' ) ) return

    if ( type === 'integer' ) value = parseInt( value, 10 )
    if ( type === 'number' ) value = parseFloat( value )
    if ( type === 'boolean' ) value = !!value
    if ( type === 'null' ) value = null

    flat[ name ] = value
  } )

  const data = expand( flat )

  return data
}