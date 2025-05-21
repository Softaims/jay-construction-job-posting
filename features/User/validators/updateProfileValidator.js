import { validate } from "../../../middlewares/validate.js";
import { z } from "zod";
import { phoneRegex } from "../../../utils/phoneRegex.js";

const baseSchema = {
  description: z.string().min(20, "Description must be at least 20 characters").optional(),
};

export const mainContractorSchema = z
  .object({
    ...baseSchema,
    company_name: z.string().min(2, "Company name must be at least 2 characters").optional(),
    company_number: z
      .string()
      .min(4, "Company number must be at least 4 characters")
      .regex(phoneRegex, "Invalid company number format")
      .optional(),
  })
  .strict();

export const subcontractorSchema = z
  .object({
    ...baseSchema,
    company_name: z.string().min(2, "Company name must be at least 2 characters").optional(),
    company_number: z
      .string()
      .min(4, "Company number must be at least 4 characters")
      .regex(phoneRegex, "Invalid company number format")
      .optional(),
    travel_radius_km: z.number().min(1, "Travel radius must be at least 1 km").optional(),
    services_offered: z.array(z.string()).min(1, "At least one service must be provided").optional(),
  })
  .strict();

export const jobSeekerSchema = z
  .object({
    ...baseSchema,
    full_name: z.string().min(2, "Full name must be at least 2 characters").optional(),
    phone_number: z.string().min(8, "Phone number must be at least 8 digits").regex(phoneRegex, "Invalid phone number format").optional(),
    trade: z.string().min(2, "Trade must be at least 2 characters").optional(),
    travel_radius_km: z.preprocess((val) => Number(val), z.number().min(1, "Travel radius must be at least 1 km")).optional(),
  })
  .strict();

export const updateProfileValidator = (req, res, next) => {
  const { role } = req.user;
  let schema;
  if (role === "main_contractor") schema = mainContractorSchema;
  else if (role === "subcontractor") schema = subcontractorSchema;
  else if (role === "job_seeker") schema = jobSeekerSchema;
  else return res.status(400).json({ message: "Invalid role" });

  return validate(schema)(req, res, next);
};
