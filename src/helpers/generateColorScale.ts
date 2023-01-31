import bezier from 'bezier-easing'
import type { HsvColor } from 'colord'
import curvePresets from '@constants/curvePresets'
import type { CurveName } from '@helpers/getCurveName'
import type { ColorProps } from '@context/ColorContext'

const getColorStep = (color: ColorProps, index: number) => {
  const { addMinorSteps, startAtZero } = color.steps

  return addMinorSteps
    ? (index + (startAtZero ? 0 : 1)) * 5 + (startAtZero ? 0 : 5)
    : (index + (startAtZero ? 0 : 1)) * 10
}

const getTotalColorSteps = (color: ColorProps) => {
  const { majorSteps, addMinorSteps, startAtZero } = color.steps

  return addMinorSteps
    ? (startAtZero ? 1 : 0) * 2 + majorSteps * 2 - 1
    : (startAtZero ? 1 : 0) + majorSteps
}

const generateColorScale = (color: ColorProps) => {
  const { hue, saturation, brightness } = color
  const totalSteps = getTotalColorSteps(color)
  const colorScale: HsvColor[] = []

  const channels = [hue, saturation, brightness].map(
    ({ range, curve, curveName }) => {
      const [x1, y1, x2, y2] = curvePresets[curveName as CurveName] || curve
      return { bezierCurve: bezier(x1, y1, x2, y2), range }
    },
  )

  for (let i = 0; i < totalSteps; i++) {
    const stepValue = i / (totalSteps - 1)
    const [h, s, v] = channels.map(({ bezierCurve, range }) => {
      return bezierCurve(stepValue) * (range[1] - range[0]) + range[0]
    })

    colorScale.push({ h, s, v })
  }

  return colorScale
}

export { getColorStep, getTotalColorSteps }
export default generateColorScale
