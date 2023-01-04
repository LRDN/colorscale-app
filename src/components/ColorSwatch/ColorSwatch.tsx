import clsx from 'clsx'
import { colord } from 'colord'
import { useContext } from 'react'
import type { Colord } from 'colord'
import type { FC, HTMLProps } from 'react'
import { ColorContext } from '@context/ColorContext'
import ColorAnalysis from '@components/ColorAnalysis'
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

  return (
    <div className={colorSwatchClassName} {...props}>
      <header className={styles.colorSwatch__header}>
        <div className={styles.colorSwatch__name}>
          {getColorScaleName(colors[activeColor])}
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
