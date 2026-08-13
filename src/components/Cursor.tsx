import { useEffect, useRef } from 'react'
import { gsap, useGSAP, MQ } from '../lib/anim'
import './cursor.css'

/**
 * Con trỏ riêng cho máy tính: một chấm kem và một vành mỏng chạy chậm hơn.
 * Khi rê vào thứ bấm được, vành nở ra và hiện đúng một chữ.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ok = window.matchMedia(`${MQ.fine} and ${MQ.motion}`).matches
    if (ok) document.documentElement.classList.add('cursor-on')
    return () => document.documentElement.classList.remove('cursor-on')
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
      const d = dot.current!
      const r = ring.current!
      const l = label.current!

      const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3' })
      const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3' })
      const rx = gsap.quickTo(r, 'x', { duration: 0.42, ease: 'power3' })
      const ry = gsap.quickTo(r, 'y', { duration: 0.42, ease: 'power3' })

      let shown = false
      const move = (e: MouseEvent) => {
        if (!shown) {
          shown = true
          gsap.to([d, r], { autoAlpha: 1, duration: 0.3 })
        }
        dx(e.clientX)
        dy(e.clientY)
        rx(e.clientX)
        ry(e.clientY)

        const t = (e.target as Element | null)?.closest?.('[data-cursor], a, button')
        const txt = t?.getAttribute?.('data-cursor')
        if (t) {
          gsap.to(r, { scale: txt ? 2.5 : 1.7, borderColor: 'var(--orange)', duration: 0.35, ease: 'power3' })
          gsap.to(d, { scale: 0.35, duration: 0.35 })
        } else {
          gsap.to(r, { scale: 1, borderColor: 'rgba(20,48,58,.45)', duration: 0.35, ease: 'power3' })
          gsap.to(d, { scale: 1, duration: 0.35 })
        }
        if (txt && l.textContent !== txt) l.textContent = txt
        gsap.to(l, { autoAlpha: txt ? 1 : 0, duration: 0.22 })
      }

      const leave = () => {
        shown = false
        gsap.to([d, r], { autoAlpha: 0, duration: 0.25 })
      }
      const down = () => gsap.to(r, { scale: 0.9, duration: 0.2 })
      const up = () => gsap.to(r, { scale: 1.7, duration: 0.25 })

      window.addEventListener('mousemove', move)
      document.addEventListener('mouseleave', leave)
      window.addEventListener('mousedown', down)
      window.addEventListener('mouseup', up)

      return () => {
        window.removeEventListener('mousemove', move)
        document.removeEventListener('mouseleave', leave)
        window.removeEventListener('mousedown', down)
        window.removeEventListener('mouseup', up)
      }
    })
  }, [])

  return (
    <div className="cur" aria-hidden="true">
      <div className="cur__ring" ref={ring}>
        <span className="cur__label" ref={label} />
      </div>
      <div className="cur__dot" ref={dot} />
    </div>
  )
}
