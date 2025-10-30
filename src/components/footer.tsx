import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import EasterEggsModal from "./easter-eggs-modal";

export default function Footer() {
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation();
  const [showEasterEggs, setShowEasterEggs] = useState(false);

  return (
    <footer className="py-8 sm:py-10 lg:py-12 px-2 sm:px-4 lg:px-6 border-t border-sky-500/20">
      <div className="container mx-auto max-w-7xl">
        <div
          ref={footerRef as any}
          className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 glass-card hover:glass-card-hover transition-all duration-1000 ${
            footerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Brand */}
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                  Al Amin
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Passionate fullstack developer creating digital experiences
                  that make a difference. Always learning, always growing,
                  always innovating.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sky-300 text-sm sm:text-base">
                  Quick Links
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {["Home", "Projects", "Skills", "Contact"].map(
                    (link, index) => (
                      <li key={index}>
                        <a
                          href={`#${link.toLowerCase()}`}
                          className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-xs sm:text-sm inline-block transform hover:translate-x-1"
                        >
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sky-300 text-sm sm:text-base">Services</h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {[
                    "Web Development",
                    "Software Development",
                    "Backend Development",
                    "Database Management",
                  ].map((service, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-xs sm:text-sm flex items-center"
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                      <span className="line-clamp-1">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-sky-500/20 pt-4 sm:pt-6 lg:pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
              <p className="text-gray-400 text-xs sm:text-sm flex items-center order-2 sm:order-1">
                 © {new Date().getFullYear()} All rights reserved.
              </p>
               <p
                onClick={() => setShowEasterEggs(true)}
                className="text-gray-400 text-xs sm:text-sm order-1 sm:order-2 hover:text-sky-400 transition-colors duration-300 cursor-pointer flex items-center gap-2"
              >
                <span className="text-yellow-400">💡</span>Click
                <span className="text-sky-400">
                    here
                    </span>
                 to discover easter eggs!
              </p>
              <p className="text-gray-400/70 text-xs sm:text-sm flex items-center gap-2">
              Made by Al Amin
              </p>
            </div>
          </div>
        </div>
      </div>
      <EasterEggsModal
        open={showEasterEggs}
        onOpenChange={setShowEasterEggs}
      />
    </footer>
  );
}
