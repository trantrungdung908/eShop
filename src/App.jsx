import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/path";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import PageNotFound from "./pages/404Page";
import ProductPage from "./pages/ProductPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import { tokenMethod } from "./utils/tokenMethod";
import { useDispatch } from "react-redux";
import { handleGetInfo } from "./store/reducers/authReducer";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import DashBoardPage from "./pages/DashboardPage";
import FaqPage from "./pages/FaqPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import PrivacyPage from "./pages/PrivacyPage";
import PrivateRoute from "./components/PrivateRoute";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import { handleGetCart } from "./store/reducers/cartReducer";
import AccountPage from "./pages/DashboardPage/components/AccountPage";
import ListOrder from "./pages/DashboardPage/components/ListOrder";
import Wishlist from "./pages/DashboardPage/components/Wishlist";
import AddressAccount from "./pages/DashboardPage/components/AddressAccount";
import ChangePass from "./pages/DashboardPage/components/ChangePass";
import BlogDetailsPage from "./pages/BlogDetailsPage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (tokenMethod.get()) {
      dispatch(handleGetInfo());
      dispatch(handleGetCart());
    }
  }, [tokenMethod.get()?.accessToken]);
  return (
    // <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path={PATHS.ABOUT} element={<AboutPage />} />

          <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
          <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetailsPage />} />

          <Route path={PATHS.BLOG} element={<BlogPage />} />
          <Route path={PATHS.BLOG_DETAIL} element={<BlogDetailsPage />} />

          <Route path={PATHS.CONTACT} element={<ContactPage />} />

          <Route path={PATHS.FAQ} element={<FaqPage />} />
          <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethodPage />} />
          <Route path={PATHS.RETURN} element={<ReturnsPage />} />
          <Route path={PATHS.RETURN} element={<ReturnsPage />} />
          <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />

          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.CART} element={<CartPage />} />
            <Route path={PATHS.CHECKOUT} element={<CheckOutPage />} />
            <Route
              path={PATHS.CHECKOUT_SUCCESS}
              element={<CheckoutSuccessPage />}
            />
            <Route path={PATHS.PROFILE.INDEX} element={<DashBoardPage />}>
              <Route index element={<AccountPage />} />
              <Route
                path={PATHS.PROFILE.PROFILE_ORDER}
                element={<ListOrder />}
              />
              <Route
                path={PATHS.PROFILE.PROFILE_WISHLIST}
                element={<Wishlist />}
              />
              <Route
                path={PATHS.PROFILE.PROFILE_ADDRESS}
                element={<AddressAccount />}
              />

              <Route
                path={PATHS.PROFILE.PROFILE_CHANGEPASS}
                element={<ChangePass />}
              />
            </Route>
          </Route>

          <Route path={PATHS.NOTFOUND} element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </Suspense>
  );
};

export default App;
