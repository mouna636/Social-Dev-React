import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (!error.response) {
      console.log("Network error. Please check your internet connection.");
    } else if (error.response.status === 403) {
      window.location.href = "/not-authorized";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
