import getColorName from '@helpers/getColorName'
import convertColor from '@helpers/convertColor'
import type { ColorProps } from '@context/ColorContext'
import { getColorStep } from '@helpers/generateColorScale'
import generateColorScale from '@helpers/generateColorScale'

const exportFormats = ['css', 'scss', 'json'] as const
const colorModels = ['hex', 'rgb', 'hsl', 'hwb'] as const

export type ExportFormat = typeof exportFormats[number]
export type ColorModel = typeof colorModels[number]
export type ColorScale = Record<string, string>

const getColorScaleName = (color: ColorProps) => {
  color = { ...color, steps: { majorSteps: 3 } }
  const colorScale = generateColorScale(color)
  return getColorName(colorScale[1])
}

const getColorScales = (
  colors: ColorProps[],
  colorModel: ColorModel,
): Record<string, ColorScale> => {
  const colorScales = colors.map((color) => {
    const colorName = color.name || getColorScaleName(color)
    const colorScale = generateColorScale(color).map((hsvColor, index) => {
      return [getColorStep(color, index), convertColor(hsvColor, colorModel)]
    })

    return [
      colorName.toLowerCase().replace(/\s/g, '-'),
      Object.fromEntries(colorScale),
    ]
  })

  return Object.fromEntries(colorScales)
}

const formatColorScales = (
  colorScales: Record<string, ColorScale>,
  formatColor: (color: string[], index: number[]) => string,
  indentSize: number = 0,
) => {
  const indent = ' '.repeat(indentSize)
  return Object.entries(colorScales).map(([colorName, colorScale], x) => {
    const colors = Object.entries(colorScale).map(([colorStep, color], y) => {
      return indent + formatColor([`${colorName}-${colorStep}`, color], [x, y])
    })

    return colors.join('\n')
  })
}

const exportColorScales = (
  colors: ColorProps[],
  exportFormat: ExportFormat,
  colorModel: ColorModel,
) => {
  const colorScales = getColorScales(colors, colorModel)

  switch (exportFormat) {
    case 'scss': {
      const formatColor = ([name, color]: string[]) => `$${name}: ${color};`
      return formatColorScales(colorScales, formatColor).join('\n\n')
    }
    case 'css': {
      const formatColor = ([name, color]: string[]) => `--${name}: ${color};`
      const colors = formatColorScales(colorScales, formatColor, 2)
      return `:root {\n${colors.join('\n\n')}\n}`
    }
  }

  return JSON.stringify(colorScales, undefined, 2)
}

export { exportFormats, colorModels, getColorScaleName }
export default exportColorScales
