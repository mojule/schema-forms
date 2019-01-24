import { JSONSchema4 } from 'json-schema'

export type NamedFormElement = (
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
)

export interface SchemaMetaData {
  schema: JSONSchema4
  pointer: string
  root: JSONSchema4,
  parentPointer?: string
  parentKeyword?: string,
  parentSchema?: JSONSchema4
  keyIndex?: string | number
}
