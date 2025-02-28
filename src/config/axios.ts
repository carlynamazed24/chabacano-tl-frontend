import axios from "axios";

/* const APPENV = import.meta.env.VITE_APP_ENV;
const BASE_URL =
  APPENV === "development"
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_PROD_URL; */

const BASE_URL = "https://chabacano-tl-backend.vercel.app";

const axiosConfig = {
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const API = axios.create(axiosConfig);

export { API };
