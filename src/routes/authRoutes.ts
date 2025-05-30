import { Router } from "express";
import { register, login, forgotPassword, resetPassword, verifyEmail } from "../controller/authController";
import { validateRegister, validateLogin, validateForgotPassword, validateResetPassword, validateVerifyEmail } from "../middleware/validationMiddleware";

const router = Router()

router.post("/register", validateRegister, register)

router.post("/login", validateLogin,  login)

router.post("/forgot-password", validateForgotPassword, forgotPassword)

router.post("/reset-password", validateResetPassword,  resetPassword)

router.get("/verify-email", validateVerifyEmail, verifyEmail)

export default router