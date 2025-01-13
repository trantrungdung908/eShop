import React from "react";
import Button from "@/components/Button";
import CountDown from "@/components/CountDown";
import ProductCard from "@/components/ProductCard";
import { PATHS } from "@/constants/path";
import { formatCurrency } from "@/utils/format";
import moment from "moment";
import { Link } from "react-router-dom";

const HomeDeals = ({ dealProducts }) => {
  const targetTime = moment()
    .add(1, "day")
    .set({ hour: 17, minute: 0, second: 0, milisecond: 0 }); // 5pm tomorrow

  const dealOfTheDayProduct = dealProducts?.[0];

  return (
    <div className="bg-light deal-container pt-7 pb-7 mb-5">
      <div className="container">
        <div className="heading text-center mb-4">
          <h2 className="title">Deals &amp; Outlet</h2>
          <p className="title-desc">Today’s deal and more</p>
        </div>
        <div className="row">
          <div className="col-lg-6 deal-col">
            <div
              className="deal"
              style={{
                backgroundImage: `url(${dealOfTheDayProduct?.images?.[0]})`,
                backgroundPosition: "right",
                backgroundSize: "contain",
              }}
            >
              <div className="deal-top">
                <h2>Deal of the Day.</h2>
                <h4>Limited quantities. </h4>
              </div>
              <div className="deal-content">
                <h3 className="product-title">
                  <Link to={PATHS.PRODUCTS + `/${dealOfTheDayProduct?.slug}`}>
                    {dealOfTheDayProduct?.title || ""}
                  </Link>
                </h3>
                <div className="product-price">
                  <span className="new-price">
                    $
                    {formatCurrency(
                      dealOfTheDayProduct?.price -
                        dealOfTheDayProduct?.discount,
                      "en-US"
                    ) || 0}
                  </span>
                  <span className="old-price">
                    Was $
                    {formatCurrency(dealOfTheDayProduct?.price, "en-US") || 0}
                  </span>
                </div>
                <Link
                  to={PATHS.PRODUCTS + `/${dealOfTheDayProduct?.slug}`}
                  className="btn btn-link"
                >
                  <span>Shop Now</span>
                  <i className="icon-long-arrow-right" />
                </Link>
              </div>
              <div className="deal-bottom">
                <CountDown targetTime={targetTime} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="products">
              <div className="row">
                <div className="col-6">
                  <ProductCard product={dealProducts?.[1]} />
                </div>
                <div className="col-6">
                  <ProductCard product={dealProducts?.[2]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="more-container text-center mt-3 mb-0">
          <Button
            link={PATHS.PRODUCTS}
            variant="outline-dark"
            className="btn-round btn-more"
          >
            <span>Shop more</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeDeals;
