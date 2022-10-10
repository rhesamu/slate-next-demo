import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBold,
  faItalic,
  faUnderline,
  faCode,
  faListUl,
  faListOl,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faQuoteRight,
  faAngleUp,
  faAngleDoubleUp
} from '@fortawesome/free-solid-svg-icons'

export const Icon = ({ format }) => {
  let icon;

  switch(format) {
    case 'bold':
      icon = faBold
      break
    case 'italic':
      icon = faItalic
      break
    case 'underline':
      icon = faUnderline
      break
    case 'code':
      icon = faCode
      break
    case 'numbered-list':
      icon = faListOl
      break
    case 'bulleted-list':
      icon = faListUl
      break
    case 'left':
      icon = faAlignLeft
      break
    case 'right':
      icon = faAlignRight
      break
    case 'center':
      icon = faAlignCenter
      break
    case 'justify':
      icon = faAlignJustify
      break
    case 'block-quote':
      icon = faQuoteRight
      break
    case 'heading-one':
      icon = faAngleDoubleUp
      break
    case 'heading-two':
      icon = faAngleUp
      break
    default:
      icon = false
      break
  }

  return (
    <FontAwesomeIcon icon={icon} />
  )
}