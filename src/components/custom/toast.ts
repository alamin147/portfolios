import { toast } from "react-toastify";
import { ImCheckmark,ImCross } from "react-icons/im";
export const Toast = ({
  message,
  success,
}: {
  message: string;
  success: boolean;
}) => {
  if (success == true) {
    return toast(message, {
    icon:ImCheckmark,
    className:"glass-card bg-cyan-500/20 border border-cyan-400/30 text-white shadow-lg",
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});
}

return toast(message, {
    icon:ImCross,
    className:"glass-card bg-cyan-500/20 border border-cyan-400/30 text-white shadow-lg",
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
