import { validate } from "../../../middlewares/validate.js";
import { z } from "zod";

const baseSchema = {
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["main_contractor", "subcontractor", "job_seeker"]),
};

export const mainContractorSchema = z.object({
  ...baseSchema,
  company_name: z.string({ required_error: "Company name is required" }).min(2, "Company name must be at least 2 characters"),

  company_number: z.string({ required_error: "Company number is required" }).min(4, "Company number must be at least 4 characters"),
});

export const subcontractorSchema = z.object({
  ...baseSchema,

  company_name: z.string({ required_error: "Company name is required" }).min(2, "Company name must be at least 2 characters"),

  company_number: z.string({ required_error: "Company number is required" }).min(4, "Company number must be at least 4 characters"),

  services_offered: z.array(z.string({ required_error: "Service name is required" })).min(1, "At least one service must be provided"),
});

export const jobSeekerSchema = z.object({
  ...baseSchema,
  full_name: z.string({ required_error: "Full name is required" }).min(2, "Full name must be at least 2 characters long"),

  phone_number: z.string({ required_error: "Phone number is required" }).min(8, "Phone number must be at least 8 digits"),

  trade: z.string({ required_error: "Trade is required" }).min(2, "Trade must be at least 2 characters long"),

  travel_radius_km: z.preprocess((val) => Number(val), z.number({ required_error: "Travel radius is required" }).min(1, "Travel radius must be at least 1 km")),

  qualification_document: z.string().optional(),

  id_document: z.string().optional(),
});

export const signupValidator = (req, res, next) => {
  const { role } = req.body;
  let schema;

  if (role === "main_contractor") schema = mainContractorSchema;
  else if (role === "subcontractor") schema = subcontractorSchema;
  else if (role === "job_seeker") schema = jobSeekerSchema;
  else return res.status(400).json({ message: "Invalid role" });

  return validate(schema)(req, res, next);
};
