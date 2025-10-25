import { useState, useEffect } from "react";
import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { themeColors } from "../../../styles/themeColors";

const MotionBox = motion(Box);
const MotionButton = motion(ButtonBase);

const groups = [
  { key: "2-6", label: "2 – 6 ans", color: themeColors.violet.main },
  { key: "7-10", label: "7 – 10 ans", color: themeColors.orange.main },
  { key: "11-13", label: "11 – 13 ans", color: themeColors.yellow.main },
  { key: "14-17", label: "14 – 17 ans", color: themeColors.teal.main },
  { key: "18+", label: "18 ans et +", color: themeColors.violet.dark },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

export default function AgeGroup({ onChange, selectedAge = null }) {
  const [active, setActive] = useState(selectedAge);
  const theme = useTheme();

  // Synchroniser l'état externe avec l'état interne
  useEffect(() => {
    setActive(selectedAge);
  }, [selectedAge]);

  const handleSelect = (key) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 800,
          letterSpacing: 0.3,
          mb: 1,
          display: { xs: "none", sm: "block" },
        }}
      >
        Par âges
      </Typography>

      <MotionBox
        variants={container}
        initial="hidden"
        animate="show"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: { xs: 1, sm: 1.2 },
          p: { xs: 1, sm: 1.5 },
          borderRadius: { xs: 2, sm: 3 },
          boxShadow: "0 4px 14px rgba(0,0,0,.12)",
          bgcolor:
            theme.palette.mode === "light"
              ? "rgba(255,255,255,.7)"
              : "rgba(255,255,255,.08)",
          backdropFilter: "blur(6px)",
          maxWidth: { xs: "100%", sm: 360 },
        }}
      >
        {groups.map((g) => {
          const selected = g.key === active;
          return (
            <MotionButton
              key={g.key}
              variants={item}
              whileHover={{ scale: 1.03, x: { xs: 0, sm: 4 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(g.key)}
              aria-pressed={selected}
              sx={{
                justifyContent: { xs: "center", sm: "flex-start" },
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.8, sm: 1.15 },
                borderRadius: { xs: 8, sm: 2 },
                whiteSpace: "nowrap",
                position: "relative",
                flex: { xs: "0 1 auto", sm: "initial" },
                background: selected
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.55)",
                border: selected
                  ? `2px solid ${g.color}`
                  : "1px solid rgba(0,0,0,.06)",
                boxShadow: selected
                  ? "0 6px 16px rgba(0,0,0,.12)"
                  : "0 2px 8px rgba(0,0,0,.06)",
                transition: "all .22s ease",
              }}
            >
              <Box
                sx={{
                  width: { xs: 10, sm: 14 },
                  height: { xs: 10, sm: 14 },
                  borderRadius: "50%",
                  bgcolor: g.color,
                  mr: { xs: 0.8, sm: 1.4 },
                  flexShrink: 0,
                  opacity: selected ? 1 : 0,
                  transition: "opacity 0.2s ease",
                  display: { xs: selected ? "block" : "none", sm: "block" },
                }}
                aria-hidden
              />
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  color: selected ? "text.primary" : "text.secondary",
                  lineHeight: 1.2,
                }}
              >
                {g.label}
              </Typography>
            </MotionButton>
          );
        })}
      </MotionBox>
    </Box>
  );
}
