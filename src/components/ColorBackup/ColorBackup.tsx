import clsx from 'clsx'
import { useContext, useRef } from 'react'
import { ColorContext } from '@context/ColorContext'
import type { ChangeEvent, FC, HTMLProps } from 'react'
import { DownloadCloud, UploadCloud } from 'react-feather'
import styles from './ColorBackup.module.scss'

type ComponentProps = HTMLProps<HTMLDivElement>

const ColorBackup: FC<ComponentProps> = ({ className, ...props }) => {
  const colorBackupClassName = clsx(className, styles.colorBackup)
  const { colors, setColors } = useContext(ColorContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const downloadProps = {
    href: URL.createObjectURL(new Blob([JSON.stringify(colors)])),
    download: 'color-backup.json',
  }

  const handleRestore = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const fileReader = new FileReader()
      const handleLoad = (event: ProgressEvent<FileReader>) => {
        setColors(JSON.parse(event.target?.result as string))
      }

      fileReader.addEventListener('load', handleLoad)
      fileReader.readAsText(event.target.files[0])
    }
  }

  return (
    <div className={colorBackupClassName} {...props}>
      <a className={styles.colorBackup__button} {...downloadProps}>
        <DownloadCloud /> Backup
      </a>
      <div
        className={styles.colorBackup__button}
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloud /> Restore
      </div>
      <input
        className={styles.colorBackup__input}
        accept="application/json"
        onChange={handleRestore}
        ref={inputRef}
        type="file"
      />
    </div>
  )
}

export default ColorBackup
