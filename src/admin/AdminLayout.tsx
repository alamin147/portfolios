import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ADMIN_BASE, adminPath } from "./config";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center p-2 text-base font-medium rounded-lg transition duration-75 group ${
    isActive
      ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
      : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
  }`;

const navItems = [
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

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((open) => !open);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(ADMIN_BASE);
  };

  return (
    <div className="min-h-screen antialiased bg-gray-50 dark:bg-gray-900">
      {/* start of sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
          <div className="md:hidden mb-4 flex justify-end">
            <button
              type="button"
              className="p-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <ul className="space-y-2" onClick={closeSidebar}>
            <li>
              <NavLink to={adminPath("home")} end className={navLinkClass}>
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
          </ul>

          <ul
            className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
            onClick={closeSidebar}
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass}>
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">← Back to Site</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center p-2 text-base font-medium text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      {/* end of sidebar */}

      <main className="p-4 md:ml-64 h-auto pt-10">
        <button
          className="md:hidden p-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div className="mt-16 container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
