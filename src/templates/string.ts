import * as H from '@mojule/h'
import { SchemaMetaData, TemplateFactory } from '../types'
import { isRequired } from '../utils'

const formatToType = {
  'date-time': 'datetime-local',
  uri: 'url'
}

export const StringEditor: TemplateFactory = ( document: Document ) => {
  const { input, textarea } = H( document )

  const stringEditor = ( meta: SchemaMetaData ) => {
    const { schema } = meta

    if( schema.format === 'multiline' ) return textareaEditor( meta )

    return textEditor( meta )
  }

  const textEditor = ( meta: SchemaMetaData ) => {
    const { schema } = meta
    const attributes = stringAttributes( meta )

    if ( isRequired( meta ) ) attributes.required = ''

    if( 'pattern' in schema ){
      attributes.pattern = schema.pattern
    }

    let type = 'text'

    if( schema.format ){
      if ( schema.format in formatToType ){
        type = formatToType[ schema.format ]
      } else {
        type = schema.format
      }
    }

    attributes.type = type

    if( schema.default ) attributes.value = String( schema.default )

    const element = input( attributes )

    return element
  }

  const textareaEditor = ( meta: SchemaMetaData ) => {
    const { schema } = meta
    const attributes = stringAttributes( meta )

    if ( isRequired( meta ) ) attributes.required = ''

    const text = schema.default ? String( schema.default ) : ''

    const element = textarea( attributes, text )

    return element
  }

  return stringEditor
}

const stringAttributes = ( { schema }: SchemaMetaData ) => {
  const attributes: any = {}

  attributes.title = schema.title || 'String'

  if ( 'minLength' in schema ) {
    attributes.minlength = String( schema.minLength )
  }

  if ( 'maxLength' in schema ) {
    attributes.maxlength = String( schema.maxLength )
  }

  return attributes
}
