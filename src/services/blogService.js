import axiosInstance from "@/utils/axiosInstance";

export const blogService = {
  getBlogs(query = "") {
    return axiosInstance.get(`/blogs${query}`);
  },
  getBlogDetail(slug = "") {
    return axiosInstance.get(`/blogs/${slug}`);
  },
  getBlogCategories(query = "") {
    return axiosInstance.get(`/blog-categories${query}`);
  },
  getBlogCategoriesDetail(slug = "") {
    return axiosInstance.get(`/blog-categories/${slug}`);
  },
  getBlogTags(query = "") {
    return axiosInstance.get(`/blog-tags${query}`);
  },
  getBlogTagsBySlug(slug = "") {
    return axiosInstance.get(`/blog-tags/${slug}`);
  },
};
