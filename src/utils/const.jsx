import axios from "axios";

export const backend_base_url = "http://localhost:8087/api"

const axiosObj = axios.create({
    baseURL: backend_base_url,
    withCredentials: true,
  });
  
  axiosObj.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default axiosObj;