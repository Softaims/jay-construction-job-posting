import express from "express";
const router = express.Router();
import {
  createUser,
  verifyEmail,
  resendVerificationEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  checkEmail,
} from "./controllers.js";
import { signupValidator } from "./validators/signupValidator.js";
import { validate } from "../../middlewares/validate.js";
import { emailVerificationValidator } from "./validators/emailVerificationValidator.js";
import { resendEmailVerificationValidator } from "./validators/resendEmailVerificationValidator.js";
import { loginValidator } from "./validators/loginValidator.js";
import { forgotPasswordValidator } from "./validators/forgotPasswordValidator.js";
import { resetPasswordValidator } from "./validators/resetPasswordValidator.js";
import { upload } from "../../utils/multer.js";
import { validateDocuments } from "./validators/validateDocuments.js";
import { checkEmailValidator } from "./validators/checkEmailValidator.js";
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: |
 *       Register a new user based on their role.
 *       The request body structure varies depending on the `role` value.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/MainContractorSignup'
 *               - $ref: '#/components/schemas/SubcontractorSignup'
 *               - $ref: '#/components/schemas/JobSeekerSignup'
 *     responses:
 *       201:
 *         description: User registered successfully and email verification sent.
 *       400:
 *         description: Invalid role or bad request.
 *       409:
 *         description: User with this email already exists.
 */

router.post(
  "/register",
  upload.fields([{ name: "qualification_document" }, { name: "id_document" }]),
  validateDocuments,
  signupValidator,
  createUser
);
router.post("/check-email", validate(checkEmailValidator), checkEmail);
router.post("/verify-email", validate(emailVerificationValidator), verifyEmail);

/**
 * @swagger
 * /resend-verification-email:
 *   post:
 *     summary: Resend email verification token
 *     description: |
 *       Resends a verification email to the user if their email is not verified and a verification token has expired or is missing.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user to resend the verification email to.
 *     responses:
 *       200:
 *         description: Verification email resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Verification email resent successfully."
 *       400:
 *         description: Invalid request (e.g., email already verified, recent token sent)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "A verification email has already been sent recently. Check your mail."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *     tags:
 *       - Authentication
 */
router.post("/resend-verification-email", validate(resendEmailVerificationValidator), resendVerificationEmail);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: |
 *       This endpoint allows users to log in by providing their email and password.
 *       If the user's email is not verified, a new verification email is sent.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user attempting to log in.
 *               password:
 *                 type: string
 *                 description: The password associated with the user's account.
 *     responses:
 *       200:
 *         description: Login successful and user is authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful."
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The unique identifier for the user.
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                     role:
 *                       type: string
 *                       description: The role of the user (e.g., main_contractor, subcontractor, job_seeker).
 *       401:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Incorrect password"
 *       403:
 *         description: Account is not verified or token has expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Your account is not verified. Please check your email for the verification link"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *     tags:
 *       - Authentication
 */
router.post("/login", validate(loginValidator), loginUser);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: |
 *       This endpoint allows users to request a password reset by providing their email address.
 *       If a reset request has already been sent recently, the user will be notified.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user requesting a password reset.
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password reset email sent successfully."
 *       403:
 *         description: A password reset email has already been sent recently.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Password reset email already sent. Please check your inbox."
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *     tags:
 *       - Authentication
 */
router.post("/forgot-password", validate(forgotPasswordValidator), forgotPassword);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset user password
 *     description: |
 *       This endpoint allows users to reset their password using a reset token sent to their email.
 *       The user must provide the reset token, their email, and the new password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - token
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user requesting the password reset.
 *               token:
 *                 type: string
 *                 description: The reset token received via email.
 *               password:
 *                 type: string
 *                 description: The new password the user wants to set.
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password reset successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully."
 *       400:
 *         description: Invalid or expired token or invalid password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *     tags:
 *       - Authentication
 */
router.post("/reset-password", validate(resetPasswordValidator), resetPassword);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out the user and clear the authentication token
 *     description: |
 *       This endpoint logs out the user by verifying and blacklisting their authentication token,
 *       clearing the JWT token from the client's cookies, and ending the session.
 *     responses:
 *       200:
 *         description: User logged out successfully, authentication token cleared.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logout successful."
 *       400:
 *         description: No active session or token found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No active session or token found."
 *     tags:
 *       - Authentication
 */
router.post("/logout", logoutUser);

export default router;
