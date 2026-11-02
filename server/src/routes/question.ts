import { Router } from "express";
import { createQuestion, getQuestions, deleteQuestion } from "../controllers/questionController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router()

router.post("/create", requireAuth, requireRole(["ADMIN", "SENIOR"]), createQuestion)
router.get("/all", getQuestions)
router.delete("/:questionId", requireAuth, requireRole(["ADMIN", "SENIOR"]), deleteQuestion)

export default router