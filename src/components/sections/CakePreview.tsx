import { useRef } from 'react'
import { gsap, useGSAP, reduced } from '../../lib/anim'

const SHAPE_PATH: Record<string, string> = {
  round:
    'M0,-100 C55,-100 100,-55 100,0 C100,55 55,100 0,100 C-55,100 -100,55 -100,0 C-100,-55 -55,-100 0,-100 Z',
  heart:
    'M0,85 C-45,45 -100,10 -100,-30 C-100,-70 -55,-90 -25,-65 C-12,-54 -4,-44 0,-32 C4,-44 12,-54 25,-65 C55,-90 100,-70 100,-30 C100,10 45,45 0,85 Z',
  square:
    'M-100,-78 Q-100,-100 -78,-100 L78,-100 Q100,-100 100,-78 L100,78 Q100,100 78,100 L-78,100 Q-100,100 -100,78 Z',
}

const FLOWER_SPOTS: [number, number, number][] = [
  [-38, -34, 1],
  [30, -40, 0.82],
  [44, 18, 0.95],
  [-30, 26, 0.75],
  [4, -6, 0.6],
]

const FRUIT_SPOTS: [number, number, string][] = [
  [-26, -22, 'var(--orange)'],
  [16, -30, '#D9435E'],
  [34, 6, '#EFC152'],
  [-16, 22, '#7FA85C'],
  [10, 26, '#D9435E'],
  [-44, 2, '#EFC152'],
]

type Props = {
  shape: string
  scale: number
  cream: { hex: string; ring: string }
  toppings: string[]
  message: string
  size: number
}

/**
 * Bánh nhìn từ trên xuống, dựng bằng SVG.
 * Viền bắt sò làm bằng nét đứt đầu tròn — cùng một cách vẽ chạy được cho cả ba kiểu dáng.
 */
