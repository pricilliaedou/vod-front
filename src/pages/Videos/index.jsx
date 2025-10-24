import { useEffect, useState } from "react";
import axios from "axios";
import OtherLayout from "../../layouts/OtherLayout";
import { Box, Stack, Typography, Chip, Grid, Skeleton } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import VideoSection from "../../common/components/VideoSection";
import VideoPlayerDialog from "../../common/components/VideoPlayerDialog";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Videos() {
  const [age, setAge] = useState(null);
  const [blocks, setBlocks] = useState([]); // [{ category, videos:[...] }]
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);

  const onPlay = (url) => {
    setCurrentUrl(url);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setCurrentUrl(null);
  };

  const load = async (ageRange = null) => {
    setLoading(true);
    setErr("");
    try {
      const q = ageRange ? `?ageRange=${encodeURIComponent(ageRange)}` : "";
      const { data } = await axios.get(
        `${apiUrl}/public/videos/by-category${q}`
      );
      // 🔒 ne garde QUE les catégories non vides
      const filtered = (Array.isArray(data) ? data : []).filter(
        (b) => b.videos && b.videos.length > 0
      );
      setBlocks(filtered);
    } catch (e) {
      console.error("Error loading videos:", e);
      setErr("Impossible de charger les vidéos.");
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(null);
  }, []);
  useEffect(() => {
    load(age);
  }, [age]);

  return (
    <OtherLayout onAgeChange={setAge} selectedAge={age}>
      <Box sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}>
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

        {loading && !err && (
          <Grid container spacing={2}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Skeleton
                  variant="rounded"
                  height={180}
                  sx={{ mb: 1, borderRadius: 2 }}
                />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && !err && (
          <AnimatePresence initial={false}>
            <Stack spacing={3}>
              {blocks.map((b) => (
                <VideoSection
                  key={b.category}
                  category={b.category}
                  videos={b.videos}
                  onPlay={onPlay}
                />
              ))}
              {blocks.length === 0 && (
                <Box
                  sx={{
                    p: 2,
                    border: "1px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                    color: "text.secondary",
                  }}
                >
                  Aucune vidéo à afficher pour ce filtre.
                </Box>
              )}
            </Stack>
          </AnimatePresence>
        )}
      </Box>

      <VideoPlayerDialog open={open} url={currentUrl} onClose={onClose} />
    </OtherLayout>
  );
}
