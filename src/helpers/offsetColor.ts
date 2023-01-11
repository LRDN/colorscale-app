import { Colord, colord } from 'colord'
import type { AnyColor, HsvColor } from 'colord'

const offsetColor = (color: AnyColor | Colord, offset: number) => {
  if (!(color instanceof Colord)) {
    color = colord(color)
  }

  const { h, s, v } = color.toHsv()
  const hsvColor: HsvColor = color.isDark()
    ? { h, s: s && s - offset, v: v + offset }
    : { h, s: s && s + offset, v: v - offset }

  return hsvColor
}

export default offsetColor
