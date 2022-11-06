import type { AnyColor } from 'colord'
import colorNames from '@constants/colorNames'
import namesPlugin from 'colord/plugins/names'
import { Colord, colord, extend } from 'colord'

extend([namesPlugin])

const getColorName = (color: AnyColor | Colord) => {
  if (!(color instanceof Colord)) {
    color = colord(color)
  }

  const colorName = color.toName({ closest: true })
  return colorNames[colorName as keyof typeof colorNames]
}

export default getColorName
