import clsx from 'clsx'
import type { FC, HTMLProps } from 'react'
import Interaction from '@components/Interaction'
import { Fragment, useEffect, useState } from 'react'
import type { Position } from '@components/Interaction'
import styles from './CurveEditor.module.scss'

type ComponentProps = Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'> & {
  onChange: (value: number[]) => void
  value: number[]
}

const CurveEditor: FC<ComponentProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const [activePoint, setActivePoint] = useState<number | null>(null)
  const curveEditorClassName = clsx(className, styles.curveEditor)
  const pathProps = { vectorEffect: 'non-scaling-stroke' }
  const [x1, y1, x2, y2] = value.map((value, index) => {
    return (index % 2 ? 1 - value : value) * 100
  })

  const handleInteractionMove = ({ top, left }: Position) => {
    if (activePoint === null) return
    const [x1, y1, x2, y2] = value
    const x = Math.round(left) / 100
    const y = Math.round(100 - top) / 100
    onChange(activePoint ? [x1, y1, x, y] : [x, y, x2, y2])
  }

  useEffect(() => {
    const handlePointerUp = () => setActivePoint(null)
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  return (
    <div className={curveEditorClassName} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g className={styles.curveEditor__grid}>
          {[25, 50, 75].map((point, index) => (
            <Fragment key={index}>
              <path d={`M ${point},0 L ${point},100`} {...pathProps} />
              <path d={`M 0,${point} L 100,${point}`} {...pathProps} />
            </Fragment>
          ))}
        </g>
        <path d={`M 0,100 L ${x1},${y1}`} {...pathProps} />
        <path d={`M 100,0 L ${x2},${y2}`} {...pathProps} />
        <path
          d={`M 0,100 C ${x1},${y1} ${x2},${y2} 100,0`}
          className={styles.curveEditor__curve}
          {...pathProps}
        />
      </svg>
      <Interaction
        className={styles.curveEditor__interaction}
        onMove={handleInteractionMove}
      >
        {[
          [x1, y1],
          [x2, y2],
        ].map(([x, y], index) => (
          <div
            onPointerDown={() => setActivePoint(index)}
            style={{ top: y + '%', left: x + '%' }}
            className={styles.curveEditor__handle}
            key={index}
          />
        ))}
      </Interaction>
    </div>
  )
}

export default CurveEditor
