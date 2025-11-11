import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import BodyLayout from "../../layouts/BodyLayout";
import Categories from "../../components/Categories";
import VideoCarousel from "../../components/VideoCarousel";
import NavbarHome from "../../common/components/NavbarHome";
import Navbar from "../../common/components/Navbar";
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
        const safe = incoming.filter((v) => isEmbeddable(v.url)).slice(0, 3);
        setVideos(safe);
      })
      .catch((e) => console.error("Home fetch error:", e));
    return () => {
      alive = false;
    };
  }, [apiUrl]);

  return (
    <>
      {!isAuthenticated ? (
        <div>
          <BodyLayout>
            <div className="homeLayout">
              <div className="homeLayout-firstSection-disconnected">
                <Navbar className="homeLayout-firstSection-disconnected-navbar" />
                <div className="homeLayout-disconnected">
                  <VideoCarousel
                    videos={videos}
                    showSideNav={isAuthenticated}
                  />
                </div>
              </div>
              <div className="homeLayout-secondSection">
                <h2>Pause Écran</h2>
                <p>
                  Pause Écran est un site de sensibilisation aux usages du
                  numérique et des écrans, pensé pour les enfants et les
                  parents. À travers des vidéos pédagogiques, il aborde
                  différents thèmes liés aux dangers et dérives du numérique :
                </p>

                <ul className="homeLayout-secondSection-list">
                  <li>l&apos;impact des écrans sur le sommeil,</li>
                  <li>l&apos;influence des réseaux sociaux,</li>
                  <li>
                    les risques d&apos;addiction et de dérive dans les jeux
                    vidéo,
                  </li>
                  <li>la solitude et l&apos;isolement liés aux écrans,</li>
                  <li>le cyberharcèlement,</li>
                  <li>les effets des réseaux sur le cerveau,</li>
                  <li>et des pistes de prévention et dialogue en famille.</li>
                </ul>
                <br />
                <p>
                  L&apos; objectif est d’aider les familles à mieux comprendre
                  ces enjeux, à ouvrir la discussion et à développer une
                  utilisation plus saine et équilibrée des écrans.
                </p>
                <br />
                <h3 className="homeLayout-secondSection-categories-title">
                  S'informer selon ses besoins
                </h3>
                <Categories isAuthenticated={isAuthenticated} />
              </div>
            </div>
          </BodyLayout>
        </div>
      ) : (
        <div>
          <BodyLayout>
            <div className="homeLayout">
              <div className="homeLayout-firstSection">
                <Navbar className="homeLayout-firstSection-navbar" />
                <div className="homeLayout-left">
                  <NavbarHome />
                </div>
                <div className="homeLayout-right">
                  <VideoCarousel
                    videos={videos}
                    showSideNav={isAuthenticated}
                  />
                </div>
              </div>
              <div className="homeLayout-secondSection">
                <h2>Pause Écran</h2>
                <p>
                  Pause Écran est un site de sensibilisation aux usages du
                  numérique et des écrans, pensé pour les enfants et les
                  parents. À travers des vidéos pédagogiques, il aborde
                  différents thèmes liés aux dangers et dérives du numérique :
                </p>
                <p>
                  <br />
                  L&apos; objectif est d’aider les familles à mieux comprendre
                  ces enjeux, à ouvrir la discussion et à développer une
                  utilisation plus saine et équilibrée des écrans.
                </p>
                <ul className="homeLayout-secondSection-list">
                  <li>l&apos;impact des écrans sur le sommeil,</li>
                  <li>l&apos;influence des réseaux sociaux,</li>
                  <li>
                    les risques d&apos;addiction et de dérive dans les jeux
                    vidéo,
                  </li>
                  <li>la solitude et l&apos;isolement liés aux écrans,</li>
                  <li>le cyberharcèlement,</li>
                  <li>les effets des réseaux sur le cerveau,</li>
                  <li>et des pistes de prévention et dialogue en famille.</li>
                </ul>
                <br />
                <h3 className="homeLayout-secondSection-categories-title">
                  S'informer selon ses besoins
                </h3>
                <Categories isAuthenticated={isAuthenticated} />
              </div>
            </div>
          </BodyLayout>
        </div>
      )}
    </>
  );
};

export default Home;
