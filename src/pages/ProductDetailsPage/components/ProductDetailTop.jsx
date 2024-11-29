import ProductColor from "@/components/ProductColor";
import ProductImage from "@/components/ProductImage";
import QuantityInput from "@/components/QuantityInput";
import { PATHS } from "@/constants/path";
import { handleAddWhiteList } from "@/store/reducers/authReducer";
import { transNumberToPercent } from "@/utils/format";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductDetailTop = ({
  images,
  name,
  price,
  color,
  category,
  description,
  stock,
  rating,
  colorRef,
  reviews,
  quantityRef,
  handleAddToCart,
  id,
}) => {
  const categoryPath =
    category?.id && PATHS.PRODUCTS + `?category=${category?.id}`;

  const dispatch = useDispatch();
  const _onAddToWhitelist = (e) => {
    e?.preventDefault();
    if (!id) return;
    dispatch(handleAddWhiteList({ product: id }));
  };
  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <ProductImage images={images} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name || ""}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${transNumberToPercent(rating)}%` }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                {reviews?.length} {reviews?.length > 0 ? "Reviews" : "Review"}
              </a>
            </div>
            <div className="product-price"> ${price} </div>
            <div className="product-content">
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <ProductColor colors={color} ref={colorRef} />
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <QuantityInput max={stock} ref={quantityRef} />
            </div>
            <div className="product-details-action">
              <a
                href="#"
                className="btn-product btn-cart"
                onClick={handleAddToCart}
              >
                <span>add to cart</span>
              </a>
              <div className="details-action-wrapper">
                <a
                  onClick={(e) => _onAddToWhitelist(e)}
                  href="#"
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                >
                  <span>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                <Link to={categoryPath}>{category?.name || ""}</Link>
              </div>
              <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>
                <a
                  href="#"
                  className="social-icon"
                  title="Facebook"
                  target="_blank"
                >
                  <i className="icon-facebook-f" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Twitter"
                  target="_blank"
                >
                  <i className="icon-twitter" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Instagram"
                  target="_blank"
                >
                  <i className="icon-instagram" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Pinterest"
                  target="_blank"
                >
                  <i className="icon-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTop;
