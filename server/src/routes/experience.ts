import { Router } from "express"
import { createExperience, getExperiences, getExperienceById, deleteExperience } from "../controllers/experienceController.js"
import { requireAuth } from "../middleware/requireAuth.js"
import { requireRole } from "../middleware/requireRole.js"
import { rateLimiter } from "../middleware/rateLimiter.js"

const router = Router()

router.post("/create", requireAuth, requireRole(["SENIOR"]), rateLimiter(5, 60), createExperience)
router.get("/all", getExperiences)
router.get("/:blogId", getExperienceById)
router.delete("/:blogId", requireAuth, requireRole(["SENIOR", "ADMIN"]), deleteExperience)

export default router