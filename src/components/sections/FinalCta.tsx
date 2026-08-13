import { useRef } from 'react'
import { gsap, useGSAP, MQ, EASE, splitLines } from '../../lib/anim'
import { shop, byId } from '../../data/site'
import Img from '../ui/Img'
import { Drip, Sprinkles } from '../ui/Deco'
import './finalcta.css'

const cake = byId('c01')!

export default function FinalCta() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const h = root.current!.querySelector<HTMLElement>('.fc__h2')!
        const split = splitLines(h)

        gsap.from(split.lines, {
          yPercent: 106,
          duration: 0.95,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 76%', once: true },
        })
        gsap.from('.fc__sub, .fc__acts > *', {
          y: 20,
          opacity: 0,
          duration: 0.65,
          ease: EASE,
          stagger: 0.08,
          delay: 0.25,
          scrollTrigger: { trigger: root.current, start: 'top 76%', once: true },
        })
        gsap.fromTo(
          '.fc__art',
          { yPercent: 12, rotate: 6, opacity: 0 },
          {
            yPercent: 0,
            rotate: 3,
            opacity: 1,
            duration: 1.1,
            ease: EASE,
            scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
          },
        )

        return () => split.revert()
      })
    },
    { scope: root },
  )

  return (
    <section className="fc" ref={root}>
      <Drip color="var(--paper)" className="fc__drip" />
      <Sprinkles
        spots={[
          [8, 26, 30],
          [88, 20, -20],
          [22, 78, 62],
          [72, 84, -46],
        ]}
      />

      <div className="wrap fc__grid">
        <div className="fc__copy">
          <h2 className="fc__h2">
            Ngày mai nhà bạn
            <br />
            có ai <em>thổi nến</em> không?
          </h2>
          <p className="fc__sub">
            {shop.leadTime} là kịp. Gửi tên, gửi tuổi, gửi câu muốn viết — phần còn lại để tiệm lo.
          </p>
          <div className="fc__acts">
            <a className="btn btn--accent" href="#dat-banh" data-cursor="đặt">
              Thiết kế bánh của bạn
            </a>
            <a className="btn btn--light" href={`tel:${shop.phoneRaw}`}>
              Gọi {shop.phone}
            </a>
          </div>
        </div>

        <div className="board fc__art" aria-hidden="true">
          <div className="board__frame" style={{ ['--ar' as string]: String(cake.ar) }}>
            <Img src={cake.img} alt="" sizes="(min-width: 1024px) 34vw, 70vw" />
          </div>
          <span className="fc__cap u-hand">{cake.msg}</span>
        </div>
      </div>
    </section>
  )
}
