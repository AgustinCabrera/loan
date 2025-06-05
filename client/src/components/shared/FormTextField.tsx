import {
  TextField,
  FormLabel,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormTextFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
  fullWidth?: boolean;
  InputProps?: any;
  isPassword?: boolean;
}

export const FormTextField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  fullWidth = true,
  InputProps,
  isPassword = false,
}: FormTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordProps = isPassword
    ? {
        type: showPassword ? "text" : "password",
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                aria-label={showPassword ? "Hide password" : "Show password"}
                sx={{
                  color: "#9ca3af",
                  "&:hover": {
                    color: "#6b7280",
                  },
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }
    : { type, InputProps };

  return (
    <Box sx={{ mb: 3 }}>
      <FormLabel sx={{ mb: 1, display: "block", fontWeight: 500 }}>
        {label}
      </FormLabel>
      <TextField
        {...register(name)}
        {...passwordProps}
        placeholder={placeholder}
        fullWidth={fullWidth}
        error={!!error}
        helperText={error}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            padding: "4px",
            "& fieldset": {
              borderColor: error ? "#f87171" : "#e5e7eb",
            },
            "&:hover fieldset": {
              borderColor: "#7c6fb0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7c6fb0",
              borderWidth: "2px",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "16px",
            color: "#374151",
            "&::placeholder": {
              color: "#9ca3af",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
};
