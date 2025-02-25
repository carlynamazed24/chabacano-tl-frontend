import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const axiosConfig = {
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const API = axios.create(axiosConfig);

export { API };
