import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  fullScreen?: boolean;
  size?: number;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = true,
  size = 40,
  color = "#7c6fb0",
}) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={size} sx={{ color }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <CircularProgress size={size} sx={{ color }} />
    </Box>
  );
};
