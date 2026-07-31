import { useEffect, useRef } from 'react'

/**
 * Single shared IntersectionObserver for the whole page. Elements opt in by
 * calling useReveal() and spreading the returned ref; the observer adds
 * `is-visible` once and then stops watching them.
 */
let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  )
  return observer
}

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // No observer needed when motion is off — the CSS shows everything anyway.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = getObserver()
    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  return ref
}
