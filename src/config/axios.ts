import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://chabacano-tl-backend.vercel.app";

const axiosConfig = {
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const API = axios.create(axiosConfig);

export { API };
