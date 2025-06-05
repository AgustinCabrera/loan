import * as yup from "yup";

export const validateAge = (birthDate: Date | undefined) => {
  if (!birthDate) {
    return false;
  }
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1 >= 18;
  }
  return age >= 18;
};

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "Name should not contain numbers or special characters"
    ),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "Name should not contain numbers or special characters"
    ),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .matches(
      /^[a-zA-Z0-9\s,'-]*$/,
      "Address must contain only letters, numbers, spaces, commas, and hyphens"
    )
    .test("not-all-numbers", "Address cannot be all numbers", (value) => {
      if (!value) return true;
      return !/^\d+$/.test(value);
    }),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  birthDate: yup
    .string()
    .required("Birth date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birth date must be in YYYY-MM-DD format")
    .test("is-valid-age", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      return validateAge(birthDate);
    }),

  loanAmount: yup
    .number()
    .required("Loan amount is required")
    .min(25000, "Loan amount must be at least $25,000")
    .max(250000, "Loan amount must be less than $250,000"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(\+\d{1,3}\s?\(\d{1,4}\)[\s-]?\d{3}[\s-]?\d{4,}|^\+\d{10,15})$/,
      "Phone number must be in the format +1 (312) 555-0472 or +13125550472"
    ),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type RegistrationFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
