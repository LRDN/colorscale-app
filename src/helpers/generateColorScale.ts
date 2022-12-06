import bezier from 'bezier-easing'
import type { HsvColor } from 'colord'
import type { ColorProps } from '@context/ColorContext'

const getTotalColorSteps = (color: ColorProps) => {
  const { majorSteps, addMinorSteps, startAtZero } = color.steps

  return addMinorSteps
    ? (startAtZero ? 1 : 0) * 2 + majorSteps * 2 - 1
    : (startAtZero ? 1 : 0) + majorSteps
}

const calculateColorChannel = (
  channelProps: { range: number[]; curve: number[] },
  stepValue: number,
) => {
  const [start, end] = channelProps.range
  const [x1, y1, x2, y2] = channelProps.curve
  const bezierCurve = bezier(x1, y1, x2, y2)

  return bezierCurve(stepValue) * (end - start) + start
}

const generateColorScale = (color: ColorProps) => {
  const totalSteps = getTotalColorSteps(color)
  const colorScale: HsvColor[] = []

  for (let i = 0; i < totalSteps; i++) {
    const stepValue = i / (totalSteps - 1)

    colorScale.push({
      h: calculateColorChannel(color.hue, stepValue),
      s: calculateColorChannel(color.saturation, stepValue),
      v: calculateColorChannel(color.brightness, stepValue),
    })
  }

  return colorScale
}

export { getTotalColorSteps }
export default generateColorScale
