import { API } from "../../config/axios";
import { AxiosError } from "axios";
import { type StorypageContent } from "../interfaces/Component";

const RequestToGetStorypageContents = async () => {
  try {
    const response = await API.get("/storypage/");
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

const RequestToGetStorySectionContent = async (id: string | string[]) => {
  try {
    const response = await API.get(`/storypage/${id}`);
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

const RequestToAddNewStory = async (payload: StorypageContent) => {
  try {
    const response = await API.post("/storypage/add", payload);
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

const RequestToUpdateStory = async (
  id: string | string[],
  payload: StorypageContent
) => {
  try {
    const response = await API.put(`/storypage/edit/${id}`, payload);
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

const RequestToDeleteStory = async (id: number) => {
  try {
    const response = await API.delete(`/storypage/delete/${id}`);
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

const RequestToChangeSectionOrder = async (payload: any, id: number) => {
  try {
    const response = await API.put(`/storypage/change/order/${id}`, payload);
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

export {
  RequestToGetStorypageContents,
  RequestToGetStorySectionContent,
  RequestToAddNewStory,
  RequestToUpdateStory,
  RequestToDeleteStory,
  RequestToChangeSectionOrder,
};
