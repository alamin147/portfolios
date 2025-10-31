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

  // Different positions for planets
  const positions = [
    { top: "15%", left: "10%", delay: "0s" },
    { top: "60%", left: "85%", delay: "2s" },
    { top: "75%", left: "15%", delay: "4s" },
    { top: "25%", left: "80%", delay: "6s" },
  ];

  return (
    <>
      {/* Floating Planets Container */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {planetsData.map((planet, index) => {
          const position = positions[index];
          return (
            <div
              key={planet.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                top: position.top,
                left: position.left,
                animationDelay: position.delay,
              }}
              onClick={() => handlePlanetClick(planet)}
            >
              <div className="relative group">
                {/* Planet */}
                <div
                  className="planet-floating relative transition-all duration-500 hover:scale-125 group-hover:animate-none"
                  style={{
                    width: planet.size,
                    height: planet.size,
                    animationDuration: planet.orbitDuration,
                  }}
                >
                  <div
                    className="w-full h-full rounded-full relative overflow-hidden cursor-pointer shadow-2xl"
                    style={{
                      background: planet.gradient,
                      boxShadow: `0 0 40px ${planet.color}60, inset -10px -10px 30px rgba(0,0,0,0.3), inset 10px 10px 30px rgba(255,255,255,0.1)`,
                    }}
                  >
                    {/* Rotating texture */}
                    <div
                      className="absolute inset-0 opacity-30 animate-rotate"
                      style={{
                        background: `repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 10px,
                          rgba(255,255,255,0.1) 10px,
                          rgba(255,255,255,0.1) 20px
                        )`,
                      }}
                    />

                    {/* Glow effect */}
                    <div
                      className="absolute -inset-2 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-glow"
                      style={{ background: planet.color }}
                    />

                    {/* Shine highlight */}
                    <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white/30 rounded-full blur-lg" />
                  </div>

                  {/* Rings for Saturn */}
                  {planet.id === "saturn" && (
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        width: "150%",
                        height: "60%",
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full opacity-60"
                        style={{
                          background: `linear-gradient(90deg, transparent 30%, ${planet.color}80 50%, transparent 70%)`,
                          transform: "rotateX(75deg)",
                          boxShadow: `0 0 15px ${planet.color}40`,
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

                {/* Planet Label - shows on hover */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                  <div className="glass-card px-4 py-2 rounded-full border border-cyan-500/30">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{planet.icon}</div>
                      <div className="text-sm font-semibold text-cyan-300">
                        {planet.name}
                      </div>
                      <div className="text-xs text-cyan-400/60">
                        Click to explore
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pulsing ring effect */}
                <div
                  className="absolute inset-0 rounded-full animate-ping-slow opacity-0 group-hover:opacity-20"
                  style={{
                    background: planet.color,
                    animationDuration: "3s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Planet Modal */}
      <PlanetModal
        planet={selectedPlanet}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
