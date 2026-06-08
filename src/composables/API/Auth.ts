import { AxiosError } from "axios";
import { API } from "../../config/axios";

interface LoginPayload {
  username: string;
  password: string;
}

interface ForgotPasswordPayload {
  identifier: string;
}

interface ResetPasswordPayload {
  token: string;
  password: string;
}

const RequestToLogin = async (payload: LoginPayload) => {
  try {
    const response = await API.post("/auth/login", payload, {
      withCredentials: true,
    });
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
    const response = await API.get("/auth/check", {
      withCredentials: true,
    });
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

const RequestToForgotPassword = async (payload: ForgotPasswordPayload) => {
  try {
    const response = await API.post("/auth/forgot-password", payload);
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

const RequestToResetPassword = async (payload: ResetPasswordPayload) => {
  try {
    const response = await API.post("/auth/reset-password", payload);
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
  RequestToLogin,
  RequestToCheckAuth,
  RequestToLogout,
  RequestToForgotPassword,
  RequestToResetPassword,
};
