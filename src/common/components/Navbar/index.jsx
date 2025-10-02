import { Link } from "react-router-dom";
import { themeColors } from "../../../styles/themeColors";

import "./index.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link
        to="/"
        style={{
          backgroundColor: themeColors.violet.main,
          "--pulse-color": themeColors.violet.main,
        }}
        className="pulse"
      >
        Accueil
      </Link>
      <Link to="/" style={{ backgroundColor: themeColors.orange.main }}>
        Vidéos
      </Link>
      <Link to="/" style={{ backgroundColor: themeColors.yellow.main }}>
        Témoignages
      </Link>
      <Link to="/" style={{ backgroundColor: themeColors.teal.main }}>
        Contact
      </Link>
    </div>
  );
};

export default Navbar;
