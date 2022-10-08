import { useState } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { createEditor, BaseEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string; bold?: true }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const SlateNextDemo: NextPage = () => {
  // Slate editor object that won't change across renders
  const [editor] = useState(() => withReact(createEditor()))
  return (
    <Slate editor={editor} value={initialValue}>
      <Editable />
    </Slate>
  )
}

export default SlateNextDemo
