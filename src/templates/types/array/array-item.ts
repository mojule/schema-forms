import { JSONSchema7 } from 'json-schema'
import { Templates, SchemaTemplateFactory } from '../../../types'

export const ArrayItemTemplate: SchemaTemplateFactory =
  ( document: Document, templates: Partial<Templates> = {} ) => {
    const arrayItemEditor = ( schema: JSONSchema7 = {}, name = '', value?: any[] ) => {
      const li = document.createElement( 'li' )

      if( typeof schema.type !== 'string' ) return li

      const template = templates[ schema.type ]

      if( !template ) return li

      const editorItem = template( schema, name, value )

      li.appendChild( editorItem )

      return li
    }

    return arrayItemEditor
  }
