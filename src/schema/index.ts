import { JSONSchema7 } from 'json-schema'

import * as contactFormSchema from './contact-form.schema.json'
import * as stringsSchema from './strings.schema.json'
import * as nestedArraySchema from './nested-array.schema.json'
import * as simpleArraySchema from './simple-array.schema.json'
import * as tupleArraySchema from './tuple-array.schema.json'
import * as metaSchema from './meta.schema.json'

export const contactForm = <JSONSchema7>contactFormSchema
export const stringsForm = <JSONSchema7>stringsSchema
export const tupleArray = <JSONSchema7>tupleArraySchema
export const simpleArray = <JSONSchema7>simpleArraySchema
export const nestedArray = <JSONSchema7>nestedArraySchema
export const meta = <JSONSchema7>metaSchema

