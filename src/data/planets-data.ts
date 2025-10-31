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
    id: "cp",
    name: "CP Universe",
    title: "Competitive Programming Sphere",
    description: "Explore my competitive programming journey across platforms like Codeforces, LeetCode, CodeChef, and HackerRank.",
    details: [
      "I actively participate in competitive programming contests on multiple platforms.",
      "Each node represents a platform, skill, or achievement in my CP journey.",
      "From algorithm mastery to problem-solving expertise, see my progression.",
      "The golden rings symbolize achievements and continuous improvement in competitive coding."
    ],
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)",
    size: "75px",
    orbitDuration: "25s",
    facts: [
      { label: "Platforms", value: "Codeforces, LeetCode, CodeChef" },
      { label: "Focus", value: "Algorithms & Data Structures" },
      { label: "Strength", value: "Problem Solving" },
      { label: "Skills", value: "Fast Coding, Optimization" },
      { label: "Contests", value: "Regular Participation" }
    ],
    icon: ""
  },
  {
    id: "projects",
    name: "Projects Universe",
    title: "Interactive Projects Sphere",
    description: "Explore my portfolio of web applications, interactive experiences, and innovative solutions in a 3D universe.",
    details: [
      "Each node represents a project I've built - from full-stack web applications to creative experiments.",
      "Click on any project node to visit the live demo and explore the actual application.",
      "The blue sphere symbolizes the vast universe of possibilities in web development.",
      "Projects span various technologies including React, Node.js, TypeScript, and modern web frameworks."
    ],
    color: "#4272d7",
    gradient: "linear-gradient(135deg, #4272d7 0%, #3a66c9 50%, #325abb 100%)",
    size: "70px",
    orbitDuration: "30s",
    facts: [
      { label: "Total Projects", value: "12+ Live Projects" },
      { label: "Technologies", value: "React, Node.js, Express" },
      { label: "Focus", value: "Full-Stack Development" },
      { label: "Type", value: "Web Applications & APIs" },
      { label: "Features", value: "Interactive & Responsive" }
    ],
    icon: ""
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
