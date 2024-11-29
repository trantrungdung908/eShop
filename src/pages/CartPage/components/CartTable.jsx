import ProductColor from "@/components/ProductColor";
import QuantityInput from "@/components/QuantityInput";
import { PATHS } from "@/constants/path";
import { Empty, Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductTitle = styled.h3`
  display: flex !important;
  flex-direction: column;
  gap: 10px;
  .product-variant {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
  }
  .product-nav-dots {
    margin: 0;
  }
`;

const CartTable = ({
  products,
  quantityRef,
  handleUpdateQuantity,
  handleRemoveProduct,
}) => {
  const { confirm } = Modal;
  const _onRemoveClick = (e, removeIndex) => {
    e?.preventDefault();
    e?.stopPropagation();
    const removeProduct = products?.[removeIndex] || {};

    confirm({
      title: "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không?",
      content: (
        <>
          <p>{`${removeProduct.name || ""}`}</p>
          <p>{`${removeProduct.quantity || 0} x $${removeProduct.price}`}</p>
        </>
      ),
      onOk() {
        handleRemoveProduct?.(removeIndex);
      },
      onCancel() {
        return;
      },
    });
  };
  return (
    <div className="col-lg-9">
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products?.map((item, index) => {
              const {
                id,
                slug,
                images,
                name,
                price,
                quantity,
                totalProduct,
                variant,
              } = item || {};
              const detailPath = PATHS.PRODUCTS + `/${slug}`;
              return (
                <tr key={index + id}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={detailPath}>
                          <img src={images[0]} alt={name} />
                        </Link>
                      </figure>
                      <ProductTitle>
                        <h3 className="product-title">
                          <Link to={detailPath}>{name || ""}</Link>
                        </h3>
                        <div className="product-variant">
                          Color: <ProductColor colors={[variant]} />
                        </div>
                      </ProductTitle>
                    </div>
                  </td>
                  <td className="price-col">${price || 0}</td>
                  <td className="quantity-col">
                    <div className="cart-product-quantity">
                      <QuantityInput
                        ref={(thisRef) => {
                          return (quantityRef.current[index] = thisRef);
                        }}
                        max={100}
                        defaultValue={quantity}
                        onChange={(value) => handleUpdateQuantity(value, index)}
                      />
                    </div>
                  </td>
                  <td className="total-col">${totalProduct}</td>
                  <td className="remove-col">
                    <button
                      onClick={(e) => _onRemoveClick(e, index)}
                      className="btn-remove"
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <Empty description={"Không có sản phẩm nào trong giỏ hàng"} />
          )}
        </tbody>
      </table>
      <div className="cart-bottom">
        {/* <div className="cart-discount">
          <form action="#">
            <div className="input-group">
              <input
                type="text"
                className="form-control input-error"
                required
                placeholder="Coupon code"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary-2" type="submit">
                  <i className="icon-long-arrow-right" />
                </button>
              </div>
            </div>
            <p className="form-error">Please fill in this field</p>
          </form>
        </div> */}
        {/* <a href="#" className="btn btn-outline-dark-2">
          <span>UPDATE CART</span>
          <i className="icon-refresh" />
        </a> */}
      </div>
    </div>
  );
};

export default CartTable;
