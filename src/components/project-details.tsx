import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowUp } from "lucide-react";

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
  tech1: string;
  tech2: string;
  tech3: string;
};
const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<InputFields>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/project/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setProject(result);
      });
  }, [id]);
  return (
    <>
      <div className="bg-gradient-to-br from-slate-950 via-cyan-950/30 to-slate-900 text-white min-h-screen backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="flex gap-3 mb-5">
                    <Link to="/#projects">
                  <Button
                    variant="ghost"
                    className="mb-7 glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button
                    variant="ghost"
                    className=" mb-5 md:mb-0 glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300"
                  >
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Go to Projects
                  </Button>
                </Link>
                </div>
              <div className="container grid gap-8 lg:grid-cols-2 lg:gap-16">

                <div className="mt-7 md:mt-0 overflow-hidden rounded-xl shadow-lg shadow-cyan-800/20 border border-cyan-500/10 backdrop-blur-sm">
                  <img
                    src={project?.imgUrl}
                    width={1200}
                    height={600}
                    alt="Project Hero"
                    className="aspect-[2/1] w-full rounded-lg object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-400 to-teal-300 inline-block text-transparent bg-clip-text">
                    {project?.title}
                  </h1>
                  <p className="text-cyan-100/90 md:text-xl leading-relaxed">
                    {project?.shortDes}
                  </p>
                  <div className="flex space-x-4">
                    <Button className="bg-gradient-to-r from-cyan-700 to-teal-600 border border-cyan-400/20 py-1 px-5 font-bold hover:bg-gradient-to-r hover:from-cyan-600 hover:to-teal-500 transition duration-200 ease-in-out rounded-full shadow-lg shadow-cyan-700/20">
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
                      className="border-cyan-400/40 text-cyan-300 hover:bg-cyan-900/30 hover:text-cyan-200 backdrop-blur-sm transition duration-200 ease-in-out rounded-full shadow-lg shadow-cyan-700/10"
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
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-cyan-900/30 to-slate-900/40 backdrop-blur-md rounded-lg border border-cyan-500/10 shadow-lg shadow-cyan-700/10">
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
                    {project?.tech1 && (
                      <span className="px-4 py-2 bg-cyan-900/40 text-cyan-200 border border-cyan-400/20 backdrop-blur-md rounded-full text-sm font-medium shadow-sm">
                        {project.tech1}
                      </span>
                    )}
                    {project?.tech2 && (
                      <span className="px-4 py-2 bg-cyan-900/40 text-cyan-200 border border-cyan-400/20 backdrop-blur-md rounded-full text-sm font-medium shadow-sm">
                        {project.tech2}
                      </span>
                    )}
                    {project?.tech3 && (
                      <span className="px-4 py-2 bg-cyan-900/40 text-cyan-200 border border-cyan-400/20 backdrop-blur-md rounded-full text-sm font-medium shadow-sm">
                        {project.tech3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl bg-gradient-to-r from-cyan-400 to-teal-300 inline-block text-transparent bg-clip-text mb-8 container">
                Project Screenshots
              </h2>
              <div className="container grid gap-8 lg:grid-cols-3 lg:gap-12">
                {project?.imgUrl1 ? (
                  <div className="group overflow-hidden rounded-xl shadow-lg shadow-cyan-800/20 border border-cyan-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-700/30 backdrop-blur-sm">
                    <img
                      src={project?.imgUrl1}
                      width={300}
                      height={300}
                      alt="Project Image 1"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <></>
                )}
                {project?.imgUrl2 ? (
                  <div className="group overflow-hidden rounded-xl shadow-lg shadow-cyan-800/20 border border-cyan-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-700/30 backdrop-blur-sm">
                    <img
                      src={project?.imgUrl2}
                      width={400}
                      height={300}
                      alt="Project Image 2"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <></>
                )}
                {project?.imgUrl3 ? (
                  <div className="group overflow-hidden rounded-xl shadow-lg shadow-cyan-800/20 border border-cyan-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-700/30 backdrop-blur-sm">
                    <img
                      src={project?.imgUrl3}
                      width={400}
                      height={300}
                      alt="Project Image 3"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectDetails;
