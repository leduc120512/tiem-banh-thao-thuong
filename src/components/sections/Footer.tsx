import { useRef } from 'react'
import { gsap, useGSAP, MQ, EASE } from '../../lib/anim'
import { shop, nav } from '../../data/site'
import { CakeMark } from '../ui/Logo'
import './footer.css'

export default function Footer() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('.ft__col', {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: EASE,
          stagger: 0.06,
          scrollTrigger: { trigger: '.ft__cols', start: 'top 92%', once: true },
        })
        gsap.from('.ft__wordmark', {
          yPercent: 22,
          opacity: 0,
          duration: 1,
          ease: EASE,
          scrollTrigger: { trigger: '.ft__wordmark', start: 'top 96%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <footer className="ft" ref={root}>
      <div className="wrap">
        <div className="ft__cols">
          <div className="ft__col ft__col--brand">
            <CakeMark className="ft__mark" />
            <p className="ft__tag u-hand">
              Bánh sinh nhật, bánh cưới,
              <br />
              lễ nạp tài trọn gói
            </p>
          </div>

          <div className="ft__col">
            <h3 className="u-eyebrow">Tới tiệm</h3>
            <a className="ft__addr" href={shop.maps} target="_blank" rel="noreferrer">
              {shop.address}
            </a>
            <p className="ft__hint">{shop.landmark}</p>
          </div>

          <div className="ft__col">
            <h3 className="u-eyebrow">Giờ mở cửa</h3>
            <ul className="ft__hours">
              {shop.hours.map((h) => (
                <li key={h.d}>
                  <span>{h.d}</span>
                  <b>{h.t}</b>
                </li>
              ))}
            </ul>
            <p className="ft__hint">{shop.leadTime}</p>
          </div>

          <div className="ft__col">
            <h3 className="u-eyebrow">Đặt bánh</h3>
            <a className="ft__tel" href={`tel:${shop.phoneRaw}`}>
              {shop.phone}
            </a>
            <ul className="ft__links">
              <li>
                <a href={shop.zalo} target="_blank" rel="noreferrer">
                  Nhắn Zalo
                </a>
              </li>
              <li>
                <a href={shop.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#dat-banh">Tự thiết kế bánh</a>
              </li>
            </ul>
          </div>

          <div className="ft__col">
            <h3 className="u-eyebrow">Xem nhanh</h3>
            <ul className="ft__links">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ft__wordmark" aria-hidden="true">
          <span>Thảo Thương</span>
        </div>

        <div className="ft__base">
          <p>
            © {new Date().getFullYear()} {shop.name} {shop.suffix} · {shop.address}
          </p>
          <p className="ft__credit">Ảnh bánh do tiệm tự chụp.</p>
        </div>
      </div>
    </footer>
  )
}
