import { arrayify } from './arrayify'
import { selectify } from './selectify'
import { nameDecorator } from '../decorators/name-decorator'
import { formElementSelector } from '../consts';

export const onMutate = ( element: HTMLElement ) => {
  arrayify( element )
  selectify( element )

  const namedElements = element.querySelectorAll( formElementSelector )

  namedElements.forEach( el => nameDecorator( <HTMLElement>el ) )
}
