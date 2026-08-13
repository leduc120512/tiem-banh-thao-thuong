import { shop } from '../../data/site'

/** Dấu hiệu nhận biết: một chiếc bánh ba tầng vẽ bằng nét liền, cắm một cây nến. */
export function CakeMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 4.5v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="3" r="2.4" fill="var(--orange)" />
      <path
        d="M8 34.5h24M9.5 34.5v-6.2c0-1.2 1-2.2 2.2-2.2h16.6c1.2 0 2.2 1 2.2 2.2v6.2M12.5 26.1v-5c0-1.2 1-2.2 2.2-2.2h10.6c1.2 0 2.2 1 2.2 2.2v5M15.5 18.9v-4.2c0-1.2 1-2.2 2.2-2.2h4.6c1.2 0 2.2 1 2.2 2.2v4.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo ${compact ? 'logo--compact' : ''}`}>
      <CakeMark className="logo__mark" />
      <span className="logo__txt">
        <span className="logo__name">{shop.name}</span>
        <span className="logo__sub">{shop.suffix} · từ {shop.since}</span>
      </span>
    </span>
  )
}
