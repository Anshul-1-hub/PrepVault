import { Router } from "express";
import { createQuestion, getQuestions, deleteQuestion } from "../controllers/questionController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = Router()

router.post("/create", requireAuth, requireRole(["ADMIN", "SENIOR"]), rateLimiter(5, 60), createQuestion)
router.get("/all", getQuestions)
router.delete("/:questionId", requireAuth, requireRole(["ADMIN", "SENIOR"]), deleteQuestion)

export default router