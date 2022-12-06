import clsx from 'clsx'
import type { FC, HTMLProps } from 'react'
import styles from './SwitchGroup.module.scss'

type ComponentProps = HTMLProps<HTMLDivElement>

const SwitchGroup: FC<ComponentProps> = ({ className, children, ...props }) => {
  const switchGroupClassName = clsx(className, styles.switchGroup)

  return (
    <div className={switchGroupClassName} {...props}>
      {children}
    </div>
  )
}

export default SwitchGroup
