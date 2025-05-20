import z from "zod";
export const subscribeValidator = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
});
