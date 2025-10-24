import MainLayout from "../MainLayout";
import AgeGroup from "../../common/components/AgeGroup";

import "./index.css";

const OtherLayout = ({ children, onAgeChange }) => {
  return (
    <MainLayout>
      <div className="otherLayout-left">
        <AgeGroup onChange={onAgeChange} />
      </div>
      <div className="otherLayout-right">{children}</div>
    </MainLayout>
  );
};

export default OtherLayout;
