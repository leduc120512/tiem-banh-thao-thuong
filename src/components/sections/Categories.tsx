import { useRef } from 'react'
import { gsap, useGSAP, MQ, EASE } from '../../lib/anim'
import { categories, cakes } from '../../data/site'
import type { CatId } from '../../data/site'
import Img from '../ui/Img'
import './categories.css'

/**
 * Chọn theo dịp — cố tình không làm lưới thẻ. Đây là một danh sách kiểu mục lục:
 * trên máy tính, ảnh mẫu bám theo con trỏ; trên điện thoại, ảnh nằm sẵn bên phải dòng.
 */
export default function Categories({ onCat }: { onCat: (id: CatId) => void }) {
  const root = useRef<HTMLElement>(null)

  const count = (id: CatId) => cakes.filter((c) => c.cat === id).length

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        gsap.from('.cat__row', {
          yPercent: 40,
          opacity: 0,
          duration: 0.75,
          ease: EASE,
          stagger: 0.07,
          scrollTrigger: { trigger: '.cat__list', start: 'top 82%', once: true },
        })
      })

      mm.add(`${MQ.desktop} and ${MQ.fine}`, () => {
        const float = root.current!.querySelector<HTMLElement>('.cat__float')!
        const cards = gsap.utils.toArray<HTMLElement>('.cat__floatItem')
        const rows = gsap.utils.toArray<HTMLElement>('.cat__row')

        const xTo = gsap.quickTo(float, 'x', { duration: 0.55, ease: 'power3' })
        const yTo = gsap.quickTo(float, 'y', { duration: 0.55, ease: 'power3' })
        const rTo = gsap.quickTo(float, 'rotate', { duration: 0.9, ease: 'power3' })
        let last = 0

        const move = (e: MouseEvent) => {
          const b = root.current!.getBoundingClientRect()
          xTo(e.clientX - b.left)
          yTo(e.clientY - b.top)
          const v = gsap.utils.clamp(-9, 9, (e.clientX - last) * 0.35)
          rTo(v)
          last = e.clientX
        }

        const show = (i: number) => {
          gsap.to(float, { autoAlpha: 1, scale: 1, duration: 0.4, ease: EASE })
          cards.forEach((c, j) =>
            gsap.to(c, { autoAlpha: i === j ? 1 : 0, duration: 0.3, ease: 'none' }),
          )
        }
        const hide = () => gsap.to(float, { autoAlpha: 0, scale: 0.85, duration: 0.3 })

        root.current!.addEventListener('mousemove', move)
        rows.forEach((r, i) => {
          r.addEventListener('mouseenter', () => show(i))
          r.addEventListener('mouseleave', hide)
        })

        return () => {
          root.current?.removeEventListener('mousemove', move)
        }
      })
    },
    { scope: root },
  )

  return (
    <section className="section cat" id="dip" ref={root}>
      <div className="wrap">
        <div className="cat__head">
          <span className="u-eyebrow">Chọn theo dịp</span>
          <h2 className="cat__h2">
            Bánh nào cho
            <br />
            <em>ngày nào</em>
          </h2>
        </div>

        <ul className="cat__list">
          {categories.map((c, i) => (
            <li className="cat__row" key={c.id}>
              <button className="cat__link" onClick={() => onCat(c.id)} data-cursor="mở">
                <span className="cat__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="cat__body">
                  <span className="cat__name">
                    {c.name}
                    <i>{c.en}</i>
                  </span>
                  <span className="cat__desc">{c.desc}</span>
                </span>
                <span className="cat__thumb board">
                  <span className="board__frame" style={{ ['--ar' as string]: String(c.ar) }}>
                    <Img src={c.cover} alt="" sizes="120px" />
                  </span>
                </span>
                <span className="cat__count">{count(c.id)} mẫu</span>
                <svg className="cat__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="cat__float" aria-hidden="true">
        {categories.map((c) => (
          <div className="cat__floatItem board" key={c.id}>
            <div className="board__frame" style={{ ['--ar' as string]: String(c.ar) }}>
              <Img src={c.cover} alt="" sizes="300px" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
