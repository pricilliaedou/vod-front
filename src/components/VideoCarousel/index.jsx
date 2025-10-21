import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function VideoCarousel({ videos = [] }) {
  const [index, setIndex] = useState(0);

  if (!videos || videos.length === 0) {
    return (
      <Box sx={{ textAlign: "center", color: "gray", py: 4 }}>
        Aucune vidéo à afficher.
      </Box>
    );
  }

  const next = () => setIndex((i) => (i + 1) % videos.length);
  const prev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);
  const currentVideo = videos[index];

  const extractYouTubeId = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      return u.searchParams.get("v");
    } catch {
      return null;
    }
  };

  const youtubeId = extractYouTubeId(currentVideo.url);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 400, //420
        borderRadius: 4,
        overflow: "hidden",
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.6), #f3e8ff)",
        boxShadow: 3,
      }}
    >
      {/* flèche gauche */}
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "#f3f3f3" },
          boxShadow: 2,
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      {/* vidéo actuelle */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", textAlign: "center" }}
          >
            {youtubeId ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                }}
              ></iframe>
            ) : (
              <div style={{ color: "gray" }}>Vidéo non disponible</div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                marginTop: "10px",
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "#333",
              }}
            >
              {currentVideo.title}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* flèche droite */}
      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "#f3f3f3" },
          boxShadow: 2,
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          display: "flex",
          gap: 1,
        }}
      >
        {videos.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              cursor: "pointer",
              transition: "all 0.3s",
              bgcolor: i === index ? "#7e57c2" : "#d3d3d3",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
