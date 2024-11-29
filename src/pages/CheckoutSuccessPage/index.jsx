import Button from "@/components/Button";
import { PATHS } from "@/constants/path";
import React from "react";

const CheckoutSuccessPage = () => {
  return (
    <main className="main">
      <div className="content-success text-center">
        <div className="container">
          <h1 className="content-title">Your Order is Completed!</h1>
          <p>
            Your order has been completed. Your order details are shown for your
            personal account.
          </p>
          <Button
            link={PATHS.PROFILE.PROFILE_ORDER}
            className="btn btn-outline-primary-2 btn-minwidth-lg"
          >
            <span>VIEW MY ORDERS</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
