import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/anim'
import { useSmoothScroll } from './lib/useSmoothScroll'
import type { CatId } from './data/site'

import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Header from './components/Header'
import StickyCta from './components/StickyCta'
import CakeSheet from './components/CakeSheet'

import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Signature from './components/sections/Signature'
import Categories from './components/sections/Categories'
import Studio from './components/sections/Studio'
import Story from './components/sections/Story'
import Process from './components/sections/Process'
import Reviews from './components/sections/Reviews'
import Gallery from './components/sections/Gallery'
import FinalCta from './components/sections/FinalCta'
import Footer from './components/sections/Footer'

import './components/ui/deco.css'

export default function App() {
  const [active, setActive] = useState<string | null>(null)
  const [filter, setFilter] = useState<CatId | 'all'>('all')

  useSmoothScroll()

  const pick = useCallback((id: string) => setActive(id), [])
  const close = useCallback(() => setActive(null), [])

  const chooseCat = useCallback((id: CatId) => {
    setFilter(id)
    document.getElementById('hinh')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  /* Ảnh tải xong thì đo lại vị trí — tránh mọi hiệu ứng cuộn lệch mốc. */
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <>
      <Preloader />
      <Cursor />

      <a className="skip" href="#mau-banh">
        Bỏ qua, xem mẫu bánh
      </a>

      <Header />

      <main>
        <Hero onPick={pick} />
        <Marquee />
        <Signature onPick={pick} />
        <Categories onCat={chooseCat} />
        <Studio />
        <Story />
        <Process />
        <Reviews onPick={pick} />
        <Gallery filter={filter} setFilter={setFilter} onPick={pick} />
        <FinalCta />
      </main>

      <Footer />
      <StickyCta />
      <CakeSheet id={active} onClose={close} />
    </>
  )
}
