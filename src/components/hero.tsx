import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import "../App.css";
import Stats from "./stats/Stats";
import ContactIcons from "./hero-icons/ContactIcons";
import {SquareTerminal} from "lucide-react";
import { AiOutlineLaptop } from "react-icons/ai";
export default function Hero() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-2 sm:px-4 lg:px-6 py-16 sm:py-20"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          ref={heroRef as any}
          className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center transition-all duration-1000 ${
            heroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-3 sm:space-y-4 order-2 lg:order-1">
            <div className="glass-card hover:glass-card-hover transition-all duration-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-3 sm:space-y-4">
                <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 glass-button rounded-full text-sky-300 text-xs sm:text-sm font-medium hover:scale-105 transition-all duration-300">
                  Hi, I'm Al Amin
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                  Fullstack
                  <span className="block bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                    Developer
                  </span>
                </h1>

                <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto lg:mx-0 rounded-full"></div>

                <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  I am currently studying computer science and engineering.
                  Passionate about
                  <span className="text-sky-400 font-semibold"> coding </span>
                  and learning new technologies. I thrive both working
                  independently and in teams, with experience in
                  <span className="text-sky-400 font-semibold">
                    {" "}
                    programming competitions.{" "}
                  </span>
                  I love building{" "}
                  <span className="text-emerald-400 font-semibold">
                    full-stack
                  </span>{" "}
                  apps, exploring backend architecture. I'm always curious about
                  new tech, constantly experimenting, and leveling up my skills
                  in software development. I enjoy turning ideas into clean,
                  working code.
                  <br className="hidden sm:block" />
                  <span className="block mt-1 sm:mt-0 sm:inline">
                    Always building, always growing. Let's connect and make
                    something awesome!
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group">
              {/* Enhanced Glowing background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              {/* Enhanced Glass frame */}
              <div className="relative glass-card rounded-full p-2 shadow-2xl hover:glass-card-hover transition-all duration-500 glow-animation">
                <img
                  src="/alamin-removebg-preview.png"
                  alt="Al Amin's profile"
                  className="rounded-full object-cover w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px]"
                />
              </div>

              {/* Enhanced Floating elements */}
              <div className="absolute top-12 -right-2 sm:top-20 sm:-right-4 glass-card rounded-full p-2 sm:p-3 animate-float hover:glass-card-hover transition-all duration-300">
                {/* <span className="text-lg sm:text-2xl">💻</span> */}
                <AiOutlineLaptop size={25} color="white"/>
              </div>
              <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:-left-6 glass-card rounded-full p-2 sm:p-3 animate-float animation-delay-2000 hover:glass-card-hover transition-all duration-300">
                <span className="text-lg sm:text-2xl  text-white "><SquareTerminal  size={26}/></span>
              </div>
            </div>
          </div>

        </div>
          <ContactIcons/>
        <Stats/>
      </div>
    </section>
  );
}
