import { EnumEditor } from '../templates/enum'
import { JSONSchema4TypeName } from 'json-schema'
import { LabelDecorator } from '../decorators/label-decorator'
import { nameDecorator, getName } from '../decorators/name-decorator'
import { onMutate } from './on-mutate'
import { inclusiveSelect, strictClosest, pointerToSelector, strictData, strictSelect, randomId } from '../utils'

const enumEditor = EnumEditor( document )
const labelDecorator = LabelDecorator( document )

export const selectify = ( element: HTMLElement ) => {
  const rootElement = strictClosest( element, '[data-root]' )

  rootElement.addEventListener( 'change', onChange )

  const selectableEls = Array.from(
    <NodeListOf<HTMLElement>>element.querySelectorAll(
      '[data-one-of], [data-any-of]'
    )
  )

  selectableEls.forEach( selectableEl => {
    const itemEls = <HTMLElement[]>Array.from(
      selectableEl.children
    )

    if (
      itemEls.length === 0 ||
      itemEls.some( el => el.classList.contains( 'selection' ) )
    ) return

    const name = getName( selectableEl )
    const id = pointerToSelector( name )

    const selector = createSelector( selectableEl, itemEls, id )

    selectableEl.appendChild( selector )

    labelDecorator( selector )

    const selection = createSelection( id )

    selectableEl.appendChild( selection )

    itemEls.forEach( ( itemEl, i ) => {
      const keyEl = <HTMLElement>inclusiveSelect( itemEl, '[data-key]' )

      if( !keyEl ) throw Error( `Expected [data-key]` )

      delete keyEl.dataset.key

      const itemId = `${ id }__${ i }`
      const template = createTemplate( itemEl, itemId )

      rootElement.appendChild( template )
    } )

    choose( selection, id, '0' )
  } )
}

const createSelection = ( id: string ) => {
  const selection = document.createElement( 'div' )

  selection.classList.add( 'selection' )
  selection.id = id + '__selection'

  return selection
}

const createSelector = ( selectableEl: HTMLElement, itemEls: HTMLElement[], id: string ) => {
  const titles = itemEls.map( ( el, i ) => {
    const titleEl = <HTMLElement>inclusiveSelect( el, '[data-title]' )

    return titleEl.dataset.title || String( i + 1 )
  } )

  const selectorEnum = {
    title: selectableEl.dataset.title || 'One Of',
    type: <JSONSchema4TypeName>'number',
    enum: Array.from( titles.keys() ),
    default: 0
  }

  selectorEnum[ '_esTitles' ] = titles

  const selector: HTMLElement = enumEditor( {
    schema: selectorEnum,
    pointer: '',
    root: selectorEnum
  } )

  selector.classList.add( 'selector' )
  selector.dataset.templateId = id
  selector.dataset.key = '__selector'

  return selector
}

const createTemplate = ( itemEl: HTMLElement, id: string ) => {
  const template = document.createElement( 'template' )

  itemEl.classList.add( 'select-child' )
  template.content.appendChild( itemEl )
  template.id = id

  return template
}

const onChange: EventListener = ( e: Event ) => {
  if ( !( e.target instanceof HTMLElement ) ) return

  const selector = <HTMLElement>e.target.closest( '.selector' )

  if( !selector ) return

  const selection = strictSelect( selector.parentElement!, '.selection' )
  const templateId = strictData( selector, 'templateId' )

  if ( e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement ){
    choose( selection, templateId, e.target.value )

    const radioEls = <HTMLInputElement[]>Array.from(
      selector.querySelectorAll( 'input[type="radio"]' )
    )

    radioEls.forEach( radioEl => {
      radioEl.checked = radioEl === e.target
    })
  }
}

const choose = ( selection: HTMLElement, id: string, key: string ) => {
  selection.innerHTML = ''

  const template = <HTMLTemplateElement>strictSelect(
    document, `#${ id }__${ key }`
  )

  const fragment = <DocumentFragment>template.content.cloneNode( true )
  selection.appendChild( fragment )

  nameDecorator( selection )
  onMutate( selection )
}
