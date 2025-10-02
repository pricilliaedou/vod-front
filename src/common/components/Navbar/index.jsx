import { Link } from "react-router-dom";
import { useState } from "react";
import { themeColors } from "../../../styles/themeColors";

import "./index.css";

const Navbar = ({ activeTab = null }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab);
  return (
    <div className="navbar">
      <Link
        to="/"
        style={{
          backgroundColor: themeColors.violet.main,
          "--pulse-color": themeColors.violet.main,
        }}
        className={`pulse ${currentActiveTab === "accueil" ? "active" : ""}`}
        onClick={() => setCurrentActiveTab("accueil")}
      >
        Accueil
      </Link>
      <Link
        to="/"
        style={{
          backgroundColor: themeColors.orange.main,
          "--pulse-color": themeColors.orange.main,
        }}
        className={`pulse ${currentActiveTab === "videos" ? "active" : ""}`}
        onClick={() => setCurrentActiveTab("videos")}
      >
        Vidéos
      </Link>
      <Link
        to="/"
        style={{
          backgroundColor: themeColors.yellow.main,
          "--pulse-color": themeColors.yellow.main,
        }}
        className={`pulse ${
          currentActiveTab === "temoignages" ? "active" : ""
        }`}
        onClick={() => setCurrentActiveTab("temoignages")}
      >
        Témoignages
      </Link>
      <Link
        to="/"
        style={{
          backgroundColor: themeColors.teal.main,
          "--pulse-color": themeColors.teal.main,
        }}
        className={`pulse ${currentActiveTab === "contact" ? "active" : ""}`}
        onClick={() => setCurrentActiveTab("contact")}
      >
        Contact
      </Link>
    </div>
  );
};

export default Navbar;
