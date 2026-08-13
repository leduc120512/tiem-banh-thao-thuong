import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger, EASE } from '../lib/anim'
import { nav, shop, cakes } from '../data/site'
import Logo from './ui/Logo'
import Img from './ui/Img'
import './header.css'

const PEEK = ['c06', 'c13', 'c02']

export default function Header() {
  const root = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      /* Thanh điều hướng chỉ mọc nền sau khi đã rời phần mở đầu. */
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onToggle: (self) => root.current?.classList.toggle('is-stuck', self.isActive),
      })

      gsap.from(['.hd__brand', '.hd__link', '.hd__side > *'], {
        y: -18,
        opacity: 0,
        duration: 0.7,
        ease: EASE,
        stagger: 0.05,
        delay: 1.5,
      })

      /* Menu di động: tấm kem hạ xuống trước, chữ theo sau. */
      if (panel.current) {
        tl.current = gsap
          .timeline({ paused: true })
          .set(panel.current, { display: 'block' })
          .fromTo(
            panel.current,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' },
          )
          .from('.mnu__row', { y: 32, opacity: 0, duration: 0.5, stagger: 0.055, ease: EASE }, '-=0.26')
          .from('.mnu__peek', { y: 30, opacity: 0, rotate: 7, duration: 0.55, stagger: 0.07 }, '-=0.4')
          .from('.mnu__foot > *', { y: 16, opacity: 0, duration: 0.45, stagger: 0.06 }, '-=0.34')
      }
    },
    { scope: root },
  )

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    const t = tl.current
    const el = panel.current
    if (!t || !el) {
      if (el) el.style.display = open ? 'block' : 'none'
      return
    }
    if (open) {
      t.play()
    } else {
      t.eventCallback('onReverseComplete', () => gsap.set(el, { display: 'none' }))
      t.reverse()
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`hd ${open ? 'is-menu' : ''}`} ref={root}>
      <div className="hd__bar">
        <a className="hd__brand" href="#top" aria-label={`${shop.name} ${shop.suffix} — về đầu trang`}>
          <Logo />
        </a>

        <nav className="hd__nav" aria-label="Điều hướng chính">
          {nav.map((n) => (
            <a className="hd__link" key={n.href} href={n.href} data-cursor="xem">
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="hd__side">
          <a className="hd__tel" href={`tel:${shop.phoneRaw}`}>
            <span className="u-eyebrow">Zalo / gọi</span>
            <strong>{shop.phone}</strong>
          </a>
          <a className="btn btn--accent hd__cta" href="#dat-banh" data-cursor="đặt">
            Đặt bánh
          </a>
          <button
            className={`hd__burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-di-dong"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
          >
            <i />
            <i />
          </button>
        </div>
      </div>

      <div className="mnu" id="menu-di-dong" ref={panel}>
        <div className="mnu__inner">
          <ul className="mnu__list">
            {nav.map((n, i) => (
              <li className="mnu__row" key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)}>
                  <span className="mnu__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mnu__label">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mnu__peeks" aria-hidden="true">
            {PEEK.map((id) => {
              const c = cakes.find((x) => x.id === id)!
              return (
                <div className="mnu__peek" key={id}>
                  <div className="board">
                    <div className="board__frame" style={{ ['--ar' as string]: String(c.ar) }}>
                      <Img src={c.img} alt="" sizes="34vw" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mnu__foot">
            <a
              className="btn btn--accent"
              href={shop.zalo}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Nhắn Zalo {shop.phone}
            </a>
            <a className="mnu__addr" href={shop.maps} target="_blank" rel="noreferrer">
              {shop.address}
              <em>{shop.landmark}</em>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
