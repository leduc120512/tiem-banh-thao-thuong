import { useMemo, useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, MQ, EASE } from '../../lib/anim'
import { galleryOrder, categories, shop } from '../../data/site'
import type { CatId } from '../../data/site'
import Img from '../ui/Img'
import './gallery.css'

type Filter = CatId | 'all'

export default function Gallery({
  filter,
  setFilter,
  onPick,
}: {
  filter: Filter
  setFilter: (f: Filter) => void
  onPick: (id: string) => void
}) {
  const root = useRef<HTMLElement>(null)

  const list = useMemo(
    () => (filter === 'all' ? galleryOrder : galleryOrder.filter((c) => c.cat === filter)),
    [filter],
  )

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('.gl__head > *', {
          y: 22,
          opacity: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.07,
          scrollTrigger: { trigger: '.gl__head', start: 'top 86%', once: true },
        })
      })
    },
    { scope: root },
  )

  /* Đổi bộ lọc: ảnh cũ co lại, ảnh mới nở ra theo thứ tự ngẫu nhiên. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.gl__item',
          { opacity: 0, y: 26, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: EASE,
            stagger: { each: 0.045, from: 'start' },
            scrollTrigger: { trigger: '.gl__grid', start: 'top 92%', once: true },
          },
        )
        ScrollTrigger.refresh()
      })
    },
    { dependencies: [filter], scope: root },
  )

  return (
    <section className="section gl" id="hinh" ref={root}>
      <div className="wrap">
        <div className="gl__head">
          <span className="u-eyebrow">Hình bánh đã giao</span>
          <h2 className="gl__h2">Ảnh chụp ngay trên bàn bắt kem</h2>
          <p className="gl__note">
            Không chỉnh màu, không dựng studio. Bánh ra lò thế nào thì ảnh thế đó — để bạn biết
            chính xác cái mình sắp nhận.
          </p>

          <div className="gl__filters" role="group" aria-label="Lọc theo dịp">
            <button
              className={`chip ${filter === 'all' ? 'is-on' : ''}`}
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
            >
              Tất cả
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={`chip ${filter === c.id ? 'is-on' : ''}`}
                onClick={() => setFilter(c.id)}
                aria-pressed={filter === c.id}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <ul className="gl__grid">
          {list.map((c, i) => (
            <li className={`gl__item ${i % 5 === 2 ? 'gl__item--tilt' : ''}`} key={c.id}>
              <button
                className={`gl__btn board ${c.msg ? '' : 'gl__btn--bare'}`}
                onClick={() => onPick(c.id)}
                data-cursor="xem"
                aria-label={`Xem chi tiết bánh ${c.name}`}
              >
                <span className="board__frame" style={{ ['--ar' as string]: String(c.ar) }}>
                  <Img
                    src={c.img}
                    alt={`Bánh ${c.name} — ${c.note}`}
                    sizes="(min-width: 1200px) 24vw, (min-width: 700px) 33vw, 47vw"
                  />
                </span>
                {c.msg && <span className="gl__msg u-icing">{c.msg}</span>}
              </button>
            </li>
          ))}
        </ul>

        <p className="gl__more">
          Còn hàng trăm mẫu nữa nằm trong Zalo của tiệm.{' '}
          <a href={shop.zalo} target="_blank" rel="noreferrer">
            Nhắn {shop.phone} để xin thêm ảnh
          </a>
          .
        </p>
      </div>
    </section>
  )
}
