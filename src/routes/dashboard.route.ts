import { Router } from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { getDashboard } from "../controller/dashboardController"

const router = Router()

router.get("/", authenticateToken,  getDashboard)

export default router