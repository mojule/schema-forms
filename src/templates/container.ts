import * as H from '@mojule/h'
import { SchemaMetaData, TemplateFactory } from '../types'
import { metaAttributes } from '../attributes/meta-attributes'

export const Container: TemplateFactory = ( document: Document ) => {
  const { div } = H( document )

  const container = ( meta: SchemaMetaData ) => {
    const attributes = metaAttributes( meta )
    const containerEl = div( attributes )

    containerEl.classList.add( 'container' )
    containerEl.classList.add( 'schema-node' )

    return containerEl
  }

  return container
}
