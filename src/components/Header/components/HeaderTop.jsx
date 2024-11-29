import { MODAL_TYPES } from "@/constants/general";
import { PATHS } from "@/constants/path";
import { handleLogout, handleStatusModal } from "@/store/reducers/authReducer";
import { clearCart, handleGetCart } from "@/store/reducers/cartReducer";
import { tokenMethod } from "@/utils/tokenMethod";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderTop = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.authReducer);
  const _onShowModal = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    dispatch(handleStatusModal(MODAL_TYPES.login));
  };

  const _onLogout = () => {
    dispatch(handleLogout());
    dispatch(clearCart());
  };
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0961371906">
            <i className="icon-phone" /> Hotline: 096 1371 906
          </a>
        </div>
        <div className="header-right">
          {/* Not LogIn */}
          {!!!tokenMethod.get() ? (
            <ul className="top-menu top-link-menu">
              <li>
                <a
                  href="#signin-modal"
                  // data-toggle="modal"
                  className="top-menu-login"
                  onClick={(e) => _onShowModal(e)}
                >
                  <i className="icon-user" />
                  Login | Resgister
                </a>
              </li>
            </ul>
          ) : (
            <ul className="top-menu">
              <li>
                <a href="#" className="top-link-menu">
                  <i className="icon-user" />
                  {profile?.name || profile?.email}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.PROFILE.INDEX}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE.PROFILE_ORDER}>
                          Your Orders
                        </Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE.PROFILE_WISHLIST}>
                          Wishlist{" "}
                          <span>({profile?.whiteList?.length || 0})</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={PATHS.HOME} onClick={_onLogout}>
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
