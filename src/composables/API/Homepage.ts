import { API } from "../../config/axios";
import { AxiosError } from "axios";

interface HomepageContentPayload {
  heroTitle: string;
  heroContent: string;
  aboutUsTitle: string;
  aboutUsContent: string;
  ourMissionTitle: string;
  ourMissionContent: string;
  ourVisionTitle: string;
  ourVisionContent: string;
  whyChabacanoTitle: string;
  whyChabacanoContent: string;
}

const RequestToGetHomepageContent = async () => {
  try {
    const response = await API.get("/homepage/");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      return axiosError.response.data;
    }

    return {
      status: "failed",
      message: "Something went wrong",
    };
  }
};

const RequestToUpdateHomepageContent = async (
  payload: HomepageContentPayload
) => {
  try {
    const response = await API.put("/homepage/edit", payload);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      return axiosError.response.data;
    }

    return {
      status: "failed",
      message: "Something went wrong",
    };
  }
};

export { RequestToGetHomepageContent, RequestToUpdateHomepageContent };
