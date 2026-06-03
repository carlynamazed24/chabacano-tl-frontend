import axios, { type AxiosError } from "axios";
import { API } from "../../config/axios";
import { type TranslationPayload } from "../interfaces/Payload";
import { displayErrorNotification } from "../services/notifications";

const TRANSLATION_ERROR_MESSAGE = "Error translating text";

interface TranslationRequestOptions {
  signal?: AbortSignal;
}

const RequestToTranslateText = async (
  payload: TranslationPayload,
  options: TranslationRequestOptions = {},
) => {
  try {
    const response = await API.post("/translation", payload, {
      signal: options.signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error) || (error as AxiosError).code === "ERR_CANCELED") {
      return {
        err: "Translation request canceled",
        translation: "",
        result: "",
        canceled: true,
      };
    }

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
