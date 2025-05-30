import { Router } from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { currentRole, setTargetRole} from "../controller/careerController"

const router = Router()

router.post("/current", authenticateToken, currentRole)

router.post("/target", authenticateToken, setTargetRole)


router.get("/dashboard", authenticateToken)

export default router
