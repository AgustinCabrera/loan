"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { RegisterFormData } from "../types";
import { Typography, Snackbar, Alert, InputAdornment } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../utils/validationSchemas";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "./shared/FormLayout";
import { FormTextField } from "./shared/FormTextField";
import { FormButton } from "./shared/FormButton";
import { handleFormSubmission } from "../utils/formUtils";
import { ErrorDisplay } from "./shared/ErrorDisplay";
import { SuccessNotification } from "./shared/SuccesNotifiaction";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      lastName: "",
      address: "",
      birthDate: new Date().toISOString().split("T")[0],
      loanAmount: undefined,
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const formattedData = {
      ...data,
      birthDate: new Date(data.birthDate).toISOString().split("T")[0],
    };

    handleFormSubmission(
      registerUser,
      formattedData,
      navigate,
      "/home",
      setError,
      setShowSuccess,
      3000
    );
  };

  return (
    <FormLayout title="Hello." subtitle="Apply for your loan here.">
      <SuccessNotification
        open={showSuccess}
        message="Registration successful! Redirecting to home page..."
        onClose={() => setShowSuccess(false)}
      />

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
          Registration successful! Redirecting to home page...
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextField
          label="Name"
          name="name"
          placeholder="Enter your first name here"
          register={register}
          error={errors.name?.message}
        />

        <FormTextField
          label="Last name"
          name="lastName"
          placeholder="Enter your last name here"
          register={register}
          error={errors.lastName?.message}
        />

        <FormTextField
          label="Address"
          name="address"
          placeholder="Enter your address here"
          register={register}
          error={errors.address?.message}
        />

        <FormTextField
          label="Email address"
          name="email"
          type="email"
          placeholder="Enter your email here"
          register={register}
          error={errors.email?.message}
        />

        <FormTextField
          label="Loan amount"
          name="loanAmount"
          type="number"
          placeholder="Enter loan amount"
          register={register}
          error={errors.loanAmount?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography
                  variant="body1"
                  sx={{ color: "#9ca3af", fontSize: "16px" }}
                >
                  $
                </Typography>
              </InputAdornment>
            ),
          }}
        />

        <FormTextField
          label="Birth date"
          name="birthDate"
          type="date"
          register={register}
          error={errors.birthDate?.message}
        />

        <FormTextField
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Phone must be in format (123) 456-7890"
          register={register}
          error={errors.phone?.message}
        />

        <FormTextField
          label="Password"
          name="password"
          placeholder="Type in here"
          register={register}
          error={errors.password?.message}
          isPassword={true}
        />

        <FormButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </FormButton>

        <FormButton type="button" variant="secondary" onClick={() => reset()}>
          Clear Form
        </FormButton>

        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
          Already have a loan? <Link to="/login">Login</Link>
        </Typography>
        <ErrorDisplay error={error} />
      </form>
    </FormLayout>
  );
}
