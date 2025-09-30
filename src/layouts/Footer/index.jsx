import { themeColors } from "../../styles/themeColors";
import MENESR from "../../assets/logos/MENESR.png";
import secretariat from "../../assets/logos/secretariat-d-etat-charge-de-l-enfance.png";
import UE_co_founded from "../../assets/logos/eu_co_funded_en.png";
import fondation_des_hopitaux from "../../assets/logos/fondation-des-hopitaux.png";
import "./index.css";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{ backgroundColor: themeColors.violet.main }}
    >
      <div className="footer-logo">
        <div className="footer-logo-left">
          <div className="footer-logo-img">
            <a
              href="https://www.education.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={MENESR}
                alt="Logo du ministère de l'éducation nationale"
              />
            </a>
          </div>
          <div className="footer-logo-img">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://solidarites.gouv.fr/protection-de-lenfance-1"
            >
              <img
                src={secretariat}
                alt="Logo du sécrétariat d'état chargé de l'enfance"
              />
            </a>
          </div>
        </div>
        <div className="footer-logo-right">
          <div className="footer-logo-img">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://ec.europa.eu/regional_policy/information-sources/logo-download-center_en"
            >
              <img src={UE_co_founded} alt="Logo UE_co_founded" />
            </a>
          </div>
          <div className="footer-logo-img">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://don.fondationhopitaux.fr/?affectations=fondationhop%2F%3Futm_campaign%3Dfilrougenomentite&utm_source=google&utm_medium=cpc&utm_outil=motscles&gad_source=1&gclid=Cj0KCQjww5u2BhDeARIsALBuLnMdF06PWXgZqy3lHocIfuKle4XGfqeqiDaKX0TkLCeCEMypOlr9hpUaAvpFEALw_wcB"
            >
              <img
                src={fondation_des_hopitaux}
                alt="Logo de la fondation des hopitaux"
              />
            </a>
          </div>
        </div>
      </div>

      <div>
        <p>Découvrir l'asscoiation </p>
      </div>
      <div>
        <p
          className="footer-contact"
          style={{ backgroundColor: themeColors.violet.light }}
        >
          Nous contacter
        </p>
        <p
          className="footer-contact"
          style={{ backgroundColor: themeColors.yellow.main }}
        >
          Demander une intervention
        </p>
        <p
          className="footer-contact"
          style={{ backgroundColor: themeColors.violet.light }}
        >
          Espace presse
        </p>
        <p
          className="footer-contact"
          style={{ backgroundColor: themeColors.yellow.main }}
        >
          Recevoir la newsletter
        </p>
      </div>
    </div>
  );
};

export default Footer;
