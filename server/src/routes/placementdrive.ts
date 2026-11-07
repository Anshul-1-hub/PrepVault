import {Router} from "express"
import { createDrive, getDrives, getDriveById, deleteDrive } from "../controllers/placementdrive.js"
import { requireRole } from "../middleware/requireRole.js"
import { requireAuth } from "../middleware/requireAuth.js"
import { rateLimiter } from "../middleware/rateLimiter.js"

const router = Router()

router.post("/create", requireAuth, requireRole(["ADMIN"]), rateLimiter(5, 60), createDrive)
router.get("/all", requireAuth, getDrives)
router.get("/:driveId", requireAuth, getDriveById)
router.delete("/:driveId", requireAuth, requireRole(["ADMIN"]), deleteDrive)

export default router