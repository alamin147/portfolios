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
    id: "jupiter",
    name: "Jupiter",
    title: "The Gas Giant",
    description: "The largest planet in our solar system, known for its Great Red Spot and massive size.",
    details: [
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System.",
      "It is a gas giant with a mass more than two and a half times that of all the other planets combined.",
      "Jupiter is primarily composed of hydrogen with a quarter of its mass being helium.",
      "The Great Red Spot is a persistent anticyclonic storm, 22° south of Jupiter's equator."
    ],
    color: "#d4a574",
    gradient: "linear-gradient(135deg, #d4a574 0%, #c89968 50%, #b8865c 100%)",
    size: "80px",
    orbitDuration: "20s",
    facts: [
      { label: "Diameter", value: "139,820 km" },
      { label: "Mass", value: "1.898 × 10²⁷ kg" },
      { label: "Moons", value: "95 confirmed" },
      { label: "Orbit Period", value: "11.86 years" },
      { label: "Day Length", value: "9.93 hours" }
    ],
    icon: "🪐"
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
