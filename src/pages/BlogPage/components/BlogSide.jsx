import React from "react";
import { Link } from "react-router-dom";

const BlogSide = ({ categories, handleCateFilterChange }) => {
  const _onFilterCate = (id) => {
    handleCateFilterChange(id);
  };
  return (
    <div className="sidebar">
      <div className="widget widget-search">
        <h3 className="widget-title">Search</h3>
        <form action="#">
          <label htmlFor="ws" className="sr-only">
            Search in blog
          </label>
          <input
            type="search"
            className="form-control"
            name="ws"
            id="ws"
            placeholder="Search in blog"
            required
          />
          <button type="submit" className="btn">
            <i className="icon-search" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <div className="widget widget-cats">
        <div style={{ display: "flex" }}>
          <h3 className="widget-title">Categories</h3>
          <a
            style={{ color: "#fcb941", fontSize: "1.2rem" }}
            href="#"
            className="sidebar-filter-clear"
            onClick={() => handleCateFilterChange("")}
          >
            Clean All
          </a>
        </div>
        <ul>
          {categories?.map((cat) => {
            const { id, name, slug } = cat || {};
            return (
              <li key={id} onClick={() => _onFilterCate(id)}>
                <Link to={""}>{name || ""}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BlogSide;
