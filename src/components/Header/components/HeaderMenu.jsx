import CartDropDown from "@/components/CartDropDown";
import Search from "@/components/Search";
import { PATHS } from "@/constants/path";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import useHeaderMenu from "./useHeaderMenu";

const HeaderMenu = () => {
  const { handleToggleNav, cartDropdownProps } = useHeaderMenu();
  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button className="mobile-menu-toggler" onClick={handleToggleNav}>
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <Link to={"/"} className="logo">
            <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
          </Link>
        </div>
        <nav className="main-nav">
          <MenuStyled className="menu">
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
        <div className="header-right">
          <Search />
          <CartDropDown {...cartDropdownProps} />
        </div>
      </div>
    </div>
  );
};

export const MenuStyled = styled.ul`
  li {
    a.active {
      color: #fcb941 !important;
    }
  }
`;

export default HeaderMenu;
