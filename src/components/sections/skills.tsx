import {
  SiTypescript,
  SiJavascript,
  SiExpress,
  SiNodedotjs,
  SiReact,
  SiMongodb,
  SiMongoose,
  SiPostgresql,
  SiTailwindcss,
  SiRedux,
  SiCplusplus,
//   SiC,
  SiHtml5,
  SiCss,
  SiPrisma,
  SiPython,
  SiPytorch,
} from "react-icons/si";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SectionTitle } from "@/components/shared";

export default function Skills() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();

  const skills = [
    {
      icon: <SiTypescript />,
      name: "TypeScript",
      color: "hover:text-blue-400",
      shadowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      icon: <SiJavascript />,
      name: "JavaScript",
      color: "hover:text-yellow-400",
      shadowColor: "rgba(251, 191, 36, 0.4)",
    },
    {
      icon: <SiExpress />,
      name: "Express Js",
      color: "hover:text-gray-300",
      shadowColor: "rgba(156, 163, 175, 0.4)",
    },
    {
      icon: <SiNodedotjs />,
      name: "Node Js",
      color: "hover:text-green-400",
      shadowColor: "rgba(34, 197, 94, 0.4)",
    },
    {
      icon: <SiReact />,
      name: "React Js",
      color: "hover:text-cyan-400",
      shadowColor: "rgba(34, 211, 238, 0.4)",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
      color: "hover:text-green-500",
      shadowColor: "rgba(34, 197, 94, 0.4)",
    },
    {
      icon: <SiMongoose />,
      name: "Mongoose",
      color: "hover:text-red-400",
      shadowColor: "rgba(248, 113, 113, 0.4)",
    },
    {
      icon: <SiPostgresql />,
      name: "PostgreSQL",
      color: "hover:text-blue-500",
      shadowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
      color: "hover:text-cyan-400",
      shadowColor: "rgba(34, 211, 238, 0.4)",
    },
    {
      icon: <SiRedux />,
      name: "Redux Toolkit",
      color: "hover:text-purple-400",
      shadowColor: "rgba(168, 85, 247, 0.4)",
    },
    {
      icon: <SiCplusplus />,
      name: "C++",
      color: "hover:text-blue-600",
      shadowColor: "rgba(37, 99, 235, 0.4)",
    },
    // {
    //   icon: <SiC />,
    //   name: "C",
    //   color: "hover:text-blue-700",
    //   shadowColor: "rgba(29, 78, 216, 0.4)",
    // },
    {
      icon: <SiHtml5 />,
      name: "HTML",
      color: "hover:text-orange-500",
      shadowColor: "rgba(249, 115, 22, 0.4)",
    },
    {
      icon: <SiCss />,
      name: "CSS",
      color: "hover:text-blue-400",
      shadowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      icon: <SiPrisma />,
      name: "Prisma",
      color: "hover:text-white",
      shadowColor: "rgba(255, 255, 255, 0.4)",
    },
    {
      icon: <SiPython />,
      name: "Python",
      color: "hover:text-blue-500",
      shadowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      icon: <SiPytorch />,
      name: "PyTorch",
      color: "hover:text-orange-500",
      shadowColor: "rgba(249, 115, 22, 0.4)",
    },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 lg:px-6">
      <div className="container mx-auto max-w-7xl">
        <div
          ref={headerRef as any}
          className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            title="Skills"
            desc="Tools, technologies, and languages I've mastered and currently work with."
          />
        </div>

        <div
          ref={skillsRef as any}
          className={`grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-6 transition-all duration-1000 delay-100 ${
            skillsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`group glass-card hover:glass-card-hover rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center transition-all duration-300 hover:scale-110 flex flex-col justify-center items-center min-h-[100px] xs:min-h-[120px] sm:min-h-[140px] ${skill.color} relative`}
              style={{
                transitionDelay: skillsVisible ? `${50}ms` : "0ms",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${skill.shadowColor}, 0 0 40px ${skill.shadowColor}, 0 0 60px ${skill.shadowColor.replace("0.4)", "0.3)")}, inset 0 0 30px ${skill.shadowColor.replace("0.4)", "0.15)")}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
              }}
            >
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="relative mb-2 sm:mb-3 md:mb-4">
                  <div
                    className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-2xl -z-10 group-hover:blur-3xl"
                    style={{
                      backgroundColor: skill.shadowColor.replace("0.4)", "0.7)"),
                    }}
                  />
                  <div
                    className="absolute -inset-6 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-300 blur-3xl -z-10"
                    style={{
                      backgroundColor: skill.shadowColor.replace("0.4)", "0.5)"),
                    }}
                  />
                  <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-slate-800 dark:text-white transition-all duration-300 group-hover:scale-110 flex items-center justify-center drop-shadow-lg group-hover:drop-shadow-2xl">
                    {skill.icon}
                  </div>
                </div>
                <p className="text-xs xs:text-sm sm:text-base text-slate-700 dark:text-gray-100 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-all duration-300 text-center leading-tight group-hover:font-bold">
                  {skill.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
