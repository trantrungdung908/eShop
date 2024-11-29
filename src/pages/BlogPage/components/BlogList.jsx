import { PATHS } from "@/constants/path";
import { formatDate } from "@/utils/format";
import { Skeleton } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogSkeletonStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 5%;
`;
const BlogList = ({ isLoading, isError, blogs }) => {
  if ((!isLoading && blogs?.length < 1) || isError) {
    return (
      <div className="entry-container max-col-2">
        <div className="entry-item col-sm-6">There is no blogs</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="entry-container max-col-2">
        {new Array(6).fill("").map((_, index) => {
          return (
            <BlogSkeletonStyled className="entry-item col-sm-6" key={index}>
              <Skeleton.Image active style={{ width: "100%", height: 275 }} />
              <Skeleton.Input />
              <Skeleton.Input block />
            </BlogSkeletonStyled>
          );
        })}
      </div>
    );
  }
  return (
    <div className="entry-container max-col-2" data-layout="fitRows">
      {blogs?.map((blog) => {
        const { author, createdAt, id, image, slug, name } = blog || {};

        const detailPath = `${PATHS.BLOG}/${slug}`;

        return (
          <div className="entry-item col-sm-6" key={id}>
            <article className="entry entry-grid">
              <figure className="entry-media">
                <Link to={detailPath}>
                  <img src={image || ""} alt="image desc" />
                </Link>
              </figure>
              <div className="entry-body">
                <div className="entry-meta">
                  <span>{formatDate(createdAt)}</span>
                  <span className="meta-separator">|</span>
                  <span className="entry-author">
                    {" "}
                    by <a href="#">{author}</a>
                  </span>
                </div>
                <h2 className="entry-title">
                  <Link to={detailPath}>{name}</Link>
                </h2>
                <Link to={detailPath} className="read-more">
                  Read more
                </Link>
                {/* <div className="entry-content">
                  <p>
                    Sed pretium, ligula sollicitudin laoreet viverra, tortor
                    libero sodales leo, eget blandit nunc tortor eu nibh.
                    Suspendisse potenti. Sed egestas vulputate ...
                  </p>
                  <a href="blog-single.html" className="read-more">
                    Read More
                  </a>
                </div> */}
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
