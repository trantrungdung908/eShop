import React from "react";
import Button from "../Button";
import { PATHS } from "@/constants/path";
import { Empty } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProductColor from "../ProductColor";

const DropdownContainer = styled.div`
  max-height: 30vh;
  overflow-y: scroll;
  padding-right: 25px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ProductCardDetailWrapper = styled.h3`
  display: flex !important;
  flex-direction: column;
  gap: 10px;
  .product-variant {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
  }
  .product-nav-dots {
    margin: 0;
  }
`;

const CartDropDown = ({ products, total, shipping, handleRemoveProduct }) => {
  const _onRemoveClick = (e, index) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleRemoveProduct?.(index);
  };

  return (
    <div className="dropdown cart-dropdown">
      <a
        href="#"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <i className="icon-shopping-cart" />
        <span className="cart-count">{products?.length || 0}</span>
      </a>
      <div className="dropdown-menu dropdown-menu-right" style={{ width: 400 }}>
        {products?.length > 0 ? (
          <></>
        ) : (
          <Empty description={`Không có sản phẩm nào trong giỏ hàng`} />
        )}

        <DropdownContainer className="dropdown-cart-products">
          {products?.map((item, index) => {
            const { id, images, name, price, slug, quantity, variant } =
              item || {};

            const detailPath = PATHS.PRODUCTS + `/${slug}`;
            let imagePath = images?.[0];
            if (imagePath?.split("https")?.length > 2) {
              imagePath = imagePath?.split("https");
              imagePath = "https" + imagePath[2];
            }
            return (
              <div className="product" key={id + index}>
                <ProductCardDetailWrapper className="product-cart-details">
                  <h4 className="product-title">
                    <Link to={detailPath}>{name}</Link>
                  </h4>
                  <div className="product-variant">
                    Color: <ProductColor colors={[variant]} />
                  </div>
                  <span className="cart-product-info">
                    <span className="cart-product-qty">{quantity || 0}</span> x
                    ${price}{" "}
                  </span>
                </ProductCardDetailWrapper>
                <figure className="product-image-container">
                  <Link to={detailPath} className="product-image">
                    <img src={imagePath} alt={name} />
                  </Link>
                </figure>
                <a
                  onClick={(e) => _onRemoveClick(e, index)}
                  href="#"
                  className="btn-remove"
                  title="Remove Product"
                >
                  <i className="icon-close" />
                </a>
              </div>
            );
          })}
        </DropdownContainer>
        <div className="dropdown-cart-total">
          <span>Total</span>
          <span className="cart-total-price">${total || 0}</span>
        </div>
        <div className="dropdown-cart-action">
          <Button link={PATHS.CART} className="btn btn-primary" variant="">
            View Cart
          </Button>
          {shipping?.typeShip && (
            <Button link={PATHS.CHECKOUT}>
              <span>Checkout</span>
              <i className="icon-long-arrow-right" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDropDown;
