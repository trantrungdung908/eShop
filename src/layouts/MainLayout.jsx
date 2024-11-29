import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import AuthModal from "@/components/Modal";
import ScrollTop from "@/components/ScrollTop";
import MainContextProvider from "@/context/MainContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>

      <ScrollTop />
      <MobileMenu />
      <AuthModal />
    </MainContextProvider>
  );
};

export default MainLayout;
