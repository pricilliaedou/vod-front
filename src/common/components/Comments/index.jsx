import { useEffect, useState } from "react";
import api from "../../../utils/axiosClient";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";

export default function Comments({ videoUrl }) {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const { isAuthenticated } = useAuth();
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!videoUrl) return;
    (async () => {
      try {
        const { data } = await api.get(
          `${import.meta.env.VITE_API_URL}/public/videos/by-url`,
          {
            params: { u: videoUrl },
          }
        );
        if (!mounted) return;
        setVideoId(data?.id ?? null);
      } catch {
        /* silencieux si non authentifié */
      }
    })();
    return () => {
      mounted = false;
    };
  }, [videoUrl]);

  // Liste des commentaires (lecture publique)
  useEffect(() => {
    let mounted = true;
    if (!videoId) return;
    (async () => {
      try {
        const { data } = await api.get(
          `${import.meta.env.VITE_API_URL}/public/videos/${videoId}/comments`
        );
        if (!mounted) return;
        setItems(data || []);
      } catch {
        /* silencieux si non authentifié */
      }
    })();
    return () => {
      mounted = false;
    };
  }, [videoId]);

  const submit = async (e) => {
    e?.preventDefault();
    if (!text.trim() || !videoId) return;
    try {
      const { data } = await api.post(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoId}/comments`,
        { comment: text.trim() },
        { withCredentials: true }
      );
      setItems((prev) => [data, ...prev]);
      setText("");
    } catch {
      /* silencieux si non authentifié */
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, color: "common.white" }}>
        Commentaires
      </Typography>

      {isAuthenticated && (
        <Stack
          direction="row"
          spacing={1}
          component="form"
          onSubmit={submit}
          sx={{ mb: 2 }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Écrire un commentaire…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Envoyer
          </Button>
        </Stack>
      )}

      <Stack spacing={1}>
        {items.map((c, idx) => (
          <Box
            key={idx}
            sx={{ bgcolor: "rgba(255,255,255,.06)", p: 1.2, borderRadius: 1 }}
          >
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {c.user?.firstName}{" "}
              {c.user?.lastName ? c.user.lastName.toUpperCase() : ""}
            </Typography>
            <Typography variant="body2">{c.comment}</Typography>
          </Box>
        ))}
        {items.length === 0 && (
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Aucun commentaire.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
