import clsx from 'clsx'
import { useState } from 'react'
import type { FC, HTMLProps } from 'react'
import { ChevronRight } from 'react-feather'
import AnimateHeight from 'react-animate-height'
import styles from './Collapse.module.scss'

type ComponentProps = HTMLProps<HTMLDivElement> & {
  name: string
  label: string
}

const Collapse: FC<ComponentProps> = ({
  name,
  label,
  children,
  className,
  ...props
}) => {
  const [isActive, setActive] = useState(true)
  const collapseClassName = clsx(className, styles.collapse)
  const iconClassName = clsx(styles.collapse__icon, {
    [styles['collapse__icon--active']]: isActive,
  })

  return (
    <div className={collapseClassName} {...props}>
      <header
        className={styles.collapse__header}
        onClick={() => setActive(!isActive)}
      >
        <ChevronRight className={iconClassName} />
        <div className={styles.collapse__name}>{name}</div>
        <div className={styles.collapse__label}>{label}</div>
      </header>
      <AnimateHeight
        contentClassName={styles.collapse__body}
        height={isActive ? 'auto' : 0}
        duration={250}
      >
        {children}
      </AnimateHeight>
    </div>
  )
}

export default Collapse
