import type { AnyColor } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import { Colord, colord, extend } from 'colord'

extend([a11yPlugin])

const analyzeColor = (color: AnyColor | Colord) => {
  if (!(color instanceof Colord)) {
    color = colord(color)
  }

  const hsvColor = color.toHsv()

  return {
    hue: hsvColor.h + '°',
    saturation: hsvColor.s + '%',
    brightness: hsvColor.v + '%',
    contrast: color.contrast() + ':1',
  }
}

export default analyzeColor