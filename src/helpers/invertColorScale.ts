import type { ColorProps } from '@context/ColorContext'

const invertColorScale = (color: ColorProps) => {
  for (const channel of ['hue', 'saturation', 'brightness'] as const) {
    const [x1, y1, x2, y2] = color[channel].curve
    color[channel].curve = [x2, y2, x1, y1].map((value) => {
      return Math.round((1 - value) * 100) / 100
    })

    color[channel].range.reverse()
  }

  return color
}

export default invertColorScale
