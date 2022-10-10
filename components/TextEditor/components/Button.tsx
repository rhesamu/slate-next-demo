import { useSlate } from 'slate-react'
import cx from 'classnames'

import { Icon } from './Icon';

import { CustomEditor } from '../helpers'
import { TEXT_ALIGN_TYPES } from '../config'

import styles from './Button.module.css'

export const BaseButton = (
  {
    className = '',
    active = false,
    ...props
  }
) => {
  const classes = cx(styles.baseButton, { [styles.active]: active }, className)
  return (
    <span
      className={classes}
      
      {...props}
    />
  )
}

export const MarkButton = ({ format }) => {
  const editor = useSlate()
  return (
    <BaseButton
      active={CustomEditor.isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        CustomEditor.toggleMark(editor, format)
      }}
    >
      <Icon format={format} />
    </BaseButton>
  )
}

export const BlockButton = ({ format }) => {
  const editor = useSlate()
  return (
    <BaseButton
      active={CustomEditor.isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        CustomEditor.toggleBlock(editor, format)
      }}
    >
      <Icon format={format} />
    </BaseButton>
  )
}