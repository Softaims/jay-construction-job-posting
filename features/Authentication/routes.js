import express from "express";
const router = express.Router();
import { createUser, verifyEmail,resendVerificationEmail} from "./controllers.js";
import { signupValidator } from "./validators/signupValidator.js";
import { validate } from "../../middlewares/validate.js";
import { emailVerificationValidator } from "./validators/emailVerificationValidator.js";
import { resendEmailVerificationValidator } from "./validators/resendEmailVerificationValidator.js";
import { loginValidator } from "./validators/loginValidator.js";


router.post("/register",signupValidator, createUser);
router.post("/verify-email",validate(emailVerificationValidator), verifyEmail);
router.post("/resend-verification-email",validate(resendEmailVerificationValidator), resendVerificationEmail);
router.post("/resend-verification-email",validate(resendEmailVerificationValidator), resendVerificationEmail);
router.post("/login",validate(loginValidator), resendVerificationEmail);



export default router;
