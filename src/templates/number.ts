import * as H from '@mojule/h'
import { SchemaMetaData } from '../types'
import { isRequired } from '../utils';

export const NumberEditor = ( document: Document ) => {
  const { input } = H( document )

  const numberEditor = ( meta: SchemaMetaData ) => {
    const { schema } = meta
    const title = schema.title || 'Number'
    const attributes: any = { type: 'number', title }

    if( isRequired( meta ) ) attributes.required = ''

    if( schema.type === 'integer' ){
      attributes.step = String( schema.multipleOf || 1 )
    } else if( schema.multipleOf ) {
      attributes.step = String( schema.multipleOf )
    }

    if ( 'minimum' in schema ) {
      attributes.min = String( schema.minimum )
    }

    if ( 'maximum' in schema ) {
      attributes.max = String( schema.maximum )
    }

    if( attributes.min && attributes.max && schema.format === 'range' ){
      attributes.type = 'range'
    }

    if ( schema.default ) attributes.value = String( schema.default )

    const element = input( attributes )

    return element
  }

  return numberEditor
}
