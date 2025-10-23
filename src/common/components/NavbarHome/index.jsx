import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Cloud, Bubbles } from "../../assets/pictures";
import { BarHomeIcon } from "../../assets/icons";
import "./index.css";

export default function NavbarHome() {
  const signs = [
    { label: "Accueil", to: "/", color: "#AFA6FF", rotate: -2, top: 28 },
    {
      label: "Vidéos",
      to: "/videos",
      color: "#FFB59E",
      rotate: -10,
      top: 98,
    },
    {
      label: "Témoignages",
      to: "/temoignages",
      color: "#FFD666",
      rotate: 7,
      top: 168,
    },
    { label: "Contact", to: "/contact", color: "#B6F4EA", rotate: 0, top: 240 },
  ];

  return (
    <div className="navHome">
      <motion.div
        alt="image d'un coeur d'une étoiles et d'un hashtag. Eléments décoratifs de la page d'accueil."
        className="navHome-bubbles"
        initial={{ y: -6, opacity: 0.9 }}
        animate={{ y: [-6, 0, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <Bubbles />
      </motion.div>
      <motion.div
        alt="image d'un nuage"
        className="navHome-cloud navHome-cloud--left"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <Cloud />
      </motion.div>
      <motion.div
        alt="image d'un nuage"
        className="navHome-cloud navHome-cloud--right"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        aria-hidden
      >
        <Cloud />
      </motion.div>
      <motion.div
        alt="image d'un nuage"
        className="navHome-cloud navHome-cloud--right navHome-cloud--right-2"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        aria-hidden
      >
        <Cloud />
      </motion.div>
      <div aria-hidden className="navHome-poleWrap">
        <BarHomeIcon className="navHome-pole" />
      </div>

      {signs.map((s) => (
        <Link
          key={s.label}
          to={s.to}
          className="navHome-sign"
          style={{
            top: s.top,
            background: s.color,
            "--rot": `${s.rotate}deg`,
          }}
        >
          {s.label}
        </Link>
      ))}
    </div>
  );
}
