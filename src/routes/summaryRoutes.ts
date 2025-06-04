import { Router } from 'express'
import { getSummary, confirmOnboarding } from '../controller/summaryController'
import { authenticateToken } from '../middleware/authMiddleware'

const router = Router()

router.get("/", authenticateToken, getSummary)

router.post("/confirm", authenticateToken, confirmOnboarding)


export default router