import BodyLayout from "../BodyLayout";
import Navbar from "../../common/components/Navbar";
import AgeGroup from "../../common/components/AgeGroup";
import impactRS from "../../assets/images/impact-rs.png";
import "./index.css";

const MainLayout = ({ children, activeTab = null }) => {
  return (
    <BodyLayout>
      <div className="mainLayout">
        <Navbar activeTab={activeTab} />
        <div className="mainLayout-items">
          <div className="mainLayout-left">
            <AgeGroup />
          </div>
          <div className="mainLayout-right">
            <img
              src={impactRS}
              alt="illustration de l'imapct des réseaux sociaux"
            />
          </div>
        </div>

        {children}
      </div>
    </BodyLayout>
  );
};
export default MainLayout;
