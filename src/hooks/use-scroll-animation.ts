"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility so the animation replays every time the element
        // enters the viewport, not just the first time.
        setIsVisible(entry.isIntersecting)
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.unobserve(element)
  }, [threshold])

  return { ref, isVisible }
}
