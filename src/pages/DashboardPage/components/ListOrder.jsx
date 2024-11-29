import { PATHS } from "@/constants/path";
import useQuery from "@/hooks/useQuery";
import { orderSevice } from "@/services/orderSevice";
import { Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ListOrder = () => {
  const {
    data: orderMeData,
    loading: loadingOrderMe,
    error,
  } = useQuery(orderSevice.getOrdersMe);

  if (loadingOrderMe) {
    return <Spin />;
  }
  return (
    <div
      className="tab-pane fade show active"
      id="tab-orders"
      role="tabpanel"
      aria-labelledby="tab-orders-link"
    >
      {orderMeData?.orders?.length < 1 && !loadingOrderMe ? (
        <>
          <p>No order has been made yet.</p>
          <Link to={PATHS.PRODUCTS} className="btn btn-outline-primary-2">
            <span>GO SHOP</span>
            <i className="icon-long-arrow-right" />
          </Link>
          <br />
          <br />
        </>
      ) : (
        <table className="table table-cart table-mobile">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderMeData?.orders.map((order) => {
              const { product, quantity, subTotal } = order || {};
              return product?.map((item, index) => {
                const { id, images, name, price, discount, slug } = item;
                const detailPath = `${PATHS.PRODUCTS}/${slug}`;
                return (
                  <tr key={id + index}>
                    <td className="product-col">
                      <div className="product">
                        <figure className="product-media">
                          <Link to={detailPath}>
                            <img src={images[0]} alt="Product image" />
                          </Link>
                        </figure>
                        <h3 className="product-title">
                          <Link to={detailPath}>{name}</Link>
                        </h3>
                      </div>
                    </td>
                    <td className="price-col text-center">
                      ${price} {discount > 0 && `- (${discount}$)`}
                    </td>
                    <td className="quantity-col text-center">
                      {quantity[index]}
                    </td>
                    <td className="total-col text-center">
                      ${(price - discount) * quantity[index]}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
          <tbody>{}</tbody>
        </table>
      )}
    </div>
  );
};

export default ListOrder;
