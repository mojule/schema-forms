import { BooleanEditor } from './boolean'
import { ConstEditor } from './const'
import { Container } from './container'
import { Editor } from './editor'
import { EnumEditor } from './enum'
import { NumberEditor } from './number'
import { StringEditor } from './string'

export const Templates = ( document: Document ) => {
  const booleanEditor = BooleanEditor( document )
  const constEditor = ConstEditor( document )
  const container = Container( document )
  const editor = Editor( document )
  const enumEditor = EnumEditor( document )
  const numberEditor = NumberEditor( document )
  const stringEditor = StringEditor( document )

  return {
    booleanEditor, constEditor, container, editor, enumEditor, numberEditor,
    stringEditor
  }
}
