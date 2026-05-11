import { AxiosError } from "axios";
import { API } from "../../config/axios";
import { type TranslationPayload } from "../interfaces/Payload";
import { displayErrorNotification } from "../services/notifications";

const TRANSLATION_ERROR_MESSAGE = "Error translating text";

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
    const translation =
      axiosError.response?.data?.translation ??
      axiosError.response?.data?.result ??
      "";

    if (!translation) {
      displayErrorNotification(TRANSLATION_ERROR_MESSAGE);
    }

    console.error("Translation request failed", {
      status: axiosError.response?.status,
    });

    return {
      err: TRANSLATION_ERROR_MESSAGE,
      translation,
      result: translation,
    };
  }
};

export { RequestToTranslateText };
