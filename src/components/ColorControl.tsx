import { useContext } from 'react'
import Slider from '@components/Slider'
import type { FC, HTMLProps } from 'react'
import Collapse from '@components/Collapse'
import CurveInput from '@components/CurveInput'
import CurveEditor from '@components/CurveEditor'
import { ColorContext } from '@context/ColorContext'
import type { ColorProps } from '@context/ColorContext'

type ComponentProps = HTMLProps<HTMLDivElement> & {
  channel: 'hue' | 'saturation' | 'brightness'
}

type PartialColorChannel = Partial<ColorProps[ComponentProps['channel']]>

const ColorControl: FC<ComponentProps> = ({ channel, ...props }) => {
  const { colors, setColors, activeColor } = useContext(ColorContext)
  const [startValue, endValue] = colors[activeColor][channel].range
  const valueRange = [0, channel === 'hue' ? 360 : 100]
  const labelSign = channel === 'hue' ? '°' : '%'

  const setChannel = (values: PartialColorChannel) => {
    setColors((colors: ColorProps[]) => {
      values = { ...colors[activeColor][channel], ...values }
      colors[activeColor] = { ...colors[activeColor], [channel]: values }
      return [...colors]
    })
  }

  const handleChange = {
    startValue: (startValue: number) =>
      setChannel({ range: [startValue, endValue] }),
    endValue: (endValue: number) =>
      setChannel({ range: [startValue, endValue] }),
    curveValue: (curve: number[]) => setChannel({ curve }),
  }

  return (
    <Collapse
      name={channel[0].toUpperCase() + channel.slice(1)}
      label={`${startValue + labelSign} to ${endValue + labelSign}`}
      {...props}
    >
      <Slider
        onChange={handleChange.startValue}
        valueRange={valueRange}
        value={startValue}
        label="Start"
      />
      <Slider
        onChange={handleChange.endValue}
        valueRange={valueRange}
        value={endValue}
        label="End"
      />
      <CurveInput
        onChange={handleChange.curveValue}
        value={colors[activeColor][channel].curve}
      />
      <CurveEditor
        onChange={handleChange.curveValue}
        value={colors[activeColor][channel].curve}
      />
    </Collapse>
  )
}

export default ColorControl
