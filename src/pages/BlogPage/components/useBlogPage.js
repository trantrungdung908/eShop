import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { blogService } from "@/services/blogService";
import queryString from "query-string";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const BLOG_LIMITS = 6;

const useBlogPage = () => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  const [_, setSearchParams] = useSearchParams();

  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogError,
    fetchApi: fetchBlogs,
  } = useMutation((query) =>
    blogService.getBlogs(query || `?limit=${BLOG_LIMITS}`)
  );

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(blogService.getBlogCategories);

  const blogs = blogsData?.blogs || [];
  const blogsPagi = blogsData?.pagination || {};

  const blogsListProps = {
    isLoading: blogsLoading,
    isError: !!blogError,
    blogs,
  };

  const categories = categoriesData?.blogs || [];

  useEffect(() => {
    fetchBlogs(search);
  }, [search]);

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: BLOG_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  const handleCateFilterChange = (cateId) => {
    updateQueryString({
      ...queryObject,
      category: cateId,
      page: 1,
    });
  };

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    page: Number(blogsPagi.page || queryObject.page || 1),
    limit: Number(blogsPagi.limit || 0),
    total: Number(blogsPagi.total || 0),
    onPagiChange,
  };

  const blogCateProps = {
    categories,
    handleCateFilterChange,
  };

  return {
    blogsListProps,
    pagiProps,
    blogCateProps,
  };
};

export default useBlogPage;
