import { NextFunction, Request, Response } from "express";
import { body, validationResult, ValidationError } from "express-validator";

// validate phone number
const validatePhoneNumber = (value: string) => {
  // accepts different phone number formats
  const internationalPattern =
    /^\+\d{1,3}\s?\(\d{1,4}\)[\s-]?\d{3}[\s-]?\d{4,}$/;
  const plainInternationalPattern = /^\+\d{10,15}$/;
  const usPattern = /^\(\d{3}\)\s?\d{3}-\d{4}$/;
  const digitsOnlyPattern = /^\d{10}$/;

  if (
    internationalPattern.test(value) ||
    plainInternationalPattern.test(value) ||
    usPattern.test(value) ||
    digitsOnlyPattern.test(value)
  ) {
    return true;
  }

  throw new Error(
    "Phone number must be in the format +1 (312) 555-0472, +13125550472, (312) 555-0472, or 3125550472"
  );
};

// validate register user
export const validateRegisterUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("Name must contain only letters and spaces"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("Last name must contain only letters and spaces"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long")
    .matches(/^[a-zA-Z0-9\s,'-]*$/)
    .withMessage(
      "Address must contain only letters, numbers, spaces, commas, and hyphens"
    ),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  body("birthDate")
    .trim()
    .notEmpty()
    .withMessage("Birth date is required")
    .isDate()
    .withMessage("Invalid birth date")
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        if (age - 1 < 18) {
          throw new Error("You must be at least 18 years old");
        }
      } else if (age < 18) {
        throw new Error("You must be at least 18 years old");
      }
      return true;
    }),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .custom(validatePhoneNumber),

  body("loanAmount")
    .trim()
    .notEmpty()
    .withMessage("Loan amount is required")
    .isInt({ min: 25000, max: 250000 })
    .withMessage(
      "Loan amount must be a whole number between $25,000 and $250,000"
    ),
];

// validate login user
export const validateLoginUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password").trim().notEmpty().withMessage("Password is required"),
];

// handle validation errors
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // group errors by field to avoid duplicates
    const groupedErrors = errors
      .array()
      .reduce((acc: { [key: string]: string[] }, error: ValidationError) => {
        const path = "path" in error ? error.path : "unknown";
        if (!acc[path]) {
          acc[path] = [];
        }
        if (!acc[path].includes(error.msg)) {
          acc[path].push(error.msg);
        }
        return acc;
      }, {});

    res.status(400).json({
      success: false,
      message: "Validation error",
      errors: Object.entries(groupedErrors).map(([path, messages]) => ({
        path,
        messages,
      })),
    });
    return;
  }
  next();
};
