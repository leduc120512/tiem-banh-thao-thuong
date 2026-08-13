import { useId } from 'react'

/**
 * Viền kem chảy — lấy từ mẫu bánh drip có thật của tiệm.
 * Dùng thay cho đường kẻ ngang giữa các mảng nội dung.
 */
export function Drip({
  color = 'var(--paper)',
  flip = false,
  className = '',
}: {
  color?: string
  flip?: boolean
  className?: string
}) {
  return (
    <svg
      className={`drip ${flip ? 'drip--flip' : ''} ${className}`}
      viewBox="0 0 1200 46"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={color}
        d="M0 0h1200v14c-18 0-22 9-22 17s-7 12-13 12-12-5-12-13-6-16-22-16-21 5-21 13-6 15-13 15-12-6-12-14-9-14-24-14-23 7-23 16-6 16-14 16-13-7-13-15-8-14-21-14-21 6-21 15-7 17-15 17-14-8-14-17-8-15-20-15-20 6-20 14-6 13-13 13-13-5-13-13-9-15-23-15-22 6-22 14-6 14-13 14-13-6-13-14-9-15-23-15-22 7-22 15-6 15-14 15-14-7-14-15-8-14-21-14-21 6-21 14-6 15-14 15-14-7-14-15-8-15-22-15-22 6-22 14-6 13-13 13-13-5-13-13-9-15-23-15-22 7-22 15-6 14-13 14-13-6-13-14-9-15-23-15-22 6-22 14-6 14-14 14-14-6-14-14-8-15-21-15-21 7-21 15-6 14-13 14-13-6-13-14-9-14-23-14-22 6-22 14-6 15-14 15-14-7-14-15-8-14-21-14-21 6-21 14-6 14-14 14-13-6-13-14-9-15-23-15-22 7-22 15-6 14-13 14-13-6-13-14-9-15-23-15-22 6-22 14-6 14-14 14-14-6-14-14V0Z"
      />
    </svg>
  )
}

/** Nét kem gạch chân — tự vẽ ra khi cuộn tới. */
export function IcingUnderline({ className = '' }: { className?: string }) {
  const id = useId()
  return (
    <svg
      className={`icing-line ${className}`}
      viewBox="0 0 260 22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--orange)" />
          <stop offset="1" stopColor="var(--pink)" />
        </linearGradient>
      </defs>
      <path
        className="icing-line__p"
        d="M4 15.5C40 6.5 92 4 131 6.5c39 2.5 72 8 125 3.5"
        stroke={`url(#${id})`}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Nến cắm trên bánh — ngọn lửa lay nhẹ, chỉ có một cái duy nhất ở hero. */
export function Candle({ className = '' }: { className?: string }) {
  return (
    <svg className={`candle ${className}`} viewBox="0 0 34 96" fill="none" aria-hidden="true">
      <g className="candle__flame">
        <path
          d="M17 4c6 8 9 12 9 17a9 9 0 0 1-18 0c0-5 3-9 9-17Z"
          fill="var(--amber)"
        />
        <path d="M17 14c3 4 4.5 6.5 4.5 9a4.5 4.5 0 0 1-9 0c0-2.5 1.5-5 4.5-9Z" fill="#FFF3D6" />
      </g>
      <rect x="12" y="30" width="10" height="62" rx="2" fill="var(--paper-2)" />
      <rect x="12" y="30" width="10" height="62" rx="2" fill="url(#stripe)" opacity=".55" />
      <defs>
        <pattern id="stripe" width="8" height="8" patternTransform="rotate(38)" patternUnits="userSpaceOnUse">
          <rect width="4" height="8" fill="var(--pink)" />
        </pattern>
      </defs>
      <rect x="15.4" y="22" width="3.2" height="10" rx="1.6" fill="#5C4630" />
    </svg>
  )
}

const SPRINKLE_COLORS = ['var(--orange)', 'var(--blue-3)', 'var(--pink)', 'var(--amber)', 'var(--blue-4)']

/** Vụn cốm rắc quanh bố cục. Vị trí do người đặt, không random mỗi lần render. */
export function Sprinkles({
  spots,
  className = '',
}: {
  spots: [number, number, number][] // [left %, top %, rotate deg]
  className?: string
}) {
  return (
    <div className={`sprinkles ${className}`} aria-hidden="true">
      {spots.map(([x, y, r], i) => (
        <i
          key={i}
          className="sprinkle"
          data-float
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `rotate(${r}deg)`,
            background: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
          }}
        />
      ))}
    </div>
  )
}
