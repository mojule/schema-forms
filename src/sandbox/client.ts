import { getData } from '../get-data'

document.addEventListener( 'DOMContentLoaded', () => {
  const form = document.querySelector( 'form' )!
  const submit = <HTMLInputElement>document.querySelector(
    'input[type="submit"]'
  )

  submit.onclick = e => {
    e.preventDefault()

    const value = getData( form )

    console.log( value )

    const formData = new FormData( form )

    const entries = <[string, string][]>Array.from(
      formData.entries()
    ).map( ([ key, value ]) => [ key, String( value ) ] )

    console.log( entries )
  }
} )
