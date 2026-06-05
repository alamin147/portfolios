import DeleteTable from "../../components/DeleteTable";

const DeleteProject = () => (
  <DeleteTable
    title="Delete project"
    endpoint="project"
    nameLabel="Project Name"
    imageLabel="Project Image"
  />
);

export default DeleteProject;
