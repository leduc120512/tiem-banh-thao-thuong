type Props = {
  /** đường dẫn không đuôi, ví dụ "cakes/cake-01" */
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * Ảnh webp hai kích thước, luôn nằm trong khung đã khai báo tỉ lệ
 * nên không gây nhảy bố cục khi tải xong.
 */
export default function Img({ src, alt, sizes = '100vw', priority, className }: Props) {
  const base = `/img/${src}`
  return (
    <img
      src={`${base}-1200.webp`}
      srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w`}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
    />
  )
}
