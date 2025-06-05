import { Snackbar, Alert } from "@mui/material";

interface SuccessNotificationProps {
  open: boolean;
  message: string;
  onClose?: () => void;
}

export const SuccessNotification = ({
  open,
  message,
  onClose,
}: SuccessNotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={onClose}
      sx={{
        zIndex: 9999,
        "& .MuiAlert-root": {
          backgroundColor: "#7c6fb0",
          color: "white",
          "& .MuiAlert-icon": {
            color: "white",
          },
        },
      }}
    >
      <Alert
        severity="success"
        sx={{
          width: "100%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
