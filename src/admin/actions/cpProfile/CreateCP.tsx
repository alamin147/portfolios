import CreateForm, { type FormField } from "../../components/CreateForm";

const fields: FormField[] = [
  { label: "Platform", reg: "platform", type: "text" },
  { label: "Username", reg: "username", type: "text" },
  { label: "Rating", reg: "rating", type: "text" },
  { label: "Solved", reg: "solved", type: "text" },
  { label: "HighestRating", reg: "highestRating", type: "text" },
  { label: "Rank", reg: "rank", type: "text" },
  { label: "Logo Url", reg: "logo", type: "text" },
  { label: "Link", reg: "link", type: "text" },
];

const CreateCP = () => (
  <CreateForm
    title="Create CP Profile"
    endpoint="cpProfile"
    fields={fields}
    submitLabel="Create CP Profile"
    successMessage="CP profile created"
  />
);

export default CreateCP;
