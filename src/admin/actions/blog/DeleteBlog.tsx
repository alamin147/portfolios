import DeleteTable from "../../components/DeleteTable";

const DeleteBlog = () => (
  <DeleteTable
    title="Delete blog"
    endpoint="blog"
    nameLabel="Blog Name"
    imageLabel="Blog Image"
  />
);

export default DeleteBlog;
