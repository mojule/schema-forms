import { exclusiveClosest, inclusiveSelect } from '../utils'
import { formElementSelector } from '../consts'
import { NamedFormElement, ElementDecorator } from '../types'

export const nameDecorator: ElementDecorator = ( editor: HTMLElement ) => {
  const input = <NamedFormElement>inclusiveSelect( editor, formElementSelector )

  if ( !input ) return

  const selectorAncestor = input.closest( '.selector' )

  if( selectorAncestor ) return

  const name = getName( input )
  const { type } = editor.dataset

  input.name = `${ name }#${ type }`
}

export const getName = ( el: HTMLElement ) => {
  let name = ''
  let nextKeyEl = <HTMLElement | null>el.closest( '[data-key]' )

  while ( nextKeyEl ) {
    name = `/${ nextKeyEl.dataset.key }${ name }`
    nextKeyEl = <HTMLElement | null>exclusiveClosest( nextKeyEl, '[data-key]' )
  }

  return name
}
