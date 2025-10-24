import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MainLayout from "../../layouts/MainLayout";
import "./index.css";

const Succes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionnel : rediriger automatiquement après quelques secondes
    // const timer = setTimeout(() => navigate("/"), 5000);
    // return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MainLayout className="succesLayout">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          textAlign: "center",
          px: 2,
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: 100,
            color: "success.main",
            mb: 3,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Message envoyé avec succès !
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "text.secondary",
            maxWidth: 600,
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Merci de nous avoir contactés. Nous avons bien reçu votre message et
          nous vous répondrons dans les plus brefs délais.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            size="large"
          >
            Retour à l'accueil
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/contact")}
            size="large"
          >
            Envoyer un autre message
          </Button>
        </Stack>
      </Box>
    </MainLayout>
  );
};

export default Succes;
