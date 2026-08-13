import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, INTRO, EASE, MQ, splitLines, lightDevice } from '../../lib/anim'
import { shop, byId } from '../../data/site'
import Img from '../ui/Img'
import { Candle, IcingUnderline, Sprinkles } from '../ui/Deco'
import './hero.css'

const main = byId('c11')!
const side = byId('c06')!

export default function Hero({ onPick }: { onPick: (id: string) => void }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const h1 = root.current!.querySelector<HTMLElement>('.hero__h1')!
        const split = splitLines(h1)

        const tl = gsap.timeline({ delay: INTRO })

        tl.from('.hero__tag', { y: 14, opacity: 0, rotate: -6, duration: 0.6, ease: EASE }, 0)
          .from(
            split.lines,
            { yPercent: 108, duration: 0.95, ease: 'power4.out', stagger: 0.085 },
            0.05,
          )
          .from('.icing-line__p', { drawSVG: '0%', duration: 0.75, ease: 'power2.inOut' }, 0.75)
          /* Ảnh chính: màn kem kéo lên rồi ống kính lùi lại. */
          .fromTo(
            '.hero__main',
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power3.inOut' },
            0.25,
          )
          .from('.hero__main img', { scale: 1.28, duration: 1.5, ease: 'power3.out' }, 0.25)
          .from('.hero__main', { rotate: -4.5, duration: 1.3, ease: 'power3.out' }, 0.25)
          .from(
            '.hero__side',
            { yPercent: 40, opacity: 0, rotate: 14, duration: 0.85, ease: 'back.out(1.4)' },
            0.85,
          )
          .from('.hero__candle', { y: -70, opacity: 0, duration: 0.7, ease: 'bounce.out' }, 1.0)
          .from(
            ['.hero__lede', '.hero__acts > *', '.hero__facts li'],
            { y: 22, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.07 },
            0.95,
          )
          .from('.hero__rail', { opacity: 0, xPercent: -30, duration: 0.8, ease: EASE }, 1.1)
          .from('.sprinkle', { scale: 0, duration: 0.5, ease: 'back.out(3)', stagger: { each: 0.04, from: 'random' } }, 1.05)

        /* Ngọn nến lay — nhịp không đều để khỏi giống vòng lặp máy móc. */
        gsap.to('.candle__flame', {
          scaleY: 0.82,
          scaleX: 1.08,
          rotate: 4,
          transformOrigin: '50% 100%',
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        /* Vụn cốm trôi lơ lửng, mỗi hạt một nhịp riêng. */
        gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el, i) => {
          gsap.to(el, {
            y: gsap.utils.random(-16, 16),
            x: gsap.utils.random(-10, 10),
            rotate: `+=${gsap.utils.random(-40, 40)}`,
            duration: gsap.utils.random(3.4, 6),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.12,
          })
        })

        return () => split.revert()
      })

      /* Parallax chỉ bật ở máy khoẻ — điện thoại yếu thì bỏ hẳn. */
      mm.add(`${MQ.motion} and (min-width: 768px)`, () => {
        if (lightDevice()) return
        gsap.to('.hero__main', {
          yPercent: -13,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
        gsap.to('.hero__side', {
          yPercent: 26,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.9 },
        })
        gsap.to('.hero__copy', {
          yPercent: 9,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'center center', end: 'bottom top', scrub: 0.5 },
        })
      })

      ScrollTrigger.refresh()
    },
    { scope: root },
  )

  return (
    <section className="hero" id="top" ref={root}>
      <Sprinkles
        spots={[
          [4, 46, 24],
          [95, 8, -38],
          [7, 88, -12],
          [58, 95, 52],
        ]}
      />

      <div className="hero__rail" aria-hidden="true">
        <span>{shop.services}</span>
      </div>

      <div className="wrap hero__grid">
        <div className="hero__copy">
          <span className="sticker hero__tag">
            <b>503 QL1A</b> · {shop.landmark}
          </span>

          <h1 className="hero__h1">
            Mỗi chiếc bánh ở đây
            <br />
            đều được{' '}
            <em className="hero__em">
              viết tay
              <IcingUnderline className="hero__ul" />
            </em>
            <br />
            một cái tên.
          </h1>
        </div>

        <div className="hero__art">
          <div className="hero__mainWrap">
            <Candle className="hero__candle" />
            <button
              className="board hero__main"
              onClick={() => onPick(main.id)}
              data-cursor="xem bánh"
              aria-label={`Xem chi tiết mẫu ${main.name}`}
            >
              <div className="board__frame" style={{ ['--ar' as string]: String(main.ar) }}>
                <Img
                  src={main.img}
                  alt={`Bánh ${main.name} của Thảo Thương Bakery`}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  priority
                />
              </div>
              <span className="hero__cap u-hand">{main.name}</span>
            </button>
          </div>

          <button
            className="board hero__side"
            onClick={() => onPick(side.id)}
            data-cursor="xem bánh"
            aria-label={`Xem chi tiết mẫu ${side.name}`}
          >
            <div className="board__frame" style={{ ['--ar' as string]: String(side.ar) }}>
              <Img src={side.img} alt={`Bánh ${side.name}`} sizes="30vw" />
            </div>
          </button>
        </div>

        <div className="hero__bottom">
          <p className="hero__lede">
            Tiệm nhỏ ngoài quốc lộ, nhận đặt bánh sinh nhật, bánh cưới và lễ nạp tài trọn gói.
            Bạn nhắn câu muốn viết, tiệm bắt kem đúng câu đó lên đế bánh.
          </p>

          <div className="hero__acts">
            <a className="btn btn--accent" href="#dat-banh" data-cursor="đặt">
              Đặt bánh
              <svg className="btn__ico" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="btn btn--ghost" href="#mau-banh" data-cursor="lướt">
              Xem mẫu bánh
            </a>
          </div>

          <ul className="hero__facts">
            <li>
              <b>{shop.leadTime}</b>
              <span>bánh vẽ tay đặt trước 1 ngày</span>
            </li>
            <li>
              <b>Zalo {shop.phone}</b>
              <span>gửi ảnh mẫu là báo giá ngay</span>
            </li>
            <li>
              <b>Mở 6:00 – 21:30</b>
              <span>ngã ba Cống Trúc, Quảng Xương</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
