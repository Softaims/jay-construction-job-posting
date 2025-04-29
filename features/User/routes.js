import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getMe, updateUserProfile } from "./controllers.js";
import { updateProfileValidator } from "./validators/updateProfileValidator.js";
import { upload } from "../../utils/multer.js";
import { validateProfilePicture } from "./validators/validateProfilePicture.js";
const router = express.Router();

router.get("/get-me", authMiddleware, getMe);

router.patch(
  "/update-user-profile",
  authMiddleware,
  upload.fields([{ name: "profile_picture" }]),
  validateProfilePicture,
  updateProfileValidator,
  updateUserProfile
);

export default router;
