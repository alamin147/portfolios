import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminToastOptions } from "../lib/toast-options";

interface Entity {
  _id: string;
  title?: string;
  imgUrl?: string;
}

interface DeleteTableProps {
  /** Page heading, e.g. "Delete project". */
  title: string;
  /** Server collection path, e.g. "project" / "blog" / "skill". */
  endpoint: string;
  /** Column header for the name cell. */
  nameLabel: string;
  /** Column header for the image cell. */
  imageLabel: string;
}

const DeleteTable = ({ title, endpoint, nameLabel, imageLabel }: DeleteTableProps) => {
  const [items, setItems] = useState<Entity[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => setItems(Array.isArray(result) ? result : []))
      .catch(() => toast.error("Failed to load data", adminToastOptions));
  }, [endpoint]);

  const handleDelete = (id: string) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.acknowledged == true) {
          toast.success("Deleted Successfully", adminToastOptions);
          setItems((prev) => prev.filter((item) => item._id !== id));
        } else {
          toast.error("Fail to Delete", adminToastOptions);
        }
      });
  };

  return (
    <div>
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold rounded-lg">
        {title}
      </h1>

      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {imageLabel}
              </th>
              <th scope="col" className="px-6 py-3">
                {nameLabel}
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img className="w-10 h-10 object-cover" src={item.imgUrl} alt="" />
                </th>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteTable;
