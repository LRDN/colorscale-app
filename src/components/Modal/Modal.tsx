import clsx from 'clsx'
import { X } from 'react-feather'
import { useEffect } from 'react'
import type { FC, FormEvent, HTMLProps, MouseEvent } from 'react'
import styles from './Modal.module.scss'

export type CloseEvent = FormEvent | KeyboardEvent | MouseEvent

type ComponentProps = HTMLProps<HTMLDivElement> & {
  onClose: (event: CloseEvent) => void
  title: string
}

const Modal: FC<ComponentProps> = ({
  title,
  onClose,
  children,
  className,
  ...props
}) => {
  const modalClassName = clsx(className, styles.modal)
  const handleClick = (event: MouseEvent) => onClose(event)
  const handleBackgroundClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose(event)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className={modalClassName} onClick={handleBackgroundClick} {...props}>
      <div className={styles.modal__content}>
        <header className={styles.modal__header}>
          {title}
          <div className={styles.modal__closeButton} onClick={handleClick}>
            <X />
          </div>
        </header>
        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
