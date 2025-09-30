import logo from "../../assets/logos/logo.png";
import SearchBar from "../../components/SearchBar";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="logo" />
      </div>
      <SearchBar />
    </div>
  );
};

export default Header;
