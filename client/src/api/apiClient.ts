



// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5500/api',
//   withCredentials: true, 
// });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;







import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";


interface ApiErrorResponse {
  message?: string;
  error?: string;
  details?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5500/api",
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
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
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const status = error.response.status;

     
      const data = error.response.data;
      const message = data?.message || data?.error || data?.details || "Something went wrong!";

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
