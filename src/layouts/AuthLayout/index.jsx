import { Link } from "react-router-dom";
import Logo from "../../assets/logos/logo.png";
import { LoginImage } from "../../common/assets/pictures";
import "./index.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="authLayoutContainer">
      <div className="authLayoutContainer-left">
        <LoginImage />
      </div>
      <div className="authLayoutContainer-right">
        <Link to="/">
          <img src={Logo} alt="logo de l'application" />
        </Link>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
