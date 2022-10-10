import cx from 'classnames'
import styles from './Toolbar.module.css'

export const Toolbar = ({ className = '', children, ...props }) => {
  const classes = cx(
    styles.container,
    className
  )

  return (
    <div
      {...props}
      className={classes}
    >
      {children}
    </div>
  )
}