import { getData } from '../get-data'
import { onMutate } from '../client/on-mutate'
import { schemaToDom } from '../schema-to-dom'

import * as schemas from './schema'
import * as data from './data'
import { populateSchema } from '../populate-schema';

document.addEventListener( 'DOMContentLoaded', () => {
  const {
    form, submit, select, schema, schemaSubmit, result, resultSubmit
  } = init()

  submit.onclick = e => {
    e.preventDefault()

    onSubmit()
  }

  schemaSubmit.onclick = e => {
    e.preventDefault()

    onSchemaSubmit()
  }

  resultSubmit.onclick = e => {
    e.preventDefault()

    onResultSubmit()
  }

  const onSubmit = () => {
    const value = getData( form )

    result.value = JSON.stringify( value, null, 2 )

    const formData = new FormData( form )

    const entries = <[ string, string ][]>Array.from(
      formData.entries()
    ).map( ( [ key, value ] ) => [ key, String( value ) ] )

    console.log( entries )
  }

  const onSelect = () => {
    const key = select.selectedOptions[ 0 ].value
    let currentSchema = schemas[ key ]

    if( key in data ){
      currentSchema = populateSchema( data[ key ], currentSchema )
    }

    schema.value = JSON.stringify( currentSchema, null, 2 )

    onSchemaSubmit()
  }

  const onSchemaSubmit = () => {
    const currentSchema = JSON.parse( schema.value )
    const schemaDom = schemaToDom( currentSchema, document )

    form.innerHTML = ''

    form.appendChild( schemaDom )

    const root = <HTMLElement>document.querySelector( '[data-root]' )

    if ( !root ) throw Error( 'Could not find [data-root]' )

    onMutate( root )
    onSubmit()
  }

  const onResultSubmit = () => {
    const resultValue = JSON.parse( result.value )
    let currentSchema = JSON.parse( schema.value )

    currentSchema = populateSchema( resultValue, currentSchema )

    schema.value = JSON.stringify( currentSchema, null, 2 )

    onSchemaSubmit()
  }

  select.onchange = onSelect

  onSelect()
} )


const init = () => {
  const form = createForm()
  const submit = createFormButton()
  const select = createSelect()
  const schema = <HTMLTextAreaElement>document.querySelector(
    '.schema textarea'
  )
  const schemaSubmit = createSchemaButton()
  const result = <HTMLTextAreaElement>document.querySelector( '.result textarea' )
  const resultSubmit = createResultButton()

  return { form, submit, select, schema, schemaSubmit, result, resultSubmit }
}

const createForm = () => {
  const formContainer = document.querySelector( '.form' )!
  const form = document.createElement( 'form' )

  formContainer.appendChild( form )

  return form
}

const createFormButton = () => {
  const formButtonContainer = document.querySelector( '.form-button' )!
  const submit = document.createElement( 'input' )
  submit.type = 'submit'
  submit.value = 'Update Results'

  formButtonContainer.appendChild( submit )

  return submit
}

const createSchemaButton = () => {
  const schemaButtonContainer = document.querySelector( '.schema-button' )!
  const schemaSubmit = document.createElement( 'input' )
  schemaSubmit.type = 'submit'
  schemaSubmit.value = 'Update Form'

  schemaButtonContainer.appendChild( schemaSubmit )

  return schemaSubmit
}

const createResultButton = () => {
  const resultButtonContainer = document.querySelector( '.result-button' )!
  const resultSubmit = document.createElement( 'input' )
  resultSubmit.type = 'submit'
  resultSubmit.value = 'Update Schema Defaults'

  resultButtonContainer.appendChild( resultSubmit )

  return resultSubmit
}

const createSelect = () => {
  const select = <HTMLSelectElement>document.querySelector( 'header select' )
  const keys = Object.keys( schemas )

  keys.forEach( ( key, i ) => {
    const schema = schemas[ key ]
    const option = document.createElement( 'option' )

    option.value = key
    option.innerText = schema.title
    option.selected = i === 0

    select.appendChild( option )
  })

  return select
}