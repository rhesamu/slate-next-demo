import { useCallback, useState, useEffect, useMemo, KeyboardEvent } from 'react'
import { createEditor, BaseEditor, Editor, Transforms, Descendant, Text } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import isHotkey from 'is-hotkey'

import { Element, Leaf } from '../components'
import { CustomEditor, saveToLocalStorage } from '../helpers'
import { HOTKEYS } from '../config'

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

export const useTextEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  // const [initialValue, setInitialValue] = useState([
  //   {
  //     type: 'paragraph',
  //     children: [{ text: 'A line of text in a paragraph.' }],
  //   },
  // ])
  
  // const initialValue = useMemo(() => {
  //   const localStorageContent = localStorage.getItem('content') || '[]'
  //   JSON.parse(localStorageContent) || [
  //     {
  //       type: 'paragraph',
  //       children: [{ text: 'A line of text in a paragraph.' }],
  //     },
  //   ]
  // }, [])

  // useEffect(() => {
  //   const content = localStorage.getItem('content');
  //   console.log('getContent:', content)
  //   if (content) {
  //     console.log('conditional')
  //     setInitialValue(JSON.parse(content))
  //   }
  // }, [])

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const onKeyDown = (event: KeyboardEvent) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        CustomEditor.toggleMark(editor, mark)
      }
    }
  }

  const onChange = (value: Descendant[]) => {
    saveToLocalStorage(editor, value)
  }

  return {
    editor,
    initialValue,
    renderElement,
    renderLeaf,
    onKeyDown,
    onChange
  }
}
