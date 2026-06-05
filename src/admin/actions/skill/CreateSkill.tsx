import CreateForm, { type FormField } from "../../components/CreateForm";

const fields: FormField[] = [
  { label: "Title", reg: "title", type: "text" },
  { label: "Image Url", reg: "imgUrl", type: "text" },
];

const CreateSkill = () => (
  <CreateForm
    title="Create Skill"
    endpoint="skill"
    fields={fields}
    submitLabel="Create Skill"
    successMessage="Skill created"
  />
);

export default CreateSkill;
