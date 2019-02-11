import { flatten } from '@mojule/json-pointer'
import { isCheckbox, isInputOrTextarea } from './utils';

export const populateForm = ( root: ParentNode, value: any, pointerPrefix = '' ) => {
  const flat = flatten( value )

  Object.keys( flat ).forEach( pointer => {
    const currentValue = flat[ pointer ]
    const formPointer = pointerPrefix + pointer

    const el = <HTMLElement | undefined>root.querySelector(
      `[name^="${ formPointer }#"]`
    )

    if( !el ) return

    // check for select, enums etc
    if( isCheckbox( el ) ){
      el.checked = currentValue
    } else if( isInputOrTextarea( el ) ) {
      el.value = String( currentValue )
    }

    console.log( 'Populating', formPointer, currentValue, el )
  })
}