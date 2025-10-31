import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Planet } from "@/data/planets-data";
import { X } from "lucide-react";

interface PlanetModalProps {
  planet: Planet | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlanetModal({ planet, isOpen, onClose }: PlanetModalProps) {
  if (!planet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
        <div className="relative glass-card border border-cyan-500/30 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-slow" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full glass-card hover:glass-card-hover transition-all duration-300 group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 group-hover:rotate-90 transition-all duration-300" />
          </button>

          <div className="relative grid md:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left side - 3D Planet View */}
            <div className="relative flex items-center justify-center p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border-r border-cyan-500/20">
              <div className="relative">
                {/* Planet with 3D effect */}
                <div className="planet-3d-container relative">
                  <div
                    className="planet-3d w-64 h-64 rounded-full animate-float-slow relative overflow-hidden"
                    style={{
                      background: planet.gradient,
                      boxShadow: `0 0 60px ${planet.color}40, inset -20px -20px 40px rgba(0,0,0,0.3), inset 20px 20px 40px rgba(255,255,255,0.1)`,
                    }}
                  >
                    {/* Rotating surface effect */}
                    <div
                      className="absolute inset-0 opacity-30 animate-rotate-slow"
                      style={{
                        background: `repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 20px,
                          rgba(255,255,255,0.1) 20px,
                          rgba(255,255,255,0.1) 40px
                        )`,
                      }}
                    />

                    {/* Glow effect */}
                    <div
                      className="absolute -inset-4 rounded-full blur-2xl opacity-50 animate-pulse-slow"
                      style={{ background: planet.color }}
                    />

                    {/* Shine effect */}
                    <div className="absolute top-8 left-8 w-24 h-24 bg-white/20 rounded-full blur-3xl" />
                  </div>

                  {/* Rings for Saturn */}
                  {planet.id === "saturn" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 pointer-events-none">
                      <div
                        className="absolute inset-0 rounded-full opacity-70 animate-float"
                        style={{
                          background: `linear-gradient(90deg, transparent 35%, ${planet.color}60 50%, transparent 65%)`,
                          transform: "rotateX(75deg)",
                          boxShadow: `0 0 20px ${planet.color}40`,
                        }}
                      />
                    </div>
                  )}

                  {/* Orbiting particles */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div
                      className="absolute top-0 left-1/2 w-2 h-2 rounded-full blur-sm"
                      style={{ background: planet.color }}
                    />
                  </div>
                  <div className="absolute inset-0 animate-spin-reverse">
                    <div
                      className="absolute bottom-0 right-1/2 w-1.5 h-1.5 rounded-full blur-sm"
                      style={{ background: planet.color }}
                    />
                  </div>
                </div>

                {/* Planet name with icon */}
                <div className="text-center mt-8">
                  <div className="text-6xl mb-2 animate-bounce-slow">
                    {planet.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
                    {planet.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Right side - Information */}
            <div className="relative p-8 overflow-y-auto max-h-[600px] custom-scrollbar">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2">
                  {planet.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-cyan-100/80">
                  {planet.description}
                </DialogDescription>
              </DialogHeader>

              {/* Details Section */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                    <span className="text-2xl">📖</span>
                    About {planet.name}
                  </h4>
                  <div className="space-y-2">
                    {planet.details.map((detail, index) => (
                      <p
                        key={index}
                        className="text-cyan-50/70 leading-relaxed pl-4 border-l-2 border-cyan-500/30 hover:border-cyan-500/60 transition-colors duration-300"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Facts Grid */}
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Key Facts
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {planet.facts.map((fact, index) => (
                      <div
                        key={index}
                        className="glass-card p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="text-xs text-cyan-400/60 mb-1 uppercase tracking-wider">
                          {fact.label}
                        </div>
                        <div className="text-lg font-semibold text-cyan-50 group-hover:text-cyan-300 transition-colors">
                          {fact.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fun fact banner */}
                <div className="glass-card-hover p-4 rounded-lg border border-purple-500/30 bg-linear-to-r from-purple-500/10 to-pink-500/10">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <h5 className="text-sm font-semibold text-purple-300 mb-1">
                        Did you know?
                      </h5>
                      <p className="text-sm text-purple-100/70">
                        {planet.id === "jupiter" &&
                          "Jupiter's magnetic field is 14 times stronger than Earth's!"}
                        {planet.id === "saturn" &&
                          "Saturn is the only planet that could float in water!"}
                        {planet.id === "neptune" &&
                          "Neptune has the fastest winds in the solar system, reaching 2,100 km/h!"}
                        {planet.id === "mars" &&
                          "A day on Mars is only 37 minutes longer than a day on Earth!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
