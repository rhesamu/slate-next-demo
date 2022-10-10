import { Transforms, Text, Editor, Descendant, Element } from 'slate'

import { LIST_TYPES, TEXT_ALIGN_TYPES } from '../config'

export const CustomEditor = {
  isBlockActive(editor, format, blockType = 'type') {
    const { selection } = editor
    if (!selection) return false
  
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n[blockType] === format,
      })
    )
  
    return !!match
  },
  
  isMarkActive(editor, format) {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  },

  toggleMark(editor: Editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format)

    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  },

  toggleBlock(editor: Editor, format) {
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: node =>
        !Editor.isEditor(node) &&
        Element.isElement(node) &&
        LIST_TYPES.includes(node.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    })

    let newProperties
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      }
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      }
    }

    Transforms.setNodes(editor, newProperties)
  
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  },
}

export const saveToLocalStorage = (editor: Editor, value: Descendant[]) => {
  const isAstChange = editor.operations.some(
    operation => 'set_selection' !== operation.type
  )

  if (isAstChange) {
    const content = JSON.stringify(value)
    localStorage.setItem('content', content)
  }
}