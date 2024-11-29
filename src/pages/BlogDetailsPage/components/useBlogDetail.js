import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { blogService } from "@/services/blogService";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const useBlogDetail = () => {
  const { slug } = useParams();

  const {
    data: blogData,
    loading: blogLoading,
    fetchApi: fetchBlogBySlug,
  } = useMutation(blogService.getBlogDetail);

  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogError,
    fetchApi: fetchBlogs,
  } = useQuery(blogService.getBlogs);

  const {
    data: blogTagsData,
    loading: blogTagsLoading,
    fetchApi: fetchBlogsTagBySlug,
  } = useQuery(blogService.getBlogTags);

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug);
    }
  }, [slug]);

  const { name, tags, category } = blogData || {};

  const tagsData = blogTagsData?.blogs;

  const relatedBlog = blogsData?.blogs?.filter(
    (blog) => blog.slug !== slug && blog.category?.name === category?.name
  );

  const relatedTags = tagsData?.filter((item) => tags.includes(item.id));

  const relatedBlogProps = {
    relatedBlog,
    isLoading: blogLoading,
  };

  return {
    blogName: name,
    blogData,
    relatedBlogProps,
    relatedTags,
  };
};

export default useBlogDetail;
