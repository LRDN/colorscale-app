import type { FC, ReactNode } from 'react'
import { createContext, useState } from 'react'
import useLocalStorage from '@hooks/useLocalStorage'

type ProviderProps = {
  children?: ReactNode
}

export type ColorProps = {
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
    hue: { range: [220, 220], curve: [0.75, 0.25, 0.25, 0.75] },
    saturation: { range: [100, 100], curve: [0.75, 0.25, 0.25, 0.75] },
    brightness: { range: [80, 40], curve: [0.75, 0.25, 0.25, 0.75] },
  }

  const [activeColor, setActiveColor] = useState(0)
  const [colors, setColors] = useLocalStorage('colors', [defaultColor])

  return (
    <ColorContext.Provider
      value={{ colors, setColors, activeColor, setActiveColor }}
    >
      {children}
    </ColorContext.Provider>
  )
}

export { ColorContext, ColorProvider }
