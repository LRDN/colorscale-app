import { colord } from 'colord'
import type { HsvColor } from 'colord'
import getColorName from '@helpers/getColorName'
import type { ColorProps } from '@context/ColorContext'
import { getColorStep } from '@helpers/generateColorScale'
import generateColorScale from '@helpers/generateColorScale'

const colorConverters = {
  hex: (color: HsvColor) => colord(color).toHex(),
  rgb: (color: HsvColor) => colord(color).toRgbString(),
  hsl: (color: HsvColor) => colord(color).toHslString(),
}

const exportFormats = ['css', 'scss', 'json'] as const
const colorModels = Object.keys(colorConverters)

export type ExportFormat = typeof exportFormats[number]
export type ColorModel = keyof typeof colorConverters

const getColorScaleName = (color: ColorProps) => {
  const steps = { majorSteps: 3 }
  const colorScale = generateColorScale({ ...color, steps })
  return getColorName(colorScale[1]).toLowerCase().replace(/\s/g, '-')
}

const getColorScales = (colors: ColorProps[], colorModel: ColorModel) => {
  const colorScales = colors.map((color) => {
    const colorName = getColorScaleName(color)
    const colorScale = generateColorScale(color).map((hsvColor, index) => {
      return [getColorStep(color, index), colorConverters[colorModel](hsvColor)]
    })

    return [colorName, Object.fromEntries(colorScale)]
  })

  return Object.fromEntries(colorScales)
}

const exportColorScales = (
  colors: ColorProps[],
  exportFormat: ExportFormat,
  colorModel: ColorModel,
) => {
  const colorScales = getColorScales(colors, colorModel)

  if (exportFormat.endsWith('css')) {
    const colorPrefix = exportFormat === 'css' ? '--' : '$'
    const colorScaleEntries = Object.entries(colorScales)

    return colorScaleEntries
      .map(([colorName, colorScale]) => {
        const colorEntries = Object.entries(colorScale!)
        const colors = colorEntries.map(([colorStep, color]) => {
          return `${colorPrefix}${colorName}-${colorStep}: ${color};`
        })

        return colors.join('\n')
      })
      .join('\n\n')
  }

  return JSON.stringify(colorScales, undefined, 2)
}

export { exportFormats, colorModels }
export default exportColorScales
