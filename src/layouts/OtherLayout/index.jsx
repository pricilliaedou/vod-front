import MainLayout from "../MainLayout";
import AgeGroup from "../../common/components/AgeGroup";

import "./index.css";

const OtherLayout = ({ children, onAgeChange, selectedAge }) => {
  return (
    <MainLayout>
      <div className="otherLayout-left">
        <AgeGroup onChange={onAgeChange} selectedAge={selectedAge} />
      </div>
      <div className="otherLayout-right">{children}</div>
    </MainLayout>
  );
};

export default OtherLayout;
