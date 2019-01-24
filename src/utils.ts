import { SchemaMetaData } from './types'

export const exclusiveClosest = ( el: HTMLElement, selector: string ) => {
  if ( !el.parentElement ) return

  return el.parentElement.closest( selector )
}

export const inclusiveSelect = ( el: HTMLElement, selector: string ) => {
  if( el.matches( selector ) ) return el

  return el.querySelector( selector )
}

export const isContainer = ( { schema }: SchemaMetaData ) => (
  schema.type === 'object' || schema.type === 'array' || schema.oneOf ||
  schema.anyOf
)

export const isRequired = ( meta: SchemaMetaData ) => {
  if(
    meta.keyIndex && meta.parentSchema &&
    Array.isArray( meta.parentSchema.required ) &&
    meta.parentSchema.required.includes( String( meta.keyIndex ) )
  ) return true

  return false
}
