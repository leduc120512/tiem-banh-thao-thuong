import { useRef } from 'react'
import { gsap, useGSAP, MQ, EASE } from '../../lib/anim'
import { reviews, byId } from '../../data/site'
import Img from '../ui/Img'
import './reviews.css'

/**
 * Lời khách — bày như mấy tờ giấy nhắn dán trên tường tiệm, mỗi tờ lệch một kiểu.
 * Cố tình không làm carousel: đọc được hết trong một lần nhìn.
 */
export default function Reviews({ onPick }: { onPick: (id: string) => void }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('.rv__head > *', {
          y: 22,
          opacity: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: '.rv__head', start: 'top 85%', once: true },
        })

        gsap.utils.toArray<HTMLElement>('.rv__note').forEach((el, i) => {
          gsap.from(el, {
            y: 54,
            opacity: 0,
            rotate: `+=${i % 2 ? 7 : -7}`,
            duration: 0.8,
            ease: 'back.out(1.15)',
            delay: i * 0.09,
            scrollTrigger: { trigger: '.rv__wall', start: 'top 84%', once: true },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="section rv" ref={root}>
      <div className="wrap">
        <div className="rv__head">
          <span className="u-eyebrow">Khách nói gì</span>
          <h2 className="rv__h2">
            Mấy dòng khách nhắn lại
            <br />
            <em>sau khi cắt bánh</em>
          </h2>
        </div>

        <ul className="rv__wall">
          {reviews.map((r) => {
            const cake = byId(r.cake)!
            return (
              <li
                className="rv__note"
                key={r.name}
                style={{ ['--tilt' as string]: `${r.tilt}deg` }}
              >
                <span className="rv__tape" aria-hidden="true" />
                <p className="rv__text">{r.text}</p>
                <div className="rv__by">
                  <span className="rv__who">
                    <b className="u-hand">{r.name}</b>
                    <i>{r.where}</i>
                  </span>
                  <button
                    className="rv__cake board"
                    onClick={() => onPick(cake.id)}
                    aria-label={`Xem mẫu bánh ${cake.name}`}
                    data-cursor="xem"
                  >
                    <span className="board__frame" style={{ ['--ar' as string]: String(cake.ar) }}>
                      <Img src={cake.img} alt="" sizes="90px" />
                    </span>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
