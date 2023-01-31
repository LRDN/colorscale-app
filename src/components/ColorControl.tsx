import { useContext } from 'react'
import Slider from '@components/Slider'
import type { FC, HTMLProps } from 'react'
import Collapse from '@components/Collapse'
import CurveInput from '@components/CurveInput'
import getCurveName from '@helpers/getCurveName'
import CurveEditor from '@components/CurveEditor'
import curvePresets from '@constants/curvePresets'
import { ColorContext } from '@context/ColorContext'
import type { CurveName } from '@helpers/getCurveName'
import type { ColorProps } from '@context/ColorContext'

type ComponentProps = HTMLProps<HTMLDivElement> & {
  channel: 'hue' | 'saturation' | 'brightness'
}

type ChannelProps = ColorProps[ComponentProps['channel']]

const ColorControl: FC<ComponentProps> = ({ channel, ...props }) => {
  const { colors, setColors, activeColor } = useContext(ColorContext)
  const { range, curve, curveName } = colors[activeColor][channel]
  const curveValue = curvePresets[curveName as CurveName] || curve
  const [startValue, endValue] = range.map(Math.round)
  const valueRange = [0, channel === 'hue' ? 360 : 100]
  const labelSign = channel === 'hue' ? '°' : '%'

  const setChannel = (channelProps: Partial<ChannelProps>) => {
    setColors((colors: ColorProps[]) => {
      channelProps = { ...colors[activeColor][channel], ...channelProps }
      colors[activeColor] = { ...colors[activeColor], [channel]: channelProps }
      return [...colors]
    })
  }

  const handleChange = {
    startValue: (startValue: number) =>
      setChannel({ range: [startValue, endValue] }),
    endValue: (endValue: number) =>
      setChannel({ range: [startValue, endValue] }),
    curveValue: (curve?: number[]) => {
      const curveName = curve && getCurveName(curve)
      setChannel({ ...(curve && !curveName && { curve }), curveName })
    },
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
      <CurveInput onChange={handleChange.curveValue} value={curveValue} />
      <CurveEditor onChange={handleChange.curveValue} value={curveValue} />
    </Collapse>
  )
}

export default ColorControl
