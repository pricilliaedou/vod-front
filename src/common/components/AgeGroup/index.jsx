import { useState } from "react";
import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { themeColors } from "../../../styles/themeColors";

const MotionBox = motion(Box);
const MotionButton = motion(ButtonBase);

const groups = [
  { key: "2-6", label: "2 – 6 ans", color: themeColors.teal.main },
  { key: "7-10", label: "7 – 10 ans", color: themeColors.violet.main },
  { key: "11-13", label: "11 – 13 ans", color: themeColors.orange.main },
  { key: "14-17", label: "14 – 17 ans", color: themeColors.yellow.main },
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

export default function AgeGroup({ onChange }) {
  const [active, setActive] = useState("2-6");
  const theme = useTheme();

  const handleSelect = (key) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 800, letterSpacing: 0.3, mb: 1 }}
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
          flexDirection: "column",
          gap: 1.2,
          p: 1.5,
          borderRadius: 3,
          boxShadow: "0 4px 14px rgba(0,0,0,.12)",
          bgcolor:
            theme.palette.mode === "light"
              ? "rgba(255,255,255,.7)"
              : "rgba(255,255,255,.08)",
          backdropFilter: "blur(6px)",
        }}
      >
        {groups.map((g) => {
          const selected = g.key === active;
          return (
            <MotionButton
              key={g.key}
              variants={item}
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(g.key)}
              aria-pressed={selected}
              sx={{
                justifyContent: "flex-start",
                px: 2,
                py: 1.15,
                borderRadius: 2,
                position: "relative",
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
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  bgcolor: g.color,
                  mr: 1.4,
                  flexShrink: 0,
                  opacity: selected ? 1 : 0,
                }}
                aria-hidden
              />
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  color: selected ? "text.primary" : "text.secondary",
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
