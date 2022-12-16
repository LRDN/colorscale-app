import clsx from 'clsx'
import type { FC, HTMLProps } from 'react'
import { ChevronDown } from 'react-feather'
import styles from './Select.module.scss'

type ComponentProps = HTMLProps<HTMLSelectElement> & {
  label?: string
}

const Select: FC<ComponentProps> = ({
  label,
  children,
  className,
  ...props
}) => {
  const selectClassName = clsx(className, styles.select)

  return (
    <label className={selectClassName}>
      {label && <span className={styles.select__label}>{label}</span>}
      <span className={styles.select__container}>
        <ChevronDown className={styles.select__icon} />
        <select {...props}>{children}</select>
      </span>
    </label>
  )
}

export default Select
