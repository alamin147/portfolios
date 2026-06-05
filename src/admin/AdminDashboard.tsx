import { Link } from "react-router-dom";
import { adminPath } from "./config";

const cards = [
  { to: adminPath("home/create-project"), label: "Create Project" },
  { to: adminPath("home/delete-project"), label: "Delete Project" },
  { to: adminPath("home/create-blog"), label: "Create Blog" },
  { to: adminPath("home/markdown-blog"), label: "Markdown Editor" },
  { to: adminPath("home/delete-blog"), label: "Delete Blog" },
  { to: adminPath("home/create-skill"), label: "Create Skill" },
  { to: adminPath("home/delete-skill"), label: "Delete Skill" },
  { to: adminPath("home/create-cp"), label: "Create CP Profile" },
  { to: adminPath("home/manage-cp"), label: "Manage CP Profiles" },
];

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold rounded-lg">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium text-center"
          >
            {card.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
