import { isContainer } from '../utils'
import { SchemaMetaData, FormTemplates, FormElementDecorators } from '../types'
import { JSONSchema4 } from 'json-schema'
import { GetFormElement } from './get-form-element'

export const AddSchema = (
  parentMap: Map<JSONSchema4, HTMLElement>, rootElement: HTMLElement,
  templates: FormTemplates, decorators: FormElementDecorators
) => {
  const { container, editor } = templates
  const { fieldsetDecorator, labelDecorator, nameDecorator } = decorators
  const getFormElement = GetFormElement( templates )

  const addSchema = ( meta: SchemaMetaData ) => {
    const { schema, parentSchema } = meta

    const parentElement = parentSchema && parentMap.has( parentSchema ) ?
      parentMap.get( parentSchema )! : rootElement

    let element: HTMLElement | undefined
    let isFieldset = false

    if ( isContainer( meta ) ) {
      element = container( meta )
      parentMap.set( schema, element )
      isFieldset = true
    } else {
      const formElement = getFormElement( meta )

      if ( formElement ) {
        element = editor( meta )
        element.appendChild( formElement )

        if ( formElement.dataset.enumType === 'radio' ) {
          isFieldset = true
        }
      }
    }

    if ( !element ) return

    parentElement.appendChild( element )

    if ( !isContainer( meta ) ) {
      nameDecorator( element )
      labelDecorator( element )
    }

    if ( isFieldset ) {
      fieldsetDecorator( element )
    }
  }

  return addSchema
}
