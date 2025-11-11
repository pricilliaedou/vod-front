import { Link } from "react-router-dom";
import {
  Sommeil,
  Cerveau,
  Solitude,
  Prevention,
  JeuxVideos,
  ReseauxSociaux,
  Cyberharcelement,
} from "../../common/assets/pictures";

import "./index.css";

const Categories = ({ isAuthenticated = false }) => {
  const linkPath = isAuthenticated ? "/videos" : "/login";

  return (
    <div className="categories">
      <Link to={linkPath} className="categories-cerveau">
        <Cerveau className="inner" />
        <span className="categories-text">Cerveau</span>
      </Link>
      <Link to={linkPath} className="categories-cyberharcelement">
        <Cyberharcelement className="inner" />
        <span className="categories-text" title="Cyberharcèlement">
          Cyberharcèlement
        </span>
      </Link>
      <Link to={linkPath} className="categories-solitude">
        <Solitude className="inner" />
        <span className="categories-text">Solitude</span>
      </Link>
      <Link to={linkPath} className="categories-sommeil">
        <Sommeil className="inner" />
        <span className="categories-text">Sommeil</span>
      </Link>
      <Link to={linkPath} className="categories-RS">
        <ReseauxSociaux className="inner" />
        <span className="categories-text">Réseaux sociaux</span>
      </Link>
      <Link to={linkPath} className="categories-jeuxVideos">
        <JeuxVideos className="inner" />
        <span className="categories-text">Jeux vidéos</span>
      </Link>
      <Link to={linkPath} className="categories-center">
        <Prevention className="inner" />
        <span className="categories-text">Prévention</span>
      </Link>
    </div>
  );
};

export default Categories;
