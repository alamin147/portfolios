import { Navigate, Route, Routes } from "react-router-dom";

import { ADMIN_BASE } from "./config";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import PrivateRoute from "./PrivateRoute";

import CreateProject from "./actions/project/CreateProject";
import DeleteProject from "./actions/project/DeleteProject";
import CreateBlog from "./actions/blog/CreateBlog";
import MarkdownEditor from "./actions/blog/MarkdownEditor";
import DeleteBlog from "./actions/blog/DeleteBlog";
import CreateSkill from "./actions/skill/CreateSkill";
import DeleteSkill from "./actions/skill/DeleteSkill";
import CreateCP from "./actions/cpProfile/CreateCP";
import ListCP from "./actions/cpProfile/ListCP";
import UpdateCP from "./actions/cpProfile/UpdateCP";

/**
 * Self-contained admin section. Mounted under `${ADMIN_BASE}/*` from the main
 * App, so every path below is relative to the admin base path (see config.ts).
 */
const AdminApp = () => {
  return (
    <Routes>
      <Route index element={<AdminLogin />} />
      <Route
        path="home"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="create-project" element={<CreateProject />} />
        <Route path="delete-project" element={<DeleteProject />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="markdown-blog" element={<MarkdownEditor />} />
        <Route path="delete-blog" element={<DeleteBlog />} />
        <Route path="create-skill" element={<CreateSkill />} />
        <Route path="delete-skill" element={<DeleteSkill />} />
        <Route path="create-cp" element={<CreateCP />} />
        <Route path="manage-cp" element={<ListCP />} />
        <Route path="update-cp/:id" element={<UpdateCP />} />
      </Route>
      <Route path="*" element={<Navigate to={ADMIN_BASE} replace />} />
    </Routes>
  );
};

export default AdminApp;
