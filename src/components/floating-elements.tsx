"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Parallax floating elements */}
      <div
        className="absolute w-2 h-2 bg-sky-400/30 rounded-full animate-pulse"
        style={{
          left: `${20 + mousePosition.x * 0.02}%`,
          top: `${30 + mousePosition.y * 0.01}%`,
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.01}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse"
        style={{
          left: `${70 + mousePosition.x * 0.03}%`,
          top: `${20 + mousePosition.y * 0.02}%`,
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.02}px)`,
          transition: "transform 0.4s ease-out",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute w-3 h-3 bg-purple-400/20 rounded-full animate-pulse"
        style={{
          left: `${80 + mousePosition.x * 0.01}%`,
          top: `${60 + mousePosition.y * 0.015}%`,
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.015}px)`,
          transition: "transform 0.5s ease-out",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute w-1.5 h-1.5 bg-yellow-400/30 rounded-full animate-pulse"
        style={{
          left: `${10 + mousePosition.x * 0.025}%`,
          top: `${70 + mousePosition.y * 0.02}%`,
          transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.02}px)`,
          transition: "transform 0.6s ease-out",
          animationDelay: "0.5s",
        }}
      />
    </div>
  )
}
