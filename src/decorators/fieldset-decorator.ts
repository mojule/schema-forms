import * as H from '@mojule/h'
import { ElementDecorator } from '../types'

export const FieldsetDecorator = ( document: Document ) => {
  const { fieldset, legend } = H( document )

  const fieldsetDecorator: ElementDecorator = ( element: HTMLElement ) => {
    const { title } = element.dataset

    const fieldsetEl = fieldset( legend( title! ) )
    element.before( fieldsetEl )
    fieldsetEl.appendChild( element )

    fieldsetEl.dataset.title = title
  }

  return fieldsetDecorator
}
