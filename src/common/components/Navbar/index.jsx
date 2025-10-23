import { NavLink } from "react-router-dom";
import { themeColors } from "../../../styles/themeColors";

import "./index.css";

const Navbar = ({ className }) => {
  return (
    <div className={`navbar ${className}`}>
      <NavLink
        to="/"
        style={{
          backgroundColor: themeColors.violet.main,
          "--pulse-color": themeColors.violet.main,
        }}
        end
        className={({ isActive }) =>
          `pulse ${isActive ? "active" : ""} ${className ? className : ""}`
        }
      >
        Accueil
      </NavLink>
      <NavLink
        to="/videos"
        style={{
          backgroundColor: themeColors.orange.main,
          "--pulse-color": themeColors.orange.main,
        }}
        className={({ isActive }) =>
          `pulse ${isActive ? "active" : ""} ${className ? className : ""}`
        }
      >
        Vidéos
      </NavLink>
      <NavLink
        to="/temoignages"
        style={{
          backgroundColor: themeColors.yellow.main,
          "--pulse-color": themeColors.yellow.main,
        }}
        className={({ isActive }) =>
          `pulse ${isActive ? "active" : ""} ${className ? className : ""}`
        }
      >
        Témoignages
      </NavLink>
      <NavLink
        to="/contact"
        style={{
          backgroundColor: themeColors.teal.main,
          "--pulse-color": themeColors.teal.main,
        }}
        className={({ isActive }) =>
          `pulse ${isActive ? "active" : ""} ${className ? className : ""}`
        }
      >
        Contact
      </NavLink>
    </div>
  );
};

export default Navbar;
