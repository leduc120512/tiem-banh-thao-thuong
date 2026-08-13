import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, MQ } from '../../lib/anim'
import { realMessages } from '../../data/site'
import { Drip } from '../ui/Deco'
import './marquee.css'

/**
 * Dải chữ chạy: toàn bộ là câu thật đã được bắt kem lên đế bánh của khách.
 * Cuộn xuống thì chữ trôi nhanh hơn, cuộn ngược thì đổi chiều — như đang lật lại sổ đặt bánh.
 */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const tween = gsap.to('.mq__track', {
          xPercent: -50,
          duration: 46,
          ease: 'none',
          repeat: -1,
        })

        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const dir = self.direction
            gsap.to(tween, { timeScale: dir * (1 + Math.min(Math.abs(self.getVelocity()) / 2400, 1.8)), duration: 0.5, overwrite: true })
          },
        })

        return () => {
          st.kill()
          tween.kill()
        }
      })
    },
    { scope: root },
  )

  const line = [...realMessages, ...realMessages]

  return (
    <div className="mq" ref={root} aria-hidden="true">
      <Drip color="var(--paper)" className="mq__drip" />
      <div className="mq__track">
        {line.map((m, i) => (
          <span className="mq__item" key={i}>
            {m}
            <i className="mq__dot" />
          </span>
        ))}
      </div>
      <p className="mq__note">
        <span className="u-eyebrow">Chữ thật trên đế bánh thật</span>
      </p>
    </div>
  )
}
