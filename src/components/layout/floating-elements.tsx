"use client"

import { useEffect, useRef } from "react"

export function FloatingElements() {
  const el0 = useRef<HTMLDivElement>(null);
  const el1 = useRef<HTMLDivElement>(null);
  const el2 = useRef<HTMLDivElement>(null);
  const el3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      if (el0.current)
        el0.current.style.transform = `translate(${x * 0.02}px, ${y * 0.01}px)`;
      if (el1.current)
        el1.current.style.transform = `translate(${x * 0.03}px, ${y * 0.02}px)`;
      if (el2.current)
        el2.current.style.transform = `translate(${x * 0.01}px, ${y * 0.015}px)`;
      if (el3.current)
        el3.current.style.transform = `translate(${x * 0.025}px, ${y * 0.02}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        ref={el0}
        className="absolute w-2 h-2 bg-sky-400/30 rounded-full animate-pulse"
        style={{ left: "20%", top: "30%", transition: "transform 0.3s ease-out" }}
      />
      <div
        ref={el1}
        className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse"
        style={{ left: "70%", top: "20%", transition: "transform 0.4s ease-out", animationDelay: "1s" }}
      />
      <div
        ref={el2}
        className="absolute w-3 h-3 bg-purple-400/20 rounded-full animate-pulse"
        style={{ left: "80%", top: "60%", transition: "transform 0.5s ease-out", animationDelay: "2s" }}
      />
      <div
        ref={el3}
        className="absolute w-1.5 h-1.5 bg-yellow-400/30 rounded-full animate-pulse"
        style={{ left: "10%", top: "70%", transition: "transform 0.6s ease-out", animationDelay: "0.5s" }}
      />
    </div>
  )
}
