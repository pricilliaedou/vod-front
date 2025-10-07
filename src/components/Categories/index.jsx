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
      </a>
      <a href="#" className="categories-glossaire">
        <Glossaire className="inner" />
      </a>
      <a href="#" className="categories-cyberharcelement">
        <Cyberharcelement className="inner" />
      </a>
      <a href="#" className="categories-solitude">
        <Solitude className="inner" />
      </a>
      <a href="#" className="categories-sinformer">
        <Sinformer className="inner" />
      </a>
      <a href="#" className="categories-sommeil">
        <Sommeil className="inner" />
      </a>
      <a href="#" className="categories-RS">
        <ReseauxSociaux className="inner" />
      </a>
      <a href="#" className="categories-jeuxVideos">
        <JeuxVideos className="inner" />
      </a>
      <a href="#" className="categories-center">
        <Prevention className="inner" />
      </a>
    </div>
  );
};

export default Categories;
