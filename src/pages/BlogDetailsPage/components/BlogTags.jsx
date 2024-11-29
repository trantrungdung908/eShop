import React from "react";

const BlogTags = ({ relatedTags }) => {
  return (
    <div className="col-md">
      <div className="entry-tags">
        <span>Tags:</span>
        {relatedTags?.length > 0
          ? relatedTags.map((tag) => {
              return (
                <a href="#" key={tag.id}>
                  {tag.name}
                </a>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default BlogTags;
