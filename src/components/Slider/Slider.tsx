import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Interaction from '@components/Interaction'
import type { FC, FormEvent, HTMLProps } from 'react'
import type { Position } from '@components/Interaction'
import styles from './Slider.module.scss'

type ComponentProps = Omit<HTMLProps<HTMLDivElement>, 'onChange'> & {
  onChange: (value: number) => void
  valueRange: number[]
  value: number
  label: string
}

const Slider: FC<ComponentProps> = ({
  label,
  value,
  onChange,
  className,
  valueRange,
  ...props
}) => {
  const [minValue, maxValue] = valueRange
  const maxLength = maxValue.toString().length
  const sliderClassName = clsx(className, styles.slider)
  const containerClassName = clsx(styles.slider__container)
  const [inputValue, setInputValue] = useState(value.toString())
  const sliderPosition = ((value - minValue) * 100) / (maxValue - minValue)

  const handleSliderMove = ({ left }: Position) => {
    onChange(Math.round((left * (maxValue - minValue)) / 100 + minValue))
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const value = Math.round(parseFloat(event.currentTarget.value))
    if (value >= minValue && value <= maxValue) onChange(value)
    setInputValue(event.currentTarget.value)
  }

  const handleInputBlur = () => setInputValue(value.toString())
  useEffect(() => setInputValue(value.toString()), [value])

  return (
    <div className={sliderClassName} {...props}>
      <div className={styles.slider__label}>{label}</div>
      <Interaction className={containerClassName} onMove={handleSliderMove}>
        <div
          className={styles.slider__handle}
          style={{ left: sliderPosition + '%' }}
        />
      </Interaction>
      <input
        className={styles.slider__input}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        maxLength={maxLength}
        value={inputValue}
        type="text"
      />
    </div>
  )
}

export default Slider
