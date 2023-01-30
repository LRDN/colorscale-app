import curvePresets from '@constants/curvePresets'

export type CurveName = keyof typeof curvePresets

const getCurveName = (curve: number[]) => {
  return Object.keys(curvePresets).find((curveName) => {
    const curvePreset = curvePresets[curveName as CurveName]
    return curvePreset.toString() === curve.toString()
  })
}

export default getCurveName
