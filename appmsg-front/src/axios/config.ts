import axios from "axios";
import { sessionExpired } from "../utils/utils";
import { getCookie } from "../server/actions";

export const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const token = await getCookie("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // await sessionExpired();
    }
    return Promise.reject(error);
  }
);
