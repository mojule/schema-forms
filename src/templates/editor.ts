import * as H from '@mojule/h'
import { SchemaMetaData } from '../types'
import { metaAttributes } from '../attributes/meta-attributes'

export const Editor = ( document: Document ) => {
  const { div } = H( document )

  const editor = ( meta: SchemaMetaData ) => {
    const attributes = metaAttributes( meta )
    const containerEl = div( attributes )

    containerEl.classList.add( 'editor' )
    containerEl.classList.add( 'schema-node' )

    return containerEl
  }

  return editor
}
