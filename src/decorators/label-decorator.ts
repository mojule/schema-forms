import * as H from '@mojule/h'
import { NamedFormElement, ElementDecorator } from '../types'
import { formElementSelector } from '../consts'

export const LabelDecorator = ( document: Document ) => {
  const { label, span } = H( document )

  const labelDecorator: ElementDecorator = ( editor: HTMLElement ) => {
    const inputs = <NamedFormElement[]>Array.from(
      editor.querySelectorAll( formElementSelector )
    )

    inputs.forEach( input => {
      if ( !input ) return

      const title = input.title || editor.dataset.title

      if ( !title ) return

      const inputLabel = label()

      input.before( inputLabel )
      inputLabel.appendChild( input )

      if ( input.type === 'checkbox' || input.type === 'radio' ) {
        input.after( span( ` ${ title }` ) )
      } else if ( input.type !== 'hidden' ) {
        input.before( span( `${ title } ` ) )
      }
    })
  }

  return labelDecorator
}
