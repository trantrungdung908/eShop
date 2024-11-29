import React from "react";
import { useSelector } from "react-redux";
import CartTable from "./components/CartTable";
import useCartPage from "./useCartPage";
import CartSummary from "./components/CartSummary";
import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/constants/path";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartTableProps, cartSummaryProps } = useCartPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>

      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item>
          <Link to={PATHS.PRODUCTS}>Product</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item isActive>Shopping Cart</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <CartTable {...cartTableProps} />
              <CartSummary {...cartSummaryProps} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
