import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP)

/** Nhịp riêng của tiệm: đi nhanh lúc đầu rồi hạ xuống rất mềm, như đặt bánh xuống bàn. */
export const EASE = 'power3.out'
export const EASE_SOFT = 'power2.out'

export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  belowDesktop: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  fine: '(hover: hover) and (pointer: fine)',
}

export const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Màn mở đầu chạy bao lâu — mọi thứ trong hero xếp hàng sau mốc này. */
export const INTRO = reduced() ? 0 : 1.05

/** Thiết bị yếu: ít nhân, hoặc màn hẹp — tắt bớt hiệu ứng nặng (parallax, pin). */
export const lightDevice = () => {
  if (typeof navigator === 'undefined') return false
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  return (typeof cores === 'number' && cores <= 4) || (typeof mem === 'number' && mem <= 4)
}

/**
 * Hé mở nội dung khi cuộn tới. Không phải thứ gì cũng trôi từ dưới lên:
 * `mask` là bánh được kéo màn kem, `wipe` là quét ngang, `up` mới là trôi lên.
 */
export function revealBatch(scope: Element | Document = document) {
  const nodes = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope)
  if (!nodes.length) return

  nodes.forEach((el) => {
    const kind = el.dataset.reveal || 'up'
    const delay = Number(el.dataset.revealDelay || 0)
    const from: gsap.TweenVars = { delay }
    const to: gsap.TweenVars = {
      delay,
      duration: kind === 'mask' || kind === 'wipe' ? 1.05 : 0.85,
      ease: EASE,
      overwrite: 'auto',
    }

    if (kind === 'mask') {
      Object.assign(from, { clipPath: 'inset(0 0 101% 0)' })
      Object.assign(to, { clipPath: 'inset(0 0 0% 0)' })
    } else if (kind === 'wipe') {
      Object.assign(from, { clipPath: 'inset(0 101% 0 0)' })
      Object.assign(to, { clipPath: 'inset(0 0% 0 0)' })
    } else if (kind === 'tilt') {
      Object.assign(from, { opacity: 0, y: 34, rotate: Number(el.dataset.revealTilt || -3) })
      Object.assign(to, { opacity: 1, y: 0, rotate: 0 })
    } else if (kind === 'in') {
      Object.assign(from, { opacity: 0, scale: 0.94 })
      Object.assign(to, { opacity: 1, scale: 1 })
    } else {
      Object.assign(from, { opacity: 0, y: 26 })
      Object.assign(to, { opacity: 1, y: 0 })
    }

    gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  })
}

/** Tách chữ theo dòng, có sẵn khung ẩn để dòng trượt lên như kéo rèm. */
export function splitLines(el: HTMLElement) {
  const split = new SplitText(el, {
    type: 'lines',
    linesClass: 'ln',
    mask: 'lines',
    autoSplit: true,
  })
  return split
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
