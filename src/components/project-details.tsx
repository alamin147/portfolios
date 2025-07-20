import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowUp, X, Search } from "lucide-react";

export type InputFields = {
  _id: string;
  title: string;
  imgUrl: string;
  shortDes: string;
  des: string;
  imgUrl1: string;
  imgUrl2: string;
  imgUrl3: string;
  live: string;
  github: string;
  tech: string[];
  no: number;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<InputFields>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/project/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProject(result);
      });
  }, [id]);

  const openImagePreview = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="min-h-screen bg-background text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            <section className="w-full py-12 md:py-24 lg:py-32 animate-fade-in">
              <div className="flex gap-3 mb-5">
                <Link to="/#projects">
                  <Button
                    variant="ghost"
                    className="mb-7 glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button
                    variant="ghost"
                    className=" mb-5 md:mb-0 glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Go to Projects
                  </Button>
                </Link>
              </div>
              <div className="container grid gap-8 lg:grid-cols-2 lg:gap-16">
                <div
                  className="mt-7 md:mt-0 overflow-hidden rounded-xl shadow-lg shadow-cyan-800/20 border border-cyan-500/10 backdrop-blur-sm animate-slide-in-left group relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-700/30 hover:border-cyan-400/30"
                  style={{ animationDelay: "200ms" }}
                  onClick={() =>
                    project?.imgUrl && openImagePreview(project.imgUrl)
                  }
                >
                  <img
                    src={project?.imgUrl}
                    width={1200}
                    height={600}
                    alt="Project Hero"
                    className="aspect-[2/1] w-full rounded-lg object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="space-y-4 animate-slide-in-right">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-400 to-teal-300 inline-block text-transparent bg-clip-text animate-pulse-glow">
                    {project?.title}
                  </h1>
                  <p className="text-gray-300 md:text-xl leading-relaxed opacity-0 animate-fade-in-up">
                    {project?.shortDes}
                  </p>
                  <div className="flex space-x-4 opacity-0 animate-fade-in-up-delay">
                    <Button className="cursor-pointer glass-button text-white hover:scale-105 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
                      <a
                        href={project?.live}
                        target="_blank"
                        className="flex items-center"
                      >
                        <IoIosLink className="mr-1.5" />
                        Live URL
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="cursor-pointer glass-card text-white hover:text-cyan-100 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                      <a
                        href={project?.github}
                        target="_blank"
                        className="flex items-center"
                      >
                        <FaGithub className="mr-1.5" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            <section className="px-10 w-full py-12 md:py-24 lg:py-32 glass-card rounded-2xl animate-fade-in-up">
              <div className="container grid gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6 px-4">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl bg-gradient-to-r from-cyan-400 to-teal-300 inline-block text-transparent bg-clip-text">
                    Project Details
                  </h2>
                  <p className="text-gray-300 md:text-lg leading-relaxed">
                    {project?.des}
                  </p>
                </div>
                <div className="space-y-6 px-4">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl bg-gradient-to-r from-cyan-400 to-teal-300 inline-block text-transparent bg-clip-text">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project?.tech?.map((technology, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-medium glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300 animate-fade-in-scale border border-cyan-500/20 hover:border-cyan-400/40"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl bg-gradient-to-r from-cyan-400 to-teal-300 inline-block text-transparent bg-clip-text mb-8 container animate-fade-in">
                Project Screenshots
              </h2>
              <div className="container grid gap-8 lg:grid-cols-3 lg:gap-12">
                {project?.imgUrl1 ? (
                  <div
                    className="group overflow-hidden rounded-xl shadow-lg shadow-cyan-800/20 border border-cyan-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-700/30 backdrop-blur-sm animate-fade-in-scale cursor-pointer hover:border-cyan-400/30 relative"
                    style={{ animationDelay: "200ms" }}
                    onClick={() => openImagePreview(project.imgUrl1)}
                  >
                    <img
                      src={project?.imgUrl1}
                      width={300}
                      height={300}
                      alt="Project Image 1"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {project?.imgUrl2 ? (
                  <div
                    className="group overflow-hidden rounded-xl shadow-lg shadow-cyan-800/20 border border-cyan-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-700/30 backdrop-blur-sm animate-fade-in-scale cursor-pointer hover:border-cyan-400/30 relative"
                    style={{ animationDelay: "400ms" }}
                    onClick={() => openImagePreview(project.imgUrl2)}
                  >
                    <img
                      src={project?.imgUrl2}
                      width={400}
                      height={300}
                      alt="Project Image 2"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {project?.imgUrl3 ? (
                  <div
                    className="group overflow-hidden rounded-xl shadow-lg shadow-cyan-800/20 border border-cyan-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-700/30 backdrop-blur-sm animate-fade-in-scale cursor-pointer hover:border-cyan-400/30 relative"
                    style={{ animationDelay: "600ms" }}
                    onClick={() => openImagePreview(project.imgUrl3)}
                  >
                    <img
                      src={project?.imgUrl3}
                      width={400}
                      height={300}
                      alt="Project Image 3"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImagePreview}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 glass-card text-white hover:text-red-400 rounded-full transition-all duration-300"
              onClick={closeImagePreview}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.3s forwards;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 0.8s ease-out 0.6s forwards;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </>
  );
};
export default ProjectDetails;
