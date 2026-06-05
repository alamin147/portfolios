import type { ToastOptions } from "react-toastify";

/** Shared toast styling used across the admin screens. */
export const adminToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
