export const BoldLeaf = ({ children }) => <strong>{children}</strong>
export const ItalicLeaf = ({ children }) => <em>{children}</em>
export const UnderlineLeaf = ({ children }) => <u>{children}</u>
export const CodeLeaf = ({ children }) => <code>{children}</code>

export const Leaf = ({ leaf, children, attributes }) => {
  if (leaf.bold) children = <BoldLeaf>{children}</BoldLeaf>
  if (leaf.italic) children = <ItalicLeaf>{children}</ItalicLeaf>
  if (leaf.underline) children = <UnderlineLeaf>{children}</UnderlineLeaf>
  if (leaf.code) children = <CodeLeaf>{children}</CodeLeaf>

  return <span {...attributes}>{children}</span>
}