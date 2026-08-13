import { useRef } from 'react'
import { gsap, useGSAP, MQ, EASE } from '../../lib/anim'
import { steps, shop } from '../../data/site'
import './process.css'

/**
 * Quy trình đặt bánh trình bày như tờ phiếu đặt hàng của tiệm:
 * mép răng cưa, dòng kẻ, số thứ tự to. Đường chỉ chạy theo nhịp cuộn.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        gsap.from('.pr__head > *', {
          y: 22,
          opacity: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: '.pr__head', start: 'top 85%', once: true },
        })

        gsap.from('.pr__step', {
          y: 30,
          opacity: 0,
          duration: 0.65,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: '.pr__list', start: 'top 82%', once: true },
        })

        /* Đường chỉ kéo dài theo nhịp cuộn, số nào bị chạm tới thì đậm lên. */
        gsap.fromTo(
          '.pr__thread i',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.pr__list',
              start: 'top 72%',
              end: 'bottom 72%',
              scrub: 0.4,
            },
          },
        )

        gsap.utils.toArray<HTMLElement>('.pr__step').forEach((el) => {
          gsap.to(el.querySelector('.pr__n'), {
            color: 'var(--orange)',
            scale: 1.06,
            transformOrigin: 'left center',
            duration: 0.35,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 72%', once: true },
          })
        })
      })

      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          '.pr__thread i',
          { scaleX: 0, scaleY: 1 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.pr__list', start: 'top 78%', end: 'bottom 70%', scrub: 0.4 },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section className="section pr" ref={root}>
      <div className="wrap">
        <div className="pr__head">
          <span className="u-eyebrow">Phiếu đặt bánh</span>
          <h2 className="pr__h2">Từ lúc nhắn tới lúc cầm hộp bánh</h2>
          <p className="pr__sub">
            {shop.leadTime}. Bánh vẽ tay, bánh cưới và mâm lễ nạp tài thì nhắn trước một ngày cho
            chắc.
          </p>
        </div>

        <ol className="pr__list">
          <div className="pr__thread" aria-hidden="true">
            <i />
          </div>
          {steps.map((s) => (
            <li className="pr__step" key={s.n}>
              <span className="pr__n">{s.n}</span>
              <h3 className="pr__t">{s.t}</h3>
              <p className="pr__d">{s.d}</p>
            </li>
          ))}
        </ol>

        <p className="pr__foot u-hand">
          Bánh nào cũng kèm nến, dao nhựa và đĩa giấy — khỏi phải nhắc.
        </p>
      </div>
    </section>
  )
}
