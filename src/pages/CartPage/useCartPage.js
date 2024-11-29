import { SHIPPING_OPTIONS } from "@/constants/general";
import {
  handleRemoveFromCart,
  handleUpdateCart,
} from "@/store/reducers/cartReducer";
import { reduceArrNumber } from "@/utils/calculate";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCartPage = () => {
  const { cartInfo, cartLoading } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const quantityRef = useRef([]);

  const {
    product,
    quantity,
    totalProduct,
    discount,
    shipping,
    total,
    subTotal,
    variant,
  } = cartInfo || {};

  const updateQuantityTimeout = useRef();

  const handleUpdateQuantity = (updateQuantity, updateIndex) => {
    const getPayload = () => {
      const newQuantity = quantity.map((item, index) =>
        index === updateIndex ? updateQuantity : item
      );

      const newTotalProduct = totalProduct.map((item, index) =>
        index === updateIndex
          ? product[updateIndex].price * updateQuantity
          : item
      );

      const newSubtotal = reduceArrNumber(newTotalProduct);
      const newTotal = newSubtotal - (discount ?? 0) + (shipping?.price ?? 0);

      return {
        ...cartInfo,
        product: product.map((item) => item.id),
        quantity: newQuantity,
        totalProduct: newTotalProduct,
        subTotal: newSubtotal,
        total: newTotal,
      };
    };

    if (updateQuantityTimeout.current) {
      clearTimeout(updateQuantityTimeout.current);
    }

    updateQuantityTimeout.current = setTimeout(async () => {
      if (
        !cartLoading &&
        updateQuantity !== "" &&
        quantity[updateIndex] !== updateQuantity
      ) {
        try {
          const res = await dispatch(handleUpdateCart(getPayload())).unwrap();
        } catch (error) {
          quantityRef.current[updateIndex]?.reset();
        }
      }
    }, 300);
  };

  const handleRemoveProduct = (removeIndex) => {
    if (cartLoading || removeIndex < 0) return;
    dispatch(handleRemoveFromCart({ removeIndex }));
  };

  const handleUpdateShipping = (selectedTypeShip) => {
    const selectedShipping = SHIPPING_OPTIONS.find(
      (option) => option.value === selectedTypeShip
    );
    if (selectedShipping) {
      const updatedPayload = {
        ...cartInfo,
        product: product?.map((item) => item.id),
        shipping: {
          typeShip: selectedShipping.value,
          price: selectedShipping.price,
        },
        total: total - (shipping?.price || 0) + selectedShipping.price,
      };
      dispatch(handleUpdateCart(updatedPayload));
    }
  };

  const cartTableProps = {
    products: product?.map((item, index) => {
      return {
        ...item,
        quantity: quantity?.[index],
        totalProduct: totalProduct?.[index],
        variant: variant?.[index],
      };
    }),
    quantityRef,
    handleUpdateQuantity,
    handleRemoveProduct,
  };

  const cartSummaryProps = {
    total,
    subTotal,
    typeShip: shipping?.typeShip,
    handleUpdateShipping,
  };
  return {
    cartTableProps,
    cartSummaryProps,
  };
};

export default useCartPage;
