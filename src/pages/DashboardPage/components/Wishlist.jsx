import { authService } from "@/services/authService";
import { handleGetInfo } from "@/store/reducers/authReducer";
import { handleAddCart } from "@/store/reducers/cartReducer";
import { Empty, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
  const { profile } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const _onAddToCart = (index) => {
    const addPayload = {
      addedId: profile?.whiteList[index]?.id,
      addedColor: profile?.whiteList[index]?.color[0],
      addedQuantity: 1,
      addedPrice:
        profile?.whiteList[index]?.price - profile?.whiteList[index]?.discount,
    };

    // console.log("payload", addPayload);
    if (addPayload) {
      dispatch(handleAddCart(addPayload));
    }
  };

  const _onRemoveWhitelist = async (id, index) => {
    if (id) {
      try {
        const res = await authService.deleteWhitelistProduct({ product: id });
        if (res) {
          dispatch(handleGetInfo());
          message.success("Thành công");
        }
      } catch (error) {
        console.log("error", error);
        message.error("error");
      }
    }
  };

  if (profile && profile?.whiteList?.length < 1) {
    return (
      <Empty description={"Chưa có sản phẩm nào trong danh sách yêu thích"} />
    );
  }

  return (
    <div
      className="tab-pane fade show active"
      id="tab-wishlist"
      role="tabpanel"
      aria-labelledby="tab-wishlist-link"
    >
      <table className="table table-wishlist table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {profile?.whiteList?.map((item, index) => {
            const { id, images, stock, title, price, slug } = item || {};
            return (
              <tr key={id}>
                <td className="product-col">
                  <div className="product">
                    <figure className="product-media">
                      <a href="#">
                        <img src={images[1] || ""} alt="Product image" />
                      </a>
                    </figure>
                    <h3 className="product-title">
                      <a href="#">{title}</a>
                    </h3>
                  </div>
                </td>
                <td className="price-col text-center">${price}</td>
                <td className="stock-col text-center">
                  <span className={stock > 0 ? "in-stock" : "out-of-stock"}>
                    {stock > 0 ? "In stock" : "Out stock"}
                  </span>
                </td>
                <td className="action-col">
                  <button
                    onClick={() => _onAddToCart(index)}
                    className={`btn btn-block btn-outline-primary-2 ${
                      stock < 0 && "disabled"
                    }`}
                  >
                    <i className="icon-cart-plus" />
                    Add to Cart{" "}
                  </button>
                </td>
                <td className="remove-col">
                  <button
                    className="btn-remove"
                    onClick={() => _onRemoveWhitelist(id, index)}
                  >
                    <i className="icon-close" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
