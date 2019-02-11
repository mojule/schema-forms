import * as H from '@mojule/h'
import { SchemaMetaData, TemplateFactory } from '../types'
import { metaAttributes } from '../attributes/meta-attributes'

export const Container: TemplateFactory = ( document: Document ) => {
  const { div, script } = H( document )

  const container = ( meta: SchemaMetaData ) => {
    const attributes = metaAttributes( meta )

    if ( meta.schema.minItems ){
      attributes.data.minItems = String( meta.schema.minItems )
    }

    if( meta.schema.maxItems ){
      attributes.data.maxItems = String( meta.schema.maxItems )
    }

    const containerEl = div( attributes )

    containerEl.classList.add( 'container' )
    containerEl.classList.add( 'schema-node' )

    if( meta.schema.default ){
      const json = JSON.stringify( meta.schema.default, null, 2 )
      const scriptEl = script( { type: 'application/json', class: 'default-value' }, json )

      containerEl.appendChild( scriptEl )
    }

    return containerEl
  }

  return container
}
