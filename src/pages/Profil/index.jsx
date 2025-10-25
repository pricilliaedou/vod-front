import { useEffect, useMemo, useState } from "react";
import api from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import VideoCard from "../../common/components/VideoCard";
import VideoPlayerDialog from "../../common/components/VideoPlayerDialog";
import { useAuth } from "../../hooks/useAuth";
import "./index.css";

const initialsOf = (user) => {
  if (!user) return "";
  const f = (user.firstName || "").trim();
  const l = (user.lastName || "").trim();
  if (f && l) return `${f[0]}${l[0]}`.toUpperCase();
  return (f || l || "?")[0].toUpperCase();
};

export default function Profile() {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const [me, setMe] = useState(authUser || null);
  const [errMe, setErrMe] = useState("");

  const [tab, setTab] = useState("profil");
  const [favorites, setFavorites] = useState([]);
  const [favErr, setFavErr] = useState("");

  const [openPlayer, setOpenPlayer] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);

  useEffect(() => {
    if (authUser) setMe(authUser);
  }, [authUser]);

  useEffect(() => {
    let mounted = true;
    if (me) return;
    (async () => {
      try {
        const { data } = await api.get(
          `${import.meta.env.VITE_API_URL}/api/me`,
          {
            withCredentials: true,
          }
        );
        if (!mounted) return;
        setMe(data);
      } catch {
        if (!mounted) return;
        setErrMe("Impossible de charger vos informations.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [me]);

  useEffect(() => {
    let mounted = true;
    if (tab !== "favorites") return;
    (async () => {
      try {
        const { data } = await api.get(
          `${import.meta.env.VITE_API_URL}/api/me/favorites`,
          {
            withCredentials: true,
          }
        );
        if (!mounted) return;
        setFavorites(data || []);
        setFavErr("");
      } catch {
        if (!mounted) return;
        setFavErr("Impossible de charger vos favoris.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [tab]);

  const inits = useMemo(() => initialsOf(me), [me]);

  const onPlay = (url) => {
    setCurrentUrl(url);
    setOpenPlayer(true);
  };

  return (
    <div className="container-profil">
      <Grid container sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            bgcolor: "#ffa07a",
            minHeight: { sm: "100vh" },
            minWidth: { xs: "100%", sm: "auto" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: 160,
                height: 160,
                fontSize: 56,
                bgcolor: "#fff",
                color: "#ff7f50",
                border: "6px solid rgba(255,255,255,.5)",
              }}
            >
              {inits}
            </Avatar>

            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
              {me
                ? `${me.firstName || ""} ${
                    me.lastName ? me.lastName.toUpperCase() : ""
                  }`
                : "Utilisateur"}
            </Typography>

            <List sx={{ width: "100%", mt: 1 }}>
              <ListItemButton
                selected={tab === "profil"}
                onClick={() => setTab("profil")}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "#fbbca8",
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "#fbbca8",
                  },
                }}
              >
                <ListItemText
                  primary="Profil"
                  primaryTypographyProps={{ sx: { color: "#fff" } }}
                />
              </ListItemButton>
              <ListItemButton
                selected={tab === "favorites"}
                onClick={() => setTab("favorites")}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "#fbbca8",
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "#fbbca8",
                  },
                }}
              >
                <ListItemText
                  primary="Mes Favoris"
                  primaryTypographyProps={{ sx: { color: "#fff" } }}
                />
              </ListItemButton>
            </List>

            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              sx={{
                mt: 2,
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Retour à l'accueil
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={9} sx={{ flexGrow: 1 }}>
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            {tab === "profil" && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Mon profil
                </Typography>
                {errMe && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {errMe}
                  </Alert>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    maxWidth: 600,
                  }}
                >
                  <TextField label="Nom" value={me?.lastName || ""} disabled />
                  <TextField
                    label="Prénom"
                    value={me?.firstName || ""}
                    disabled
                  />
                  <TextField label="Email" value={me?.email || ""} disabled />
                  <TextField
                    label="Mot de passe"
                    type="password"
                    value="••••••••"
                    disabled
                  />
                </Box>
              </>
            )}

            {tab === "favorites" && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Mes Favoris
                </Typography>
                {favErr && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {favErr}
                  </Alert>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {favorites.map((v) => (
                    <Box
                      key={v.id}
                      sx={{
                        minWidth: {
                          xs: "100%",
                          sm: "calc(50% - 8px)",
                          md: "calc(33.333% - 11px)",
                          lg: "calc(25% - 12px)",
                        },
                        maxWidth: {
                          xs: "100%",
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
                {favorites.length === 0 && !favErr && (
                  <Box sx={{ mt: 2, color: "text.secondary" }}>
                    Aucun favori pour l'instant.
                  </Box>
                )}
                <VideoPlayerDialog
                  open={openPlayer}
                  url={currentUrl}
                  onClose={() => setOpenPlayer(false)}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
