import React from "react";
import { Link } from "react-router-dom";

const BlogSideBar = ({ categories, handleCateFilterChange }) => {
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
      <div className="widget">
        <h3 className="widget-title">Popular Posts</h3>
        <ul className="posts-list">
          <li>
            <figure>
              <a href="#">
                <img src="assets/images/blog/sidebar/post-1.jpg" alt="post" />
              </a>
            </figure>
            <div>
              <span>Nov 22, 2018</span>
              <h4>
                <a href="#">Aliquam tincidunt mauris eurisus.</a>
              </h4>
            </div>
          </li>
          <li>
            <figure>
              <a href="#">
                <img src="assets/images/blog/sidebar/post-2.jpg" alt="post" />
              </a>
            </figure>
            <div>
              <span>Nov 19, 2018</span>
              <h4>
                <a href="#">Cras ornare tristique elit.</a>
              </h4>
            </div>
          </li>
          <li>
            <figure>
              <a href="#">
                <img src="assets/images/blog/sidebar/post-3.jpg" alt="post" />
              </a>
            </figure>
            <div>
              <span>Nov 12, 2018</span>
              <h4>
                <a href="#">Vivamus vestibulum ntulla nec ante.</a>
              </h4>
            </div>
          </li>
          <li>
            <figure>
              <a href="#">
                <img src="assets/images/blog/sidebar/post-4.jpg" alt="post" />
              </a>
            </figure>
            <div>
              <span>Nov 25, 2018</span>
              <h4>
                <a href="#">Donec quis dui at dolor tempor interdum.</a>
              </h4>
            </div>
          </li>
        </ul>
      </div>
      <div className="widget widget-banner-sidebar">
        <div className="banner-sidebar-title">ad box 280 x 280</div>
        <div className="banner-sidebar banner-overlay">
          <a href="#">
            <img src="assets/images/blog/sidebar/banner.jpg" alt="banner" />
          </a>
        </div>
      </div>
      <div className="widget">
        <h3 className="widget-title">Browse Tags</h3>
        <div className="tagcloud">
          <a href="#">fashion</a>
          <a href="#">style</a>
          <a href="#">women</a>
          <a href="#">photography</a>
          <a href="#">travel</a>
          <a href="#">shopping</a>
          <a href="#">hobbies</a>
        </div>
      </div>
    </div>
  );
};

export default BlogSideBar;
