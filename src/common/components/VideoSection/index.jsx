import { Typography, Box } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import VideoCard from "../VideoCard";

const containerVar = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const sectionVar = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function VideoSection({ category, videos, onPlay }) {
  if (!videos || videos.length === 0) return null;

  return (
    <motion.section
      variants={sectionVar}
      initial="hidden"
      animate="show"
      layout
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 800, mb: 1, letterSpacing: 0.2 }}
      >
        {category}
      </Typography>
      <Box
        component={motion.div}
        variants={containerVar}
        initial="hidden"
        animate="show"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          width: "100%",
        }}
      >
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} onClick={onPlay} />
        ))}
      </Box>
    </motion.section>
  );
}
