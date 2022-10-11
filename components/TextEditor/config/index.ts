export const INITIAL_VALUE = [
  {
    type: 'paragraph',
    children: [{ text: 'This is a rich text editor demo using SlateJS.' }],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A custom component blockquote example' }],
  },
]

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']