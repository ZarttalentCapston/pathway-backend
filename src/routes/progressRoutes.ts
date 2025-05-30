import { Router } from "express"
import { completeResource, getProgress, setTargetRole} from "../controller/progressController"
import { validateCompleteResource } from "../middleware/validationMiddleware"
import { authenticateToken } from "../middleware/authMiddleware"

const router = Router()

router.post("/complete", authenticateToken, validateCompleteResource, completeResource)

router.get("/", authenticateToken, getProgress)

router.post("/set-target-role", authenticateToken, setTargetRole)

export default router