import getColorName from '@helpers/getColorName'
import convertColor from '@helpers/convertColor'
import type { ColorProps } from '@context/ColorContext'
import { getColorStep } from '@helpers/generateColorScale'
import generateColorScale from '@helpers/generateColorScale'

const exportFormats = ['css', 'scss', 'json'] as const
const colorModels = ['hex', 'rgb', 'hsl', 'hwb'] as const

export type ExportFormat = typeof exportFormats[number]
export type ColorModel = typeof colorModels[number]

const getColorScaleName = (color: ColorProps) => {
  color = { ...color, steps: { majorSteps: 3 } }
  const colorScale = generateColorScale(color)
  return getColorName(colorScale[1])
}

const getColorScales = (colors: ColorProps[], colorModel: ColorModel) => {
  const colorScales = colors.map((color) => {
    const colorName = color.name || getColorScaleName(color)
    const colorKey = colorName.toLowerCase().replace(/\s/g, '-')
    const colorScale = generateColorScale(color).map((hsvColor, index) => {
      return [getColorStep(color, index), convertColor(hsvColor, colorModel)]
    })

    return [colorKey, Object.fromEntries(colorScale)]
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
    const isCSS = exportFormat === 'css'
    const colorPrefix = isCSS ? '  --' : '$'
    const colorScaleExport = Object.entries(colorScales)
      .map(([colorKey, colorScale]) => {
        const colors = Object.entries(colorScale!).map(([colorStep, color]) => {
          return `${colorPrefix}${colorKey}-${colorStep}: ${color};`
        })

        return colors.join('\n')
      })
      .join('\n\n')

    return isCSS ? `:root {\n${colorScaleExport}\n}` : colorScaleExport
  }

  return JSON.stringify(colorScales, undefined, 2)
}

export { exportFormats, colorModels, getColorScaleName }
export default exportColorScales
