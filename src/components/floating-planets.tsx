import { useState } from "react";
import { planetsData } from "@/data/planets-data";
import type { Planet } from "@/data/planets-data";
import { PlanetModal } from "./planet-modal";

export function FloatingPlanets() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPlanet(null), 300);
  };

  // Scattered positions using pixel values to appear at different sections
  // Planets stay in place on the page as you scroll
  // Increased margins to prevent horizontal overflow
  const positions = [
    { top: "100px", right: "5%", delay: "0s" },      // 1. Profile - Hero section
    { top: "1200px", left: "5%", delay: "2s" },      // 2. CP - CP section
    { top: "2300px", right: "5%", delay: "4s" },     // 3. Projects - Project section
    { top: "3600px", left: "5%", delay: "6s" },      // 4. Skills - Skill section
    { top: "4800px", right: "5%", delay: "8s" },     // 5. Blog section
    { top: "6000px", left: "5%", delay: "10s" },     // 6. Education section
    { top: "7200px", right: "5%", delay: "12s" },    // 7. Contact section
    { top: "8400px", left: "5%", delay: "14s" },     // 8. Footer section
  ];

  return (
    <>
      {/* Floating Planets - positioned absolutely so they stay on the page */}
      {planetsData.map((planet, index) => {
        const position = positions[index];
        return (
          <div
            key={planet.id}
            className="absolute pointer-events-auto cursor-pointer z-40"
            style={{
              top: position.top,
              left: position.left,
              right: position.right,
              animationDelay: position.delay,
            }}
            onClick={() => handlePlanetClick(planet)}
          >
            <div className="relative group">
              {/* Planet */}
              <div
                className="planet-floating relative transition-all duration-700 hover:scale-150"
                style={{
                  width: planet.size,
                  height: planet.size,
                  animationDuration: planet.orbitDuration,
                }}
              >
                  {/* Outer glow ring */}
                  <div
                    className="absolute -inset-4 rounded-full opacity-40 group-hover:opacity-80 transition-all duration-700 animate-pulse-slow"
                    style={{
                      background: `radial-gradient(circle, ${planet.color}40 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Main planet sphere */}
                  <div
                    className="w-full h-full rounded-full relative overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(6,182,212,0.6)]"
                    style={{
                      background: planet.gradient,
                      boxShadow: `
                        0 0 60px ${planet.color}80,
                        0 0 100px ${planet.color}40,
                        inset -15px -15px 40px rgba(0,0,0,0.5),
                        inset 15px 15px 40px rgba(255,255,255,0.15)
                      `,
                    }}
                  >
                    {/* Multiple rotating texture layers for depth */}
                    <div
                      className="absolute inset-0 opacity-20 animate-rotate"
                      style={{
                        background: `repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 8px,
                          rgba(255,255,255,0.15) 8px,
                          rgba(255,255,255,0.15) 16px
                        )`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-15 animate-rotate-slow"
                      style={{
                        background: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 12px,
                          rgba(0,0,0,0.1) 12px,
                          rgba(0,0,0,0.1) 24px
                        )`,
                      }}
                    />

                    {/* Enhanced glow effect */}
                    <div
                      className="absolute -inset-3 rounded-full blur-2xl opacity-0 group-hover:opacity-90 transition-opacity duration-700 animate-pulse-glow"
                      style={{ background: planet.color }}
                    />

                    {/* Primary shine highlight */}
                    <div className="absolute top-3 left-3 w-2/5 h-2/5 bg-white/40 rounded-full blur-xl" />

                    {/* Secondary shine for realism */}
                    <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-white/20 rounded-full blur-md" />

                    {/* Atmosphere glow edge */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, transparent 50%, ${planet.color}20 100%)`,
                      }}
                    />
                  </div>

                  {/* Enhanced rings for Saturn */}
                  {planet.id === "saturn" && (
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        width: "180%",
                        height: "80%",
                      }}
                    >
                      {/* Main ring */}
                      <div
                        className="absolute inset-0 rounded-full opacity-70 transition-all duration-700 group-hover:opacity-90"
                        style={{
                          background: `linear-gradient(90deg,
                            transparent 25%,
                            ${planet.color}40 35%,
                            ${planet.color}90 50%,
                            ${planet.color}40 65%,
                            transparent 75%)`,
                          transform: "rotateX(75deg)",
                          boxShadow: `0 0 25px ${planet.color}60, inset 0 0 15px ${planet.color}40`,
                        }}
                      />
                      {/* Secondary outer ring */}
                      <div
                        className="absolute inset-[-10%] rounded-full opacity-40"
                        style={{
                          background: `linear-gradient(90deg,
                            transparent 20%,
                            ${planet.color}20 30%,
                            transparent 35%,
                            transparent 65%,
                            ${planet.color}20 70%,
                            transparent 80%)`,
                          transform: "rotateX(75deg)",
                        }}
                      />
                    </div>
                  )}

                  {/* Orbit line - visible on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                    <div
                      className="absolute inset-[-50%] border rounded-full animate-spin-slow"
                      style={{ borderColor: `${planet.color}40` }}
                    />
                  </div>
                </div>

                {/* Enhanced Planet Label - shows on hover */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-2 pointer-events-none whitespace-nowrap z-50">
                  <div className="glass-card px-5 py-3 rounded-2xl border-2 border-cyan-400/40 shadow-lg backdrop-blur-xl bg-linear-to-br from-slate-900/90 to-slate-800/90">
                    <div className="text-center">
                      <div className="text-3xl mb-2 animate-bounce-slow">{planet.icon}</div>
                      <div className="text-base font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-300 mb-1">
                        {planet.name}
                      </div>
                      <div className="text-xs text-cyan-300/80 font-medium flex items-center gap-1 justify-center">
                        Click to explore
                      </div>
                    </div>
                  </div>
                </div>
                {/* Multiple pulsing ring effects */}
                <div
                  className="absolute inset-0 rounded-full animate-ping-slow opacity-0 group-hover:opacity-30"
                  style={{
                    background: planet.color,
                    animationDuration: "2s",
                  }}
                />
                <div
                  className="absolute inset-[-10%] rounded-full animate-ping-slow opacity-0 group-hover:opacity-20"
                  style={{
                    background: planet.color,
                    animationDuration: "3s",
                    animationDelay: "0.5s",
                  }}
                />
              </div>
            </div>
        );
      })}

      {/* Planet Modal */}
      <PlanetModal
        planet={selectedPlanet}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
