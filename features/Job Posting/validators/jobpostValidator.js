import { z } from "zod";

export const jobPostValidator = z.object({
  project_image: z.string().optional(),

  job_title: z.string({
    required_error: "Job title is required",
  }),

  job_location: z.object({
    latitude: z.number({
      required_error: "Latitude is required",
    }),
    longitude: z.number({
      required_error: "Longitude is required",
    }),
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
  created_by: z.string({
    required_error: "created_by is required",
  }),
});
