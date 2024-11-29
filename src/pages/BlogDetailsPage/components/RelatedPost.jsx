import { PATHS } from "@/constants/path";
import { formatDate } from "@/utils/format";
import { Empty } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Stage = styled.div`
  transform: translate3d(0px, 0px, 0px);
  transition: 0.25s;
  width: 100%;
`;

const RelatedPost = ({ relatedBlog, isLoading }) => {
  if (!isLoading && relatedBlog?.length < 1) {
    return <Empty description={"Không có bài viết nào"} />;
  }
  return (
    <div style={{ display: "flex", gap: 15 }}>
      {relatedBlog?.map((item) => {
        const { id, name, image, createdAt, author, slug } = item || {};
        const detailPath = `${PATHS.BLOG}/${slug}`;
        return (
          <Stage key={id}>
            <div
              className="owl-item active"
              // style={{ width: "254.25px", marginRight: 20 }}
            >
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
                    <Link to={detailPath}>{name || ""}</Link>
                  </h2>
                </div>
              </article>
            </div>
          </Stage>
        );
      })}
    </div>
  );
};

export default RelatedPost;
