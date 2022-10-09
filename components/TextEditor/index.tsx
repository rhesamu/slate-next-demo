import { Descendant } from 'slate'
import { Slate, Editable } from 'slate-react'

import { useTextEditor } from './hooks/useTextEditor'

const TextEditor = () => {
  const { editor, initialValue, renderElement, renderLeaf, onKeyDown, onChange } = useTextEditor()
  return (
    <>
      <Slate editor={editor} value={initialValue} onChange={onChange}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </>
  )
}

export default TextEditor
