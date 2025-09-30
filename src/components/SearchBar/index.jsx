import { themeColors } from "../../styles/themeColors";
import magnifyingGlass from "../../assets/magnifying-glass.png";
import "./index.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Recherche"
        style={{ backgroundColor: themeColors.violet.light }}
      />
      <img
        className="search-bar-icon"
        src={magnifyingGlass}
        alt="magnifying glass"
      />
    </div>
  );
};

export default SearchBar;
