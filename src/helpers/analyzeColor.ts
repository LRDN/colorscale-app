import a11yPlugin from 'colord/plugins/a11y'
import { Colord, colord, extend } from 'colord'
import type { AnyColor, HsvColor } from 'colord'

extend([a11yPlugin])

const analyzeColor = (color: AnyColor | Colord) => {
  const { h, s, v } = color as HsvColor

  if (!(color instanceof Colord)) {
    color = colord(color)
  }

  const isHsvColor = [h, s, v].every((value) => !isNaN(value))
  const hsvColor = isHsvColor ? { h, s, v } : color.toHsv()

  return {
    hue: Math.round(hsvColor.h) + '°',
    saturation: Math.round(hsvColor.s) + '%',
    brightness: Math.round(hsvColor.v) + '%',
    contrast: color.contrast() + ':1',
  }
}

export default analyzeColor
