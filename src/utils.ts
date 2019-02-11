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

export const pointerToSelector = ( pointer: string ) =>
  pointer.replace( /\//g, '__' )

export const strictSelect = ( el: ParentNode, selector: string ) => {
  const result = el.querySelector( selector )

  if( !result ) throw Error( `Expected ${ selector }` )

  return <HTMLElement>result
}

export const strictData = ( el: HTMLElement, key: string ) => {
  const result = el.dataset[ key ]

  if ( !result ) throw Error( `Expected dataset[ '${ key }' ]` )

  return result
}

export const strictClosest = ( el: HTMLElement, selector: string ) => {
  const result = el.closest( selector )

  if( !result ) throw Error( `Expected ${ selector }` )

  return <HTMLElement>result
}

export const randomId = () =>
  '_' + Math.floor( Math.random() * Number.MAX_SAFE_INTEGER ).toString( 36 )

export const isCheckbox = ( el: HTMLElement ): el is HTMLInputElement =>
  el.matches( 'input[type="checkbox"]' )

export const isInput = ( el: HTMLElement ): el is HTMLInputElement =>
  el.localName === 'input'

export const isInputOrTextarea = ( el: HTMLElement ): el is HTMLInputElement | HTMLTextAreaElement =>
  isInput( el ) || el.localName === 'textarea'
