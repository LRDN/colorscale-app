import getCurveName from '@helpers/getCurveName'
import curvePresets from '@constants/curvePresets'
import type { CurveName } from '@helpers/getCurveName'
import type { ColorProps } from '@context/ColorContext'

const invertCurve = (curve: number[]) => {
  return [curve[2], curve[3], curve[0], curve[1]].map((value) => {
    return Math.round((1 - value) * 100) / 100
  })
}

const invertColorScale = (color: ColorProps) => {
  for (const channel of ['hue', 'saturation', 'brightness'] as const) {
    let { range, curve, curveName } = color[channel]
    const curvePreset = curvePresets[curveName as CurveName]

    if (curvePreset) {
      curveName = getCurveName(invertCurve(curvePreset))
    }

    color[channel] = {
      range: [range[1], range[0]],
      curve: invertCurve(curve),
      curveName,
    }
  }

  return color
}

export default invertColorScale
