import axiosInstance from "@/utils/axiosInstance";

export const orderSevice = {
  getVoucher(slug = "") {
    return axiosInstance.get(`/orders/voucher/${slug}`);
  },
  getOrdersMe() {
    return axiosInstance.get("/orders/me");
  },
  getDetailOrder(id = "") {
    return axiosInstance.get(`orders/${id}/me`);
  },
  checkoutOrder(payload = {}) {
    return axiosInstance.post("/orders", payload);
  },
};
