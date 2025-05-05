import { z } from "zod";

export const verifyContractorDocumentsValidator = z.object({
  id: z.string({ required_error: "id is required" }),
  admin_status: z.enum(["verified", "rejected"], {
    required_error: "admin_status is required",
    invalid_type_error: "admin_status must be either 'verified' or 'rejected'",
  }),
});
