import axios from "axios";

const LOCAL_API_URL = "http://localhost:5000";
const PRODUCTION_API_URL = "https://chabacano-tl-backend.vercel.app";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;
const devBaseUrl = import.meta.env.VITE_API_DEV_URL ?? LOCAL_API_URL;
const productionBaseUrl =
  import.meta.env.VITE_API_PROD_URL ?? PRODUCTION_API_URL;

const BASE_URL =
  import.meta.env.DEV ? configuredBaseUrl ?? devBaseUrl : productionBaseUrl;

const axiosConfig = {
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const API = axios.create(axiosConfig);

export { API };
