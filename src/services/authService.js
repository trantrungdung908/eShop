import axiosInstance from "@/utils/axiosInstance";

export const authService = {
  login(payload = {}) {
    return axiosInstance.post("/customer/login", payload);
  },
  register(payload = {}) {
    return axiosInstance.post("/customer/register", payload);
  },
  getProfile() {
    return axiosInstance.get("/customer/profiles");
  },
  updateProfile(payload = {}) {
    return axiosInstance.put("/customer/profiles", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  refreshToken(payload = {}) {
    return axiosInstance.put("/customer/refresh", payload);
  },

  getProvince() {
    return axiosInstance.get("/provinces");
  },
  getProviceById(id) {
    return axiosInstance.get(`/provinces/${id}`);
  },

  getDataDistrict(id) {
    return axiosInstance.get(`/districts?province=${id}`);
  },
  getDataDistrictById(id) {
    return axiosInstance.get(`/districts/${id}`);
  },
  getDataWard(id) {
    return axiosInstance.get(`/wards?district=${id}`);
  },
  getDataWardById(id) {
    return axiosInstance.get(`/wards/${id}`);
  },

  addWhiteListProduct(payload) {
    return axiosInstance.post("/customer/white-list", payload);
  },
  deleteWhitelistProduct(payload = {}) {
    return axiosInstance.delete("/customer/white-list", { data: payload });
  },
};
