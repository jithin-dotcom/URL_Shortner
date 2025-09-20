



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







// // import axios, { AxiosError } from "axios";
// // import { toast } from "react-toastify";


// // interface ApiErrorResponse {
// //   message?: string;
// //   error?: string;
// //   details?: string;
// // }

// // const api = axios.create({
// //   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5500/api",
// //   withCredentials: true,
// // });


// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     if (token && config.headers) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     toast.error("Failed to send request. Please try again.");
// //     return Promise.reject(error);
// //   }
// // );


// // api.interceptors.response.use(
// //   (response) => response,
// //   (error: AxiosError<ApiErrorResponse>) => {
// //     if (error.response) {
// //       const status = error.response.status;

     
// //       const data = error.response.data;
// //       const message = data?.message || data?.error || data?.details || "Something went wrong!";

// //       switch (status) {
// //         case 400:
// //           toast.error(message);
// //           break;
// //         case 401:
// //           toast.error(message || "Unauthorized! Please log in again.");
// //           break;
// //         case 403:
// //           toast.error(message || "Forbidden! You don’t have permission.");
// //           break;
// //         case 404:
// //           toast.error(message || "Resource not found.");
// //           break;
// //         case 500:
// //           toast.error(message || "Internal server error. Please try later.");
// //           break;
// //         default:
// //           toast.error(message);
// //       }
// //     } else if (error.request) {
// //       toast.error("No response from server. Please check your connection.");
// //     } else {
// //       toast.error(`Error: ${error.message}`);
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default api;














// import axios, { AxiosError } from "axios";
// import type {AxiosRequestConfig} from "axios";
// import { toast } from "react-toastify";

// interface ApiErrorResponse {
//   message?: string;
//   error?: string;
//   details?: string;
// }

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5500/api",
//   withCredentials: true, // important for cookies
// });

// // Flag to prevent multiple refresh calls at the same time
// let isRefreshing = false;
// let failedQueue: ((token: string) => void)[] = [];

// const processQueue = (newToken: string | null) => {
//   failedQueue.forEach((cb) => cb(newToken!));
//   failedQueue = [];
// };

// // // Request interceptor
// // api.interceptors.request.use(
// //   (config: AxiosRequestConfig) => {
// //     const token = localStorage.getItem("token");
// //     if (token && config.headers) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     toast.error("Failed to send request. Please try again.");
// //     return Promise.reject(error);
// //   }
// // );



// // Request interceptor with type-safe headers
// api.interceptors.request.use(
//   (config: AxiosRequestConfig): AxiosRequestConfig => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // Ensure headers object exists
//       config.headers = config.headers ?? {};
      
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     toast.error("Failed to send request. Please try again.");
//     return Promise.reject(error);
//   }
// );




// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError<ApiErrorResponse>) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         // Queue the request if a refresh is already in progress
//         return new Promise((resolve, ) => {
//           failedQueue.push((token: string) => {
//             if (!originalRequest.headers) return;
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(api(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;

//       try {
//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/auth/refresh`,
//           {},
//           { withCredentials: true } // important!
//         );

//         const newToken = res.data.accessToken;
//         localStorage.setItem("token", newToken);

//         // Update all queued requests
//         processQueue(newToken);

//         // Retry original request
//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         }
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(null);
//         toast.error("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         window.location.href = "/";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // Existing error handling
//     const data = error.response?.data;
//     const message = data?.message || data?.error || data?.details || "Something went wrong!";

//     if (error.response) {
//       toast.error(message);
//     } else if (error.request) {
//       toast.error("No response from server. Please check your connection.");
//     } else {
//       toast.error(`Error: ${error.message}`);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;









// import axios, { AxiosError, AxiosRequestConfig } from "axios";
// import { toast } from "react-toastify";

// interface ApiErrorResponse {
//   message?: string;
//   error?: string;
//   details?: string;
// }

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5500/api",
//   withCredentials: true,
// });

// // Flag to prevent multiple refresh calls at the same time
// let isRefreshing = false;
// let failedQueue: ((token: string | null) => void)[] = [];

// const processQueue = (newToken: string | null) => {
//   failedQueue.forEach((cb) => cb(newToken));
//   failedQueue = [];
// };

// // Request interceptor
// api.interceptors.request.use(
//   (config: AxiosRequestConfig): AxiosRequestConfig => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers = config.headers ?? {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     toast.error("Failed to send request. Please try again.");
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError<ApiErrorResponse>) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

//     // Handle 401 errors with token refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           failedQueue.push((token: string | null) => {
//             if (!originalRequest.headers || !token) return;
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(api(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;

//       try {
//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const newToken = res.data.accessToken;
//         localStorage.setItem("token", newToken);

//         // Update all queued requests
//         processQueue(newToken);

//         // Retry original request
//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         }
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(null);
//         toast.error("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         window.location.href = "/";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // General error handling
//     const data = error.response?.data;
//     const status = error.response?.status;
//     const message = data?.message || data?.error || data?.details || "Something went wrong!";

//     if (error.response) {
//       switch (status) {
//         case 400:
//           toast.error(message);
//           break;
//         case 401:
//           toast.error(message || "Unauthorized! Please log in again.");
//           break;
//         case 403:
//           toast.error(message || "Forbidden! You don’t have permission.");
//           break;
//         case 404:
//           toast.error(message || "Resource not found.");
//           break;
//         case 500:
//           toast.error(message || "Internal server error. Please try later.");
//           break;
//         default:
//           toast.error(message);
//       }
//     } else if (error.request) {
//       toast.error("No response from server. Please check your connection.");
//     } else {
//       toast.error(`Error: ${error.message}`);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;













import axios, { AxiosError } from "axios";
import type {InternalAxiosRequestConfig} from "axios";
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

// Flag to prevent multiple refresh calls at the same time
let isRefreshing = false;
let failedQueue: ((token: string | null) => void)[] = [];

const processQueue = (newToken: string | null) => {
  failedQueue.forEach((cb) => cb(newToken));
  failedQueue = [];
};

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 errors with token refresh
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

        // Update all queued requests
        processQueue(newToken);

        // Retry original request
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

    // General error handling
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

