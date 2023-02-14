import Header from '@components/Header'
import Footer from '@components/Footer'
import type { FC, ReactNode } from 'react'
import ColorMenu from '@components/ColorMenu'
import ColorControl from '@components/ColorControl'
import DisplayNotice from '@components/DisplayNotice'
import ColorStepControl from '@components/ColorStepControl'
import styles from './Layout.module.scss'

type ComponentProps = {
  children?: ReactNode
}

const Layout: FC<ComponentProps> = ({ children }) => {
  return (
    <>
      <div className={styles.layout}>
        <aside className={styles.layout__sidebar}>
          <Header />
          <ColorMenu />
          <Footer />
        </aside>
        <main className={styles.layout__body}>{children}</main>
        <aside className={styles.layout__sidebar}>
          <ColorStepControl />
          <ColorControl channel="hue" />
          <ColorControl channel="saturation" />
          <ColorControl channel="brightness" />
        </aside>
      </div>
      <DisplayNotice />
    </>
  )
}

export default Layout
