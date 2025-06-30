"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { type ReactNode, Children, cloneElement, isValidElement } from "react"

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className = "", staggerDelay = 100 }: StaggerContainerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            className: `${child.props.className || ""} transition-all duration-700 ease-out ${
              isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`,
            style: {
              ...child.props.style,
              transitionDelay: isIntersecting ? `${index * staggerDelay}ms` : "0ms",
            },
          })
        }
        return child
      })}
    </div>
  )
}
