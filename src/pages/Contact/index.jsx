import MainLayout from "../../layouts/MainLayout";
import Forms from "../../common/components/Forms";
import {
  LinkedinIcon,
  GithubIcon,
  PortfolioIcon,
  EmailIcon,
} from "../../common/assets/icons";
import "./index.css";

const Contact = () => {
  return (
    <MainLayout className="contactLayout">
      <div className="contactContainer">
        <p>Besoin de réponses?</p>
        <p>Contactez-nous !</p>
        <div className="contactContainer-form">
          <div className="contactContainer-left">
            <Forms />
          </div>
          <div className="contactContainer-right">
            <p>01 00 00 00 00</p>
            <p>40 rue Fictive Paris 75000</p>
            <div className="contactContainer-right-icons">
              <a
                href="https://www.linkedin.com/in/pricillia-lydiane-edou-edou"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon size={30} />
              </a>
              <a
                href="https://github.com/pricilliaedou"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={30} />
              </a>
              <a
                href="https://pricilliae-portfolio.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PortfolioIcon size={30} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <EmailIcon size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
