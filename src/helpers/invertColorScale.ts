import type { ColorProps } from '@context/ColorContext'

const invertColorScale = (color: ColorProps) => {
  for (const channel of ['hue', 'saturation', 'brightness'] as const) {
    const [startValue, endValue] = color[channel].range
    const [x1, y1, x2, y2] = color[channel].curve

    color[channel] = {
      range: [endValue, startValue],
      curve: [x2, y2, x1, y1].map((value) => {
        return Math.round((1 - value) * 100) / 100
      }),
    }
  }

  return color
}

export default invertColorScale
