import CreateForm, { type FormField } from "../../components/CreateForm";

const fields: FormField[] = [
  { label: "Title", reg: "title", type: "text" },
  { label: "Image Url", reg: "imgUrl", type: "text" },
  { label: "Short Description", reg: "shortDes", type: "text" },
  { label: "Description", reg: "des", type: "text" },
  { label: "Image Url-1", reg: "imgUrl1", type: "text" },
  { label: "Image Url-2", reg: "imgUrl2", type: "text" },
  { label: "Image Url-3", reg: "imgUrl3", type: "text" },
  { label: "Live link", reg: "live", type: "text" },
  { label: "Github link", reg: "github", type: "text" },
  { label: "Technology used", reg: "tech1", type: "text" },
  { label: "Technology used", reg: "tech2", type: "text" },
  { label: "Technology used", reg: "tech3", type: "text" },
];

const CreateProject = () => (
  <CreateForm
    title="Create project"
    endpoint="project"
    fields={fields}
    submitLabel="Create Project"
    successMessage="Project created"
  />
);

export default CreateProject;
