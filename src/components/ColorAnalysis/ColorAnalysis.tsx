import clsx from 'clsx'
import type { FC, HTMLProps } from 'react'
import type { AnyColor, Colord } from 'colord'
import offsetColor from '@helpers/offsetColor'
import analyzeColor from '@helpers/analyzeColor'
import styles from './ColorAnalysis.module.scss'

type ComponentProps = Omit<HTMLProps<HTMLDivElement>, 'color'> & {
  color: AnyColor | Colord
}

const ColorAnalysis: FC<ComponentProps> = ({ color, className, ...props }) => {
  const colorAnalysisClassName = clsx(className, styles.colorAnalysis)
  const labelColor = offsetColor(color, 0.5).toHex()
  const analyzedColor = analyzeColor(color)

  return (
    <div className={colorAnalysisClassName} {...props}>
      {Object.entries(analyzedColor).map(([name, value]) => (
        <div className={styles.colorAnalysis__item} key={name}>
          <div
            className={styles.colorAnalysis__label}
            style={{ color: labelColor }}
          >
            {name[0].toUpperCase()}
            <span>{name.slice(1)}</span>
          </div>
          <div className={styles.colorAnalysis__value}>{value}</div>
        </div>
      ))}
    </div>
  )
}

export default ColorAnalysis
