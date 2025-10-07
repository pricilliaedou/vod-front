import BodyLayout from "../../layouts/BodyLayout";
import Categories from "../../components/Categories";

import imgHome from "../../assets/images/img-home.png";

import "./index.css";
const Home = () => {
  return (
    <div>
      <BodyLayout>
        <div className="homeLayout">
          <div className="homeLayout-firstSection">
            <div className="homeLayout-left">{/* <NavbarHome /> */}</div>
            <div className="homeLayout-right">
              <img
                src={imgHome}
                alt="image d'illustration du caroussel des vidéos"
              />
            </div>
          </div>
          <div className="homeLayout-secondSection">
            <p>S'informer selon ses besoins</p>
            <Categories />
          </div>
        </div>
      </BodyLayout>
    </div>
  );
};

export default Home;
