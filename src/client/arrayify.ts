import { onMutate } from './on-mutate'
import { getName } from '../decorators/name-decorator'
import {
  pointerToSelector, strictData, strictSelect, strictClosest
} from '../utils'
import { populateForm } from '../populate-form'

export const arrayify = ( element: HTMLElement ) => {
  const rootElement = strictClosest( element, '[data-root]' )

  rootElement.addEventListener( 'click', onAdd )
  rootElement.addEventListener( 'click', onDelete )

  const arrayEls = Array.from(
    <NodeListOf<HTMLElement>>element.querySelectorAll(
      '[data-type="array"]'
    )
  )

  arrayEls.forEach( arrayEl => {
    const children = Array.from( arrayEl.children )
    const itemEl = <HTMLElement>children.find( el => el.localName !== 'script' )
    const defaultScriptEl = <HTMLScriptElement|undefined>children.find(
      el => el.matches( 'script.default-value' )
    )

    if ( !itemEl || itemEl.classList.contains( 'array-children' ) ) return

    const name = getName( arrayEl )
    const id = pointerToSelector( name ) + '--array'
    const itemTitle = itemEl.dataset.title || 'Item'

    if( !rootElement.querySelector(`template#${ id }` ) ){
      const template = createTemplate( itemEl, itemTitle, id )
      rootElement.appendChild( template )
    }

    const ol = createArrayChildrenList( id )
    const addButton = createAddButton( itemTitle, id )

    arrayEl.appendChild( ol )
    arrayEl.appendChild( addButton )

    if( defaultScriptEl ){
      const defaultValue = JSON.parse( defaultScriptEl.innerText )

      if( !Array.isArray( defaultValue ) )
        throw Error( 'Expected default value to be array' )

      addDefault( ol, defaultValue, name, id )
    }

    if ( arrayEl.dataset.minItems ){
      const min = Number( arrayEl.dataset.minItems )

      ensureMin( ol, min, id )
    }
  } )
}

const addDefault = ( ol: HTMLOListElement, defaultValue: any[], name: string, id: string ) => {
  console.log( 'adding defaults' )

  defaultValue.forEach( () => add( id ) )

  populateForm( ol, defaultValue, name )
}

const ensureMin = ( ol: HTMLOListElement, min: number, id: string ) => {
  let count = ol.children.length

  while( count < min ){
    add( id )
    count = ol.children.length
  }
}

const createArrayChildrenList = ( id: string ) => {
  const ol = document.createElement( 'ol' )
  ol.classList.add( 'array-children' )
  ol.dataset.templateId = id

  return ol
}

const createTemplate = ( itemEl: HTMLElement, title: string, id: string ) => {
  const template = document.createElement( 'template' )

  template.id = id

  const li = document.createElement( 'li' )
  li.appendChild( itemEl )

  const deleteButton = createDeleteButton( title, id )

  li.appendChild( deleteButton )

  template.content.appendChild( li.cloneNode( true ) )

  return template
}

const createAddButton = ( title: string, id: string ) => {
  const addButton = document.createElement( 'button' )
  addButton.type = 'button'
  addButton.innerText = `Add ${ title }`
  addButton.dataset.action = 'add-array-item'
  addButton.dataset.templateId = id

  return addButton
}

const createDeleteButton = ( title: string, id: string ) => {
  const deleteButton = document.createElement( 'button' )
  deleteButton.type = 'button'
  deleteButton.innerText = `Delete ${ title }`
  deleteButton.dataset.action = 'delete-array-item'
  deleteButton.dataset.templateId = id

  return deleteButton
}

const setKeys = ( ol: HTMLOListElement ) => {
  const children = <HTMLLIElement[]>Array.from( ol.children )

  children.forEach( ( child, index ) => child.dataset.key = String( index ) )
}

const add = ( templateId: string ) => {
  const templateSelector = `template#${ templateId }`
  const olSelector = `ol[data-template-id="${ templateId }"]`

  const template = <HTMLTemplateElement>strictSelect( document, templateSelector )
  const ol = <HTMLOListElement>strictSelect( document, olSelector )
  const arrayEl = <HTMLElement>ol.closest( '[data-type="array"]' )

  if ( arrayEl.dataset.maxItems ) {
    const max = Number( arrayEl.dataset.maxItems )

    if( ol.children.length === max ) return
  }

  const fragment = <DocumentFragment>template.content.cloneNode( true )
  const li = <HTMLLIElement>strictSelect( fragment, 'li' )

  ol.appendChild( li )

  setKeys( ol )
  onMutate( li )

  return li
}

const deleteItem = ( button: HTMLElement ) => {
  const li = button.closest( 'li' )!
  const ol = li.closest( 'ol' )!
  const arrayEl = <HTMLElement>ol.closest( '[data-type="array"]' )
  const templateId = strictData( button, 'templateId' )

  li.remove()

  setKeys( ol )
  onMutate( ol )

  if ( arrayEl.dataset.minItems ) {
    const min = Number( arrayEl.dataset.minItems )

    ensureMin( ol, min, templateId )
  }
}

const onAdd: EventListener = ( e: Event ) => {
  if ( !( e.target instanceof HTMLElement ) ) return
  if ( e.target.dataset.action !== 'add-array-item' ) return

  e.preventDefault()

  const templateId = strictData( e.target, 'templateId' )

  add( templateId )
}

const onDelete: EventListener = ( e: Event ) => {
  if ( !( e.target instanceof HTMLElement ) ) return
  if ( e.target.dataset.action !== 'delete-array-item' ) return

  e.preventDefault()

  deleteItem( e.target )
}
