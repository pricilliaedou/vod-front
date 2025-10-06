import logo from "../../assets/logos/logo.png";
import SearchBar from "../../components/SearchBar";
import Button from "../../common/components/Button";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="logo" />
      </div>
      <SearchBar />
      <Button className="button-header">S'identifier</Button>
    </div>
  );
};

export default Header;
