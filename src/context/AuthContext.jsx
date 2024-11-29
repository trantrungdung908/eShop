import { authService } from "@/services/authService";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [statusModal, setStatusModal] = useState("");

  const [profile, setProfile] = useState({});

  // const handleStatusModal = (type) => {
  //   setStatusModal(type || "");
  // };

  // const handleCloseModal = (e) => {
  //   e?.stopPropagation();
  //   setStatusModal("");
  // };

  // const handleLogin = async (params, callback) => {
  //   const payload = {
  //     email: params.email,
  //     password: params.password,
  //   };

  //   try {
  //     const res = await authService.login(payload);
  //     const { token: accessToken, refreshToken } = res?.data?.data || {};
  //     if (accessToken) {
  //       tokenMethod.set({ accessToken, refreshToken });
  //       handleGetInfo();
  //       messageApi.success("Đăng nhập thành công");
  //       handleCloseModal();
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     messageApi.error("Đăng nhập thất bại");
  //   } finally {
  //     callback?.();
  //   }
  // };

  // const handleRegister = async (params, callback) => {
  //   const payload = {
  //     firstName: params.firstName,
  //     lastName: params.lastName,
  //     email: params.email,
  //     password: params.password,
  //   };
  //   try {
  //     const res = await authService.register(payload);

  //     if (res?.fullData?.id) {
  //       messageApi.success("Đăng ký thành công");
  //       await handleLogin({ email: params.email, password: params.password });
  //     }
  //   } catch (error) {
  //     if (error.response?.data.statusCode === 403) {
  //       return messageApi.error("Email đã tồn tại");
  //     } else {
  //       message.error("Đăng ký thất bại");
  //     }
  //   } finally {
  //     callback?.();
  //   }
  // };

  // const handleLogout = () => {
  //   tokenMethod.remove();
  //   setProfile({});
  //   message.success("Đăng xuất thành công");
  // };

  // const handleGetInfo = async () => {
  //   try {
  //     const resInfo = await authService.getProfile();
  //     if (resInfo?.fullData) {
  //       setProfile(resInfo.fullData);
  //     }
  //   } catch (error) {
  //   }
  // };

  // const handleUpdateProfile = async (formData) => {
  //   if (!formData) return;

  //   const { name, phone, facebookURL, website, introduce } = formData;
  //   const payload = {
  //     firstName: name,
  //     lastName: "",
  //     facebookURL,
  //     website,
  //     phone,
  //     introduce,
  //   };

  //   try {
  //     const resInfo = await authService.updateProfile(payload);
  //     setProfile(resInfo?.fullData);
  //     message.success("Cập nhật thành công");
  //   } catch (error) {
  //     message.error("Cập nhật thất bại");
  //     return error;
  //   }
  // };

  return (
    <AuthContext.Provider
      value={
        {
          // statusModal,
          // profile,
          // handleStatusModal,
          // handleCloseModal,
          // handleLogout,
          // handleLogin,
          // handleRegister,
        }
      }
    >
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
