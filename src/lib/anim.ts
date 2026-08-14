import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP)

/** Nhịp riêng của tiệm: đi nhanh lúc đầu rồi hạ xuống rất mềm, như đặt bánh xuống bàn. */
export const EASE = 'power3.out'

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
