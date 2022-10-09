import { useCallback, useState, useEffect, useMemo, KeyboardEvent } from 'react'
import { createEditor, BaseEditor, Editor, Transforms, Descendant, Text } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

import { CodeElement, DefaultElement, Leaf } from '../elements'
import { CustomEditor, saveToLocalStorage } from '../helpers'

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

  const renderElement = useCallback(props => {
    switch(props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.ctrlKey) {
      return
    }

    switch (event.key) {
      case '`': {
        event.preventDefault()
        CustomEditor.toggleCodeBlock(editor)
      }
      case 'b': {
        event.preventDefault()
        CustomEditor.toggleBoldMark(editor)
      }
      default:
        break;
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
