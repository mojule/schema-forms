import { JSONSchema4 } from 'json-schema'

import * as blankJson from './blank.schema.json'
import * as contactJson from './contact.schema.json'
import * as registrationJson from './registration.schema.json'
import * as tasksJson from './tasks.schema.json'
import * as allJson from './all.schema.json'
import * as arraysJson from './arrays.schema.json'
import * as enumsJson from './enums.schema.json'
import * as metaJson from './meta.schema.json'

export const blank = <JSONSchema4>blankJson
export const contact = <JSONSchema4>contactJson
export const registration = <JSONSchema4>registrationJson
export const tasks = <JSONSchema4>tasksJson
export const enums = <JSONSchema4>enumsJson
export const arrays = <JSONSchema4>arraysJson
export const all = <JSONSchema4>allJson
export const meta = <JSONSchema4>metaJson