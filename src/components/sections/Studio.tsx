import { useMemo, useRef, useState } from 'react'
import { gsap, useGSAP, MQ, EASE } from '../../lib/anim'
import { shop, sizes, shapes, creams, toppings, vnd } from '../../data/site'
import CakePreview from './CakePreview'
import './studio.css'

const FLAVORS = [
  { id: 'bo', name: 'Cốt bơ trứng', add: 0 },
  { id: 'choco', name: 'Chocolate', add: 10 },
  { id: 'matcha', name: 'Trà xanh', add: 15 },
]

const SHAPE_ADD: Record<string, number> = { round: 0, heart: 25, square: 15 }

export default function Studio() {
  const root = useRef<HTMLElement>(null)
  const [shape, setShape] = useState<string>('round')
  const [sizeIdx, setSizeIdx] = useState(2)
  const [creamId, setCreamId] = useState('sky')
  const [tops, setTops] = useState<string[]>(['flower', 'ribbon'])
  const [flavor, setFlavor] = useState('bo')
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const size = sizes[sizeIdx]
  const cream = creams.find((c) => c.id === creamId)!

  const total = useMemo(() => {
    const t = tops.reduce((s, id) => s + (toppings.find((x) => x.id === id)?.add ?? 0), 0)
    const f = FLAVORS.find((x) => x.id === flavor)?.add ?? 0
    return size.price + t + f + SHAPE_ADD[shape]
  }, [tops, flavor, size, shape])

  const summary = useMemo(() => {
    const shapeName = shapes.find((s) => s.id === shape)?.name
    const topNames = tops.map((id) => toppings.find((x) => x.id === id)?.name).filter(Boolean)
    return [
      `Đặt bánh tại ${shop.name} ${shop.suffix}`,
      `• Kiểu: ${shapeName} — ${size.cm}cm (${size.serve})`,
      `• Vị cốt: ${FLAVORS.find((f) => f.id === flavor)?.name}`,
      `• Màu kem: ${cream.name}`,
      `• Trang trí: ${topNames.length ? topNames.join(', ') : 'để tiệm tự chọn'}`,
      `• Chữ trên bánh: ${msg.trim() || '(chưa ghi)'}`,
      `• Giá tham khảo trên web: ${vnd(total)} (nhờ tiệm báo lại giá cuối giúp mình nha)`,
    ].join('\n')
  }, [shape, size, flavor, cream, tops, msg, total])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  const toggleTop = (id: string) =>
    setTops((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]))

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('.st__head > *', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: EASE,
          stagger: 0.07,
          scrollTrigger: { trigger: '.st__head', start: 'top 85%', once: true },
        })
        gsap.from('.st__panel', {
          y: 44,
          opacity: 0,
          duration: 0.9,
          ease: EASE,
          scrollTrigger: { trigger: '.st__panel', start: 'top 88%', once: true },
        })
        gsap.from('.st__group', {
          y: 22,
          opacity: 0,
          duration: 0.6,
          ease: EASE,
          stagger: 0.07,
          scrollTrigger: { trigger: '.st__controls', start: 'top 85%', once: true },
        })
        gsap.to('.cp__flame', {
          scaleY: 0.8,
          scaleX: 1.1,
          transformOrigin: '50% 100%',
          duration: 0.42,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="section st" id="dat-banh" ref={root}>
      <div className="wrap">
        <div className="st__head">
          <span className="u-eyebrow">Tự thiết kế</span>
          <h2 className="st__h2">
            Xếp thử chiếc bánh
            <br />
            <em>trước khi nhắn</em>
          </h2>
          <p className="st__sub">
            Bấm chọn cho tới khi vừa mắt, rồi sao chép đơn và dán vào Zalo. Tiệm nhận được là biết
            luôn phải làm gì, khỏi hỏi tới hỏi lui.
          </p>
        </div>

        <div className="st__panel">
          <div className="st__preview">
            <CakePreview
              shape={shape}
              scale={0.78 + sizeIdx * 0.07}
              cream={cream}
              toppings={tops}
              message={msg}
              size={size.cm}
            />
            <p className="st__serve">
              <b>{size.serve}</b>
              <span>{size.cm}cm đường kính</span>
            </p>
          </div>

          <div className="st__controls">
            <fieldset className="st__group">
              <legend className="u-eyebrow">Kiểu dáng</legend>
              <div className="st__chips">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    className={`chip ${shape === s.id ? 'is-on' : ''}`}
                    onClick={() => setShape(s.id)}
                    aria-pressed={shape === s.id}
                  >
                    {s.name}
                    {SHAPE_ADD[s.id] > 0 && <i>+{SHAPE_ADD[s.id]}k</i>}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="st__group">
              <legend className="u-eyebrow">Kích thước</legend>
              <div className="st__chips">
                {sizes.map((s, i) => (
                  <button
                    key={s.cm}
                    className={`chip ${sizeIdx === i ? 'is-on' : ''}`}
                    onClick={() => setSizeIdx(i)}
                    aria-pressed={sizeIdx === i}
                  >
                    {s.cm}cm
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="st__group">
              <legend className="u-eyebrow">Màu kem</legend>
              <div className="st__swatches">
                {creams.map((c) => (
                  <button
                    key={c.id}
                    className={`sw ${creamId === c.id ? 'is-on' : ''}`}
                    style={{ ['--c' as string]: c.hex, ['--r' as string]: c.ring }}
                    onClick={() => setCreamId(c.id)}
                    aria-pressed={creamId === c.id}
                    aria-label={c.name}
                    title={c.name}
                  >
                    <span />
                  </button>
                ))}
                <span className="st__swName u-hand">{cream.name}</span>
              </div>
            </fieldset>

            <fieldset className="st__group">
              <legend className="u-eyebrow">Vị cốt</legend>
              <div className="st__chips">
                {FLAVORS.map((f) => (
                  <button
                    key={f.id}
                    className={`chip ${flavor === f.id ? 'is-on' : ''}`}
                    onClick={() => setFlavor(f.id)}
                    aria-pressed={flavor === f.id}
                  >
                    {f.name}
                    {f.add > 0 && <i>+{f.add}k</i>}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="st__group">
              <legend className="u-eyebrow">Trang trí — chọn nhiều được</legend>
              <div className="st__chips">
                {toppings.map((t) => (
                  <button
                    key={t.id}
                    className={`chip ${tops.includes(t.id) ? 'is-on' : ''}`}
                    onClick={() => toggleTop(t.id)}
                    aria-pressed={tops.includes(t.id)}
                  >
                    {t.name}
                    <i>+{t.add}k</i>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="st__group">
              <legend className="u-eyebrow">Chữ viết lên đế bánh</legend>
              <input
                className="st__input"
                type="text"
                maxLength={64}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Chúc mừng sinh nhật Mẹ yêu"
                aria-label="Chữ viết lên đế bánh"
              />
              <span className="st__count">{msg.length}/64</span>
            </fieldset>
          </div>

          <div className="st__bill">
            <div className="st__price">
              <span className="u-eyebrow">Giá tham khảo</span>
              <strong>{vnd(total)}</strong>
              <em>
                Con số này để bạn hình dung trước thôi nha — nguyên liệu tiệm lấy theo giá thị
                trường nên có đợt lên đợt xuống. Gửi mẫu qua Zalo, tiệm xem rồi báo lại giá cuối,
                bạn yên tâm là tiệm luôn tính mức dễ chịu nhất.
              </em>
            </div>
            <div className="st__acts">
              <a
                className="btn btn--accent"
                href={shop.zalo}
                target="_blank"
                rel="noreferrer"
                onClick={copy}
              >
                Sao chép & nhắn Zalo
              </a>
              <button className="btn btn--ghost" onClick={copy}>
                {copied ? 'Đã sao chép đơn ✓' : 'Chỉ sao chép đơn'}
              </button>
              <a className="st__call" href={`tel:${shop.phoneRaw}`}>
                hoặc gọi {shop.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
