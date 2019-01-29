import { arrayify } from './arrayify'
import { selectify } from './selectify'

export const onMutate = ( element: HTMLElement ) => {
  arrayify( element )
  selectify( element )
}
