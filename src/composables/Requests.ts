// import { API } from "../config/axios.ts";

import axios from "axios";

const RequestToTranslateText = async (payload: Object) => {
  try {
    const response = await axios.post(
      "https://carlynamazed24-chabacano-tl-models-api.hf.space/translate/",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { RequestToTranslateText };
