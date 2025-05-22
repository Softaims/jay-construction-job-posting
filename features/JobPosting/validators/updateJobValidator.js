import { z } from "zod";
import { constructionServices } from "../../../constants/constructionServices.js";
import { jobTypes } from "../../../constants/jobTypes.js";
export const updateJobValidator = z
  .object({
    project_image: z.string().optional(),

    job_title: z
      .string({
        invalid_type_error: "job_title must be a string",
      })
      .optional(),

    job_description: z
      .string({
        invalid_type_error: "job_title must be a string",
      })
      .optional(),

    job_location: z
      .object(
        {
          type: z.literal("Point").optional(),
          coordinates: z
            .tuple([
              z.number({
                required_error: "Longitude is required",
                invalid_type_error: "Longitude must be a number",
              }),
              z.number({
                required_error: "Latitude is required",
                invalid_type_error: "Latitude must be a number",
              }),
            ])
            .refine(([lng, lat]) => lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90, {
              message: "Coordinates must be valid longitude [-180,180] and latitude [-90,90]",
            }),
        },
        {
          invalid_type_error: "job_location must be an object",
        }
      )
      .optional(),

    job_type: z
      .enum(jobTypes, {
        invalid_type_error: "job_type is invalid",
      })
      .optional(),

    target_user: z
      .enum(["job_seeker", "subcontractor"], {
        invalid_type_error: "target_user must be 'job_seeker' or 'subcontractor'",
      })
      .optional(),

    services: z
      .array(
        z.object({
          service_name: z.enum(constructionServices, {
            required_error: "service_name is required",
            invalid_type_error: "service_name is invalid",
          }),
          resource_count: z.number({ invalid_type_error: "resource_count must be a number" }).optional(),
          number_of_days: z.number({ invalid_type_error: "number_of_days must be a number" }).optional(),
        }),
        { invalid_type_error: "services must be an array" }
      )
      .min(1, "At least one service is required")
      .optional(),

    job_priority: z.boolean({ invalid_type_error: "job_priority must be a boolean" }).optional(),
    budget: z.number({ invalid_type_error: "budget must be a number" }).optional(),
  })
  .superRefine((data, ctx) => {
    data.services?.forEach((service, index) => {
      if (data.target_user === "job_seeker") {
        if (!service.resource_count) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["services", index, "resource_count"],
            message: "resource_count is required for job_seeker",
          });
        }

        if (!service.number_of_days) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["services", index, "number_of_days"],
            message: "number_of_days is required for job_seeker",
          });
        }
      }

      if (data.target_user === "subcontractor") {
        if (service.resource_count) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["services", index, "resource_count"],
            message: "Job should not specify resource_count for target user subcontractor",
          });
        }

        if (service.number_of_days != null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["services", index, "number_of_days"],
            message: "Job should not specify number_of_days for target user subcontractor",
          });
        }
      }
    });
  });
