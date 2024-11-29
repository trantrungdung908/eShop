import scrollTo from "@/utils/scrollTo";
import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { pathname } = useLocation();

  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      scrollTo();
    }, 100);

    return () => {
      clearTimeout(myTimeOut);
    };
  }, [pathname]);

  const handleToggleNav = () => {
    if (isShowMenu) {
      $("body").removeClass("mmenu-active");
    } else {
      $("body").addClass("mmenu-active");
    }
    setIsShowMenu(!isShowMenu);
  };

  return (
    <MainContext.Provider value={{ isShowMenu, handleToggleNav }}>
      {contextHolder}

      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

export const useMainContext = () => useContext(MainContext);
