import { JSONSchema7 } from 'json-schema'
import { SchemaTemplate } from '../../types'

export const TypeDecorator =
  ( _document: Document, inputTemplate: SchemaTemplate ) => {
    const typeDecorator = ( schema: JSONSchema7 = {}, name = '', value?: any[], isRequired = false ) => {
      if( typeof schema.type === 'string' )
        name = `${ name }__${ schema.type }`

      return inputTemplate( schema, name, value, isRequired )
    }

    return typeDecorator
  }
