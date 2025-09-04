import { Download, Github, Linkedin, Mail } from "lucide-react";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import CustomBtn from "./custom-button";
import "../App.css";
import Stats from "./stats/Stats";

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
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="glass-card hover:glass-card-hover transition-all duration-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 glass-button rounded-full text-sky-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 hover:scale-105 transition-all duration-300">
                  Hi, I'm Al Amin ✨
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                  Fullstack
                  <span className="block bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                    Developer
                  </span>
                </h1>

                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 my-4 sm:my-6 mx-auto lg:mx-0 rounded-full"></div>

                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-2xl">
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
                  <span className="block mt-2 sm:mt-0 sm:inline">
                    Always building, always growing. Let's connect and make
                    something awesome! .
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 sm:gap-6 justify-center lg:justify-start">
              <a
                href={"/Al_Amin_fullstack_Resume.pdf"}
                target="_black"
                download="Alamin Fullstack Resume"
                className="w-full sm:w-auto"
              >
                <CustomBtn
                  children={<Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
                  title="Download Resume"
                />
              </a>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
                {[
                  {
                    name: "LinkedIn",
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/alamin27",
                    color: "hover:bg-sky-600/20",
                    iconColor: "group-hover:text-blue-500",
                  },
                  {
                    name: "GitHub",
                    icon: Github,
                    href: "https://github.com/alamin147",
                    color: "hover:bg-gray-700/20",
                    iconColor: "group-hover:text-gray-400",
                  },
                  {
                    name: "LeetCode",
                    icon: SiLeetcode,
                    href: "https://leetcode.com/u/alamin14",
                    color: "hover:bg-orange-600/20",
                    iconColor: "group-hover:text-orange-500",
                  },
                  {
                    name: "Codeforces",
                    icon: SiCodeforces,
                    href: "https://codeforces.com/profile/alamin147",
                    color: "hover:bg-blue-600/20",
                    iconColor: "group-hover:text-blue-400",
                  },
                  {
                    name: "CodeChef",
                    icon: SiCodechef,
                    href: "https://www.codechef.com/users/alamin14780",
                    color: "hover:bg-amber-600/20",
                    iconColor: "group-hover:text-amber-500",
                  },
                  {
                    name: "mail",
                    icon: Mail,
                    href: "/#contact",
                    color: "hover:bg-emerald-600/20",
                    iconColor: "group-hover:text-emerald-400",
                  },
                ].map((social, index) => (
                  <a
                    href={social.href}
                    target={social.name == "mail" ? "" : "_blank"}
                    key={index}
                  >
                    <div
                      className={`glass-card ${social.color} rounded-full p-2 sm:p-3 lg:p-4 hover:scale-110 transition-all duration-300 cursor-pointer group `}
                    >
                      <social.icon className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white ${social.iconColor} group-hover:scale-110 transition-all duration-300`} />
                    </div>
                  </a>
                ))}
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
                  className="rounded-full object-cover w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px]"
                />
              </div>

              {/* Enhanced Floating elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass-card rounded-full p-2 sm:p-3 animate-float hover:glass-card-hover transition-all duration-300">
                <span className="text-lg sm:text-2xl">💻</span>
              </div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 glass-card rounded-full p-2 sm:p-3 animate-float animation-delay-2000 hover:glass-card-hover transition-all duration-300">
                <span className="text-lg sm:text-2xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
        <Stats/>
      </div>
    </section>
  );
}
