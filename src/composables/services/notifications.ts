import { toast } from "vue3-toastify";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import "vue3-toastify/dist/index.css";
import type { ToastOptions, ToastTheme } from "vue3-toastify";

const notificationDefaultOptions: ToastOptions = {
  theme: "colored" as ToastTheme,
  pauseOnHover: false,
  autoClose: 1000,
  hideProgressBar: true,
  dangerouslyHTMLString: true,
};

const displaySuccessNotification = (message: string) => {
  toast.success(message, notificationDefaultOptions);
};

const displayErrorNotification = (message: string) => {
  toast.error(message, notificationDefaultOptions);
};

interface ConfirmCallback {
  (): void;
}

const displayConfirmDialog = async (
  message: string,
  confirmCallback: ConfirmCallback
) => {
  return Confirm.show(
    "Confirm Delete",
    message,
    "Yes, Delete",
    "Cancel",
    confirmCallback
  );
};

export {
  displaySuccessNotification,
  displayErrorNotification,
  displayConfirmDialog,
};
