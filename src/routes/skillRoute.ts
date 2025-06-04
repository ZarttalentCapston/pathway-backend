import { Router } from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { validateSkills } from "../middleware/validationMiddleware"
import { setCurrentSkills } from "../controller/skillController"


const router = Router()

router.post("/", authenticateToken, validateSkills, setCurrentSkills)

export default router