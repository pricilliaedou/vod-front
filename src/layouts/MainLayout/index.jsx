import BodyLayout from "../BodyLayout";
import AgeGroup from "../../common/components/AgeGroup";
import impactRS from "../../assets/images/impact-rs.png";
import "./index.css";

const MainLayout = ({ children }) => {
  return (
    <BodyLayout>
      <div className="mainLayout">
        <div className="mainLayout-left">
          <AgeGroup />
        </div>
        <div className="mainLayout-right">
          <img
            src={impactRS}
            alt="illustration de l'imapct des réseaux sociaux"
          />
        </div>

        {children}
      </div>
    </BodyLayout>
  );
};
export default MainLayout;
