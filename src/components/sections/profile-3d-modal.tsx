import { X } from "lucide-react";
import { useEffect } from "react";

interface Profile3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Profile3DModal({ isOpen, onClose }: Profile3DModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-[1000px] max-w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 3D Scene Container with Perspective */}
        <div className="profile-3d-scene relative h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center">

          {/* Close Button - positioned relative to scene */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 z-50 p-2 glass-card hover:glass-card-hover rounded-full transition-all duration-300 hover:scale-110 group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-sky-400 transition-colors" />
          </button>

          {/* Background atmosphere glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] opacity-30 animate-pulse-slow" style={{ animationDuration: "5s" }}>
            <div className="absolute inset-0 bg-linear-to-b from-sky-500/30 via-emerald-500/20 to-transparent blur-3xl" />
          </div>

          {/* 3D Platform/Ground */}
          <div className="profile-platform absolute bottom-[60px] sm:bottom-[90px] md:bottom-[120px] left-1/2 -translate-x-1/2">
            {/* Main platform surface */}
            <div className="platform-surface relative">
              {/* Glowing platform base */}
              <div className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse-slow" style={{ animationDuration: "4s", background: "radial-gradient(ellipse, rgba(8, 145, 178, 0.8) 0%, rgba(5, 150, 105, 0.6) 40%, transparent 70%)" }} />

              {/* Platform grid lines */}
              <div className="platform-grid relative w-[300px] sm:w-[450px] md:w-[600px] h-[100px] sm:h-[150px] md:h-[200px]" style={{ transform: "rotateX(60deg) translateZ(0px)" }}>
                <div className="absolute inset-0 opacity-40" style={{
                  background: `
                    repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(8, 145, 178, 0.6) 48px, rgba(8, 145, 178, 0.6) 50px),
                    repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(5, 150, 105, 0.6) 48px, rgba(5, 150, 105, 0.6) 50px)
                  `,
                  boxShadow: "0 0 40px rgba(8, 145, 178, 0.5), inset 0 0 60px rgba(8, 145, 178, 0.3)"
                }} />
              </div>

              {/* Platform rim glow */}
              <div className="absolute inset-0 rounded-full border-2 border-sky-400/40 animate-pulse-slow" style={{
                width: "250px",
                height: "20px",
                left: "50%",
                bottom: "0",
                transform: "translateX(-50%) rotateX(70deg)",
                boxShadow: "0 0 30px rgba(8, 145, 178, 0.6), inset 0 0 20px rgba(8, 145, 178, 0.4)",
                animationDuration: "3s"
              }} />
            </div>
          </div>

          {/* Standing Image - 3D positioned */}
          <div className="profile-standing-container absolute bottom-[100px] sm:bottom-[150px] md:bottom-[200px] left-1/2 -translate-x-1/2">
            {/* Image shadow on platform */}
            <div className="absolute -bottom-[40px] sm:-bottom-[60px] md:-bottom-[80px] left-1/2 -translate-x-1/2 w-[200px] sm:w-[300px] md:w-[400px] h-[50px] sm:h-[75px] md:h-[100px] rounded-full opacity-50 blur-3xl" style={{
              background: "radial-gradient(ellipse, rgba(0, 0, 0, 0.8) 0%, transparent 70%)",
              transform: "rotateX(70deg) scale(1.2, 0.4)"
            }} />

            {/* Ambient glow behind image */}
            <div
              className="absolute -inset-8 sm:-inset-10 md:-inset-12 blur-3xl opacity-70 animate-pulse-slow"
              style={{
                background: "radial-gradient(circle, rgba(8, 145, 178, 0.6) 0%, rgba(5, 150, 105, 0.6) 50%, transparent 70%)",
                animationDuration: "4s",
              }}
            />

            {/* Main profile image standing */}
            <div className="profile-image-standing relative">
              {/* Glow frame */}
              <div
                className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-full blur-2xl opacity-80 animate-pulse-glow"
                style={{
                  background: "linear-gradient(135deg, rgba(8, 145, 178, 0.8), rgba(5, 150, 105, 0.8))",
                  animationDuration: "4s",
                }}
              />

              {/* Image container */}
              <div className="relative glass-card p-2 sm:p-2.5 md:p-3 rounded-full shadow-2xl">
                <div className="relative rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-white/30 shadow-[0_0_40px_rgba(8,145,178,0.8)] sm:shadow-[0_0_50px_rgba(8,145,178,0.8)] md:shadow-[0_0_60px_rgba(8,145,178,0.8)]">
                  <img
                    src="/alamin-removebg-preview.png"
                    alt="Al Amin - 3D Profile"
                    className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] object-cover rounded-full"
                  />

                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent rounded-full" />

                  {/* Bottom shadow */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent rounded-full" />
                </div>
              </div>

              {/* Floating energy particles */}
              <div className="absolute top-1/4 left-0 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-sky-400 rounded-full animate-float blur-sm opacity-70" style={{ animationDuration: "3s" }} />
              <div className="absolute top-1/3 right-0 w-1.5 sm:w-2 md:w-2 h-1.5 sm:h-2 md:h-2 bg-emerald-400 rounded-full animate-float blur-sm opacity-70 animation-delay-1000" style={{ animationDuration: "4s" }} />
              <div className="absolute top-1/2 -left-4 sm:-left-6 md:-left-8 w-1.5 sm:w-2 md:w-2 h-1.5 sm:h-2 md:h-2 bg-sky-300 rounded-full animate-float blur-sm opacity-70 animation-delay-2000" style={{ animationDuration: "3.5s" }} />
              <div className="absolute top-2/3 -right-4 sm:-right-6 md:-right-8 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-emerald-300 rounded-full animate-float blur-sm opacity-70 animation-delay-1500" style={{ animationDuration: "4.5s" }} />
            </div>

            {/* Info badge floating in front */}
            <div className="absolute -bottom-20 sm:-bottom-28 md:-bottom-32 left-1/2 -translate-x-1/2 glass-card px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl border-2 border-sky-400/60 shadow-lg backdrop-blur-xl animate-float animation-delay-500" style={{
              boxShadow: "0 0 40px rgba(8, 145, 178, 0.5), 0 20px 40px rgba(0, 0, 0, 0.6)"
            }}>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-300 to-emerald-300">
                  Al Amin
                </div>
                <div className="text-xs sm:text-sm text-sky-300/90 font-medium">
                  Fullstack Developer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
