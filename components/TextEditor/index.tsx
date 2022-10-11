import { Slate, Editable } from 'slate-react'

import { Toolbar, MarkButton, BlockButton } from './components'
import { useTextEditor } from './hooks/useTextEditor'

import styles from './TextEditor.module.css'

const TextEditor = () => {
  const { editor, initialValue, renderElement, renderLeaf, onKeyDown, onChange } = useTextEditor()
  return (
    <div className={styles.container}>
      <Slate editor={editor} value={initialValue} onChange={onChange}>
        <Toolbar>
          <MarkButton format="bold" />
          <MarkButton format="italic" />
          <MarkButton format="underline" />
          <MarkButton format="code" />
          <BlockButton format="heading-two" />
          <BlockButton format="heading-one" />
          <BlockButton format="numbered-list" />
          <BlockButton format="bulleted-list" />
          <BlockButton format="left" />
          <BlockButton format="center" />
          <BlockButton format="right" />
          <BlockButton format="justify" />
          <BlockButton format="block-quote" />
        </Toolbar>
        <Editable
          className={styles.editable}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          autoFocus
        />
      </Slate>
    </div>
  )
}

export default TextEditor
