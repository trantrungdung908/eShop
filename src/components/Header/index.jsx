import HeaderMenu from "./components/HeaderMenu";
import HeaderTop from "./components/HeaderTop";

const Header = () => {
  return (
    <header className="header">
      <HeaderTop />

      <HeaderMenu />
    </header>
  );
};

export default Header;
