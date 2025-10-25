import { Dialog, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { youtubeEmbed } from "../../../utils/youtube";
// import Comments from "../Comments";

export default function VideoPlayerDialog({ open, url, onClose }) {
  const embed = url ? youtubeEmbed(url) : null;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { bgcolor: "black", borderRadius: 2 } }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={onClose}
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
        <Box sx={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
          {embed ? (
            <iframe
              src={embed}
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
        {/* <Box sx={{ p: 2, color: "common.white", bgcolor: "black" }}>
          <Comments videoUrl={url} />
        </Box> */}
      </Box>
    </Dialog>
  );
}
