import traverse = require( '@entity-schema/json-schema-traverse' )
import {
  TraverseCallback
} from '@entity-schema/json-schema-traverse/dist/types'

import * as H from '@mojule/h'

import { JSONSchema4 } from 'json-schema'
import { Templates } from './templates'
import { SchemaMetaData } from './types'
import { nameDecorator } from './decorators/name-decorator';
import { LabelDecorator } from './decorators/label-decorator';
import { FieldsetDecorator } from './decorators/fieldset-decorator';

export const schemaToDom = ( schema: JSONSchema4, document: Document, templates = Templates( document ) ) => {
  const { documentFragment } = H( document )
  const fragment = documentFragment()
  const parentMap = new Map<JSONSchema4, HTMLElement>()
  const labelDecorator = LabelDecorator( document )
  const fieldsetDecorator = FieldsetDecorator( document )

  const {
    container, editor, constEditor, enumEditor, stringEditor, numberEditor,
    booleanEditor
  } = templates


  const getFormElement = ( meta: SchemaMetaData ) => {
    const { schema } = meta

    if ( schema.enum ) {
      if ( schema.enum.length === 1 ) {
        return constEditor( meta )
      } else if ( schema.enum.length > 1 ) {
        return enumEditor( meta )
      }
    } else if ( schema.type === 'string' ) {
      return stringEditor( meta )
    } else if ( schema.type === 'number' || schema.type === 'integer' ) {
      return numberEditor( meta )
    } else if ( schema.type === 'boolean' ) {
      return booleanEditor( meta )
    } else if ( schema.type === 'null' ) {
      schema.enum = [ null ]
      return constEditor( meta )
    }
  }

  const addSchema = ( meta: SchemaMetaData ) => {
    const { schema, parentSchema } = meta

    const parentElement = parentSchema && parentMap.has( parentSchema ) ?
      parentMap.get( parentSchema )! : fragment

    let element: HTMLElement | undefined

    let isFieldset = false

    if( isContainer( meta ) ){
      element = container( meta )
      parentMap.set( schema, element )
      isFieldset = true
    } else {
      const formElement = getFormElement( meta )

      if( formElement ){
        element = editor( meta )
        element.appendChild( formElement )

        if ( formElement.dataset.enumType === 'radio' ){
          isFieldset = true
        }
      }
    }

    if( !element ) return

    parentElement.appendChild( element )

    if( !isContainer( meta ) ){
      nameDecorator( element )
      labelDecorator( element )
    }

    if( isFieldset ){
      fieldsetDecorator( element )
    }
  }

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

  return fragment
}

const isContainer = ( { schema }: SchemaMetaData ) => (
  schema.type === 'object' || schema.type === 'array' || schema.oneOf ||
  schema.anyOf
)
