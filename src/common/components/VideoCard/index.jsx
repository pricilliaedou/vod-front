import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { youtubeThumb } from "../../../utils/youtube";

const MotionCard = motion(Card);

export default function VideoCard({ video, onClick }) {
  const thumb = youtubeThumb(video.url);
  return (
    <MotionCard
      elevation={3}
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,.18)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        onClick={() => onClick?.(video.url)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        {thumb ? (
          <CardMedia
            component="img"
            image={thumb}
            alt={video.title}
            sx={{ aspectRatio: "16/9", objectFit: "cover", width: "100%" }}
          />
        ) : (
          <div
            style={{
              aspectRatio: "16/9",
              background: "#f1f3f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              width: "100%",
            }}
          >
            Vidéo
          </div>
        )}
        <CardContent sx={{ pb: 1.5, flex: 1, width: "100%" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}
          >
            {video.title}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {video.description}
            </Typography>
            {video.ageRange && (
              <Chip size="small" label={video.ageRange} variant="outlined" />
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </MotionCard>
  );
}
