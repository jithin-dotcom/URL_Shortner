

import axios, { AxiosError } from "axios";
import type {InternalAxiosRequestConfig} from "axios";
import { toast } from "react-toastify";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  details?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: ((token: string | null) => void)[] = [];

const processQueue = (newToken: string | null) => {
  failedQueue.forEach((cb) => cb(newToken));
  failedQueue = [];
};


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Failed to send request. Please try again.");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push((token: string | null) => {
            if (!originalRequest.headers || !token) return;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        localStorage.setItem("token", newToken);

        processQueue(newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(null);
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    const data = error.response?.data;
    const status = error.response?.status;
    const message = data?.message || data?.error || data?.details || "Something went wrong!";

    if (error.response) {
      switch (status) {
        case 400:
          toast.error(message);
          break;
        case 401:
          toast.error(message || "Unauthorized! Please log in again.");
          break;
        case 403:
          toast.error(message || "Forbidden! You don’t have permission.");
          break;
        case 404:
          toast.error(message || "Resource not found.");
          break;
        case 500:
          toast.error(message || "Internal server error. Please try later.");
          break;
        default:
          toast.error(message);
      }
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error(`Error: ${error.message}`);
    }

    return Promise.reject(error);
  }
);

export default api;

