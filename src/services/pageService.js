import axiosInstance from "@/utils/axiosInstance";

export const pageService = {
  getAllPages(query = "") {
    return axiosInstance.get(`/pages${query}`);
  },
  getPageByName(slug = "", name = "") {
    return axiosInstance.get(`/pages/${name}${slug}`);
  },
};
