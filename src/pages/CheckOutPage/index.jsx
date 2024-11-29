import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/constants/path";
import React from "react";
import { Link } from "react-router-dom";
import CheckoutDiscount from "./components/CheckoutDiscount";
import CheckoutForm from "./components/CheckoutForm";
import useCheckout from "./useCheckout";

const CheckOutPage = () => {
  const { couponProps, checkoutFormProps } = useCheckout();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item>
          <Link to={PATHS.PRODUCTS}>Product</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item isActive>Checkout</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <CheckoutDiscount {...couponProps} />
            <CheckoutForm {...checkoutFormProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckOutPage;
