import { PATHS } from "@/constants/path";
import { handleAddWhiteList } from "@/store/reducers/authReducer";
import { handleAddCart } from "@/store/reducers/cartReducer";
import { transNumberToPercent } from "@/utils/format";
import { message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { slug } = product;
  const detailPath = `${PATHS.PRODUCTS}/${slug}`;
  const dispatch = useDispatch();

  const _onAddToCart = (e) => {
    e?.preventDefault();
    const addPayload = {
      addedId: product?.id,
      addedColor: product?.color[0],
      addedQuantity: 1,
      addedPrice: product?.price - product?.discount,
    };

    if (addPayload) {
      dispatch(handleAddCart(addPayload));
    }
  };

  const _onAddToWhitelist = (e, id) => {
    e?.preventDefault();
    if (!id) return;
    dispatch(handleAddWhiteList({ product: id }));
  };
  return (
    <div className="product product-2">
      <figure className="product-media">
        <Link to={detailPath}>
          <img
            src={product?.images[0]}
            alt="Product image"
            className="product-image"
          />
        </Link>
        <div className="product-action-vertical">
          <a
            href="#"
            className="btn-product-icon btn-wishlist btn-expandable"
            onClick={(e) => _onAddToWhitelist(e, product?.id)}
          >
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a
            href="#"
            onClick={(e) => _onAddToCart(e)}
            className="btn-product btn-cart"
            title="Add to cart"
          >
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={detailPath}>{product?.name}</Link>
        </h3>
        <div className="product-price">${product?.price}</div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${transNumberToPercent(product?.rating)}%` }}
            />
          </div>
          {/* <span className="ratings-text">({product?.rating} Rates)</span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
