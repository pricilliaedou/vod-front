import cyberharcelement from "../../assets/images/cyberharcelement.webp";
import prevention from "../../assets/images/prevention.webp";
import sommeil from "../../assets/images/sommeil.webp";
import jeuxVideos from "../../assets/images/jeux-videos.webp";
import RS from "../../assets/images/RS.webp";
import cerveau from "../../assets/images/cerveau.webp";
import sInformer from "../../assets/images/s-informer.webp";
import solitude from "../../assets/images/solitude.webp";
import glossaire from "../../assets/images/glossaire.webp";
import impactRS from "../../assets/images/impact-rs.png";
import loginImage from "../../assets/images/login-img.webp";
import cloud from "../../assets/images/cloud.png";
import bubbles from "../../assets/images/bubbles.webp";
import error404 from "../../assets/images/error404.webp";

export const Cyberharcelement = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={cyberharcelement}
        alt="image illustrant le cyberharcèlement"
        className={className}
      />
    </>
  );
};

export const Prevention = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={prevention}
        alt="image pour illustrer la prévention"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const JeuxVideos = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={jeuxVideos}
        alt="image illustrant l'addiction aux jeux vidéos"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const ReseauxSociaux = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={RS}
        alt="image illustrant l'impact des réseaux sociaux"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const Cerveau = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={cerveau}
        alt="image illustrant l'impact des écrans sur le cerveau"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const Sinformer = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={sInformer}
        alt="image illustrant la nécessité de s'informer"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const Solitude = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={solitude}
        alt="image illustrant la solitude"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const Glossaire = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={glossaire}
        alt="image illustrant le glossaire"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const Sommeil = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={sommeil}
        alt="illustration de l'impact des écrans sur le sommeil"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const ImpactRS = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={impactRS}
        alt="illustration de l'impact des réseaux sociaux"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const LoginImage = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={loginImage}
        alt="illustration de la connexion"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const Cloud = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={cloud}
        alt="image d'un nuage"
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const Bubbles = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={bubbles}
        alt="image d'un coeur d'une étoiles et d'un hashtag. Eléments décoratifs de la page d'accueil."
        loading="lazy"
        className={className}
      />
    </>
  );
};

export const Error404Img = ({ className = "" } = {}) => {
  return (
    <>
      <img
        src={error404}
        alt="image d'un canard utilisant un ordinateur"
        loading="lazy"
        className={className}
      />
    </>
  );
};
