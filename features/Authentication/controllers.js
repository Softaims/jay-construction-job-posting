import {
  createUserByRole,
  updateUserEmailVerificationStatus,
  createBlacklistedToken,
} from "./services.js";
import { getUserByEmail } from "../../shared/services/services.js";
import bcrypt from "bcrypt";
import { sendMail } from "../../utils/email.utils.js";
import { userDto } from "./dtos/userDto.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync.js";
import createError from "http-errors";

export const createUser = catchAsync(async (req, res,next) => {
  const { role, email, password } = req.body;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return next(createError(409, "User with this email already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // Generate verification token using bcrypt and expiry
  const tokenPlain = `${email}-${Date.now()}`;
  const verificationToken = await bcrypt.hash(tokenPlain, 10);
  const verificationTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

  const userData = {
    ...req.body,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpiry,
  };
  const newUser = await createUserByRole(role, userData);

  const verificationUrl = `${
    process.env.CLIENT_URL
  }/verify-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
    verificationToken
  )}`;

  await sendMail(email, "Email Verification", verificationUrl);

  return res.status(201).json({
    success: true,
    message: "User registered successfully. Please verify your email.",
    data: userDto(newUser),
  });
});

export const verifyEmail = catchAsync(async (req, res,next) => {
  const { email, token } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return next(createError(404, "User not found"));
  }
  if (user.verifyEmail) {
    return next(createError(400, "Email is already verified"));
  }
  if (user.verificationTokenExpiry < new Date()) {
    return next(createError(400, "Verification token has expired"));
  }
  const isMatch = token === user.verificationToken;
  if (!isMatch) {
    return next(createError(400, "Invalid verification token"));
  }
  await updateUserEmailVerificationStatus(user._id);

  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
});

export const resendVerificationEmail =catchAsync(async (req, res,next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email.toLowerCase());

  if (!user) {
    return next(createError(404, "User not found"));
  }

  if (user.verifyEmail) {
    return next(createError(400, "Email already verified"));
  }
  if (
    user.verificationTokenExpiry &&
    user.verificationTokenExpiry > Date.now()
  ) {
    return next(
      createError(
        400,
        "A verification email has already been sent recently. Check your mail"
      )
    );
  }

  const saltRounds = 10;
  const tokenPlain = `${email}-${Date.now()}`;
  const verificationToken = await bcrypt.hash(tokenPlain, saltRounds);
  const verificationTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

  user.verificationToken = verificationToken;
  user.verificationTokenExpiry = verificationTokenExpiry;
  await user.save();

  const verificationUrl = `${
    process.env.CLIENT_URL
  }/verify-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
    verificationToken
  )}`;

  await sendMail(email, "Resend Email Verification", verificationUrl);

  return res.status(200).json({
    success: true,
    message: "Verification email resent successfully.",
  });
});

export const loginUser =catchAsync(async (req, res,next) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email.toLowerCase());

    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (!user.verifyEmail) {
      if (
        !user.verificationTokenExpiry ||
        user.verificationTokenExpiry <= Date.now()
      ) {
        const tokenPlain = `${email}-${Date.now()}`;
        const verificationToken = await bcrypt.hash(tokenPlain, 10);
        const verificationTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

        user.verificationToken = verificationToken;
        user.verificationTokenExpiry = verificationTokenExpiry;
        await user.save();

        const verificationUrl = `${
          process.env.CLIENT_URL
        }/verify-email?email=${encodeURIComponent(
          email
        )}&token=${encodeURIComponent(verificationToken)}`;

        await sendMail(email, "Resend Email Verification", verificationUrl);

        return next(
          createError(
            403,
            "Your account is not verified. A new verification email has been sent."
          )
        );
      }
      return next(
        createError(
          403,
          "Your account is not verified. Please check your email for verification link"
        )
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(401,"Incorrect password"))
    }
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set JWT token in HTTP-only cookie
    res.cookie("access_token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax", // Adjust sameSite to 'lax' for compatibility
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: userDto(user),
    });
 
});

export const forgotPassword =catchAsync(async (req, res,next) => {
  const { email } = req.body;

    const user = await getUserByEmail(email.toLowerCase());
    if (!user) {
      return next(createError(404,"User not found"))
    }
    if (user.resetPasswordToken && user.resetPasswordExpiry > Date.now()) {
      return next(createError(403,"Password reset email already sent. Please check your inbox"))
    }

    const tokenPlain = `${email}-${Date.now()}`;
    const resetPasswordToken = await bcrypt.hash(tokenPlain, 10);
    const resetPasswordExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiry = resetPasswordExpiry;
    await user.save();

    const resetUrl = `${
      process.env.CLIENT_URL
    }/reset-password?token=${encodeURIComponent(
      resetPasswordToken
    )}&email=${encodeURIComponent(email)}`;

    // Send the reset email
    await sendMail(email, "Password Reset Request", resetUrl);

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully.",
    });

});

export const resetPassword =catchAsync(async (req, res,next) => {
  const { email, token, password } = req.body;

    const user = await getUserByEmail(email.toLowerCase());
    if (!user) {
      return next(createError(404,"User not found"))
    }
    if (
      !user.resetPasswordToken ||
      user.resetPasswordToken !== token ||
      user.resetPasswordExpiry < Date.now()
    ) {
      return next(createError(400,"Invalid or expired token"))
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
 
});

export const logoutUser =catchAsync(async (req, res,next) => {
    const token = req.cookies.access_token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const expiresAt = new Date(decoded.exp * 1000);
      await createBlacklistedToken(token, expiresAt);
    }
    res.clearCookie("access_token");
    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
});

