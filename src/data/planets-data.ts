export interface Planet {
  id: string;
  name: string;
  title: string;
  description: string;
  details: string[];
  color: string;
  gradient: string;
  size: string;
  orbitDuration: string;
  facts: {
    label: string;
    value: string;
  }[];
  icon: string;
}

export const planetsData: Planet[] = [
  {
    id: "profile",
    name: "About Me",
    title: "Interactive Profile Sphere",
    description: "Discover who I am through an interactive 3D visualization showcasing my skills, passions, and journey as a developer.",
    details: [
      "I'm Al Amin, a Computer Science and Engineering student passionate about fullstack development.",
      "I love coding, building innovative solutions, and exploring new technologies.",
      "With experience in programming competitions and team collaboration, I thrive in diverse environments.",
      "I specialize in backend architecture, full-stack applications, and turning ideas into clean, working code."
    ],
    color: "#06d6a0",
    gradient: "linear-gradient(135deg, #06d6a0 0%, #10b981 50%, #059669 100%)",
    size: "80px",
    orbitDuration: "20s",
    facts: [
      { label: "Role", value: "Fullstack Developer" },
      { label: "Education", value: "CSE Student" },
      { label: "Passion", value: "Coding & Building" },
      { label: "Experience", value: "CP & Team Projects" },
      { label: "Focus", value: "Backend Architecture" }
    ],
    icon: ""
  },
  {
    id: "saturn",
    name: "Saturn",
    title: "The Ringed Beauty",
    description: "Famous for its spectacular ring system, Saturn is the second-largest planet in our solar system.",
    details: [
      "Saturn is the sixth planet from the Sun and the second-largest in the Solar System.",
      "It is a gas giant with an average radius about nine times that of Earth.",
      "Saturn is named after the Roman god of wealth and agriculture.",
      "Its rings are made of ice and rock, extending up to 282,000 km from the planet."
    ],
    color: "#f4d47c",
    gradient: "linear-gradient(135deg, #f4d47c 0%, #e8c870 50%, #dbb864 100%)",
    size: "75px",
    orbitDuration: "25s",
    facts: [
      { label: "Diameter", value: "116,460 km" },
      { label: "Mass", value: "5.683 × 10²⁶ kg" },
      { label: "Moons", value: "146 confirmed" },
      { label: "Orbit Period", value: "29.46 years" },
      { label: "Day Length", value: "10.66 hours" }
    ],
    icon: "💫"
  },
  {
    id: "neptune",
    name: "Neptune",
    title: "The Ice Giant",
    description: "The windiest planet in our solar system, Neptune is known for its deep blue color and extreme weather.",
    details: [
      "Neptune is the eighth and farthest known planet from the Sun in the Solar System.",
      "It is the fourth-largest planet by diameter and the third-most-massive.",
      "Neptune is 17 times the mass of Earth and slightly more massive than Uranus.",
      "The planet's atmosphere is composed primarily of hydrogen and helium with traces of methane."
    ],
    color: "#4272d7",
    gradient: "linear-gradient(135deg, #4272d7 0%, #3a66c9 50%, #325abb 100%)",
    size: "70px",
    orbitDuration: "30s",
    facts: [
      { label: "Diameter", value: "49,244 km" },
      { label: "Mass", value: "1.024 × 10²⁶ kg" },
      { label: "Moons", value: "16 confirmed" },
      { label: "Orbit Period", value: "164.79 years" },
      { label: "Day Length", value: "16.11 hours" }
    ],
    icon: "🌀"
  },
  {
    id: "skills",
    name: "Skills Planet",
    title: "Interactive Technology Sphere",
    description: "Explore my technical skills in an interactive 3D universe where each node represents a technology I've mastered.",
    details: [
      "This Skills Planet showcases all the technologies and programming languages I work with.",
      "Each skill is represented as a glowing node connected in a spherical network.",
      "The visualization represents the interconnected nature of modern web development.",
      "Drag, rotate, and zoom to explore different skills and see how they relate to each other."
    ],
    color: "#00d4ff",
    gradient: "linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #006699 100%)",
    size: "65px",
    orbitDuration: "18s",
    facts: [
      { label: "Languages", value: "5+ Programming Languages" },
      { label: "Frameworks", value: "React, Express, Node.js" },
      { label: "Databases", value: "MongoDB, PostgreSQL" },
      { label: "Styling", value: "Tailwind CSS, CSS3" },
      { label: "Tools", value: "Redux, Prisma, Mongoose" }
    ],
    icon: ""
  }
];
