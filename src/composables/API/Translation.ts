import axios from "axios";
import { type TranslationPayload } from "../interfaces/Payload";
import { displayErrorNotification } from "../services/notifications";

const ML_TRANSLATOR_API_URL =
  "https://carlynamazed24-chabacano-tl-models-api.hf.space/translate/";
const THIRD_PARTY_TRANSLATOR_API_URL =
  "https://api-b2b.backenster.com/b1/api/v3/translate";
const LINGVANEX_API_KEY = import.meta.env.VITE_APP_LINGVANEX_API_KEY;

const isThirdPartyModel = (model: string) =>
  ["tagalog-to-english", "english-to-tagalog"].includes(model);

const getTranslationRequestConfig = (payload: TranslationPayload) => {
  if (isThirdPartyModel(payload.model)) {
    return {
      url: THIRD_PARTY_TRANSLATOR_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: LINGVANEX_API_KEY,
      },
      data: {
        platform: "api",
        data: payload.text,
        to: payload.model.split("-")[2] === "english" ? "en_GB" : "tl_PH",
        from: payload.model.split("-")[0] === "tagalog" ? "tl_PH" : "en_GB",
      },
    };
  }

  return {
    url: ML_TRANSLATOR_API_URL,
    headers: { "Content-Type": "application/json" },
    data: { text: payload.text, model: payload.model },
  };
};

const RequestToTranslateText = async (payload: TranslationPayload) => {
  try {
    const { url, headers, data } = getTranslationRequestConfig(payload);
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
  }
};

export { RequestToTranslateText };
