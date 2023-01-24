import type { AnyColor } from 'colord'
import { Colord, colord } from 'colord'

const offsetColor = (color: AnyColor | Colord, offset: number) => {
  if (!(color instanceof Colord)) {
    color = colord(color)
  }

  const { r, g, b } = color.toRgb()
  const sign = color.isDark() ? 1 : -1
  const value = sign * Math.round(offset * 255)
  const rgbColor = { r: r + value, g: g + value, b: b + value }

  return colord(rgbColor).hue(color.hue())
}

export default offsetColor
