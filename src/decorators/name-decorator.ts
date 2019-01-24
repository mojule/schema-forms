import { exclusiveClosest, inclusiveSelect } from '../utils'
import { formElementSelector } from '../form-element-selector'
import { NamedFormElement } from '../types'

export const nameDecorator = ( editor: HTMLElement ) => {
  const input = <NamedFormElement>inclusiveSelect( editor, formElementSelector )

  if ( !input ) return

  const name = getName( input )
  const { type } = editor.dataset

  input.name = `${ name }#${ type }`
}

const getName = ( el: NamedFormElement ) => {
  let name = ''
  let nextKeyEl = <HTMLElement | null>el.closest( '[data-key]' )

  while ( nextKeyEl ) {
    name = `/${ nextKeyEl.dataset.key }${ name }`
    nextKeyEl = <HTMLElement | null>exclusiveClosest( nextKeyEl, '[data-key]' )
  }

  return name
}
