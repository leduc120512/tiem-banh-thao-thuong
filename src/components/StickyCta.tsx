import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/anim'
import { shop } from '../data/site'
import './stickycta.css'

/**
 * Trên điện thoại, nút đặt bánh luôn nằm trong tầm ngón cái.
 * Chỉ hiện sau khi rời khỏi hero và tự lùi đi khi đã tới khối kêu gọi cuối trang.
 */
export default function StickyCta() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current!
      gsap.set(el, { yPercent: 130 })

      const show = () => gsap.to(el, { yPercent: 0, duration: 0.5, ease: 'power3.out' })
      const hide = () => gsap.to(el, { yPercent: 130, duration: 0.4, ease: 'power2.in' })

      const st = ScrollTrigger.create({
        trigger: '.hero',
        start: 'bottom 70%',
        onEnter: show,
        onLeaveBack: hide,
      })

      const st2 = ScrollTrigger.create({
        trigger: '.fc',
        start: 'top 80%',
        onEnter: hide,
        onLeaveBack: show,
      })

      return () => {
        st.kill()
        st2.kill()
      }
    },
    { scope: root },
  )

  return (
    <div className="sc" ref={root}>
      <a className="sc__call" href={`tel:${shop.phoneRaw}`} aria-label={`Gọi ${shop.phone}`}>
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M6.2 3.5 8 7l-1.7 1.6a11 11 0 0 0 5.1 5.1L13 12l3.5 1.8v2.7c0 .8-.7 1.5-1.6 1.4C7.7 17.3 2.7 12.3 2.1 5.1 2 4.2 2.7 3.5 3.5 3.5h2.7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span>Gọi tiệm</span>
      </a>
      <a className="sc__order" href="#dat-banh">
        Đặt bánh ngay
      </a>
    </div>
  )
}
