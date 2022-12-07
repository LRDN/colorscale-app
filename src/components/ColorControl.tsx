import { useContext } from 'react'
import Slider from '@components/Slider'
import type { FC, HTMLProps } from 'react'
import Collapse from '@components/Collapse'
import { ColorContext } from '@context/ColorContext'
import type { ColorProps } from '@context/ColorContext'

type ComponentProps = HTMLProps<HTMLDivElement> & {
  channel: 'hue' | 'saturation' | 'brightness'
}

type ColorRange = ColorProps[ComponentProps['channel']]['range']

const ColorControl: FC<ComponentProps> = ({ channel, ...props }) => {
  const { colors, setColors, activeColor } = useContext(ColorContext)
  const [startValue, endValue] = colors[activeColor][channel].range
  const valueRange = [0, channel === 'hue' ? 360 : 100]
  const labelSign = channel === 'hue' ? '°' : '%'

  const setRange = (range: ColorRange) => {
    setColors((colors: ColorProps[]) => {
      const values = { ...colors[activeColor][channel], range }
      colors[activeColor] = { ...colors[activeColor], [channel]: values }
      return [...colors]
    })
  }

  const handleChange = {
    startValue: (startValue: number) => setRange([startValue, endValue]),
    endValue: (endValue: number) => setRange([startValue, endValue]),
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
    </Collapse>
  )
}

export default ColorControl
