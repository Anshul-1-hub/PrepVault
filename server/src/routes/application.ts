import { Router } from "express";
import { createApplication, getMyApplications, deleteApplication, updateStatus } from "../controllers/application.js";
import { requireRole } from "../middleware/requireRole.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = Router()

router.post("/create/:driveId", requireAuth, rateLimiter(5, 60), createApplication)
router.get("/all", requireAuth, getMyApplications)
router.patch("/:applicationId", requireAuth, requireRole(["ADMIN"]), updateStatus)
router.delete("/:applicationId", requireAuth, deleteApplication)

export default router