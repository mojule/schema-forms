import * as H from '@mojule/h'
import { SchemaMetaData } from '../types'
import { isRequired } from '../utils';

export const EnumEditor = ( document: Document ) => {
  const { select, option, div, input } = H( document )

  const enumEditor = ( meta: SchemaMetaData ) => {
    const { schema } = meta

    if ( schema.enum === undefined || schema.enum.length < 2 )
      throw Error( 'enum should have at least 2 members' )

    if( schema.format && schema.format === 'radio' ){
      return radioEditor( meta )
    }

    if( schema.enum.length < 5 ){
      return radioEditor( meta )
    }

    return selectEditor( meta )
  }

  const radioEditor = ( { schema }: SchemaMetaData ) => {
    const container = div( { data: { enumType: 'radio' } } )

    schema.enum!.forEach( ( value, i ) => {
      value = String( value )

      const title = schema._esTitles ? schema._esTitles[ i ] : value
      const attributes: any = { type: 'radio', value, title }

      if ( value === schema.default ) {
        attributes.checked = ''
      }

      const radio = input( attributes )

      container.appendChild( radio )
    } )

    return container
  }

  const selectEditor = ( meta: SchemaMetaData ) => {
    const { schema } = meta

    const attributes: any = {
      data: { enumType: 'select' }
    }

    if ( isRequired( meta ) ) attributes.required = ''

    const element = select( attributes )

    schema.enum!.forEach( ( value, i ) => {
      value = String( value )

      const title = schema._esTitles ? schema._esTitles[ i ] : value
      const optionAttributes: any = { value }

      if( value === schema.default ){
        optionAttributes.selected = ''
      }

      const item = option( optionAttributes, title )

      element.appendChild( item )
    } )

    return element
  }

  return enumEditor
}
