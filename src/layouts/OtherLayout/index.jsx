import MainLayout from "../MainLayout";
import AgeGroup from "../../common/components/AgeGroup";
import { ImpactRS } from "../../common/assets/pictures";
import "./index.css";

const OtherLayout = () => {
  return (
    <MainLayout>
      <div className="otherLayout-left">
        <AgeGroup />
      </div>
      <div className="otherLayout-right">
        <ImpactRS />
      </div>
    </MainLayout>
  );
};

export default OtherLayout;
