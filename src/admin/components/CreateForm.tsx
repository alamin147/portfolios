import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToastOptions } from "../lib/toast-options";

export interface FormField {
  label: string;
  reg: string;
  type: string;
}

interface CreateFormProps {
  /** Page heading. */
  title: string;
  /** Server collection path, e.g. "project" / "blog" / "skill" / "cpProfile". */
  endpoint: string;
  /** Fields to render. */
  fields: FormField[];
  /** Submit button + success toast label. */
  submitLabel: string;
  /** Toast shown on success. */
  successMessage: string;
  /** Optional hook to enrich the payload before sending (e.g. add a timestamp). */
  transform?: (data: any) => any;
}

const CreateForm = ({
  title,
  endpoint,
  fields,
  submitLabel,
  successMessage,
  transform,
}: CreateFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const payload = transform ? transform(data) : data;

    fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.acknowledged == true) {
          toast.success(successMessage, adminToastOptions);
          reset();
        }
      });
  };

  return (
    <div>
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold rounded-lg">
        {title}
      </h1>
      <section className="bg-gray-50 mb-10 mt-16 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                {fields.map((field, i) => (
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
                  {submitLabel}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateForm;
