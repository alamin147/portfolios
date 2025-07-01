// import { Button } from "@/components/ui/button";
// import { ExternalLink } from "lucide-react";
// import { useScrollAnimation } from "@/hooks/use-scroll-animation";
// import SectionTitle from "./section-title";
// import { useEffect, useState } from "react";

// export default function Projects() {
//   const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
//   const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

//   const [projects, setProject] = useState<Project[]>();
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_SERVER_URL}/project`, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         setProject(result);
//       });
//   }, []);

//   type Project = {
//     _id: string;
//     title: string;
//     des: string;
//     shortDes: string;
//     tech1: string;
//     tech2: string;
//     tech3: string;
//     live: string;
//     imgUrl: string;
//     imgUrl1: string;
//     imgUrl2: string;
//     imgUrl3: string;
//     github: string;
//   };

//   return (
//     <section id="projects" className="py-20 px-4">
//       <div className="container mx-auto max-w-4/5">
//         <div
//           ref={headerRef as any}
//           className={`text-center mb-20 transition-all duration-1000 ${
//             headerVisible
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-8"
//           }`}
//         >
//           <SectionTitle
//             title="Projects"
//             desc="Explore projects that highlight my skills, passion, and dedication to delivering innovative solutions."
//           />
//         </div>
//         <div
//           ref={projectsRef as any}
//           className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
//             projectsVisible
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-8"
//           }`}
//         >
//           {projects &&
//             projects?.length > 0 &&
//             projects?.map((project: Project) => (
//               <div
//                 key={project._id}
//                 className="group glass-card hover:glass-card-hover rounded-2xl overflow-hidden transition-all 0 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 relative"
//                 style={{
//                   transitionDelay: projectsVisible ? `${100}ms` : "0ms",
//                 }}
//               >
//                 {/* Project Image */}
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={project.imgUrl}
//                     alt={project.title}
//                     width={400}
//                     height={300}
//                     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                   {/* Enhanced Overlay buttons */}
//                   <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <a
//                       href={project.live}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Button
//                         size="sm"
//                         className="cursor-pointer glass-button text-white hover:scale-105 rounded-full transition-all duration-300"
//                       >
//                         <ExternalLink className="h-4 w-4 mr-2" />
//                         Live Demo
//                       </Button>
//                     </a>
//                     <a href={`/projects/${project._id}`}>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="cursor-pointer glass-card text-white hover:text-cyan-100 rounded-full transition-all duration-300"
//                       >
//                         <ExternalLink className="h-4 w-4 mr-2" />
//                         Details
//                       </Button>
//                     </a>
//                   </div>
//                 </div>

//                 {/* Project Content */}
//                 <div className="p-6 relative z-10">
//                   <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300">
//                     {project.title}
//                   </h3>
//                   <p className="text-gray-300 text-sm mb-4 leading-relaxed">
//                     {project.shortDes}
//                   </p>

//                   <div className="flex flex-wrap gap-2">
//                     {/* {project.technologies.map((tech, techIndex) => ( */}

//                     {project.tech1 && (
//                       <span className="px-3 py-1 text-xs glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300">
//                         {project.tech1}
//                       </span>
//                     )}
//                     {project.tech2 && (
//                       <span className="px-3 py-1 text-xs glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300">
//                         {project.tech2}
//                       </span>
//                     )}
//                     {project.tech3 && (
//                       <span className="px-3 py-1 text-xs glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300">
//                         {project.tech3}
//                       </span>
//                     )}
//                     {/* ))} */}
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//       <div className="text-center mt-12">
//         <a href="/projects">
//           <Button
//             className="cursor-pointer  gap-2 px-8 py-6 rounded-full text-white text-lg font-semibold
//                 bg-cyan-500/20 border border-white/10 backdrop-blur-xl
//                     shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-300
//                      hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105"
//           >
//             View All Projects
//           </Button>
//         </a>
//       </div>
//     </section>
//   );
// }
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionTitle from "./section-title";
import { useEffect, useState } from "react";

export default function Projects() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

  const [projects, setProject] = useState<Project[]>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/project`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProject(result);
      });
  }, []);

  type Project = {
    _id: string;
    title: string;
    des: string;
    shortDes: string;
    tech1: string;
    tech2: string;
    tech3: string;
    live: string;
    imgUrl: string;
    imgUrl1: string;
    imgUrl2: string;
    imgUrl3: string;
    github: string;
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-4/5">
        <div
          ref={headerRef as any}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            title="Projects"
            desc="Explore projects that highlight my skills, passion, and dedication to delivering innovative solutions."
          />
        </div>
        <div
          ref={projectsRef as any}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            projectsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {projects &&
            projects.length > 0 &&
            projects.map((project: Project) => (
              <div
                key={project._id}
                className="group glass-card hover:glass-card-hover rounded-2xl overflow-hidden transition-all 0 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 relative"
                style={{
                  transitionDelay: projectsVisible ? `${100}ms` : "0ms",
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.imgUrl}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="cursor-pointer glass-button text-white hover:scale-105 rounded-full transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    </a>
                    <a href={`/projects/${project._id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer glass-card text-white hover:text-cyan-100 rounded-full transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {project.shortDes}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech1 && (
                      <span className="px-3 py-1 text-xs glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300">
                        {project.tech1}
                      </span>
                    )}
                    {project.tech2 && (
                      <span className="px-3 py-1 text-xs glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300">
                        {project.tech2}
                      </span>
                    )}
                    {project.tech3 && (
                      <span className="px-3 py-1 text-xs glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300">
                        {project.tech3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="text-center mt-12">
        <a href="/projects">
          <Button
            className="cursor-pointer gap-2 px-8 py-6 rounded-full text-white text-lg font-semibold bg-cyan-500/20 border border-white/10 backdrop-blur-xl shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-300 hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105"
          >
            View All Projects
          </Button>
        </a>
      </div>
    </section>
  );
}
