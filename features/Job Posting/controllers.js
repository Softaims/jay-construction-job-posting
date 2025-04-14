import { jobPostDto } from "./dtos/jobPostDto.js";
import { createAJob } from "./services.js";

export const createJobPost = async (req, res) => {
  try {
   const newJob=await createAJob(req.body)

    return res.status(201).json({
      message: "Job created successfully",
      job:jobPostDto(newJob),
    });
  } catch (error) {
    console.error("Job Post error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during posting a new job",
      error: Array.isArray(error.message) ? error.message : [error.message],
    });
  }
};
