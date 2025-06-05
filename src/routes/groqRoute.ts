import { Router } from "express";
import { recommendWithGroq } from "../controller/groqController";
import { validateCurrentRole, validateTargetRole, validateSkills } from "../middleware/validationMiddleware";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router()

router.post("/recommendations", validateCurrentRole, validateTargetRole, validateSkills, authenticateToken, recommendWithGroq)

export default router