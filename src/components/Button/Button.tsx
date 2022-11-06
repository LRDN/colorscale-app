import clsx from 'clsx'
import type { FC, HTMLAttributes } from 'react'
import styles from './Button.module.scss'

type ComponentProps = HTMLAttributes<HTMLButtonElement>

const Button: FC<ComponentProps> = ({ className, children, ...props }) => {
  const buttonClassName = clsx(className, styles.button)

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  )
}

export default Button
