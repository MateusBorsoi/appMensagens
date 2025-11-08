import { AxiosRequestConfig } from "axios";

const getOptions = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    timeout: config.timeout ? config.timeout : 10000,
    baseURL: process.env.NEXT_PUBLIC_PROXY_BASE_PATH,
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
      ...config.headers,
    },
    ...config,
  };
};

export { getOptions };
