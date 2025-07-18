import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, Layers } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionTitle from "@/components/section-title";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
  _id: string;
  title: string;
  des: string;
  shortDes: string;
  live: string;
  imgUrl: string;
  imgUrl1: string;
  imgUrl2: string;
  imgUrl3: string;
  github: string;
  tech: string[];
    no: number;
};

export default function ProjectsPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Fetch projects from API
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_SERVER_URL}/project`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // Sort projects by 'no' field in ascending order
        const sortedProjects = result.sort((a: Project, b: Project) => a.no - b.no);
        setProjects(sortedProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4/5 relative z-10">
        {/* Back button */}
        <Link to="/#projects">
          <Button
            variant="ghost"
            className=" mb-7 glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        {/* Header */}
        <div
          ref={headerRef as any}
          className={`mb-12 transition-all duration-1000 text-center ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            title="Project Gallery"
            desc="Explore my complete portfolio of projects spanning web development, mobile applications, and interactive experiences."
          />
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsRef as any}
          className={`transition-all duration-1000 delay-200 ${
            projectsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="group glass-card rounded-2xl overflow-hidden"
                  style={{
                    transitionDelay: projectsVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  {/* Skeleton Image */}
                  <div className="relative overflow-hidden">
                    <Skeleton className="w-full h-48" />
                  </div>

                  {/* Skeleton Content */}
                  <div className="p-6 relative z-10">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />

                    {/* Skeleton Technologies */}
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !projects || projects.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl text-center">
              <div className="text-4xl mb-4 text-gray-400 flex justify-center">
                <Layers className="h-16 w-16 opacity-50" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-400">
                Projects will appear here once loaded.
              </p>
            </div>
          ) : (
            <>
              {/* Project Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => (
                  <div
                    key={project._id || index}
                    className="group glass-card hover:glass-card-hover rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20"
                    style={{
                      transitionDelay: projectsVisible
                        ? `${index * 100}ms`
                        : "0ms",
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          project.imgUrl ||
                          project.imgUrl1 ||
                          "/placeholder.svg"
                        }
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Overlay buttons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
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
                            Live URL
                          </Button>
                        </a>
                        <a
                          href={`/projects/${project._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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

                    {/* Project Content */}
                    <div className="p-6 relative z-10">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {project.shortDes}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((technology, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="glass-card rounded-full p-1 flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="rounded-full text-gray-300 hover:text-white disabled:opacity-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className={`rounded-full min-w-[2.5rem] ${
                          currentPage === i + 1
                            ? "glass-button text-white"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {i + 1}
                      </Button>
                    ))}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="rounded-full text-gray-300 hover:text-white disabled:opacity-50"
                    >
                      <ArrowLeft className="h-4 w-4 transform rotate-180" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
