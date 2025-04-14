import axios from "axios";
import useAuth from "../features/auth/useAuth";

export const backend = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL + "/api/v1",
});

backend.interceptors.request.use(
  async (config) => {
    const { userInfo } = useAuth.getState();
    if (userInfo?.token) {
      config.headers.Authorization = "Bearer " + userInfo.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
