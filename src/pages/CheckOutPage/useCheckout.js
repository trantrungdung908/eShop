import { PATHS } from "@/constants/path";
import { orderSevice } from "@/services/orderSevice";
import { handleGetCart, updateCacheCart } from "@/store/reducers/cartReducer";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useCheckout = () => {
  const { cartLoading, cartInfo } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddCoupon = async (coupon) => {
    try {
      const couponRes = await orderSevice.getVoucher(coupon);
      const couponInfo = couponRes?.fullData;

      if (couponInfo) {
        const { subTotal, shipping } = cartInfo || {};
        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: couponInfo.value || 0,
            discountCode: couponInfo.code || "",
            total: subTotal - (couponInfo.value || 0) + (shipping?.price || 0),
          })
        );
        message.success("Thêm mã thành công");
      }
    } catch (error) {
      message.error(error?.response.data.message);
    }
  };

  const handleRemoveCoupon = () => {
    try {
      if (cartInfo?.discountCode) {
        const { subTotal, shipping } = cartInfo || {};
        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: 0,
            discountCode: "",
            total: subTotal + (shipping?.price || 0),
          })
        );
      }
      message.success("Xoá mã giảm giá thành công");
    } catch (error) {
      message.error("Xoá mã giảm giá thất bại");
    }
  };
  const couponProps = {
    addedCoupon: cartInfo.discountCode,
    handleAddCoupon,
    handleRemoveCoupon,
  };

  const handleCheckout = async (data) => {
    const { formInfo, cartInfo } = data || {};

    const {
      phone,
      email,
      firstName,
      province,
      district,
      ward,
      street,
      note,
      paymentMethod,
    } = formInfo;

    const {
      product,
      quantity,
      totalProduct,
      discount,
      discountCode,
      total,
      shipping,
      variant,
      subTotal,
    } = cartInfo;

    const checkOutPayload = {
      address: {
        phone,
        email,
        fullName: firstName,
        street: `${street}, ${ward?.label || ""}, ${district?.label || ""}, ${
          province?.label || ""
        } `,
      },
      note,
      paymentMethod,
      shipping,
      variant,
      subTotal,
      total,
      product: product?.map((item) => item.id) || [],
      quantity,
      totalProduct,
      discount,
      discountCode,
    };

    if (checkOutPayload) {
      try {
        const res = await orderSevice.checkoutOrder(checkOutPayload);
        if (res?.fullData) {
          dispatch(handleGetCart());
          message.success("Checkout successfully");
          navigate(PATHS.CHECKOUT_SUCCESS);
        }
      } catch (error) {
        message.error("Checkout failed");
      }
    }
  };

  const checkoutFormProps = {
    handleCheckout,
  };
  return { couponProps, checkoutFormProps };
};

export default useCheckout;
