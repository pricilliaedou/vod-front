import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import OtherLayout from "../../layouts/OtherLayout";
import { youtubeThumb, youtubeEmbed } from "../../utils/youtube";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  IconButton,
  Chip,
  Stack,
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const api = import.meta.env.VITE_API_URL;

// Framer Motion variants
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
const cardVar = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  hover: { y: -4, boxShadow: "0 12px 30px rgba(0,0,0,.18)" },
};

export default function Videos() {
  const [age, setAge] = useState(null);
  const [blocks, setBlocks] = useState([]); // [{ category, videos: [{id,title,description,url,ageRange}] }]
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // player
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);
  const openPlayer = (url) => {
    setCurrentUrl(url);
    setOpen(true);
  };
  const closePlayer = () => {
    setOpen(false);
    setCurrentUrl(null);
  };
  const currentEmbed = useMemo(
    () => (currentUrl ? youtubeEmbed(currentUrl) : null),
    [currentUrl]
  );

  const fetchData = async (ageRange = null) => {
    setLoading(true);
    setErr("");
    try {
      const q = ageRange ? `?ageRange=${encodeURIComponent(ageRange)}` : "";
      const { data } = await axios.get(`${api}/public/videos/by-category${q}`);
      setBlocks(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching videos:", e);
      setErr("Impossible de charger les vidéos.");
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(null); // initial (toutes catégories, pas de filtre)
  }, []);

  useEffect(() => {
    fetchData(age); // recharge à chaque changement d'âge
  }, [age]);

  return (
    <OtherLayout onAgeChange={setAge}>
      <Box sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}>
        {/* Fil d’Ariane simple + filtre affiché */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Vidéos par catégories
          </Typography>
          <Chip
            size="small"
            label={age ? `Filtre : ${age}` : "Toutes tranches d'âge"}
            color={age ? "primary" : "default"}
            variant={age ? "filled" : "outlined"}
          />
        </Stack>

        {/* États */}
        {err && (
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography color="error">{err}</Typography>
          </Box>
        )}

        {/* Skeleton loading */}
        {loading && !err && (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Skeleton
                  variant="rounded"
                  height={200}
                  sx={{ mb: 1, borderRadius: 2 }}
                />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Contenu */}
        {!loading && !err && (
          <motion.div variants={containerVar} initial="hidden" animate="show">
            <Stack spacing={3}>
              <AnimatePresence initial={false}>
                {blocks.map((b) => (
                  <motion.section key={b.category} variants={sectionVar} layout>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, mb: 1, letterSpacing: 0.2 }}
                    >
                      {b.category}
                    </Typography>

                    {!b.videos || b.videos.length === 0 ? (
                      <Box
                        sx={{
                          p: 2,
                          border: "1px dashed",
                          borderColor: "divider",
                          borderRadius: 2,
                          color: "text.secondary",
                        }}
                      >
                        Aucune vidéo pour cette catégorie.
                      </Box>
                    ) : (
                      <Grid container spacing={2}>
                        {b.videos.map((v) => {
                          const t = youtubeThumb(v.url);
                          return (
                            <Grid key={v.id} item xs={12} sm={6} md={4} lg={3}>
                              <motion.div variants={cardVar} whileHover="hover">
                                <Card
                                  elevation={3}
                                  sx={{ borderRadius: 3, overflow: "hidden" }}
                                >
                                  <CardActionArea
                                    onClick={() => openPlayer(v.url)}
                                  >
                                    {t ? (
                                      <CardMedia
                                        component="img"
                                        image={t}
                                        alt={v.title}
                                        sx={{
                                          aspectRatio: "16/9",
                                          objectFit: "cover",
                                        }}
                                      />
                                    ) : (
                                      <Box
                                        sx={{
                                          aspectRatio: "16/9",
                                          bgcolor: "grey.100",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontWeight: 700,
                                        }}
                                      >
                                        Vidéo
                                      </Box>
                                    )}
                                    <CardContent sx={{ pb: 2 }}>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{
                                          fontWeight: 800,
                                          lineHeight: 1.2,
                                        }}
                                      >
                                        {v.title}
                                      </Typography>
                                      <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ mt: 0.5 }}
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
                                          {v.description}
                                        </Typography>
                                        {v.ageRange && (
                                          <Chip
                                            size="small"
                                            label={v.ageRange}
                                            variant="outlined"
                                          />
                                        )}
                                      </Stack>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              </motion.div>
                            </Grid>
                          );
                        })}
                      </Grid>
                    )}
                  </motion.section>
                ))}
              </AnimatePresence>
            </Stack>
          </motion.div>
        )}
      </Box>

      {/* Modal lecteur */}
      <Dialog
        open={open}
        onClose={closePlayer}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { bgcolor: "black", borderRadius: 2 } }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={closePlayer}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "common.white",
              zIndex: 1,
            }}
            aria-label="Fermer"
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
          >
            {currentEmbed ? (
              <iframe
                src={currentEmbed}
                title="video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "common.white",
                }}
              >
                URL invalide
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </OtherLayout>
  );
}
