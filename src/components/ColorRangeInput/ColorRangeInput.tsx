import clsx from 'clsx'
import { colord } from 'colord'
import { ColorContext } from '@context/ColorContext'
import type { FC, FormEvent, HTMLProps } from 'react'
import { useContext, useEffect, useState } from 'react'
import type { ColorProps } from '@context/ColorContext'
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

  const setColorRange = (value: string, index: number) => {
    setColors((colors: ColorProps[]) => {
      const hsvColor = colord(value).toHsv()
      colors[activeColor].hue.range[index] = hsvColor.h
      colors[activeColor].saturation.range[index] = hsvColor.s
      colors[activeColor].brightness.range[index] = hsvColor.v
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
            if (value.length === 7) setColorRange(value, index)
            setInputValues((inputValues: string[]) => {
              inputValues[index] = value
              return [...inputValues]
            })
          }
        }

        return (
          <input
            className={styles.colorRangeInput__input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputValue}
            maxLength={7}
            key={index}
            type="text"
          />
        )
      })}
    </div>
  )
}

export default ColorRangeInput
