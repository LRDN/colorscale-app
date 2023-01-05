import type { FC, ReactNode } from 'react'
import useLocalStorage from '@hooks/useLocalStorage'
import { createContext, useMemo, useState } from 'react'

type ProviderProps = {
  children?: ReactNode
}

export type ColorProps = {
  name?: string
  steps: {
    majorSteps: number
    addMinorSteps?: boolean
    startAtZero?: boolean
  }
  hue: { range: number[]; curve: number[] }
  saturation: { range: number[]; curve: number[] }
  brightness: { range: number[]; curve: number[] }
}

const ColorContext = createContext<Record<string, any>>({})
const ColorProvider: FC<ProviderProps> = ({ children }) => {
  const defaultColor = {
    steps: { majorSteps: 10 },
    hue: { range: [230, 230], curve: [0.75, 0.25, 0.25, 0.75] },
    saturation: { range: [80, 100], curve: [0.75, 0.25, 0.25, 0.75] },
    brightness: { range: [100, 40], curve: [0.75, 0.25, 0.25, 0.75] },
  }

  const [activeColor, setActiveColor] = useState(0)
  const [colors, setColors] = useLocalStorage('colors', [defaultColor])

  useMemo(() => {
    if (!colors[activeColor]) {
      setActiveColor(activeColor - 1)
    }
  }, [colors, activeColor])

  return (
    <ColorContext.Provider
      value={{ colors, setColors, activeColor, setActiveColor }}
    >
      {children}
    </ColorContext.Provider>
  )
}

export { ColorContext, ColorProvider }
