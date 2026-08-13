import { useRef } from 'react'
import { gsap, useGSAP, MQ, EASE, splitLines, lightDevice } from '../../lib/anim'
import { shop } from '../../data/site'
import Img from '../ui/Img'
import { Drip } from '../ui/Deco'
import './story.css'

export default function Story() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const quote = root.current!.querySelector<HTMLElement>('.sty__quote')!
        const split = splitLines(quote)

        gsap.from(split.lines, {
          yPercent: 105,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.09,
          scrollTrigger: { trigger: quote, start: 'top 82%', once: true },
        })

        gsap.fromTo(
          '.sty__big',
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: '.sty__art', start: 'top 78%', once: true },
          },
        )
        gsap.from('.sty__big img', {
          scale: 1.24,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.sty__art', start: 'top 78%', once: true },
        })
        gsap.from('.sty__small', {
          xPercent: -14,
          yPercent: 18,
          opacity: 0,
          rotate: -10,
          duration: 0.95,
          ease: 'back.out(1.3)',
          scrollTrigger: { trigger: '.sty__art', start: 'top 68%', once: true },
        })
        gsap.from('.sty__note', {
          opacity: 0,
          y: 16,
          rotate: -8,
          duration: 0.7,
          delay: 0.35,
          ease: EASE,
          scrollTrigger: { trigger: '.sty__art', start: 'top 68%', once: true },
        })
        gsap.from('.sty__p, .sty__sign', {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: { trigger: '.sty__text', start: 'top 80%', once: true },
        })

        return () => split.revert()
      })

      mm.add(`${MQ.motion} and (min-width: 768px)`, () => {
        if (lightDevice()) return
        gsap.to('.sty__big img', {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: { trigger: '.sty__art', start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        })
        gsap.to('.sty__small', {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: { trigger: '.sty__art', start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="sty" id="chuyen-tiem" ref={root}>
      <Drip color="var(--blue-1)" className="sty__drip" />

      <div className="wrap sty__grid">
        <div className="sty__art">
          <div className="sty__stack">
            <div className="board sty__big">
              <div className="board__frame" style={{ ['--ar' as string]: String(1125 / 1349) }}>
                <Img
                  src="shop/shop-02"
                  alt="Biển hiệu Thảo Thương Bakery ngoài quốc lộ 1A"
                  sizes="(min-width: 1024px) 42vw, 88vw"
                />
              </div>
            </div>

            <div className="board sty__small">
              <div className="board__frame" style={{ ['--ar' as string]: String(959 / 960) }}>
                <Img
                  src="shop/owner"
                  alt="Người làm bánh của tiệm cùng một chiếc bông lan trứng muối"
                  sizes="40vw"
                />
              </div>
              <span className="sty__cap u-hand">người bắt kem</span>
            </div>
          </div>

          <span className="sty__note u-hand">
            tấm biển này
            <br />
            ai đi QL1A cũng thấy
            <svg viewBox="0 0 60 40" aria-hidden="true">
              <path
                d="M4 36C14 30 24 20 30 10M30 10l-9 3M30 10l1 9"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <div className="sty__text">
          <span className="u-eyebrow">Chuyện của tiệm</span>

          <h2 className="sty__quote">
            Máy làm được cái cốt.
            <br />
            Câu chữ thì vẫn phải
            <br />
            <em>viết bằng tay.</em>
          </h2>

          <p className="sty__p">
            Tiệm nằm ở số 503 quốc lộ 1A, chỗ ngã ba Cống Trúc. Sáng thì xe khách chạy qua, chiều
            thì học sinh tan trường ghé mua bánh mỳ. Bánh sinh nhật thì phải đặt trước.
          </p>
          <p className="sty__p">
            Người ta nhắn Zalo, gửi cái tên, đôi khi gửi cả một câu dài —{' '}
            <span className="sty__inline u-hand">“cảm ơn anh đã đến trong cuộc sống của em”</span>.
            Câu đó được bắt kem lên đế bánh, từng chữ một, bằng túi bắt kem chứ không có máy nào
            làm thay.
          </p>
          <p className="sty__p">
            Có hôm viết trật một chữ thì cạo đi viết lại. Chữ hơi run, nhưng là chữ thật. Bánh nào
            cũng dán một tấm nhãn nhỏ ở góc đế — để lỡ ngon quá thì còn biết chỗ mà quay lại.
          </p>

          <div className="sty__sign">
            <span className="sticker sty__sticker">
              <b>{shop.name}</b> · {shop.phone}
            </span>
            <a className="sty__map" href={shop.maps} target="_blank" rel="noreferrer">
              Xem đường tới tiệm
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
