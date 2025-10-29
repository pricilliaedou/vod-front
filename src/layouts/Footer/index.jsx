import { Link } from "react-router-dom";
import { themeColors } from "../../styles/themeColors";
import {
  LinkedinIcon,
  GithubIcon,
  PortfolioIcon,
} from "../../common/assets/icons";
import eEnfance from "../../assets/logos/e-enfance.png";
import droitEnfance from "../../assets/logos/droitdenfance.png";
import unaf from "../../assets/logos/unaf.webp";
import internetsanscrainte from "../../assets/logos/internetsanscrainte.png";
import "./index.css";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{ backgroundColor: themeColors.violet.main }}
    >
      <div className="footer-logo ">
        <div className="footer-logo-left">
          <div className="footer-logo-img">
            <a
              href="https://e-enfance.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={eEnfance}
                alt="Logo de l'association e-enfance. Association qui protège les enfants et les ados des dangers d'internet."
              />
            </a>
          </div>
          <div className="footer-logo-img">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.droitdenfance.org/"
            >
              <img
                src={droitEnfance}
                alt="Logo de la fondation droit d'enfance."
              />
            </a>
          </div>
        </div>
        <div className="footer-logo-right">
          <div className="footer-logo-img">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.unaf.fr/"
            >
              <img
                src={unaf}
                alt="Logo de l'association UNAF. Association qui protège les enfants et les ados des dangers d'internet."
              />
            </a>
          </div>
          <div className="footer-logo-img">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://don.fondationhopitaux.fr/?affectations=fondationhop%2F%3Futm_campaign%3Dfilrougenomentite&utm_source=google&utm_medium=cpc&utm_outil=motscles&gad_source=1&gclid=Cj0KCQjww5u2BhDeARIsALBuLnMdF06PWXgZqy3lHocIfuKle4XGfqeqiDaKX0TkLCeCEMypOlr9hpUaAvpFEALw_wcB"
            >
              <img
                src={internetsanscrainte}
                alt="Logo de la fondation des hopitaux"
              />
            </a>
          </div>
        </div>
      </div>

      <div>
        <p>Suivez-nous </p>
        <div className="footer-social-media">
          <a
            href="https://www.linkedin.com/in/pricillia-lydiane-edou-edou"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/pricilliaedou"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
          <a
            href="https://pricilliae-portfolio.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PortfolioIcon />
          </a>
        </div>
      </div>
      <div>
        <Link
          to="/contact"
          className="footer-contact"
          style={{ backgroundColor: themeColors.violet.light }}
        >
          Nous contacter
        </Link>
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
