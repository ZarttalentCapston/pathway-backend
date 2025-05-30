import { body, query } from "express-validator";

export const validateRegister = [

    body("email")
    .isEmail()
    .withMessage("invalid email"),

    body("password")
    .isLength({ min : 6 })
    .withMessage("Password must be at least 6 characters"),

    body("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password do not match")
    
]


export const validateLogin = [
     body("email")
    .isEmail()
    .withMessage("invalid email"),

    body("password")
    .notEmpty()
    .withMessage("Password is required")
]


export const validateForgotPassword = [

    body("email")
    .isEmail()
    .withMessage("Invalid email")
]


export const validateResetPassword = [

    body("email")
    .isEmail()
    .withMessage("Valid email is required"),

    body("otp")
    .notEmpty()
    .withMessage("OTP is required"),

    body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),

    body("confirmNewPassword")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("New passwords do not match")
];

export const validateVerifyEmail = [
   query("token")
   .notEmpty()
   .withMessage("Verification token is required")
]



export const validateCurrentRole = [
  body("currentRole")
    .isString().withMessage("Current role must be a string")
    .notEmpty().withMessage("Current role is required"),
];

export const validateTargetRole = [
  body("targetRole")
    .isString().withMessage("Target role must be a string")
    .notEmpty().withMessage("Target role is required"),
];

export const validateSkills = [
  body("skills")
    .isArray({ min: 1 }).withMessage("Skills must be a non-empty array")
    .custom((skills) => skills.every((skill: any) => typeof skill === "string"))
    .withMessage("Each skill must be a string"),
];





