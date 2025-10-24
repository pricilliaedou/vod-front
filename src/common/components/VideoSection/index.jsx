import { useState, useRef } from "react";
import { Typography, Box, IconButton } from "@mui/material";
//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VideoCard from "../VideoCard";

const sectionVar = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function VideoSection({ category, videos, onPlay }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  if (!videos || videos.length === 0) return null;

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth =
      container.querySelector(".video-card-wrapper")?.offsetWidth || 280;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * 2;

    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
            container.scrollWidth - container.clientWidth,
            scrollPosition + scrollAmount
          );

    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  const showLeftArrow = scrollPosition > 0;
  const showRightArrow = containerRef.current
    ? scrollPosition <
      containerRef.current.scrollWidth - containerRef.current.clientWidth - 10
    : videos.length > 4;

  return (
    <motion.section
      variants={sectionVar}
      initial="hidden"
      animate="show"
      layout
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 800,
          mb: { xs: 1.5, sm: 1 },
          letterSpacing: 0.2,
          fontSize: { xs: "1rem", sm: "1.1rem" },
        }}
      >
        {category}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {/* Flèche gauche */}
        {showLeftArrow && (
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 2,
              "&:hover": { bgcolor: "#f5f5f5" },
              width: 40,
              height: 40,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        )}

        {/* Container des cartes */}
        <Box
          ref={containerRef}
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pb: 1,
            px: { xs: 0, sm: 0.5 },
          }}
        >
          {videos.map((v) => (
            <Box
              key={v.id}
              className="video-card-wrapper"
              sx={{
                minWidth: {
                  xs: "85%",
                  sm: "calc(50% - 8px)",
                  md: "calc(33.333% - 11px)",
                  lg: "calc(25% - 12px)",
                },
                maxWidth: {
                  xs: "85%",
                  sm: "calc(50% - 8px)",
                  md: "calc(33.333% - 11px)",
                  lg: "calc(25% - 12px)",
                },
              }}
            >
              <VideoCard video={v} onClick={onPlay} />
            </Box>
          ))}
        </Box>

        {/* Flèche droite */}
        {showRightArrow && (
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 2,
              "&:hover": { bgcolor: "#f5f5f5" },
              width: 40,
              height: 40,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </motion.section>
  );
}
