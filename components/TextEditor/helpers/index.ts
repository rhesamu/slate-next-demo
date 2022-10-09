import { Transforms, Text, Editor, Descendant } from 'slate'

export const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: node => node.bold === true,
      universal: true
    })

    return !!match
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: node => node.type === 'code'
    })

    return !!match
  },

  toggleBoldMark(editor: Editor) {
    console.log('editor:', editor)
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: node => Text.isText(node), split: true }
    )
  },

  toggleCodeBlock(editor: Editor) {
    console.log('editor', editor)
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'code' },
      { match: node => Editor.isBlock(editor, node) }
    )
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