import clsx from 'clsx'
import { useContext } from 'react'
import Modal from '@components/Modal'
import Select from '@components/Select'
import Button from '@components/Button'
import { Copy, Download } from 'react-feather'
import type { CloseEvent } from '@components/Modal'
import { ColorContext } from '@context/ColorContext'
import useLocalStorage from '@hooks/useLocalStorage'
import type { FC, FormEvent, HTMLProps } from 'react'
import exportColorScales from '@helpers/exportColorScales'
import { exportFormats, colorModels } from '@helpers/exportColorScales'
import type { ExportFormat, ColorModel } from '@helpers/exportColorScales'
import styles from './ColorExport.module.scss'

type ComponentProps = HTMLProps<HTMLDivElement> & {
  onClose: (event: CloseEvent) => void
}

const defaultOptions = {
  exportFormat: exportFormats[0] as ExportFormat,
  colorModel: colorModels[0] as ColorModel,
}

const ColorExport: FC<ComponentProps> = ({ onClose, className, ...props }) => {
  const [options, setOptions] = useLocalStorage('options', defaultOptions)
  const colorExportClassName = clsx(className, styles.colorExport)
  const colorExportOutput = exportColorScales(
    useContext(ColorContext).colors,
    options.exportFormat,
    options.colorModel,
  )

  const downloadProps = {
    href: URL.createObjectURL(new Blob([colorExportOutput])),
    download: 'colors.' + options.exportFormat,
  }

  const selectFields = {
    exportFormat: { label: 'Export Format', values: exportFormats },
    colorModel: { label: 'Color Model', values: colorModels },
  }

  const handleSelectChange = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget
    setOptions({ ...options, [name]: value })
  }

  return (
    <Modal title="Export Colors" onClose={onClose}>
      <div className={colorExportClassName} {...props}>
        {Object.entries(selectFields).map(([name, { label, values }]) => {
          const value = options[name as keyof typeof defaultOptions]
          const selectProps = { name, label, value }

          return (
            <Select key={name} onChange={handleSelectChange} {...selectProps}>
              {values.map((value) => (
                <option key={value} value={value}>
                  {value.toUpperCase()}
                </option>
              ))}
            </Select>
          )
        })}
        <div className={styles.colorExport__output}>
          <div
            className={styles.colorExport__copyButton}
            onClick={() => navigator.clipboard.writeText(colorExportOutput)}
          >
            <Copy />
          </div>
          <pre>{colorExportOutput}</pre>
        </div>
        <a {...downloadProps}>
          <Button>
            <Download /> Download {options.exportFormat.toUpperCase()}
          </Button>
        </a>
      </div>
    </Modal>
  )
}

export default ColorExport
