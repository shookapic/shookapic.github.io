// Tiny bridge between the ScrollControls container (inside the Canvas)
// and the DOM overlay (outside the Canvas).
let scrollEl: HTMLElement | null = null

export function setScrollEl(el: HTMLElement) {
  scrollEl = el
}

export function scrollToSection(index: number, total: number) {
  if (!scrollEl) return
  const top = (index / (total - 1)) * (scrollEl.scrollHeight - scrollEl.clientHeight)
  scrollEl.scrollTo({ top, behavior: 'smooth' })
}

export const SECTION_EVENT = 'portfolio:section'

export function announceSection(index: number) {
  window.dispatchEvent(new CustomEvent(SECTION_EVENT, { detail: index }))
}
