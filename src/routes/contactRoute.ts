import { Router } from "express";
import { submitContactForm } from "../controller/contactController";
import { validateContact } from "../middleware/validationMiddleware";


const router = Router()

router.post("/", validateContact, submitContactForm)

export default router