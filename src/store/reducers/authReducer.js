import { authService } from "@/services/authService";
import { tokenMethod } from "@/utils/tokenMethod";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { handleGetCart } from "./cartReducer";

const initialState = {
  statusModal: "",
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
    whiteList: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleStatusModal: (state, action) => {
      state.statusModal = action.payload;
    },
    handleCloseModal: (state) => {
      state.statusModal = "";
    },
    handleLogout: (state) => {
      tokenMethod.remove();
      state.profile = null;
      state.statusModal = "";

      message.success("Đăng xuất thành công");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleGetInfo.fulfilled, (state, action) => {
      // Same for the comments
      state.profile = action.payload;
      state.loading.getProfile = false;
    });
    builder.addCase(handleGetInfo.pending, (state) => {
      // Same for the comments
      state.loading.getProfile = true;
    });

    builder.addCase(handleGetInfo.rejected, (state) => {
      // Same for the comments
      state.loading.getProfile = false;
    });

    builder.addCase(handleLogin.fulfilled, (state, action) => {
      // Same for the comments
      state.loading.login = false;
      state.statusModal = "";
    });
    builder.addCase(handleLogin.pending, (state) => {
      state.loading.login = true;
    });

    builder.addCase(handleLogin.rejected, (state) => {
      // Same for the comments
      state.loading.login = false;
    });

    builder.addCase(handleAddWhiteList.fulfilled, (state, action) => {
      // Same for the comments
      state.loading.whiteList = false;
    });
    builder.addCase(handleAddWhiteList.pending, (state) => {
      state.loading.whiteList = true;
    });

    builder.addCase(handleAddWhiteList.rejected, (state) => {
      // Same for the comments
      state.loading.whiteList = false;
    });
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = authSlice;
export const { handleStatusModal, handleCloseModal, handleLogout } = actions;

export default reducer;

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (payload, thunkApi) => {
    try {
      const res = await authService.register(payload);

      if (res?.fullData?.id) {
        message.success("Đăng ký thành công");
        thunkApi.dispatch(
          handleLogin({ email: payload.email, password: payload.password })
        );

        return true;
      } else {
        throw false;
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Forbidden") {
        message.error("Email đã được đăng ký");
      }
      return thunkApi.rejectWithValue(errorInfo);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (payload, { dispatch, getState }) => {
    try {
      const res = await authService.login(payload);
      const { token: accessToken, refreshToken } = res?.data?.data || {};
      if (accessToken) {
        tokenMethod.set({ accessToken, refreshToken });
        dispatch(handleGetInfo());
        dispatch(handleGetCart());
        message.success("Đăng nhập thành công");
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo) {
        message.error(errorInfo.message);
      }
      return thunkApi.rejectWithValue(errorInfo);
    }
  }
);

export const handleGetInfo = createAsyncThunk(
  "auth/handleGetInfo",
  async (_, thunkApi) => {
    try {
      const resInfo = await authService.getProfile();
      return resInfo.fullData;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const handleAddWhiteList = createAsyncThunk(
  "auth/handleAddWhiteList",
  async (payload, { dispatch, getState }) => {
    const { profile } = getState()?.authReducer || {};
    const { whiteList } = profile || {};

    const isExist = whiteList?.findIndex(
      (item) => item.id === payload?.product
    );

    if (isExist > -1) {
      return message.error("Sản phẩm đã tổn tại trong Wishlist");
    }

    try {
      const resInfo = await authService.addWhiteListProduct(payload);
      if (resInfo) {
        dispatch(handleGetInfo());
        message.success("Thêm thành công");
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      return dispatch.rejectWithValue(error?.response?.data);
    }
  }
);
