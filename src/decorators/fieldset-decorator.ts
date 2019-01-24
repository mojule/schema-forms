import * as H from '@mojule/h'

export const FieldsetDecorator = ( document: Document ) => {
  const { fieldset, legend } = H( document )

  const fieldsetDecorator = ( element: HTMLElement ) => {
    const { title } = element.dataset

    const fieldsetEl = fieldset( legend( title! ) )
    element.before( fieldsetEl )
    fieldsetEl.appendChild( element )
  }

  return fieldsetDecorator
}
