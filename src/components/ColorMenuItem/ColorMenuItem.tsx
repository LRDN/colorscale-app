import clsx from 'clsx'
import { colord } from 'colord'
import { useContext } from 'react'
import { Trash2 } from 'react-feather'
import { ColorContext } from '@context/ColorContext'
import type { FC, FormEvent, HTMLProps } from 'react'
import type { ColorProps } from '@context/ColorContext'
import generateColorScale from '@helpers/generateColorScale'
import { getColorScaleName } from '@helpers/exportColorScales'
import styles from './ColorMenuItem.module.scss'

type ComponentProps = Omit<HTMLProps<HTMLDivElement>, 'color'> & {
  color: ColorProps
  isActiveColor: boolean
}

const ColorMenuItem: FC<ComponentProps> = ({
  color,
  className,
  isActiveColor,
  ...props
}) => {
  const colorName = color.name || getColorScaleName(color)
  const { colors, setColors, activeColor } = useContext(ColorContext)
  const colorScale = generateColorScale({ ...color, steps: { majorSteps: 3 } })
  const previewColors = colorScale.map((color) => colord(color).toHex())
  const colorMenuItemClassName = clsx(className, styles.colorMenuItem, {
    [styles['colorMenuItem--active']]: isActiveColor,
  })

  const handleDeleteClick = (event: FormEvent<HTMLDivElement>) => {
    setColors((colors: ColorProps[]) => {
      colors.splice(activeColor, 1)
      return [...colors]
    })

    event.stopPropagation()
  }

  return (
    <div className={colorMenuItemClassName} {...props}>
      <div className={styles.colorMenuItem__preview}>
        {previewColors.map((color, index) => (
          <div style={{ backgroundColor: color }} key={index} />
        ))}
      </div>
      <div className={styles.colorMenuItem__name}>
        {colorName}
        <div className={styles.colorMenuItem__label}>
          {previewColors[0]} to {previewColors[previewColors.length - 1]}
        </div>
      </div>
      {isActiveColor && colors.length > 1 && (
        <div
          className={styles.colorMenuItem__deleteButton}
          onClick={handleDeleteClick}
        >
          <Trash2 />
        </div>
      )}
    </div>
  )
}

export default ColorMenuItem
