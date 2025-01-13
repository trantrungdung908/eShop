import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/constants/path";
import React from "react";
import { Link } from "react-router-dom";
import BlogList from "./components/BlogList";
import Pagination from "@/components/Pagination";
import useBlogPage from "./components/useBlogPage";
import BlogSideBar from "./components/BlogSidebar";

const BlogPage = () => {
  const { blogsListProps, pagiProps, blogCateProps } = useBlogPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item isActive>Blog</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <BlogList {...blogsListProps} />

              <Pagination {...pagiProps} />
            </div>
            <aside className="col-lg-3">
              <BlogSideBar {...blogCateProps} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
