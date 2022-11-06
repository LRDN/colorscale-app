import clsx from 'clsx'
import { colord } from 'colord'
import { useContext } from 'react'
import { Trash2 } from 'react-feather'
import getColorName from '@helpers/getColorName'
import { ColorContext } from '@context/ColorContext'
import type { FC, FormEvent, HTMLProps } from 'react'
import type { ColorProps } from '@context/ColorContext'
import generateColorScale from '@helpers/generateColorScale'
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
  const steps = { majorSteps: 3, addMinorSteps: false }
  const colorScale = generateColorScale({ ...color, steps })
  const { setColors, activeColor } = useContext(ColorContext)
  const hexColors = colorScale.map((color) => colord(color).toHex())
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
        {hexColors.map((color, index) => (
          <div style={{ backgroundColor: color }} key={index} />
        ))}
      </div>
      <div className={styles.colorMenuItem__name}>
        {getColorName(hexColors[1])}
        <div className={styles.colorMenuItem__label}>
          {hexColors[0]} to {hexColors[2]}
        </div>
      </div>
      {isActiveColor && !!activeColor && (
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
