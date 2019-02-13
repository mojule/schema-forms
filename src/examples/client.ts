import * as Ajv from 'ajv'
import { getData } from '../get-data'
import { onMutate } from '../client/on-mutate'
import { schemaToDom } from '../schema-to-dom'

import * as schemas from './schema'
import * as data from './data'
import { populateSchema } from '../populate-schema'
import { JSONSchema4 } from 'json-schema'

const valid = '✔️'
const invalid = '❌'
const unknown = '❓'

const ajv = new Ajv({
  schemaId: 'id',
  allErrors: true,
  jsonPointers: true
})

ajv.addMetaSchema( schemas.meta )

ajv.addFormat( 'multiline', () => true )
ajv.addFormat( 'password', () => true )
ajv.addFormat( 'tel', () => true )
ajv.addFormat( 'color', /^\#[a-f0-9]{6}$/ )
ajv.addFormat( 'month', /^\d{4}-\d{2}$/ )

document.addEventListener( 'DOMContentLoaded', () => {
  const {
    form, submit, select, schema, schemaSubmit, result, resultSubmit,
    schemaValid, formValid, resultValid
  } = init()

  submit.onclick = e => {
    e.preventDefault()

    onFormSubmit()
  }

  schemaSubmit.onclick = e => {
    e.preventDefault()

    onSchemaSubmit()
  }

  resultSubmit.onclick = e => {
    e.preventDefault()

    onResultSubmit()
  }

  const onFormSubmit = () => {
    const value = getData( form )

    result.value = JSON.stringify( value, null, 2 )

    const formData = new FormData( form )

    const entries = <[ string, string ][]>Array.from(
      formData.entries()
    ).map( ( [ key, value ] ) => [ key, String( value ) ] )

    console.log( entries )

    const isValid = isResultValid()

    resultValid.innerText = isValid ? valid : invalid
  }

  const onSelect = () => {
    const key = select.selectedOptions[ 0 ].value
    let currentSchema = schemas[ key ]

    if( key in data ){
      currentSchema = populateSchema( data[ key ], currentSchema )
    }

    schema.value = JSON.stringify( currentSchema, null, 2 )
    form.innerHTML = ''
    result.value = ''

    onSchemaChange()
  }

  const onSchemaChange = () => {
    const isValid = isSchemaValid()

    schemaValid.innerText = isValid ? valid : invalid

    if ( !isValid ) {
      form.innerHTML = ''
      result.value = ''

      formValid.innerText = unknown
      resultValid.innerText = unknown

      return
    }

    onSchemaSubmit()
  }

  const onSchemaSubmit = () => {
    const currentSchema = JSON.parse( schema.value )
    const schemaDom = schemaToDom( currentSchema, document )

    form.innerHTML = ''
    result.value = ''

    form.appendChild( schemaDom )

    const root = <HTMLElement>document.querySelector( '[data-root]' )

    if ( !root ) throw Error( 'Could not find [data-root]' )

    onMutate( root )

    onFormChange()
  }

  const onFormChange = () => {
    const isValid = isFormValid()

    formValid.innerText = isValid ? valid : invalid

    if ( !isValid ) {
      const currentFocus = <HTMLElement>document.activeElement

      form.reportValidity()

      if( currentFocus !== null ) currentFocus.focus()

      resultValid.innerText = unknown
      result.value = ''

      return
    }

    onFormSubmit()
  }

  const onResultSubmit = () => {
    const resultValue = JSON.parse( result.value )
    let currentSchema = JSON.parse( schema.value )

    currentSchema = populateSchema( resultValue, currentSchema )

    schema.value = JSON.stringify( currentSchema, null, 2 )

    onSchemaSubmit()
  }

  schema.oninput = onSchemaChange
  form.oninput = onFormChange
  select.onchange = onSelect

  onSelect()
} )

const isSchemaValid = () => {
  const schema = getCurrentSchema()

  if( !schema ) return false

  return ajv.validate( 'http://json-schema.org/draft-04/schema#', schema )
}

const isFormValid = () => {
  const form = getForm()

  if( !form ) return false

  return form.checkValidity()
}

const isResultValid = () => {
  const result = getResult()

  if( !result ) return false

  if( !isSchemaValid() ) return false

  const currentSchema = getCurrentSchema()

  if ( !currentSchema ) return false

  return ajv.validate( currentSchema, result )
}

const getCurrentSchema = () => {
  try {
    const schema = <HTMLTextAreaElement>document.querySelector(
      '.schema textarea'
    )

    return <JSONSchema4>JSON.parse( schema.value )
  } catch {
    return
  }
}

const getForm = () => {
  const form = <HTMLFormElement>document.querySelector( '.form form' )

  if( form ) return form
}

const getResult = () => {
  try {
    const result = <HTMLTextAreaElement>document.querySelector( '.result textarea' )

    return JSON.parse( result.value )
  } catch {
    return
  }

}

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

  const schemaValid = <HTMLSourceElement>document.querySelector( '.schema-valid' )
  const formValid = <HTMLSourceElement>document.querySelector( '.form-valid' )
  const resultValid = <HTMLSourceElement>document.querySelector( '.result-valid' )

  return {
    form, submit, select, schema, schemaSubmit, result, resultSubmit,
    schemaValid, formValid, resultValid
  }
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