import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getMe, updateUserProfile } from "./controllers.js";
import { updateProfileValidator } from "./validators/updateProfileValidator.js";
const router = express.Router();

router.get("/get-me", authMiddleware, getMe);

router.patch("/update-user-profile", authMiddleware, updateProfileValidator, updateUserProfile);

export default router;
