"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData } from "../types";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/validationSchemas";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "./shared/FormLayout";
import { FormTextField } from "./shared/FormTextField";
import { FormButton } from "./shared/FormButton";
import { handleFormSubmission } from "../utils/formUtils";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  // use form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // on submit
  const onSubmit = async (data: LoginFormData) => {
    handleFormSubmission(
      (formData) => login(formData.email, formData.password),
      data,
      navigate,
      "/home"
    );
  };

  // return form
  return (
    <FormLayout title="Hello." subtitle="Login here.">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextField
          label="Email address"
          name="email"
          type="email"
          placeholder="Enter your email here"
          register={register}
          error={errors.email?.message}
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
          {isSubmitting ? "Logging in..." : "Login"}
        </FormButton>
      </form>
      <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </FormLayout>
  );
}
