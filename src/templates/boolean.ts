import * as H from '@mojule/h'
import { SchemaMetaData } from '../types'

export const BooleanEditor = ( document: Document ) => {
  const { input } = H( document )

  const booleanEditor = ( { schema }: SchemaMetaData ) => {
    const title = schema.title || 'Boolean'
    const attributes: any = { type: 'checkbox', title }

    if ( schema.default ) {
      attributes.checked = ''
    }

    const element = input( attributes )

    return element
  }

  return booleanEditor
}
