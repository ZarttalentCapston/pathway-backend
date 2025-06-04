import { Router } from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { currentRole, setTargetRole, updateTargetGoal} from "../controller/careerController"

const router = Router()

router.post("/current", authenticateToken, currentRole)

router.post("/target", authenticateToken, setTargetRole)

router.put("/target-role", authenticateToken, updateTargetGoal)


export default router
