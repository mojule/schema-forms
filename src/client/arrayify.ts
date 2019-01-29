import { onMutate } from './on-mutate'
import { nameDecorator, getName } from '../decorators/name-decorator'
import {
  pointerToSelector, strictData, strictSelect, strictClosest
} from '../utils'

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
    const itemEl = <HTMLElement>arrayEl.firstElementChild

    if ( !itemEl || itemEl.classList.contains( 'array-children' ) ) return

    const name = getName( arrayEl )
    const id = pointerToSelector( name ) + '--array'
    const title = arrayEl.dataset.title || 'Array'

    if( !rootElement.querySelector(`template#${ id }` ) ){
      const template = createTemplate( itemEl, title, id )
      rootElement.appendChild( template )
    }

    const ol = createArrayChildrenList( id )
    const addButton = createAddButton( title, id )

    arrayEl.appendChild( ol )
    arrayEl.appendChild( addButton )
  } )

  nameDecorator( element )
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

  const deleteButton = createDeleteButton( title )

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

const createDeleteButton = ( title: string ) => {
  const deleteButton = document.createElement( 'button' )
  deleteButton.type = 'button'
  deleteButton.innerText = `Delete ${ title }`
  deleteButton.dataset.action = 'delete-array-item'

  return deleteButton
}

const setKeys = ( ol: HTMLOListElement ) => {
  const children = <HTMLLIElement[]>Array.from( ol.children )

  children.forEach( ( child, index ) => child.dataset.key = String( index ) )
}

const onAdd: EventListener = ( e: Event ) => {
  if ( !( e.target instanceof HTMLElement ) ) return
  if ( e.target.dataset.action !== 'add-array-item' ) return

  e.preventDefault()

  const templateId = strictData( e.target, 'templateId' )

  const templateSelector = `template#${ templateId }`
  const olSelector = `ol[data-template-id="${ templateId }"]`

  const template = <HTMLTemplateElement>strictSelect( document, templateSelector )
  const ol = <HTMLOListElement>strictSelect( document, olSelector )

  const fragment = <DocumentFragment>template.content.cloneNode( true )
  const li = <HTMLLIElement>strictSelect( fragment, 'li' )

  ol.appendChild( li )

  setKeys( ol )
  onMutate( li )
}

const onDelete: EventListener = ( e: Event ) => {
  if ( !( e.target instanceof HTMLElement ) ) return
  if ( e.target.dataset.action !== 'delete-array-item' ) return

  e.preventDefault()

  const li = e.target.closest( 'li' )!
  const ol = li.closest( 'ol' )!

  li.remove()

  setKeys( ol )
  onMutate( ol )
}
