import { BarHomeIcon } from "../../assets/icons";
import starHearth from "../../..//assets/svg/star-hearth.svg";

const NavbarHome = () => {
  return (
    <div>
      <BarHomeIcon />
      <div>
        <img src={starHearth} alt="star heart" />
      </div>
    </div>
  );
};

export default NavbarHome;
