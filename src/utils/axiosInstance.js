import axios from "axios";
import { BASE_URL } from "@/constants/environments";
import { tokenMethod } from "./tokenMethod";
import { authService } from "@/services/authService";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (tokenMethod.get()) {
      config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    response.fullData = response?.data?.data;

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      [401, 403].includes(error.response?.data?.statusCode) &&
      tokenMethod.get()?.refreshToken
    ) {
      if (originalRequest.url === "/customer/refresh") return;
      try {
        const res = await authService.refreshToken({
          refreshToken: tokenMethod.get()?.refreshToken,
        });

        const { token: accessToken, refreshToken } = res?.fullData;

        tokenMethod.set({ accessToken, refreshToken });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
