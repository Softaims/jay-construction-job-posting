import express from "express";
const router = express.Router();
import { createUser, verifyEmail,resendVerificationEmail, loginUser, forgotPassword, resetPassword, logoutUser, submitContractorDocuments} from "./controllers.js";
import { signupValidator } from "./validators/signupValidator.js";
import { validate } from "../../middlewares/validate.js";
import { emailVerificationValidator } from "./validators/emailVerificationValidator.js";
import { resendEmailVerificationValidator } from "./validators/resendEmailVerificationValidator.js";
import { loginValidator } from "./validators/loginValidator.js";
import { forgotPasswordValidator } from "./validators/forgotPasswordValidator.js";
import { resetPasswordValidator } from "./validators/resetPasswordValidator.js";
import { upload } from "../../utils/multer.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
import { validateVerificationCertificates } from "../../middlewares/validateVerificationCertificates.js";

router.post("/register",signupValidator, createUser);
router.post("/verify-email",validate(emailVerificationValidator), verifyEmail);
router.post("/resend-verification-email",validate(resendEmailVerificationValidator), resendVerificationEmail);
router.post("/login",validate(loginValidator), loginUser);
router.post("/forgot-password",validate(forgotPasswordValidator), forgotPassword);
router.post("/reset-password",validate(resetPasswordValidator), resetPassword);
router.post("/logout", logoutUser);
router.post("/submit-contractor-documents", upload.fields([
    { name: 'compliance_certificate'},
    { name: 'verification_certificate' }
  ]),authMiddleware,authorizeMiddleware("main_contractor","subcontractor"),validateVerificationCertificates,submitContractorDocuments)



export default router;
