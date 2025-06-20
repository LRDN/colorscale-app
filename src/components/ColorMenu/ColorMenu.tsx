import clsx from 'clsx'
import Button from '@components/Button'
import type { FC, HTMLProps } from 'react'
import { Plus, Download } from 'react-feather'
import ColorExport from '@components/ColorExport'
import ColorBackup from '@components/ColorBackup'
import { ColorContext } from '@context/ColorContext'
import ColorMenuItem from '@components/ColorMenuItem'
import type { ColorProps } from '@context/ColorContext'
import { useContext, useEffect, useRef, useState } from 'react'
import styles from './ColorMenu.module.scss'

type ComponentProps = HTMLProps<HTMLDivElement>

const ColorMenu: FC<ComponentProps> = ({ className, ...props }) => {
  const { colors, setColors, activeColor, setActiveColor } =
    useContext(ColorContext)

  const [isColorExportActive, setColorExportActive] = useState(false)
  const colorMenuClassName = clsx(className, styles.colorMenu)
  const [colorCount, setColorCount] = useState(colors.length)
  const colorMenuBodyRef = useRef<HTMLDivElement>(null)

  const handleAddClick = () => {
    setActiveColor(colors.length)
    setColors((colors: ColorProps[]) => {
      const previousColor = colors[colors.length - 1]
      const { steps, hue, saturation, brightness } = previousColor
      const range = hue.range.map((range) => (range + 360 / 10) % 360)
      const color = { steps, hue: { ...hue, range }, saturation, brightness }
      return [...colors, color]
    })
  }

  const toggleColorExport = () => {
    setColorExportActive(!isColorExportActive)
  }

  useEffect(() => {
    setColorCount(colors.length)

    if (colors.length > colorCount) {
      const bodyElement = colorMenuBodyRef.current!
      bodyElement.scrollTop = bodyElement.scrollHeight
    }
  }, [colors.length, colorCount])

  return (
    <div className={colorMenuClassName} {...props}>
      <header className={styles.colorMenu__header}>
        <div className={styles.colorMenu__label}>Colors</div>
        <div className={styles.colorMenu__addButton} onClick={handleAddClick}>
          Add Color <Plus />
        </div>
      </header>
      <div className={styles.colorMenu__body} ref={colorMenuBodyRef}>
        {colors.map((color: ColorProps, index: number) => {
          const isActiveColor = activeColor === index
          const handleItemClick = () => setActiveColor(index)

          return (
            <ColorMenuItem
              isActiveColor={isActiveColor}
              onClick={handleItemClick}
              color={color}
              key={index}
            />
          )
        })}
      </div>
      <footer className={styles.colorMenu__footer}>
        {isColorExportActive && <ColorExport onClose={toggleColorExport} />}
        <Button onClick={toggleColorExport}>
          <Download /> Export Colors
        </Button>
        <ColorBackup />
      </footer>
    </div>
  )
}

export default ColorMenu
