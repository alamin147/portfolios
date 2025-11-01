import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Planet } from "@/data/planets-data";
import { Planet3D } from "./planet-3d";
import { SkillsPlanet3D } from "./skills-planet-3d";
import { ProfilePlanet3D } from "./profile-planet-3d";
import CPPlanet3D from "./cp-planet-3d";
import ProjectsPlanet3D from "./projects-planet-3d";
import BlogPlanet3D from "./blog-planet-3d";
import EducationPlanet3D from "./education-planet-3d";
import ContactPlanet3D from "./contact-planet-3d";
import FooterPlanet3D from "./footer-planet-3d";

interface PlanetModalProps {
  planet: Planet | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlanetModal({ planet, isOpen, onClose }: PlanetModalProps) {
  if (!planet) return null;

  // Check if this is an interactive planet to render full-width modal
  const isFullWidthPlanet = planet.id === "skills" || planet.id === "profile" || planet.id === "cp" || planet.id === "projects" || planet.id === "blog" || planet.id === "education" || planet.id === "contact" || planet.id === "social";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullWidthPlanet ? 'max-w-7xl' : 'max-w-5xl'} p-0 overflow-hidden bg-transparent border-none [&>button]:absolute [&>button]:top-4 [&>button]:right-4 [&>button]:z-50 [&>button]:rounded-full [&>button]:bg-slate-900/80 [&>button]:backdrop-blur-sm [&>button]:border [&>button]:border-cyan-500/30 [&>button]:p-2 [&>button]:transition-all [&>button]:duration-300 hover:[&>button]:border-cyan-500/60 hover:[&>button]:bg-slate-800/90 hover:[&>button]:scale-110 hover:[&>button]:rotate-90 [&>button>svg]:text-cyan-400 hover:[&>button>svg]:text-cyan-300`}>
        <div className="relative glass-card border border-cyan-500/30 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-slow" />
          </div>

          {isFullWidthPlanet ? (
            // Full-width 3D model for Skills or Profile Planet
            <div className="relative min-h-[700px]">
              <div className="relative flex flex-col items-center justify-center p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30">
                {/* Three.js 3D Planet Canvas - Full Size */}
                <div className="w-full h-[600px] relative">
                  {planet.id === "skills" ? (
                    <SkillsPlanet3D />
                  ) : planet.id === "profile" ? (
                    <ProfilePlanet3D />
                  ) : planet.id === "cp" ? (
                    <CPPlanet3D />
                  ) : planet.id === "projects" ? (
                    <ProjectsPlanet3D />
                  ) : planet.id === "blog" ? (
                    <BlogPlanet3D />
                  ) : planet.id === "education" ? (
                    <EducationPlanet3D />
                  ) : planet.id === "contact" ? (
                    <ContactPlanet3D />
                  ) : planet.id === "social" ? (
                    <FooterPlanet3D />
                  ) : null}
                </div>

                {/* Planet name with icon */}
                <div className="text-center mt-6">
                  <div className="text-6xl mb-2 animate-bounce-slow">
                    {planet.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 mb-2">
                    {planet.name}
                  </h3>
                  <p className="text-cyan-300/70 text-lg">
                    {planet.title}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Two-column layout for other planets
            <div className="relative grid md:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left side - Real Three.js 3D Planet */}
            <div className="relative flex flex-col items-center justify-center p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border-r border-cyan-500/20">
              {/* Three.js 3D Planet Canvas */}
              <div className="w-full h-[400px] relative">
                {planet.id === "skills" ? (
                  <SkillsPlanet3D />
                ) : (
                  <Planet3D planet={planet} />
                )}
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
                    {/* <span className="text-2xl">📖</span> */}
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
                    {/* <span className="text-2xl">📊</span> */}
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
                    {/* <span className="text-2xl">✨</span> */}
                    <div>
                      <h5 className="text-sm font-semibold text-purple-300 mb-1">
                        Did you know?
                      </h5>
                      <p className="text-sm text-purple-100/70">
                        {planet.id === "profile" &&
                          "Each node represents a unique aspect of my journey - from education to passion for building innovative solutions!"}
                        {planet.id === "cp" &&
                          "The golden rings symbolize achievements and continuous growth in competitive programming!"}
                        {planet.id === "projects" &&
                          "Click any project node to instantly launch the live demo and explore the application in action!"}
                        {planet.id === "blog" &&
                          "Click any blog node to dive into articles about web development, programming, and tech insights!"}
                        {planet.id === "education" &&
                          "Each achievement node represents a milestone in the learning journey - from degrees to certifications and beyond!"}
                        {planet.id === "contact" &&
                          "Click any node to instantly connect - email, phone, or social media. All ways to reach me in one interactive sphere!"}
                        {planet.id === "social" &&
                          "Navigate my portfolio, explore my services, and connect socially - everything in one place! Click any node to interact."}
                        {planet.id === "neptune" &&
                          "Neptune has the fastest winds in the solar system, reaching 2,100 km/h!"}
                        {planet.id === "skills" &&
                          "Each skill node is positioned using the Fibonacci sphere algorithm for perfect distribution!"}
                        {planet.id === "saturn" &&
                          "Saturn is the only planet that could float in water!"}
                        {planet.id === "jupiter" &&
                          "Jupiter's magnetic field is 14 times stronger than Earth's!"}
                        {planet.id === "mars" &&
                          "A day on Mars is only 37 minutes longer than a day on Earth!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
