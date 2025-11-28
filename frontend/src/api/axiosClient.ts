import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    throw error;
  }
);

export default axiosClient;
