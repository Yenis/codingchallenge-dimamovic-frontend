import { toast, ToastType } from "./ToastManager";

export const throwError = (errorMessage: string) => {
  toast.show({
    type: ToastType.ERROR,
    content: errorMessage,
  });
};

export const throwMessage = (message: string) => {
  toast.show({
    type: ToastType.SUCCESS,
    content: message,
  });
};
