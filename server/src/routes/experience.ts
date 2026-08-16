import { Router } from "express";
import { createExperience, getExperiences, getExperienceById, deleteExperience } from "../controllers/experienceController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router();

router.post("/create", requireAuth, requireRole(["SENIOR"]), createExperience);
router.get("/all", getExperiences);
router.get("/:blogId", getExperienceById);
router.delete("/:blogId", requireAuth, requireRole(["SENIOR", "ADMIN"]), deleteExperience);

export default router;