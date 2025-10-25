import { useEffect, useState } from "react";
import api from "../../../utils/axiosClient";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { youtubeThumb } from "../../../utils/youtube";

const MotionCard = motion(Card);

export default function VideoCard({ video, onClick }) {
  const thumb = youtubeThumb(video.url);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [pulseLike, setPulseLike] = useState(false);
  const [pulseFav, setPulseFav] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get(
          `${import.meta.env.VITE_API_URL}/api/videos/${video.id}/meta`,
          { withCredentials: true }
        );
        if (!mounted) return;
        setLikes(data.likes || 0);
        setLiked(!!data.liked);
        setFavorite(!!data.favorite);
      } catch {
        // silencieux si non authentifié
      }
    })();
    return () => {
      mounted = false;
    };
  }, [video.id]);

  const toggleLike = async (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setPulseLike(true);
    setTimeout(() => setPulseLike(false), 220);

    try {
      const method = liked ? "delete" : "put";
      setLiked(!liked);
      setLikes((n) => (liked ? Math.max(0, n - 1) : n + 1));
      const { data } = await api({
        url: `${import.meta.env.VITE_API_URL}/api/videos/${video.id}/like`,
        method,
        withCredentials: true,
      });
      setLikes(data.likes || 0);
      setLiked(!!data.liked);
    } catch {
      // rollback simple si besoin
    }
  };

  const toggleFavorite = async (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setPulseFav(true);
    setTimeout(() => setPulseFav(false), 220);

    try {
      const method = favorite ? "delete" : "put";
      setFavorite(!favorite);
      await api({
        url: `${import.meta.env.VITE_API_URL}/api/videos/${video.id}/favorite`,
        method,
        withCredentials: true,
      });
    } catch {
      // rollback si besoin
    }
  };
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
          flex: 1,
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
        <CardContent
          sx={{
            pb: 0,
            flex: 1,
            width: "100%",
          }}
        >
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

      {/* Actions en dehors du CardActionArea pour éviter les boutons imbriqués */}
      <Box sx={{ px: 2, pb: 1.5, pt: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title={liked ? "Je n'aime plus" : "J'aime"}>
              <motion.div
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onClick={toggleLike}
                animate={
                  pulseLike
                    ? {
                        scale: [1, 1.3, 1],
                        rotate: [0, -10, 10, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    color: liked ? "#e91e63" : "inherit",
                    "&:hover": {
                      color: liked ? "#c2185b" : "#e91e63",
                    },
                  }}
                >
                  {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </motion.div>
            </Tooltip>
            <Typography
              variant="caption"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                color: liked ? "#e91e63" : "text.secondary",
              }}
            >
              {likes}
            </Typography>
          </Stack>

          <Tooltip
            title={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <motion.div
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={toggleFavorite}
              animate={
                pulseFav
                  ? {
                      scale: [1, 1.2, 1],
                      y: [0, -5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <IconButton
                size="small"
                sx={{
                  color: favorite ? "#ff9800" : "inherit",
                  "&:hover": {
                    color: favorite ? "#f57c00" : "#ff9800",
                  },
                }}
              >
                {favorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </motion.div>
          </Tooltip>
        </Stack>
      </Box>
    </MotionCard>
  );
}
