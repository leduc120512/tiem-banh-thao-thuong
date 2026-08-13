import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, MQ, lightDevice } from './anim'

/**
 * Cuộn mượt chỉ bật ở máy tính khoẻ. Điện thoại giữ nguyên cuộn gốc của hệ điều hành
 * vì đó mới là cảm giác quen tay, và cũng đỡ tốn pin.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: 1024px) and ${MQ.fine} and ${MQ.motion}`)
    if (!mq.matches || lightDevice()) return

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 })
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    /* Neo #… cũng phải đi qua Lenis, không thì nhảy giật. */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      const id = a?.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -80 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])
}
