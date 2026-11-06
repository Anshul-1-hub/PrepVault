import {Router} from "express"
import { createDrive, getDrives, getDriveById, deleteDrive } from "../controllers/placementdrive.js"
import { requireRole } from "../middleware/requireRole.js"
import { requireAuth } from "../middleware/requireAuth.js"

const router = Router()

router.post("/create", requireAuth, requireRole(["ADMIN"]), createDrive)
router.get("/all", requireAuth, getDrives)
router.get("/:driveId", requireAuth, getDriveById)
router.delete("/:driveId", requireAuth, requireRole(["ADMIN"]), deleteDrive)

export default router