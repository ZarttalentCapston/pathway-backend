import { Router } from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { validateSkills } from "../middleware/validationMiddleware"
import { setSkills } from "../controller/skillController"


const router = Router()

router.post("/", authenticateToken, validateSkills, setSkills)

export default router