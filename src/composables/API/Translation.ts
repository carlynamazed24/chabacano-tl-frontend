import { AxiosError } from "axios";
import { API } from "../../config/axios";
import { type TranslationPayload } from "../interfaces/Payload";
import { displayErrorNotification } from "../services/notifications";

const RequestToTranslateText = async (payload: TranslationPayload) => {
  try {
    const response = await API.post("/translation", payload);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      err?: string;
      message?: string;
      result?: string;
      translation?: string;
    }>;
    const message =
      axiosError.response?.data?.err ??
      axiosError.response?.data?.message ??
      "Something went wrong";
    const translation =
      axiosError.response?.data?.translation ??
      axiosError.response?.data?.result ??
      "";

    if (!translation) {
      displayErrorNotification("Something went wrong");
    }

    console.error(error);
    return {
      err: message,
      translation,
      result: translation,
    };
  }
};

export { RequestToTranslateText };
