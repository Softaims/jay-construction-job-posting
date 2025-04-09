import { z } from "zod";

export const emailVerificationValidator = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  token: z.string({ required_error: "Verification token is required" }).min(6, "Token must be at least 6 characters"),
});
