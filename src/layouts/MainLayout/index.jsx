import BodyLayout from "../BodyLayout";
import Navbar from "../../common/components/Navbar";
import "./index.css";

const MainLayout = ({ children, activeTab = null, className = "" }) => {
  return (
    <BodyLayout>
      <div className={`mainLayout ${className}`}>
        <Navbar activeTab={activeTab} />
        <div className="mainLayout-items">{children}</div>
      </div>
    </BodyLayout>
  );
};
export default MainLayout;
