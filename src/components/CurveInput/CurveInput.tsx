import clsx from 'clsx'
import { useEffect, useState } from 'react'
import CurveSelect from '@components/CurveSelect'
import type { FC, FormEvent, HTMLProps } from 'react'
import styles from './CurveInput.module.scss'

type ComponentProps = Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'> & {
  onChange: (value: number[]) => void
  value: number[]
}

const CurveInput: FC<ComponentProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const curveInputClassName = clsx(className, styles.curveInput)
  const [inputValues, setInputValues] = useState(value.map(String))

  const setInputValue = (inputValue: string, index: number) => {
    const newValue = Math.round(parseFloat(inputValue) * 100) / 100

    if (newValue >= 0 && newValue <= 1 && newValue !== value[index]) {
      onChange(value.map((value, i) => (index === i ? newValue : value)))
    }

    setInputValues((inputValues: string[]) => {
      inputValues[index] = inputValue
      return [...inputValues]
    })
  }

  useEffect(() => setInputValues(value.map(String)), [value])

  return (
    <div className={curveInputClassName} {...props}>
      <CurveSelect value={value} onChange={onChange} />
      {inputValues.map((inputValue: string, index: number) => {
        const handleBlur = () => setInputValue(value[index].toString(), index)
        const handleChange = (event: FormEvent<HTMLInputElement>) => {
          setInputValue(event.currentTarget.value, index)
        }

        return (
          <input
            className={styles.curveInput__input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputValue}
            key={index}
            type="text"
          />
        )
      })}
    </div>
  )
}

export default CurveInput
