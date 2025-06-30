import { Heart } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Footer() {
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation()

  return (
    <footer className="py-12 px-4 border-t border-sky-500/20">
      <div className="container mx-auto max-w-4/5">
        <div
          ref={footerRef as any}
          className={`relative overflow-hidden rounded-2xl p-8 glass-card hover:glass-card-hover transition-all duration-1000 ${
            footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                  Al Amin
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Passionate fullstack developer creating digital experiences that make a difference. Always learning,
                  always growing, always innovating.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-whie font-semibold mb-4 text-sky-300">Quick Links</h4>
                <ul className="space-y-2">
                  {["Home", "Projects", "Skills", "Contact"].map((link, index) => (
                    <li key={index}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm  inline-block transform"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className=" font-semibold mb-4 text-sky-300">Services</h4>
                <ul className="space-y-2">
                  {["Web Development", "Mobile Apps", "UI/UX Design", "Consulting"].map((service, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full mr-3"></div>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-sky-500/20 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm flex items-center">
                Made with <Heart className="h-4 w-4 text-emerald-500 mx-1" /> by Al Amin
              </p>
              <p className="text-gray-400 text-sm mt-4 md:mt-0">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
