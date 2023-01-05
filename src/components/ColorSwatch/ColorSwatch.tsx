import clsx from 'clsx'
import { colord } from 'colord'
import { Edit } from 'react-feather'
import type { Colord } from 'colord'
import type { FC, HTMLProps } from 'react'
import { useContext, useState } from 'react'
import { ColorContext } from '@context/ColorContext'
import ColorAnalysis from '@components/ColorAnalysis'
import ColorNameChange from '@components/ColorNameChange'
import { getColorStep } from '@helpers/generateColorScale'
import generateColorScale from '@helpers/generateColorScale'
import { getColorScaleName } from '@helpers/exportColorScales'
import styles from './ColorSwatch.module.scss'

type ComponentProps = HTMLProps<HTMLDivElement>

const ColorSwatch: FC<ComponentProps> = ({ className, ...props }) => {
  const { colors, activeColor } = useContext(ColorContext)
  const colorSwatchClassName = clsx(className, styles.colorSwatch)
  const colorScale = generateColorScale(colors[activeColor]).map((color) =>
    colord(color),
  )

  const [isNameChangeActive, setNameChangeActive] = useState(false)
  const colorName = getColorScaleName(colors[activeColor])
  const name = colors[activeColor].name || colorName

  const toggleNameChange = () => {
    setNameChangeActive(!isNameChangeActive)
  }

  return (
    <div className={colorSwatchClassName} {...props}>
      <header className={styles.colorSwatch__header}>
        {isNameChangeActive && (
          <ColorNameChange placeholder={colorName} onClose={toggleNameChange} />
        )}
        <div className={styles.colorSwatch__name}>{name}</div>
        <div
          className={styles.colorSwatch__editButton}
          onClick={toggleNameChange}
        >
          <Edit /> Change Name
        </div>
      </header>
      <div className={styles.colorSwatch__body}>
        {colorScale.map((color: Colord, index: number) => {
          const hexColor = color.toHex()
          const colorStep = getColorStep(colors[activeColor], index)
          const itemClassName = clsx(styles.colorSwatch__item, {
            [styles['colorSwatch__item--dark']]: color.isDark(),
          })

          return (
            <div
              style={{ backgroundColor: hexColor }}
              className={itemClassName}
              key={index}
            >
              <strong>{colorStep}</strong>
              <ColorAnalysis color={color} />
              {hexColor}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ColorSwatch
