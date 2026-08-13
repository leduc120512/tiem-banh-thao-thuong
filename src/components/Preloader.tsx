import { useRef } from 'react'
import { gsap, useGSAP, reduced } from '../lib/anim'
import { CakeMark } from './ui/Logo'
import './preloader.css'

/**
 * Mở đầu ngắn: một lớp kem được phết ngang, rồi cả tấm được kéo lên.
 * Bỏ hẳn nếu người dùng chọn giảm chuyển động.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.to('.pl__spread i', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' })
        .from('.pl__mark', { scale: 0.6, opacity: 0, duration: 0.45, ease: 'back.out(2)' }, 0.1)
        .from('.pl__word', { yPercent: 110, duration: 0.55, ease: 'power3.out', stagger: 0.055 }, 0.16)
        .to('.pl__row', { yPercent: -110, duration: 0.4, ease: 'power2.in' }, 0.72)
        .to(root.current, { yPercent: -100, duration: 0.66, ease: 'power4.inOut' }, 0.78)
        .set(root.current, { display: 'none' })
    },
    { scope: root },
  )

  if (reduced()) return null

  return (
    <div className="pl" ref={root} aria-hidden="true">
      <div className="pl__row">
        <CakeMark className="pl__mark" />
        <p className="pl__line">
          <span className="pl__word">Thảo</span> <span className="pl__word">Thương</span>{' '}
          <span className="pl__word">Bakery</span>
        </p>
      </div>
      <div className="pl__spread">
        <i />
      </div>
    </div>
  )
}
