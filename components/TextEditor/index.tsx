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
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <BlockButton format="left" icon="format_align_left" />
          <BlockButton format="center" icon="format_align_center" />
          <BlockButton format="right" icon="format_align_right" />
          <BlockButton format="justify" icon="format_align_justify" />
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
