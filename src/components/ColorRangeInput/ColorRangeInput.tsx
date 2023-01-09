import clsx from 'clsx'
import { hex } from 'color-convert'
import { Repeat } from 'react-feather'
import { ColorContext } from '@context/ColorContext'
import type { FC, FormEvent, HTMLProps } from 'react'
import type { ColorProps } from '@context/ColorContext'
import invertColorScale from '@helpers/invertColorScale'
import { Fragment, useContext, useEffect, useState } from 'react'
import styles from './ColorRangeInput.module.scss'

type ComponentProps = HTMLProps<HTMLDivElement> & {
  colorRange: string[]
}

const ColorRangeInput: FC<ComponentProps> = ({
  colorRange,
  className,
  ...props
}) => {
  const colorRangeInputClassName = clsx(className, styles.colorRangeInput)
  const [inputValues, setInputValues] = useState([...colorRange])
  const { setColors, activeColor } = useContext(ColorContext)

  const handleInvertClick = () => {
    setColors((colors: ColorProps[]) => {
      colors[activeColor] = invertColorScale(colors[activeColor])
      return [...colors]
    })
  }

  const handleBlur = () => setInputValues([...colorRange])
  useEffect(() => setInputValues([...colorRange]), [colorRange])

  return (
    <div className={colorRangeInputClassName} {...props}>
      <div className={styles.colorRangeInput__label}>Color Range</div>
      {inputValues.map((inputValue, index) => {
        const handleChange = (event: FormEvent<HTMLInputElement>) => {
          const { value } = event.currentTarget

          if (value.match(/^(#[0-9a-f]{0,6})?$/i)) {
            setInputValues((inputValues: string[]) => {
              inputValues[index] = value
              return [...inputValues]
            })

            if (value.length === 7) {
              setColors((colors: ColorProps[]) => {
                const hsvColor = hex.hsv.raw(value)

                for (const [i, channel] of (
                  ['hue', 'saturation', 'brightness'] as const
                ).entries()) {
                  const { range } = colors[activeColor][channel]
                  colors[activeColor][channel].range = [...range]
                  colors[activeColor][channel].range[index] = hsvColor[i]
                }

                return [...colors]
              })
            }
          }
        }

        return (
          <Fragment key={index}>
            {!!index && (
              <div
                className={styles.colorRangeInput__invertButton}
                onClick={handleInvertClick}
              >
                <Repeat />
              </div>
            )}
            <input
              className={styles.colorRangeInput__input}
              onChange={handleChange}
              onBlur={handleBlur}
              value={inputValue}
              maxLength={7}
              type="text"
            />
          </Fragment>
        )
      })}
    </div>
  )
}

export default ColorRangeInput
