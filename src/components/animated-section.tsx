
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp" | "staggerChildren"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fadeUp", delay = 0 }: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getAnimationClass = () => {
    const baseClass = "transition-all duration-1000 ease-out"

    if (!isIntersecting) {
      switch (animation) {
        case "fadeUp":
          return `${baseClass} opacity-0 translate-y-12`
        case "fadeIn":
          return `${baseClass} opacity-0`
        case "slideLeft":
          return `${baseClass} opacity-0 -translate-x-12`
        case "slideRight":
          return `${baseClass} opacity-0 translate-x-12`
        case "scaleUp":
          return `${baseClass} opacity-0 scale-95`
        case "staggerChildren":
          return `${baseClass} opacity-0 translate-y-8`
        default:
          return `${baseClass} opacity-0 translate-y-12`
      }
    }

    return `${baseClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div ref={ref as any} className={`${getAnimationClass()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
