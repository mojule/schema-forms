import { JSONSchema4 } from 'json-schema'

import * as simpleJson from './simple.schema.json'
import * as tasksJson from './tasks.schema.json'
import * as allJson from './all.schema.json'
import * as arraysJson from './arrays.schema.json'

export const simple = <JSONSchema4>simpleJson
export const tasks = <JSONSchema4>tasksJson

// export const all = <JSONSchema4>allJson
// export const arrays = <JSONSchema4>arraysJson
