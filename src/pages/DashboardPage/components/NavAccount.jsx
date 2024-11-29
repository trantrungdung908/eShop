import { PATHS } from "@/constants/path";
import { handleLogout } from "@/store/reducers/authReducer";
import { clearCart } from "@/store/reducers/cartReducer";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const NavAccount = () => {
  const dispatch = useDispatch();

  const _onLogout = () => {
    dispatch(handleLogout());
    dispatch(clearCart());
  };
  return (
    <aside className="col-md-4 col-lg-3">
      <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
        <li className="nav-item">
          <NavLink
            to={PATHS.PROFILE.INDEX}
            end
            className="nav-link "
            id="tab-account-link"
            data-toggle="tab"
            href="#tab-account"
            role="tab"
            aria-controls="tab-account"
            aria-selected="false"
          >
            Account Details
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={PATHS.PROFILE.PROFILE_ORDER}
            className="nav-link"
            id="tab-orders-link"
            data-toggle="tab"
            href="#tab-orders"
            role="tab"
            aria-controls="tab-orders"
            aria-selected="false"
          >
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={PATHS.PROFILE.PROFILE_ADDRESS}
            className="nav-link"
            id="tab-address-link"
            data-toggle="tab"
            href="#tab-address"
            role="tab"
            aria-controls="tab-address"
            aria-selected="false"
          >
            Adresses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={PATHS.PROFILE.PROFILE_WISHLIST}
            className="nav-link"
            id="tab-wishlist-link"
            data-toggle="tab"
            href="#tab-wishlist"
            role="tab"
            aria-controls="tab-wishlist"
            aria-selected="false"
          >
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={PATHS.PROFILE.PROFILE_CHANGEPASS}
            className="nav-link"
            id="tab-wishlist-link"
            data-toggle="tab"
            href="#tab-wishlist"
            role="tab"
            aria-controls="tab-wishlist"
            aria-selected="false"
          >
            Change pass
          </NavLink>
        </li>
        <li className="nav-item">
          <Link onClick={() => dispatch(_onLogout())} className="nav-link">
            Sign Out
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default NavAccount;
