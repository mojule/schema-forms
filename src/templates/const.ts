import * as H from '@mojule/h'
import { SchemaMetaData, TemplateFactory } from '../types'

export const ConstEditor: TemplateFactory = ( document: Document ) => {
  const { input } = H( document )

  const constEditor = ( { schema }: SchemaMetaData ) => {
    const attributes: any = { type: 'hidden' }

    if( schema.enum && schema.enum.length === 1 ){
      attributes.value = String( schema.enum[ 0 ] )
    } else if( schema.default ){
      attributes.value = String( schema.default )
    } else {
      throw Error( 'No value provided for input[hidden]' )
    }

    const element = input( attributes )

    return element
  }

  return constEditor
}
