import { API } from "../../config/axios";
import { AxiosError } from "axios";
import { type Dictionary } from "../interfaces/Component";

const RequestToGetDictionaryEntries = async () => {
  try {
    const response = await API.get("/dictionary/");
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

const RequestToGetDictionaryEntry = async (id: string | string[]) => {
  try {
    const response = await API.get(`/dictionary/${id}`);
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

const RequestToAddNewDictionaryEntry = async (payload: Dictionary) => {
  try {
    const response = await API.post("/dictionary/add", payload);
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

const RequestToUpdateDictionaryEntry = async (
  payload: Dictionary,
  id: string | string[]
) => {
  try {
    const response = await API.put(`/dictionary/edit/${id}`, payload);
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

const RequestToDeleteDictionaryEntry = async (id: number) => {
  try {
    const response = await API.delete(`/dictionary/delete/${id}`);
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
  RequestToGetDictionaryEntries,
  RequestToGetDictionaryEntry,
  RequestToAddNewDictionaryEntry,
  RequestToUpdateDictionaryEntry,
  RequestToDeleteDictionaryEntry,
};
