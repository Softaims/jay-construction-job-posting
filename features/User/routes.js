import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getMe, updateUserProfile, subscribeController } from "./controllers.js";
import { updateProfileValidator } from "./validators/updateProfileValidator.js";
import { upload } from "../../utils/multer.js";
import { validateProfilePicture } from "./validators/validateProfilePicture.js";
import { subscribeValidator } from "./validators/subscribeValidator.js";
import { validate } from "../../middlewares/validate.js";
const router = express.Router();

router.get("/get-me", authMiddleware, getMe);
router.post("/subscribe", validate(subscribeValidator), subscribeController);

router.patch(
  "/update-user-profile",
  authMiddleware,
  upload.fields([{ name: "profile_picture" }]),
  validateProfilePicture,
  updateProfileValidator,
  updateUserProfile
);

export default router;
