import { z } from "zod";

export const jobPostValidator = z.object({
  project_image: z.string().optional(),

  job_title: z.string({
    required_error: "Job title is required",
  }),

  job_location: z.object({
    type: z
    .literal("Point")
    .optional(),
    coordinates: z
      .tuple([
        z.number({
          required_error: "Longitude is required",
        }),
        z.number({
          required_error: "Latitude is required",
        }),
      ])
      .refine(
        ([lng, lat]) => lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90,
        {
          message: "Coordinates must be valid longitude [-180,180] and latitude [-90,90]",
        }
      ),
  }, {
    required_error: "Job location is required",
  }),

  job_type: z.string({
    required_error: "Job type is required",
  }),

  target_user: z.enum(["job_seeker", "subcontractor", "both"], {
    required_error: "Target user is required",
  }),
  

  services: z.array(
    z.object({
      service_name: z.string({
        required_error: "Service name is required",
      }),
      resource_count: z.number().optional(),
    })
  ).min(1, "At least one service is required"),

  job_priority: z.boolean().optional(),
  budget: z.number().optional(),
});