export default function CakePreview({ shape, scale, cream, toppings, message, size }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const has = (t: string) => toppings.includes(t)

  useGSAP(
    () => {
      if (reduced()) return
      gsap.to('.cp__cake', {
        scale,
        duration: 0.85,
        ease: 'elastic.out(0.9, 0.7)',
        transformOrigin: '50% 50%',
      })
    },
    { dependencies: [scale], scope: root },
  )

  useGSAP(
    () => {
      if (reduced()) return
      gsap.fromTo(
        '.cp__shape',
        { rotate: -5, transformOrigin: '50% 50%' },
        { rotate: 0, duration: 0.7, ease: 'back.out(2)' },
      )
    },
    { dependencies: [shape], scope: root },
  )

  useGSAP(
    () => {
      if (reduced()) return
      gsap.from('.cp__pop', {
        scale: 0,
        opacity: 0,
        duration: 0.55,
        ease: 'back.out(2.4)',
        stagger: { each: 0.045, from: 'random' },
        transformOrigin: '50% 50%',
      })
    },
    { dependencies: [toppings.join(',')], scope: root },
  )

  const floss = has('floss')
  const body = floss ? '#E8D3A8' : cream.hex
  const ring = floss ? '#D4B77F' : cream.ring

  return (
    <div className="cp" ref={root}>
      <div className="board cp__board">
        <div className="cp__stage">
          <svg viewBox="0 0 320 300" className="cp__svg" role="img" aria-label={`Bánh ${shape} ${size}cm, kem ${cream.hex}`}>
            {/* bóng đổ trên đế */}
            <ellipse cx="160" cy="152" rx="104" ry="98" fill="rgba(20,48,58,.07)" />

            <g className="cp__cake" transform="translate(160 146)">
              <g className="cp__shape" transform="scale(0.92)">
                <path d={SHAPE_PATH[shape]} fill={body} />
                {/* mặt bánh sáng hơn thân */}
                <path
                  d={SHAPE_PATH[shape]}
                  fill="#fff"
                  opacity=".26"
                  transform="scale(0.8)"
                />
                {/* drip: dải kem chảy quanh mép */}
                {has('drip') && (
                  <path
                    className="cp__pop"
                    d={SHAPE_PATH[shape]}
                    fill="none"
                    stroke={ring}
                    strokeWidth="15"
                    strokeDasharray="2 26"
                    strokeLinecap="round"
                    transform="scale(0.9)"
                    opacity=".9"
                  />
                )}
                {/* viền bắt sò */}
                <path
                  d={SHAPE_PATH[shape]}
                  fill="none"
                  stroke={ring}
                  strokeWidth="13"
                  strokeDasharray="0.1 14"
                  strokeLinecap="round"
                />

                {floss && (
                  <g className="cp__pop" opacity=".75">
                    {Array.from({ length: 26 }).map((_, i) => {
                      const a = (i / 26) * Math.PI * 2
                      const r = 20 + (i % 4) * 14
                      return (
                        <ellipse
                          key={i}
                          cx={Math.cos(a) * r}
                          cy={Math.sin(a) * r * 0.9}
                          rx="11"
                          ry="3.4"
                          fill="#C9A468"
                          transform={`rotate(${(i * 47) % 180} ${Math.cos(a) * r} ${Math.sin(a) * r * 0.9})`}
                        />
                      )
                    })}
                  </g>
                )}

                {has('photo') && (
                  <g className="cp__pop">
                    <rect x="-46" y="-34" width="92" height="68" rx="4" fill="#fff" />
                    <rect x="-41" y="-29" width="82" height="52" rx="2" fill="var(--blue-2)" />
                    <circle cx="-18" cy="-12" r="7" fill="var(--amber)" />
                    <path d="M-41 23l24-22 16 14 13-10 29 18v0h-82z" fill="var(--blue-3)" />
                  </g>
                )}

                {has('fruit') &&
                  FRUIT_SPOTS.map(([x, y, c], i) => (
                    <circle key={i} className="cp__pop" cx={x} cy={y} r="9" fill={c} />
                  ))}

                {has('flower') &&
                  FLOWER_SPOTS.map(([x, y, s], i) => (
                    <g key={i} className="cp__pop" transform={`translate(${x} ${y}) scale(${s})`}>
                      {[0, 72, 144, 216, 288].map((a) => (
                        <ellipse
                          key={a}
                          cx="0"
                          cy="-9"
                          rx="6"
                          ry="9"
                          fill={i % 2 ? 'var(--pink-1)' : '#fff'}
                          stroke="rgba(20,48,58,.09)"
                          transform={`rotate(${a})`}
                        />
                      ))}
                      <circle r="4" fill="var(--amber)" />
                    </g>
                  ))}

                {has('figure') && (
                  <g className="cp__pop" transform="translate(0 -6)">
                    <circle cy="4" r="24" fill="#B98457" />
                    <path d="M-20-12l-4-16 16 7zM20-12l4-16-16 7z" fill="#B98457" />
                    <circle cx="-8" cy="0" r="2.6" fill="#2A1D14" />
                    <circle cx="8" cy="0" r="2.6" fill="#2A1D14" />
                    <path d="M-2 7h4l-2 3z" fill="#2A1D14" />
                  </g>
                )}
              </g>

              {/* nến */}
              <g transform="translate(0 -96)">
                <rect x="-3.5" y="-26" width="7" height="30" rx="3" fill="#fff" />
                <rect x="-3.5" y="-26" width="3.5" height="30" fill="var(--pink)" opacity=".8" />
                <path className="cp__flame" d="M0-40c4 6 6 8 6 11a6 6 0 0 1-12 0c0-3 2-5 6-11Z" fill="var(--amber)" />
              </g>

              {has('ribbon') && (
                <g className="cp__pop" transform="translate(0 96)">
                  <path d="M0 0c-8-11-26-14-30-4s10 15 30 4Z" fill="var(--orange)" />
                  <path d="M0 0c8-11 26-14 30-4s-10 15-30 4Z" fill="var(--orange)" />
                  <path d="M-4 2l-9 16 9-4 9 4-9-16Z" fill="#C44F21" />
                  <circle r="5" fill="#C44F21" />
                </g>
              )}
            </g>
          </svg>

          {/* lời nhắn nằm dưới đế bánh — đúng chỗ tiệm bắt kem */}
          <p className={`cp__msg u-icing ${message ? '' : 'is-empty'}`}>
            {message || 'chữ của bạn sẽ nằm ở đây'}
          </p>
          <span className="cp__badge">{size}cm</span>
        </div>
      </div>
    </div>
  )
}
