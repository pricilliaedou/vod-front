import {
  Sommeil,
  Cerveau,
  Sinformer,
  Solitude,
  Glossaire,
  Prevention,
  JeuxVideos,
  ReseauxSociaux,
  Cyberharcelement,
} from "../../common/assets/pictures";

import "./index.css";
const Categories = () => {
  return (
    <div className="categories">
      <a href="#" className="categories-cerveau">
        <Cerveau className="inner" />
        <span className="categories-text">Cerveau</span>
      </a>
      <a href="#" className="categories-glossaire">
        <Glossaire className="inner" />
        <span className="categories-text">Glossaire</span>
      </a>
      <a href="#" className="categories-cyberharcelement">
        <Cyberharcelement className="inner" />
        <span className="categories-text">Cyberharcèlement</span>
      </a>
      <a href="#" className="categories-solitude">
        <Solitude className="inner" />
        <span className="categories-text">Solitude</span>
      </a>
      <a href="#" className="categories-sinformer">
        <Sinformer className="inner" />
        <span className="categories-text">S'informer</span>
      </a>
      <a href="#" className="categories-sommeil">
        <Sommeil className="inner" />
        <span className="categories-text">Sommeil</span>
      </a>
      <a href="#" className="categories-RS">
        <ReseauxSociaux className="inner" />
        <span className="categories-text">Réseaux sociaux</span>
      </a>
      <a href="#" className="categories-jeuxVideos">
        <JeuxVideos className="inner" />
        <span className="categories-text">Jeux vidéos</span>
      </a>
      <a href="#" className="categories-center">
        <Prevention className="inner" />
        <span className="categories-text">Prévention</span>
      </a>
    </div>
  );
};

export default Categories;
