import React, { useState } from "react";
import { MenuStyled } from "../Header/components/HeaderMenu";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "@/constants/path";
import { useMainContext } from "@/context/MainContext";

const menuName = {
  menu: "Menu",
  categories: "Categories",
};

const MobileMenu = () => {
  const { handleToggleNav } = useMainContext();
  const [menuTitle, setMenuTitle] = useState(menuName.menu);

  const handleMenuTitle = (e, tab) => {
    e.preventDefault();
    setMenuTitle(tab);
    console.log("menuTitle", menuTitle);
    console.log("e.target.value", tab);
  };
  return (
    <>
      {/* Mobile Menu */}
      <div className="mobile-menu-overlay" onClick={handleToggleNav} />
      {/* End .mobil-menu-overlay */}
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={handleToggleNav}>
            <i className="icon-close" />
          </span>
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
            <li className="nav-item">
              <a
                onClick={(e) => handleMenuTitle(e, menuName.menu)}
                className={`nav-link ${
                  menuName.menu === menuTitle ? "active" : ""
                }`}
                // id="mobile-menu-link"
                // data-toggle="tab"
                href="#mobile-menu-tab"
                // role="tab"
                // aria-controls="mobile-menu-tab"
                // aria-selected="true"
              >
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={(e) => handleMenuTitle(e, menuName.categories)}
                className={`nav-link ${
                  menuName.categories === menuTitle ? "active" : ""
                }`}
                // id="mobile-cats-link"
                // data-toggle="tab"
                href="#mobile-cats-tab"
                // role="tab"
                // aria-controls="mobile-cats-tab"
                // aria-selected="false"
              >
                Categories
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className={`tab-pane fade ${
                menuTitle === menuName.menu ? "show active" : ""
              }`}
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav" onClick={handleToggleNav}>
                <MenuStyled className="mobile-menu">
                  <li>
                    <NavLink to={PATHS.HOME}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.ABOUT}>About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.BLOG}>Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
                  </li>
                </MenuStyled>
              </nav>
              {/* End .mobile-nav */}
            </div>
            {/* .End .tab-pane */}
            <div
              className={`tab-pane fade ${
                menuTitle === menuName.categories ? "show active" : ""
              }`}
              id="mobile-cats-tab"
              role="tabpanel"
              aria-labelledby="mobile-cats-link"
            >
              <nav className="mobile-cats-nav">
                <ul className="mobile-cats-menu">
                  <li>
                    <a className="mobile-cats-lead" href="#">
                      TV
                    </a>
                  </li>
                  <li>
                    <a href="#">Computers</a>
                  </li>
                  <li>
                    <a href="#">Tablets &amp; Cell Phones</a>
                  </li>
                  <li>
                    <a href="#">Smartwatches</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                </ul>
                {/* End .mobile-cats-menu */}
              </nav>
              {/* End .mobile-cats-nav */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
          <div className="social-icons">
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter" />
            </a>
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
      {/* End .mobile-menu-container */}
    </>
  );
};

export default MobileMenu;
