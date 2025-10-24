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
  const linkPath = isAuthenticated ? "/videos" : "/";

  return (
    <div className="categories">
      <a href={linkPath} className="categories-cerveau">
        <Cerveau className="inner" />
        <span className="categories-text">Cerveau</span>
      </a>
      <a href={linkPath} className="categories-cyberharcelement">
        <Cyberharcelement className="inner" />
        <span className="categories-text">Cyberharcèlement</span>
      </a>
      <a href={linkPath} className="categories-solitude">
        <Solitude className="inner" />
        <span className="categories-text">Solitude</span>
      </a>
      <a href={linkPath} className="categories-sommeil">
        <Sommeil className="inner" />
        <span className="categories-text">Sommeil</span>
      </a>
      <a href={linkPath} className="categories-RS">
        <ReseauxSociaux className="inner" />
        <span className="categories-text">Réseaux sociaux</span>
      </a>
      <a href={linkPath} className="categories-jeuxVideos">
        <JeuxVideos className="inner" />
        <span className="categories-text">Jeux vidéos</span>
      </a>
      <a href={linkPath} className="categories-center">
        <Prevention className="inner" />
        <span className="categories-text">Prévention</span>
      </a>
    </div>
  );
};

export default Categories;
