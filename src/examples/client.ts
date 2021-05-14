import { JSONSchema7 } from 'json-schema'
import * as contactFormJson from '../schema/contact-form.schema.json'
import * as nestedArrayJson from '../schema/nested-array.schema.json'
import { SchemaToFormElements } from '../'
import { ClientFormTemplates } from '../templates'

const templates = ClientFormTemplates( document, Event )

const schemaToFormElements = SchemaToFormElements( templates )
const contactFormSchema = contactFormJson as JSONSchema7
const contactForm = document.createElement( 'form' )
contactForm.appendChild( schemaToFormElements( contactFormSchema, 'contact-form' ) )
document.body.appendChild( contactForm )


const nestArraySchema = nestedArrayJson as JSONSchema7
const schemaToClientFormElements = SchemaToFormElements( templates )

const mutableListForm = document.createElement( 'form' )
mutableListForm.appendChild( schemaToClientFormElements( nestArraySchema, 'nested-array' ))
document.body.appendChild( mutableListForm )
