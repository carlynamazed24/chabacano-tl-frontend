import { API } from "../config/axios.ts";

const RequestToTranslateText = async (payload: Object) => {
  try {
    const response = await API.post("/translate", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { RequestToTranslateText };
