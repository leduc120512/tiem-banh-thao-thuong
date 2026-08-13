import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, reduced } from '../lib/anim'
import { byId, categories, sizes, shop, vnd } from '../data/site'
import Img from './ui/Img'
import './cakesheet.css'

/**
 * Chi tiết một mẫu bánh. Trên điện thoại là tấm kéo lên từ đáy màn hình
 * để ngón cái với tới nút đặt ngay, trên máy tính là một tấm giữa màn.
 */
export default function CakeSheet({ id, onClose }: { id: string | null; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const opener = useRef<Element | null>(null)
  /* giữ lại nội dung cũ để lúc đóng vẫn còn gì mà nhìn */
  const [shown, setShown] = useState<string | null>(null)

  useEffect(() => {
    if (id) setShown(id)
  }, [id])

  useGSAP(
    () => {
      if (!root.current || !panel.current) return
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { display: 'block' })
        .to(root.current, { autoAlpha: 1, duration: 0.28, ease: 'none' })
        .from(
          panel.current,
          reduced()
            ? { opacity: 0, duration: 0.2 }
            : { yPercent: 12, opacity: 0, duration: 0.5, ease: 'power3.out' },
          0.04,
        )
        .from('.cs__stagger', { y: 18, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }, 0.16)
    },
    { scope: root },
  )

  useEffect(() => {
    const t = tl.current
    document.body.classList.toggle('is-locked', !!id)
    if (!t) return
    if (id) {
      opener.current = document.activeElement
      t.play()
      requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('.cs__close')?.focus())
    } else {
      t.eventCallback('onReverseComplete', () => {
        gsap.set(root.current, { display: 'none' })
        ;(opener.current as HTMLElement | null)?.focus?.()
      })
      t.reverse()
    }
  }, [id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && id) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [id, onClose])

  const cake = shown ? byId(shown) : null
  const cat = cake ? categories.find((c) => c.id === cake.cat) : null

  return (
    <div
      className="cs"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-hidden={!id}
      aria-label={cake ? `Chi tiết bánh ${cake.name}` : 'Chi tiết bánh'}
    >
      <button className="cs__scrim" onClick={onClose} tabIndex={-1} aria-label="Đóng" />

      <div className="cs__center">
        <div className="cs__panel" ref={panel}>
        <button className="cs__close" onClick={onClose} aria-label="Đóng chi tiết bánh">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {cake && (
          <div className="cs__body">
            <div className="cs__art">
              <div className="board cs__board">
                <div className="board__frame" style={{ ['--ar' as string]: String(cake.ar) }}>
                  <Img src={cake.img} alt={`Bánh ${cake.name}`} sizes="(min-width: 900px) 40vw, 92vw" />
                </div>
                {cake.msg && <span className="cs__msg u-icing">{cake.msg}</span>}
              </div>
            </div>

            <div className="cs__info">
              <span className="u-eyebrow cs__stagger">{cat?.name}</span>
              <h2 className="cs__name cs__stagger">{cake.name}</h2>
              <p className="cs__note cs__stagger">{cake.note}</p>

              <div className="cs__sizes cs__stagger">
                <span className="u-eyebrow">Size &amp; giá tham khảo</span>
                <ul>
                  {sizes.map((s) => (
                    <li key={s.cm}>
                      <b>{s.cm}cm</b>
                      <span>{s.serve}</span>
                      <em>{vnd(s.price + (cake.from - 180))}</em>
                    </li>
                  ))}
                </ul>
                <p className="cs__disclaimer">
                  Giá đổi theo trang trí bạn chọn — tiệm báo lại con số cuối khi chốt mẫu.
                </p>
              </div>

              <div className="cs__acts cs__stagger">
                <a className="btn btn--accent" href={shop.zalo} target="_blank" rel="noreferrer">
                  Nhắn Zalo đặt mẫu này
                </a>
                <a className="btn btn--ghost" href={`tel:${shop.phoneRaw}`}>
                  Gọi {shop.phone}
                </a>
                <a className="cs__alt" href="#dat-banh" onClick={onClose}>
                  hoặc chỉnh lại mẫu này theo ý bạn →
                </a>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
