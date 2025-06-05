import { Button } from "@mui/material";
import { ReactNode } from "react";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export const FormButton = ({
  type = "button",
  disabled = false,
  fullWidth = true,
  onClick,
  variant = "primary",
  children,
}: FormButtonProps) => {
  const primaryStyles = {
    backgroundColor: "#7c6fb0",
    color: "white",
    "&:hover": {
      backgroundColor: "#6a5996",
    },
  };

  const secondaryStyles = {
    backgroundColor: "transparent",
    color: "#7c6fb0",
    border: "2px solid #7c6fb0",
    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
    mt: 2,
  };

  return (
    <Button
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        padding: "12px 16px",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: 500,
        textTransform: "none",
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
        ...(variant === "primary" ? primaryStyles : secondaryStyles),
      }}
    >
      {children}
    </Button>
  );
};
