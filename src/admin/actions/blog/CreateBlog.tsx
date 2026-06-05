import CreateForm, { type FormField } from "../../components/CreateForm";

const fields: FormField[] = [
  { label: "Title", reg: "title", type: "text" },
  { label: "Category", reg: "category", type: "text" },
  { label: "Image Url", reg: "imgUrl", type: "text" },
  { label: "Description", reg: "des", type: "text" },
  { label: "Short Description", reg: "shortDes", type: "text" },
];

const CreateBlog = () => (
  <CreateForm
    title="Create blog"
    endpoint="blog"
    fields={fields}
    submitLabel="Create Blog"
    successMessage="Blog created"
    transform={(data) => ({ ...data, time: new Date() })}
  />
);

export default CreateBlog;
