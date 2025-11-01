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
  },
  {
    id: "blog",
    name: "Blog Planet",
    title: "Knowledge Sharing Sphere",
    description: "Dive into my thoughts, tutorials, and technical writings about web development and programming.",
    details: [
      "I write about my experiences, learnings, and insights in software development.",
      "Topics range from technical tutorials to career advice and best practices.",
      "Each article is crafted to help developers learn and grow in their journey.",
      "Sharing knowledge is one of the best ways to solidify understanding and give back to the community."
    ],
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #7e22ce 100%)",
    size: "68px",
    orbitDuration: "22s",
    facts: [
      { label: "Topics", value: "Web Dev, Programming, Career" },
      { label: "Style", value: "Tutorials & Insights" },
      { label: "Focus", value: "Practical Learning" },
      { label: "Audience", value: "Developers & Students" },
      { label: "Goal", value: "Share Knowledge" }
    ],
    icon: ""
  },
  {
    id: "education",
    name: "Education Planet",
    title: "Academic Journey Sphere",
    description: "Explore my educational background, certifications, and continuous learning path in computer science.",
    details: [
      "Currently pursuing Computer Science and Engineering with a focus on software development.",
      "Continuously learning new technologies through online courses and hands-on projects.",
      "Earned certifications in various programming languages and frameworks.",
      "Education is not just formal - it's a lifelong journey of curiosity and growth."
    ],
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
    size: "72px",
    orbitDuration: "28s",
    facts: [
      { label: "Degree", value: "Computer Science & Engineering" },
      { label: "Focus", value: "Software Development" },
      { label: "Learning", value: "Continuous & Practical" },
      { label: "Certifications", value: "Multiple Platforms" },
      { label: "Approach", value: "Hands-on Projects" }
    ],
    icon: ""
  },
  {
    id: "contact",
    name: "Contact Planet",
    title: "Connection Hub Sphere",
    description: "Let's connect! Reach out for collaborations, opportunities, or just to say hello.",
    details: [
      "I'm always open to interesting conversations and new opportunities.",
      "Whether it's a project collaboration, job opportunity, or tech discussion - feel free to reach out.",
      "Available on multiple platforms including email, LinkedIn, and GitHub.",
      "Building connections and collaborating with fellow developers is what makes this journey exciting."
    ],
    color: "#14b8a6",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
    size: "66px",
    orbitDuration: "24s",
    facts: [
      { label: "Email", value: "Open for Inquiries" },
      { label: "LinkedIn", value: "Professional Network" },
      { label: "GitHub", value: "Code Collaboration" },
      { label: "Response", value: "Within 24 Hours" },
      { label: "Open To", value: "Opportunities & Projects" }
    ],
    icon: ""
  },
  {
    id: "social",
    name: "Social Planet",
    title: "Community & Network Sphere",
    description: "Connect with me across various social platforms and be part of my developer community.",
    details: [
      "Active on multiple social platforms sharing development tips and updates.",
      "Join my community to stay updated with my latest projects and content.",
      "Follow along for coding insights, project showcases, and tech discussions.",
      "Let's build and learn together as part of the global developer community."
    ],
    color: "#f97316",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
    size: "64px",
    orbitDuration: "26s",
    facts: [
      { label: "Twitter", value: "Tech Updates & Thoughts" },
      { label: "GitHub", value: "Open Source Projects" },
      { label: "LinkedIn", value: "Professional Updates" },
      { label: "Discord", value: "Community Discussions" },
      { label: "Activity", value: "Regular Engagement" }
    ],
    icon: ""
  }
];
