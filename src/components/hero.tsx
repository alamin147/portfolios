import { Download, Github, Linkedin, Mail } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import CustomBtn from "./custom-button";
import "../App.css";

export default function Hero() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="container mx-auto max-w-4/5">
        <div
          ref={heroRef as any}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            heroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="glass-card hover:glass-card-hover transition-all duration-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block px-6 py-3 glass-button rounded-full text-sky-300 text-sm font-medium mb-6 hover:scale-105 transition-all duration-300">
                  Hi, I'm Al Amin ✨
                </span>

                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                  Fullstack
                  <span className="block bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                    Developer
                  </span>
                </h1>

                <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 my-6 mx-auto lg:mx-0 rounded-full"></div>

                <p className="text-lg text-gray-300 leading-relaxed">
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
                  <br />
                  Always building, always growing. Let's connect and make
                  something awesome! .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <a
                href={"/Al_Amin_fullstack_Resume.pdf"}
                target="_black"
                download="Alamin Fullstack Resume"
              >
                <CustomBtn
                  children={<Download className="mr-2 h-5 w-5" />}
                  title="Download Resume"
                />
              </a>

              <div className="flex items-center gap-3">
                {[
                  {
                    name: "LinkedIn",
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/alamin27",
                    color: "hover:bg-sky-600/20",
                  },
                  {
                    name: "GitHub",
                    icon: Github,
                    href: "https://github.com/alamin147",
                    color: "hover:bg-gray-700/20",
                  },
                  {
                    name: "mail",
                    icon: Mail,
                    href: "/#contact",
                    color: "hover:bg-emerald-600/20",
                  },
                ].map((social, index) => (
                  <a
                    href={social.href}
                    target={social.name == "mail" ? "" : "_blank"}
                    key={index}
                  >
                    <div
                      className={`glass-card ${social.color} rounded-full p-4 hover:scale-110 transition-all duration-300 cursor-pointer group `}
                    >
                      <social.icon className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Enhanced Glowing background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              {/* Enhanced Glass frame */}
              <div className="relative glass-card rounded-full p-2 shadow-2xl hover:glass-card-hover transition-all duration-500 glow-animation">
                <img
                  src="/alamin-removebg-preview.png"
                  alt="Al Amin's profile"
                  width={400}
                  height={400}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Enhanced Floating elements */}
              <div className="absolute -top-4 -right-4 glass-card rounded-full p-3 animate-float hover:glass-card-hover transition-all duration-300">
                <span className="text-2xl">💻</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-full p-3 animate-float animation-delay-2000 hover:glass-card-hover transition-all duration-300">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={statsRef as any}
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${
            statsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { number: "20+", label: "Projects Completed" },
            { number: "2.5+", label: "Years Experience" },
            { number: "1000+", label: "Problems Solved" },
            { number: "10+", label: "Technologies" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card hover:glass-card-hover rounded-2xl p-6 text-center transition-all duration-300 group hover:scale-105 relative overflow-hidden"
              style={{ transitionDelay: `${100}ms` }}
            >
              <div className="relative z-10">
                <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm mt-2">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
