import { jobPostDto } from "./dtos/jobPostDto.js";
import { createAJob, fetchJobs } from "./services.js";

export const createJobPost = async (req, res) => {
  try {
    const userId=req.user
   const newJob=await createAJob({...req.body,created_by:userId})

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


export const getAllJobs = async (req, res) => {
  try {
    const { role } = req.user;
    let allowedTargetUsers = [];

    if (role === 'job_seeker') {
      allowedTargetUsers = ['job_seeker', 'both'];
    } else if (role === 'subcontractor') {
      allowedTargetUsers = ['subcontractor', 'both'];
    } else if (role === 'main_contractor' || role === 'admin') {
      allowedTargetUsers = ['job_seeker', 'subcontractor', 'both'];
    } else {
      return res.status(403).json({ message: 'You are not authorized to view jobs' });
    }

    const jobs = await fetchJobs(allowedTargetUsers);

    return res.status(200).json({
      message: "Jobs fetched successfully",
      jobs: jobs,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

