import clsx from 'clsx'
import { hex } from 'color-convert'
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
      const [h, s, v] = hex.hsv.raw(value)
      colors[activeColor].hue.range[index] = h
      colors[activeColor].saturation.range[index] = s
      colors[activeColor].brightness.range[index] = v
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
