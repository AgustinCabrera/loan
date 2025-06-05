import { Box, Container, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FormLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const FormLayout = ({ title, subtitle, children }: FormLayoutProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f7f1",
        padding: 2,
      }}
    >
      <Box sx={{ maxWidth: "450px", width: "100%" }}>
        {/* header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#7c6fb0",
              lineHeight: 1.1,
              mb: 0.5,
            }}
          >
            Hello.
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#333",
              lineHeight: 1.1,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* form container */}
        <Box sx={{ backgroundColor: "white", borderRadius: 2, padding: 3 }}>
          {children}
        </Box>
      </Box>
    </Container>
  );
};
