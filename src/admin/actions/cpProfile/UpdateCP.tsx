import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { adminToastOptions } from "../../lib/toast-options";

const inputFields = [
  { label: "Platform", reg: "platform", type: "text" },
  { label: "Username", reg: "username", type: "text" },
  { label: "Rating", reg: "rating", type: "text" },
  { label: "Solved", reg: "solved", type: "text" },
  { label: "HighestRating", reg: "highestRating", type: "text" },
  { label: "Rank", reg: "rank", type: "text" },
  { label: "Logo Url", reg: "logo", type: "text" },
  { label: "Link", reg: "link", type: "text" },
];

const UpdateCP = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/cpProfile`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((allProfiles) => {
        if (!allProfiles || !Array.isArray(allProfiles)) {
          throw new Error("No profiles data returned from server");
        }

        const profile = allProfiles.find((p) => p._id === id);

        if (!profile) {
          throw new Error(`No profile found with ID: ${id}`);
        }

        reset(profile);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching CP profile:", error);
        toast.error(`Failed to fetch CP profile data: ${error.message}`);
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = (data: any) => {
    const { _id, ...dataWithoutId } = data;

    fetch(`${import.meta.env.VITE_SERVER_URL}/cpProfile/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataWithoutId),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        if (result?.modifiedCount > 0 || result?.acknowledged === true) {
          toast.success("CP profile updated successfully", adminToastOptions);
        } else {
          toast.info("No changes were made");
        }
      })
      .catch((error) => {
        console.error("Error updating CP profile:", error);
        toast.error("Failed to update CP profile");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold rounded-lg">
        Update CP Profile
      </h1>
      <section className="bg-gray-50 mb-10 mt-16 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                {inputFields.map((field, i) => (
                  <div key={i}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {field.label}
                    </label>
                    <input
                      {...register(field.reg, { required: true })}
                      type={field.type}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                    />
                    {errors[field.reg] && (
                      <p className="text-red-500">{field.label} is required.</p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update CP Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateCP;
