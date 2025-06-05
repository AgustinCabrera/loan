import { Box, Typography } from "@mui/material";

interface ErrorDisplayProps {
  error: string | null;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        backgroundColor: "#fee2e2",
        borderRadius: 1,
        border: "1px solid #f87171",
      }}
    >
      <Typography color="error" sx={{ fontWeight: 500, mb: 1 }}>
        {error.split("\n").map((message, index) => (
          <Typography
            key={index}
            color="error"
            sx={{ fontSize: "0.875rem", mb: 0.5 }}
          >
            Error: {message}
          </Typography>
        ))}
      </Typography>
    </Box>
  );
};
