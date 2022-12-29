import type { AnyColor } from 'colord'
import hwbPlugin from 'colord/plugins/hwb'
import { Colord, colord, extend } from 'colord'

extend([hwbPlugin])

const colorConverters = {
  hex: (color: Colord) => color.toHex(),
  rgb: (color: Colord) => color.toRgbString(),
  hsl: (color: Colord) => color.toHslString(),
  hwb: (color: Colord) => color.toHwbString(),
}

const convertColor = (
  color: AnyColor | Colord,
  colorModel: keyof typeof colorConverters,
) => {
  return colorConverters[colorModel](
    !(color instanceof Colord) ? colord(color) : color,
  )
}

export default convertColor
