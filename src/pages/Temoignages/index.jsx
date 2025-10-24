import { useEffect, useState } from "react";
import axios from "axios";
import OtherLayout from "../../layouts/OtherLayout";
import { Box, Stack, Typography, Chip, Skeleton } from "@mui/material";
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
        `${apiUrl}/public/testimonials/by-category${q}`
      );
      //  ne garde QUE les catégories non vides
      const filtered = (Array.isArray(data) ? data : []).filter(
        (b) => b.videos && b.videos.length > 0
      );
      setBlocks(filtered);
    } catch (e) {
      console.error("Error loading videos:", e);
      setErr("Impossible de charger les témoignages.");
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
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={{ xs: 1, sm: 0 }}
          sx={{ mb: 2 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
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
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              pb: 1,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  minWidth: {
                    xs: "85%",
                    sm: "calc(50% - 8px)",
                    md: "calc(33.333% - 11px)",
                    lg: "calc(25% - 12px)",
                  },
                }}
              >
                <Skeleton
                  variant="rounded"
                  height={180}
                  sx={{ mb: 1, borderRadius: 2 }}
                />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </Box>
            ))}
          </Box>
        )}

        {!loading && !err && (
          <AnimatePresence initial={false}>
            <Stack spacing={{ xs: 3, sm: 3 }}>
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
                  Aucun témoignage à afficher pour ce filtre.
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
