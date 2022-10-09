import { useCallback, useState } from 'react'

import { createEditor, BaseEditor, Editor, Transforms, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

type CustomText = { text: string; bold?: true }
type CodeElement = {
  type: 'code'
  children: CustomText[]
}
type DefaultElement = {
  type: 'paragraph'
  children: CustomText[]
}
type CustomElement = CodeElement | DefaultElement

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return (
    <p {...props.attributes}>
      {props.children}
    </p>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const TextEditor = () => {
  // Slate editor object that won't change across renders
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback(props => {
    switch(props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const onKeyDown = event => {
    const isCodeBlockShortcut = event.key === '`' && event.ctrlKey
    if (isCodeBlockShortcut) {
      event.preventDefault()

      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })

      Transforms.setNodes(
        editor,
        { type: match ? 'paragraph' : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    }
  }

  return (
    <>
      <Slate editor={editor} value={initialValue}>
        <Editable
          renderElement={renderElement}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </>
  )
}

export default TextEditor
