import { useContext } from 'react'
import Slider from '@components/Slider'
import Switch from '@components/Switch'
import Collapse from '@components/Collapse'
import SwitchGroup from '@components/SwitchGroup'
import { ColorContext } from '@context/ColorContext'
import type { FC, FormEvent, HTMLProps } from 'react'
import type { ColorProps } from '@context/ColorContext'
import { getTotalColorSteps } from '@helpers/generateColorScale'

type ComponentProps = HTMLProps<HTMLDivElement>
type PartialColorSteps = Partial<ColorProps['steps']>

const ColorSteps: FC<ComponentProps> = ({ ...props }) => {
  const { colors, setColors, activeColor } = useContext(ColorContext)
  const { majorSteps, addMinorSteps, startAtZero } = colors[activeColor].steps
  const totalSteps = getTotalColorSteps(colors[activeColor])

  const setSteps = (values: PartialColorSteps) => {
    setColors((colors: ColorProps[]) => {
      const steps = { ...colors[activeColor].steps, ...values }
      colors[activeColor] = { ...colors[activeColor], steps }
      return [...colors]
    })
  }

  const handleChange = {
    majorSteps: (majorSteps: number) => setSteps({ majorSteps }),
    addMinorSteps: ({ currentTarget }: FormEvent<HTMLInputElement>) =>
      setSteps({ addMinorSteps: currentTarget.checked }),
    startAtZero: ({ currentTarget }: FormEvent<HTMLInputElement>) =>
      setSteps({ startAtZero: currentTarget.checked }),
  }

  return (
    <Collapse name="Steps" label={`${totalSteps} Total Steps`} {...props}>
      <Slider
        onChange={handleChange.majorSteps}
        valueRange={[3, 20]}
        value={majorSteps}
        label="Major"
      />
      <SwitchGroup>
        <Switch
          onChange={handleChange.addMinorSteps}
          labelAfter="Add Minor Steps"
          checked={addMinorSteps}
        />
        <Switch
          onChange={handleChange.startAtZero}
          labelAfter="Start at Zero"
          checked={startAtZero}
        />
      </SwitchGroup>
    </Collapse>
  )
}

export default ColorSteps
