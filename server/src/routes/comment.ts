import { Router } from "express";
import { createComment, getComments, deleteComment } from "../controllers/commentController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = Router({mergeParams: true})

router.post("/create", requireAuth, rateLimiter(5, 60), createComment)
router.get("/all", getComments)
router.delete("/:commentId", requireAuth, deleteComment)

export default router