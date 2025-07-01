import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";


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
  console.log(id);
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

      <div className="bg-slate-950 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col">
            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container grid gap-8 lg:grid-cols-2 lg:gap-16">
                <img
                  src={project?.imgUrl}
                  width={1200}
                  height={600}
                  alt="Project Hero"
                  className="aspect-[2/1] rounded-lg object-cover"
                />
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl  bg-gradient-to-r from-indigo-800 to-indigo-700 inline-block text-transparent bg-clip-text">
                    {project?.title}
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    {project?.shortDes}
                  </p>
                  <div className="cursor-pointer hover:text-indigo-600">
                    <Button className="me-2 bg-gradient-to-r from-indigo-950 to-indigo-800 border-0 py-1 px-3 font-bold hover:bg-gradient-to-r hover:from-indigo-800 hover:to-indigo-950 transition duration-200 ease-in-out rounded-full ">
                      <IoIosLink className="mt-0.5 me-1" />
                      <a href={project?.live} target="_blank">
                        {" "}
                        Live Preview
                      </a>
                    </Button>
                  </div>
                  <div className="ms-3 cursor-pointer hover:text-indigo-600 flex items-center gap-2">
                    <FaGithub />
                    <a href={project?.github} target="_blank">
                      Github link
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="custom-gradient  w-full py-12 md:py-24 lg:py-32 bg-muted rounded-lg">
              <div className="container grid gap-8 lg:grid-cols-2 lg:gap-16 ms-5">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                    Project Details
                  </h2>
                  <p className="text-muted-foreground md:text-lg">
                    {project?.des}
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                    Technologies Used
                  </h2>
                  <ul className="grid grid-cols-2 gap-2 text-muted-foreground md:grid-cols-3">
                    <li>{project?.tech1}</li>
                    <li>{project?.tech2}</li>
                    <li>{project?.tech3}</li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container grid gap-8 lg:grid-cols-3 lg:gap-12">
                {project?.imgUrl1 ? (
                  <img
                    src={project?.imgUrl1}
                    width={400}
                    height={300}
                    alt="Project Image 1"
                    className="aspect-[4/3] rounded-lg object-cover"
                  />
                ) : (
                  <></>
                )}
                {project?.imgUrl2 ? (
                  <img
                    src={project?.imgUrl2}
                    width={400}
                    height={300}
                    alt="Project Image 1"
                    className="aspect-[4/3] rounded-lg object-cover"
                  />
                ) : (
                  <></>
                )}
                {project?.imgUrl3 ? (
                  <img
                    src={project?.imgUrl3}
                    width={400}
                    height={300}
                    alt="Project Image 1"
                    className="aspect-[4/3] rounded-lg object-cover"
                  />
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
