import * as H from '@mojule/h'
import { SchemaMetaData, TemplateFactory } from '../types'
import { isRequired } from '../utils';

export const EnumEditor: TemplateFactory = ( document: Document ) => {
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

    schema.enum!.forEach( ( enumValue, i ) => {
      const title: string = (
        schema._esTitles ?
        schema._esTitles[ i ] :
        String( enumValue )
      )

      const attributes: any = {
        type: 'radio',
        value: String( enumValue ),
        title
      }

      if ( enumValue === schema.default ) {
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

    if( !isRequired( meta ) ) element.appendChild( option() )

    schema.enum!.forEach( ( enumValue, i ) => {
      const title: string = (
        schema._esTitles ?
          schema._esTitles[ i ] :
          String( enumValue )
      )

      const optionAttributes: any = { value: String( enumValue ) }

      if( enumValue === schema.default ){
        optionAttributes.selected = ''
      }

      const item = option( optionAttributes, title )

      element.appendChild( item )
    } )

    return element
  }

  return enumEditor
}
