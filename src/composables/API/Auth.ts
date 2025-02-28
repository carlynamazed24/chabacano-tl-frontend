import { AxiosError } from "axios";
import { API } from "../../config/axios";

interface LoginPayload {
  username: string;
  password: string;
}

const RequestToLogin = async (payload: LoginPayload) => {
  try {
    const response = await API.post("/auth/login", payload);
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

const RequestToCheckAuth = async () => {
  try {
    const response = await API.get("/auth/check");
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

const RequestToLogout = async () => {
  try {
    const response = await API.get("/auth/logout");
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

export { RequestToLogin, RequestToCheckAuth, RequestToLogout };
