import traverse = require( '@entity-schema/json-schema-traverse' )
import {
  TraverseCallback
} from '@entity-schema/json-schema-traverse/dist/types'

import { JSONSchema4 } from 'json-schema'
import { flatten, get } from '@mojule/json-pointer';

export const populateSchema = ( value: any, schema: JSONSchema4 ) => {
  schema = JSON.parse( JSON.stringify( schema ) )

  const parentMap = new Map<JSONSchema4,JSONSchema4>()
  const keyIndexMap = new Map<JSONSchema4,string>()

  const getPointer = ( schema: JSONSchema4 ) => {
    let path = keyIndexMap.has( schema ) ? keyIndexMap.get( schema ) : ''

    const parent = parentMap.get( schema )

    if( parent ) return getPointer( parent ) + '/' + path

    return path
  }

  const onSchema: TraverseCallback = (
    schema: JSONSchema4, _pointer: string, _root: JSONSchema4,
    _parentPointer?: string, _parentKeyword?: string,
    parentSchema?: JSONSchema4, keyIndex?: string | number
  ) => {
    if( parentSchema ){
      parentMap.set( schema, parentSchema )
    }

    if( keyIndex ){
      keyIndexMap.set( schema, String( keyIndex ) )
    }

    const valuePointer = getPointer( schema )

    if( valuePointer !== '' ){
      const currentValue = get( value, valuePointer )

      if ( currentValue !== undefined ) {
        schema.default = currentValue
      }
    }
  }

  traverse( schema, { cb: onSchema } )

  return schema
}