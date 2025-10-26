import axios from "axios";
import { getLocalStorage } from "./localStorageService";

// const baseURL = import.meta.env.VITE_PUBLIC_REACT_APP_BASE_URL_API;
export const baseURL = "http://10.44.121.178:8080";
// export const baseURL = "https://inventaris-binamarga.my.id";
// export const baseURL = "https://api.persediaankepegumum.id";

export const axiosServices = () => {
  const Axios = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // token: userToken,
    },
  });

  // Set the AUTH token for any request
  Axios.interceptors.request.use(function (config) {
    const userToken = getLocalStorage("userData")?.token;
    config.headers.Authorization = userToken ? `Bearer ${userToken}` : "";
    return config;
  });

  return Axios;
};
