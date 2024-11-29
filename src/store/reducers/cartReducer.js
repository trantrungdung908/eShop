import { cartService } from "@/services/cartService";
import { reduceArrNumber } from "@/utils/calculate";
import { tokenMethod } from "@/utils/tokenMethod";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { handleStatusModal } from "./authReducer";
import { MODAL_TYPES } from "@/constants/general";

const initialState = {
  cartInfo: {},
  cartLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleGetCart.fulfilled, (state, action) => {
      // Same for the comments
      state.cartLoading = false;
      state.cartInfo = action.payload;
    });
    builder.addCase(handleGetCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleGetCart.rejected, (state) => {
      // Same for the comments
      state.cartLoading = false;
      state.cartInfo = {};
    });

    builder.addCase(handleAddCart.fulfilled, (state, action) => {
      // Same for the comments
      state.cartLoading = false;
    });
    builder.addCase(handleAddCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleAddCart.rejected, (state) => {
      // Same for the comments
      state.cartLoading = false;
    });

    builder.addCase(handleRemoveFromCart.fulfilled, (state, action) => {
      // Same for the comments
      state.cartLoading = false;
    });
    builder.addCase(handleRemoveFromCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleRemoveFromCart.rejected, (state) => {
      // Same for the comments
      state.cartLoading = false;
    });

    builder.addCase(handleUpdateCart.fulfilled, (state, action) => {
      // Same for the comments
      state.cartLoading = false;
    });
    builder.addCase(handleUpdateCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleUpdateCart.rejected, (state) => {
      // Same for the comments
      state.cartLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer: cartReducer } = cartSlice;
export const { updateCacheCart, clearCart } = actions;

export default cartReducer;

export const handleGetCart = createAsyncThunk(
  "cart/getCart",
  async (_, thunkApi) => {
    try {
      const res = await cartService.getCart();

      return res?.fullData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const handleAddCart = createAsyncThunk(
  "cart/addCart",
  async (payload, thunkApi) => {
    if (!!!tokenMethod.get()) {
      return thunkApi.dispatch(handleStatusModal(MODAL_TYPES.login));
    }
    try {
      const { addedId, addedColor, addedQuantity, addedPrice } = payload;
      const { cartInfo } = thunkApi.getState()?.cartReducer || {};

      let addPayload = {};
      if (cartInfo?.id) {
        // clone data
        const newProduct = cartInfo.product.map((item) => item.id);
        const newQuantity = [...(cartInfo.quantity ?? [])];
        const newVariant = [...(cartInfo.variant ?? [])];
        const newTotalProduct = [...(cartInfo.totalProduct ?? [])];

        // check id product exist
        const matchIndex = cartInfo?.product?.findIndex((product, index) => {
          return (
            product.id === addedId && cartInfo.variant[index] === addedColor
          );
        });

        if (matchIndex > -1) {
          newQuantity[matchIndex] += addedQuantity;
          newTotalProduct[matchIndex] =
            newTotalProduct[matchIndex] + addedPrice * addedQuantity;
        } else {
          newProduct.push(addedId);
          newQuantity.push(addedQuantity);
          newVariant.push(addedColor);
          newTotalProduct.push(addedPrice * addedQuantity);
        }

        const newSubtotal = newTotalProduct.reduce(
          (pre, cur) => Number(pre) + Number(cur),
          0
        );
        const newTotal = newSubtotal - cartInfo.discount;
        addPayload = {
          ...cartInfo,
          product: newProduct,
          quantity: newQuantity,
          variant: newVariant,
          totalProduct: newTotalProduct,
          total: newTotal,
          subTotal: newSubtotal,
        };
      } else {
        addPayload = {
          product: [addedId],
          quantity: [addedQuantity],
          variant: [addedColor],
          totalProduct: [addedPrice * addedQuantity],
          subTotal: addedPrice * addedQuantity,
          total: addedPrice * addedQuantity,
          discount: 0,
          paymentMethod: "",
        };
      }
      const res = await cartService.updateCart(addPayload);
      if (res) {
        thunkApi.dispatch(handleGetCart());
        message.success("Thêm vào giỏ hàng thành công");
      }

      return res?.fullData;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Thêm vào giỏ hàng thất bại!!!");
    }
  }
);

export const handleRemoveFromCart = createAsyncThunk(
  "cart/removeCart",
  async (payload, thunkApi) => {
    const { removeIndex } = payload || {};
    const { getState, dispatch, rejectWithValue } = thunkApi;
    const { cartInfo } = getState()?.cartReducer || {};

    if (removeIndex < 0) return false;
    try {
      // lấy toàn bộ id product !== index bị xoá
      const newProduct = cartInfo?.product
        ?.filter((_, index) => index !== removeIndex)
        .map((item) => item.id);

      const newVariant = cartInfo?.variant?.filter(
        (_, index) => index !== removeIndex
      );

      const newQuantity = cartInfo?.quantity?.filter(
        (_, index) => index !== removeIndex
      );

      const newTotalProduct = cartInfo.totalProduct?.filter(
        (_, index) => index !== removeIndex
      );

      const newSubtotal = reduceArrNumber(newTotalProduct);
      const newTotal =
        newSubtotal -
        (cartInfo.discount ?? 0) +
        (cartInfo.shipping?.price ?? 0);

      // setup payload
      const updatePayload = {
        ...cartInfo,
        product: newProduct,
        quantity: newQuantity,
        variant: newVariant,
        totalProduct: newTotalProduct,
        subTotal: newSubtotal,
        total: newTotal,
        shipping: newProduct?.length > 0 ? cartInfo?.shipping : {},
        discount: newProduct?.length > 0 ? cartInfo?.discount : 0,
      };

      const cartRes = await cartService.updateCart(updatePayload);
      if (cartRes) {
        dispatch(handleGetCart());
        message.success("Xoá sản phẩm trong giỏ hàng thành công");
      }
      return cartRes?.fullData;
    } catch (error) {
      message.error("Xoá sản phẩm trong giỏ hàng thất bại!!!");
      return rejectWithValue(error);
    }
  }
);

export const handleUpdateCart = createAsyncThunk(
  "cart/updateCart",
  async (payload, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const cartRes = await cartService.updateCart(payload);
      if (cartRes) {
        dispatch(handleGetCart());
        message.success("Cập nhật thành công");
      }
      return cartRes?.fullData;
    } catch (error) {
      message.error("Xoá sản phẩm trong giỏ hàng thất bại!!!");
      return rejectWithValue(error);
    }
  }
);
