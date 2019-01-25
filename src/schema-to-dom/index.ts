import traverse = require( '@entity-schema/json-schema-traverse' )
import {
  TraverseCallback
} from '@entity-schema/json-schema-traverse/dist/types'

import * as H from '@mojule/h'

import { JSONSchema4 } from 'json-schema'
import { Templates } from '../templates'
import { SchemaMetaData, FormElementDecorators } from '../types'
import { nameDecorator } from '../decorators/name-decorator'
import { LabelDecorator } from '../decorators/label-decorator'
import { FieldsetDecorator } from '../decorators/fieldset-decorator'
import { AddSchema } from './add-schema'

export const schemaToDom = (
  schema: JSONSchema4, document: Document, templates = Templates( document )
) => {
  const { div } = H( document )
  const rootElement = div({ data: { root: '' } } )
  const parentMap = new Map<JSONSchema4, HTMLElement>()
  const labelDecorator = LabelDecorator( document )
  const fieldsetDecorator = FieldsetDecorator( document )
  const decorators: FormElementDecorators = {
    fieldsetDecorator, labelDecorator, nameDecorator
  }

  const addSchema = AddSchema( parentMap, rootElement, templates, decorators )

  const onSchema: TraverseCallback = (
    schema: JSONSchema4, pointer: string, root: JSONSchema4,
    parentPointer?: string, parentKeyword?: string,
    parentSchema?: JSONSchema4, keyIndex?: string | number
  ) => {
    const meta: SchemaMetaData = {
      schema, pointer, root, parentPointer, parentKeyword, parentSchema,
      keyIndex
    }

    addSchema( meta )
  }

  traverse( schema, { cb: onSchema } )

  return rootElement
}
