import { EnumEditor } from '../templates/enum'
import { JSONSchema4TypeName } from 'json-schema'
import { LabelDecorator } from '../decorators/label-decorator'
import { nameDecorator } from '../decorators/name-decorator'
import { onMutate } from './on-mutate'
import { inclusiveSelect } from '../utils'

const enumEditor = EnumEditor( document )
const labelDecorator = LabelDecorator( document )

export const selectify = ( element: HTMLElement ) => {
  const selectableEls = Array.from(
    <NodeListOf<HTMLElement>>element.querySelectorAll(
      '[data-one-of], [data-any-of]'
    )
  )

  selectableEls.forEach( selectableEl => {
    const itemEls = <HTMLElement[]>Array.from(
      selectableEl.children
    )

    if ( itemEls.length === 0 ) return

    const titles = itemEls.map( ( el, i ) => {
      const titleEl = <HTMLElement>inclusiveSelect( el, '[data-title]' )

      return titleEl.dataset.title || String( i + 1 )
    } )

    const selectorEnum = {
      title: selectableEl.dataset.title || 'One Of',
      type: <JSONSchema4TypeName>'string',
      enum: titles
    }

    const selector: HTMLElement = enumEditor( {
      schema: selectorEnum,
      pointer: '',
      root: selectorEnum
    } )

    selector.classList.add( 'selector' )

    selectableEl.appendChild( selector )

    labelDecorator( selector )

    itemEls.forEach( ( itemEl, i ) => {
      delete itemEl.dataset.key
      const template = document.createElement( 'template' )
      template.dataset.index = String( i )
      template.content.appendChild( itemEl )
      selectableEl.appendChild( template )
    } )

    const choose = ( index: number ) => {
      const existing = Array.from( selectableEl.children )

      existing.forEach( el => {
        if ( el !== selector && el.localName !== 'template' ) el.remove()
      } )

      const template = <HTMLTemplateElement>selectableEl.querySelector(
        `template[data-index="${ index }"]`
      )

      const el = <HTMLElement>template.content.cloneNode( true )
      selectableEl.appendChild( el )

      nameDecorator( selectableEl )
      onMutate( selectableEl )
    }

    // could be either radios or select
    const radios = <HTMLInputElement[]>Array.from(
      selector.querySelectorAll( 'input[type="radio"]' )
    )
    radios.forEach( ( input, i ) => {
      input.addEventListener( 'click', e => {
        radios.forEach( current => current.checked = current === input )
        choose( i )
      } )

      if ( i === 0 ) input.checked = true
      choose( 0 )
    } )

    const select = <HTMLSelectElement|null>inclusiveSelect( selector, 'select' )
    if ( select ) {
      select.onchange = () => {
        const i = select.selectedIndex
        choose( i )
      }

      choose( 0 )
    }
  } )
}
