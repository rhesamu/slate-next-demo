export const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export const BlockQuoteElement = (props) => {
  return (
    <blockquote style={props.style} {...props.attributes}>
      {props.children}
    </blockquote>
  )
}

export const BulletedListElement = (props) => {
  return (
    <ul style={props.style} {...props.attributes}>
      {props.children}
    </ul>
  )
}

export const NumberedListElement = (props) => {
  return (
    <ol style={props.style} {...props.attributes}>
      {props.children}
    </ol>
  )
}

export const ListItemElement = (props) => {
  return (
    <li style={props.style} {...props.attributes}>
      {props.children}
    </li>
  )
}

export const HeadingOneElement = (props) => {
  return (
    <h1 style={props.style} {...props.attributes}>
      {props.children}
    </h1>
  )
}

export const HeadingTwoElement = (props) => {
  return (
    <h2 style={props.style} {...props.attributes}>
      {props.children}
    </h2>
  )
}

export const DefaultElement = (props) => {
  return (
    <p {...props.attributes}>
      {props.children}
    </p>
  )
}

export const Element = (props) => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />
    case 'block-quote':
      return <BlockQuoteElement {...props} />
    case 'bulleted-list':
      return <BulletedListElement {...props} />
    case 'numbered-list':
      return <NumberedListElement {...props} />
    case 'list-item':
      return <ListItemElement {...props} />
    case 'heading-one':
      return <HeadingOneElement {...props} />
    case 'heading-two':
      return <HeadingTwoElement {...props} />
    default:
      return <DefaultElement {...props} />
  }
}