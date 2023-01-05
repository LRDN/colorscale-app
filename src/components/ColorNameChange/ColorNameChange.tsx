import clsx from 'clsx'
import { Check } from 'react-feather'
import Modal from '@components/Modal'
import Button from '@components/Button'
import { useContext, useState } from 'react'
import type { CloseEvent } from '@components/Modal'
import { ColorContext } from '@context/ColorContext'
import type { FC, FormEvent, HTMLProps } from 'react'
import type { ColorProps } from '@context/ColorContext'
import styles from './ColorNameChange.module.scss'

type ComponentProps = HTMLProps<HTMLFormElement> & {
  onClose: (event: CloseEvent) => void
  placeholder: string
}

const ColorNameChange: FC<ComponentProps> = ({
  onClose,
  placeholder,
  className,
  ...props
}) => {
  const { colors, setColors, activeColor } = useContext(ColorContext)
  const colorNameChangeClassName = clsx(className, styles.colorNameChange)
  const [colorName, setColorName] = useState(colors[activeColor].name || '')

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.match(/^[-\s\w]*$/)) {
      setColorName(event.currentTarget.value)
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    setColors((colors: ColorProps[]) => {
      const name = colorName.trim() || undefined
      colors[activeColor] = { ...colors[activeColor], name }
      return [...colors]
    })

    event.preventDefault()
    onClose(event)
  }

  return (
    <Modal title="Color Name" onClose={onClose}>
      <form
        className={colorNameChangeClassName}
        onSubmit={handleFormSubmit}
        {...props}
      >
        <input
          className={styles.colorNameChange__input}
          onChange={handleInputChange}
          placeholder={placeholder}
          value={colorName}
          maxLength={32}
          type="text"
          autoFocus
        />
        <Button>
          <Check /> Change Name
        </Button>
      </form>
    </Modal>
  )
}

export default ColorNameChange
