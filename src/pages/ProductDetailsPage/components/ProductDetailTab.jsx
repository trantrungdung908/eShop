import { formatDate, transNumberToPercent } from "@/utils/format";
import React, { useState } from "react";

const TABS = {
  description: "Description",
  shipping_returns: `Shipping &amp; Returns`,
  reviews: "Reviews",
};

const ProductDetailTab = ({ description, shippingReturn, reviews }) => {
  const [tabs, setTabs] = useState(TABS.description);

  const _handleTabs = (e, tab) => {
    e?.preventDefault();
    setTabs(tab);
  };
  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            onClick={(e) => _handleTabs(e, TABS.description)}
            className={`nav-link ${tabs === TABS.description ? "active" : ""}`}
            id="product-desc-link"
            data-toggle="tab"
            href="#product-desc-tab"
            role="tab"
            aria-controls="product-desc-tab"
            aria-selected="true"
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={(e) => _handleTabs(e, TABS.shipping_returns)}
            className={`nav-link ${
              tabs === TABS.shipping_returns ? "active" : ""
            }`}
            id="product-shipping-link"
            data-toggle="tab"
            href="#product-shipping-tab"
            role="tab"
            aria-controls="product-shipping-tab"
            aria-selected="false"
          >
            Shipping &amp; Returns
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={(e) => _handleTabs(e, TABS.reviews)}
            className={`nav-link ${tabs === TABS.reviews ? "active" : ""}`}
            id="product-review-link"
            data-toggle="tab"
            href="#product-review-tab"
            role="tab"
            aria-controls="product-review-tab"
            aria-selected="false"
          >
            Reviews ({reviews?.length || 0})
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className={`tab-pane ${
            tabs === TABS.description ? "fade show active" : ""
          }`}
          id="product-desc-tab"
          role="tabpanel"
          aria-labelledby="product-desc-link"
        >
          <div className="product-desc-content">
            <h3>Product Information</h3>
            <p dangerouslySetInnerHTML={{ __html: description }} />

            {/* <ul>
              <li>
                Nunc nec porttitor turpis. In eu risus enim. In vitae mollis
                elit.{" "}
              </li>
              <li>Vivamus finibus vel mauris ut vehicula.</li>
              <li>
                Nullam a magna porttitor, dictum risus nec, faucibus sapien.
              </li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
              pede. Donec nec justo eget felis facilisis fermentum. Aliquam
              porttitor mauris sit amet orci. Aenean dignissim pellentesque
              felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus.{" "}
            </p> */}
          </div>
        </div>
        <div
          className={`tab-pane ${
            tabs === TABS.shipping_returns ? "fade show active" : ""
          }`}
          id="product-shipping-tab"
          role="tabpanel"
          aria-labelledby="product-shipping-link"
        >
          <div className="product-desc-content">
            <h3>Delivery &amp; returns</h3>
            <p dangerouslySetInnerHTML={{ __html: shippingReturn }} />
          </div>
        </div>
        <div
          className={`tab-pane ${
            tabs === TABS.reviews ? "fade show active" : ""
          }`}
          id="product-review-tab"
          role="tabpanel"
          aria-labelledby="product-review-link"
        >
          <div className="reviews">
            <h3 style={{ fontWeight: 400 }}>
              {reviews?.length
                ? `Reviews (${reviews.length})`
                : "There is no any reviews"}
            </h3>
            {reviews.length > 0 &&
              reviews?.map((review) => {
                const {
                  id,
                  rate,
                  title,
                  order,
                  updatedAt,
                  description: reviewDesc,
                } = review || {};

                return (
                  <div className="review" key={id}>
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">#{order.slice(-4)}</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: `${transNumberToPercent(rate)}` }}
                            />
                          </div>
                        </div>
                        <span className="review-date">
                          {formatDate(updatedAt)}
                        </span>
                      </div>
                      <div className="col">
                        <h4>{title}</h4>
                        <div className="review-content">
                          <p>{reviewDesc}</p>
                        </div>
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (2){" "}
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0){" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTab;
