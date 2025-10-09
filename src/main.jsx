import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App.jsx";
import theme from "./utils/theme.js";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://3849f7e184700aaf5f1d9d759f1e24b9@o4509127783677952.ingest.de.sentry.io/4510086122831952",
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
