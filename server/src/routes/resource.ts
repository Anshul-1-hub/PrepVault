import { Router } from "express";
import { createResource, getResource, deleteResource } from "../controllers/resourceController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router()

router.post("/create", requireAuth, requireRole(["ADMIN", "SENIOR"]), createResource)
router.get("/all", getResource)
router.delete("/:resourceId", requireAuth, requireRole(["ADMIN", "SENIOR"]), deleteResource)

export default router