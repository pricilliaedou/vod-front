import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import BodyLayout from "../../layouts/BodyLayout";
import Categories from "../../components/Categories";
import VideoCarousel from "../../components/VideoCarousel";
// import imgHome from "../../assets/images/img-home.png";

import "./index.css";

const isEmbeddable = (url) => {
  try {
    const h = new URL(url).hostname;
    return h.includes("youtube.com") || h.includes("youtu.be");
  } catch {
    return false;
  }
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [videos, setVideos] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let alive = true;
    axios
      .get(`${apiUrl}/public/home`)
      .then(({ data }) => {
        if (!alive) return;
        const incoming = data?.videoListDTO || [];
        // ✅ enlève Lumni (et tout domaine non YouTube) + ne garde que 3
        const safe = incoming.filter((v) => isEmbeddable(v.url)).slice(0, 3);
        setVideos(safe);
      })
      .catch((e) => console.error("Home fetch error:", e));
    return () => {
      alive = false;
    };
    //     if (alive) setVideos(data?.videoListDTO || []);
    //   })
    //   .catch((e) => console.error("Home fetch error", e));
    // return () => {
    //   alive = false;
    // };
  }, [apiUrl]);

  return (
    <div>
      <BodyLayout>
        <div className="homeLayout">
          <div className="homeLayout-firstSection">
            <div className="homeLayout-left">{/* <NavbarHome /> */}</div>
            <div className="homeLayout-right">
              <VideoCarousel videos={videos} showSideNav={isAuthenticated} />
              {/* <img
                src={imgHome}
                alt="image d'illustration du caroussel des vidéos"
              /> */}
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
