import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { ENV } from "@/constants/environments";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    authReducer,
    cartReducer,
  },
  devTools: ENV === "development",
});

export default store;
