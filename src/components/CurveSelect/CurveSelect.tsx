import clsx from 'clsx'
import { ChevronDown } from 'react-feather'
import getCurveName from '@helpers/getCurveName'
import curvePresets from '@constants/curvePresets'
import type { FC, FormEvent, HTMLProps } from 'react'
import type { CurveName } from '@helpers/getCurveName'
import styles from './CurveSelect.module.scss'

type ComponentProps = Omit<
  HTMLProps<HTMLSelectElement>,
  'onChange' | 'value'
> & {
  onChange: (value?: number[]) => void
  value: number[]
}

const CurveSelect: FC<ComponentProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const curveSelectClassName = clsx(className, styles.curveSelect)
  const curveName = getCurveName(value) || 'customCurve'

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    const curveName = event.currentTarget.value as CurveName
    onChange(curvePresets[curveName])
  }

  const formatCurveName = (curveName: string) => {
    curveName = curveName.replace(/([A-Z])/g, ' $1')
    return curveName[0].toUpperCase() + curveName.slice(1)
  }

  return (
    <div className={curveSelectClassName}>
      <select
        className={styles.curveSelect__select}
        onChange={handleChange}
        value={curveName}
        {...props}
      >
        {['customCurve', ...Object.keys(curvePresets)].map((curveName) => (
          <option key={curveName} value={curveName}>
            {formatCurveName(curveName)}
          </option>
        ))}
      </select>
      {formatCurveName(curveName)}
      <ChevronDown className={styles.curveSelect__icon} />
    </div>
  )
}

export default CurveSelect
