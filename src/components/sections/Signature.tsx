import { useRef } from 'react'
import { gsap, useGSAP, MQ, EASE, lightDevice } from '../../lib/anim'
import { signature, vnd } from '../../data/site'
import Img from '../ui/Img'
import './signature.css'

/**
 * Kệ bánh: trên điện thoại là kéo ngang bằng ngón tay, trên máy tính là
 * cuộn ngang có ghim. Mỗi tấm lệch một chút để giống kệ bày thật, không phải lưới.
 */
export default function Signature({ onPick }: { onPick: (id: string) => void }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        gsap.from('.sig__head > *', {
          y: 26,
          opacity: 0,
          duration: 0.8,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: '.sig__head', start: 'top 85%', once: true },
        })
      })

      /* Điện thoại / tablet: các tấm nhô lên lần lượt khi lướt tới. */
      mm.add(MQ.belowDesktop, () => {
        gsap.from('.sig__card', {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: '.sig__viewport', start: 'top 88%', once: true },
        })
      })

      /* Máy tính: ghim mảng lại rồi đẩy cả kệ đi ngang theo nhịp cuộn. */
      mm.add(MQ.desktop, () => {
        if (lightDevice()) return
        const section = root.current!
        const track = section.querySelector<HTMLElement>('.sig__track')!
        const getShift = () => track.scrollWidth - window.innerWidth + 96

        /* Chỉ bỏ thanh cuộn ngang khi chắc chắn có ghim thay thế,
           nếu không thì mấy tấm cuối sẽ nằm ngoài màn mà không với tới được. */
        section.classList.add('is-pinned')

        const tw = gsap.to(track, {
          x: () => -getShift(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${getShift() * 1.05}`,
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        /* Ảnh nhích ngược chiều một chút để có chiều sâu. */
        gsap.utils.toArray<HTMLElement>('.sig__card img').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -4 },
            {
              xPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top top',
                end: () => `+=${getShift() * 1.05}`,
                scrub: 1,
              },
            },
          )
        })

        return () => {
          section.classList.remove('is-pinned')
          tw.kill()
        }
      })
    },
    { scope: root },
  )

  return (
    <section className="section sig" id="mau-banh" ref={root}>
      <div className="wrap sig__head">
        <span className="u-eyebrow">Kệ bánh · {signature.length} mẫu</span>
        <h2 className="sig__h2">
          Mẫu tiệm làm <em>nhiều nhất</em>
        </h2>
        <p className="sig__note">
          Mẫu nào cũng đổi được màu kem, đổi size, đổi lời nhắn. Chạm vào một tấm để xem giá và
          nhắn đặt luôn. Giá ghi dưới mỗi mẫu là giá tham khảo — nguyên liệu theo thị trường từng
          đợt, nên tiệm báo lại con số cuối cho bạn khi biết mẫu và ngày cần.
        </p>
        <span className="sig__hint u-hand" aria-hidden="true">
          kéo ngang →
        </span>
      </div>

      <div className="sig__viewport">
        <ul className="sig__track">
          {signature.map((c, i) => (
            <li className="sig__card" key={c.id}>
              <button
                className="sig__btn"
                onClick={() => onPick(c.id)}
                data-cursor="xem"
                aria-label={`Xem chi tiết bánh ${c.name}`}
              >
                <span className="sig__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="board sig__board">
                  <span className="board__frame" style={{ ['--ar' as string]: String(c.ar) }}>
                    <Img
                      src={c.img}
                      alt={`Bánh ${c.name}`}
                      sizes="(min-width: 1024px) 30vw, 74vw"
                    />
                  </span>
                  {c.msg && <span className="sig__msg u-icing">{c.msg}</span>}
                </span>
                <span className="sig__meta">
                  <b>{c.name}</b>
                  <span>{c.note}</span>
                  <em>
                    từ {vnd(c.from)} <i>· giá tham khảo</i>
                  </em>
                </span>
              </button>
            </li>
          ))}
          <li className="sig__card sig__card--end">
            <div className="sig__end">
              <p className="u-hand">Chưa thấy mẫu ưng?</p>
              <a className="btn btn--light" href="#dat-banh">
                Tự thiết kế một chiếc
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
