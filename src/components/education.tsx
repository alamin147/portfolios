import {
  GraduationCap,
  School,
  Medal,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionTitle from "./section-title";

const educationData = [
  {
    period: "2022 - 2025",
    degree: "Bachelor of Science",
    major: "Computer Science and Engineering",
    institution: "Daffodil International University",
    location: "Dhaka, Bangladesh",
    achievements: [],
    icon: <GraduationCap size={32} />,
    color: "from-sky-500/40 to-sky-500/90",
    description:
      "Focused on software engineering and modern web technologies. Active participant in programming competitions and tech communities.",
    highlights: [
      "Web Development",
      "Software Engineering",
      "Database Systems",
      "Data Structures & Algorithms",
    ],
  },
  {
    period: "2018 - 2020",
    degree: "Higher Secondary Certificate",
    major: "Science",
    institution: "Nawabganj City College",
    location: "Chapai Nawabganj, Bangladesh",
    achievements: [],
    icon: <School size={32} />,
    color: "from-sky-500/90 to-sky-500/40",
    description:
      "Strong foundation in mathematics, physics. Developed analytical thinking and problem-solving skills.",
    highlights: ["Mathematics", "Physics", "Chemistry", "Biology"],
  },
];

export default function Education() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 lg:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Clean Header */}
        <div
          ref={headerRef as any}
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            title="Education"
            desc="My academic journey has equipped me with the knowledge and skills needed to excel in the field of computer science."
          />
        </div>

        {/* Education Timeline */}
        <div
          ref={timelineRef as any}
          className={`relative transition-all duration-1000 delay-300 ${
            timelineVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 h-full bg-gradient-to-b from-sky-500 to-emerald-500 rounded-full hidden lg:block"></div>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex-col lg:gap-16 gap-6 sm:gap-8`}
                style={{
                  transitionDelay: timelineVisible ? `${index * 300}ms` : "0ms",
                }}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full glass-card border-2 sm:border-4 border-sky-500/30 items-center justify-center z-10 hidden lg:flex">
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r ${edu.color} flex items-center justify-center`}
                  >
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Education Card */}
                <div className="w-full lg:w-5/12">
                  <div className="group glass-card hover:glass-card-hover rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 relative">
                    {/* Card Header */}
                    <div
                      className={`p-4 sm:p-6 bg-gradient-to-r ${edu.color} bg-opacity-20`}
                    >
                      <div className="flex items-start sm:items-center justify-between mb-4 flex-col sm:flex-row gap-3 sm:gap-0">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${edu.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                        >
                          <div className="text-lg sm:text-xl lg:text-2xl">
                            {edu.icon}
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="glass-button text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
                            {edu.period}
                          </div>
                        </div>
                      </div>

                      <div className="mb-2">
                        <span className="text-gray-300 text-sm sm:text-base lg:text-lg">
                          {edu.degree}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 group-hover:text-sky-200 transition-colors duration-300 line-clamp-2">
                        {edu.major}
                      </h3>

                      <div className="space-y-2">
                        <div className="text-white font-medium text-sm sm:text-base lg:text-lg line-clamp-2">
                          {edu.institution}
                        </div>
                        <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-sky-400 flex-shrink-0" />
                          <span className="line-clamp-1">{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-6">
                      <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm lg:text-base line-clamp-4">
                        {edu.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-white font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-sky-400" />
                          Key Subjects
                        </h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {edu.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="glass-button text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs hover:scale-105 transition-all duration-300"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4">
                          <div className="flex items-center mb-2 sm:mb-3">
                            <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 mr-1 sm:mr-2" />
                            <span className="text-white font-semibold text-sm sm:text-base">
                              Achievements
                            </span>
                          </div>
                          <ul className="space-y-1 sm:space-y-2">
                            {edu.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="text-gray-300 text-xs sm:text-sm flex items-start"
                              >
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-sky-400 to-emerald-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                                <span className="line-clamp-2">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="w-full lg:w-5/12 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
