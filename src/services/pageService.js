import axiosInstance from "@/utils/axiosInstance";

export const pageService = {
  getAllPages(query = "") {
    return axiosInstance.get(`/pages${query}`);
  },
  getPageByName(slug = "") {
    return axiosInstance.get(`pages/${slug}`);
  },
};
