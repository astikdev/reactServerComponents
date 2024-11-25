import axios from "axios";
import { StatusCode } from "../type/api/api";

export const baseURL = "https://jsonplaceholder.typicode.com/";
export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === StatusCode.Unauthorized) {
  }
  return Promise.reject(error);
});
