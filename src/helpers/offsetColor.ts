import { Colord, colord } from 'colord'
import type { AnyColor, HsvColor } from 'colord'

const offsetColor = (color: AnyColor | Colord, offset: number) => {
  if (!(color instanceof Colord)) {
    color = colord(color)
  }

  const isColorDark = color.isDark()
  const { h, s, v } = color.toHsv()
  const hsvColor: HsvColor = {
    h,
    s: s && s + (isColorDark ? -1 : 1) * offset,
    v: v + (isColorDark ? 1 : -1) * offset,
  }

  return hsvColor
}

export default offsetColor
