import { onMutate } from './on-mutate'
import { nameDecorator } from '../decorators/name-decorator'

export const arrayify = ( element: HTMLElement ) => {
  const rootElement = element.closest( '[data-root]' )

  const arrayEls = Array.from(
    <NodeListOf<HTMLElement>>element.querySelectorAll(
      '[data-type="array"]'
    )
  )

  arrayEls.forEach( arrayEl => {
    const itemEl = arrayEl.firstElementChild

    if ( !itemEl ) return

    const title = arrayEl.dataset.title || 'Array'

    const template = document.createElement( 'template' )
    const ol = document.createElement( 'ol' )
    const li = document.createElement( 'li' )

    li.appendChild( itemEl )

    const deleteButton = document.createElement( 'button' )
    deleteButton.type = 'button'
    deleteButton.innerText = `Delete ${ title }`

    deleteButton.classList.add( 'action-delete' )

    li.appendChild( deleteButton )

    template.content.appendChild( li.cloneNode( true ) )

    arrayEl.appendChild( ol )
    arrayEl.appendChild( template )

    const addButton = document.createElement( 'button' )
    addButton.type = 'button'
    addButton.innerText = `Add ${ title }`

    addButton.onclick = e => {
      e.preventDefault()
      const fragment = <DocumentFragment>template.content.cloneNode( true )
      const li = fragment.querySelector( 'li' )!

      ol.appendChild( li )

      setKeys( ol )
      onMutate( li )
    }

    arrayEl.appendChild( addButton )
  } )

  const deleteButtons = <HTMLButtonElement[]>Array.from(
    document.querySelectorAll( 'button.action-delete' )
  )

  deleteButtons.forEach( button => {
    button.onclick = e => {
      e.preventDefault()

      const li = button.closest( 'li' )!
      const ol = li.closest( 'ol' )!

      li.remove()

      setKeys( ol )
      onMutate( ol )
    }
  } )

  nameDecorator( element )
}

const setKeys = ( ol: HTMLOListElement ) => {
  const children = <HTMLLIElement[]>Array.from( ol.children )

  children.forEach( ( child, index ) => child.dataset.key = String( index ) )
}
