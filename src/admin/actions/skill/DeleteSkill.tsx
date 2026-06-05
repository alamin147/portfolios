import DeleteTable from "../../components/DeleteTable";

const DeleteSkill = () => (
  <DeleteTable
    title="Delete skill"
    endpoint="skill"
    nameLabel="Skill Name"
    imageLabel="Skill Image"
  />
);

export default DeleteSkill;
