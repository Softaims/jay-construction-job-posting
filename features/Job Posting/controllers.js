import { jobPostDto } from "./dtos/jobPostDto.js";
import { createAJob, fetchJobById, fetchJobs } from "./services.js";
import { getUserById } from "../../shared/services/services.js";

export const createJobPost = async (req, res) => {
  try {
    const userId=req.user
    const user=await getUserById(userId)
    if(!user.admin_verified){
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot post a job until admin approval.",
      });
    }
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (role === 'job_seeker') {
      allowedTargetUsers = ['job_seeker', 'both'];
    } else if (role === 'subcontractor') {
      allowedTargetUsers = ['subcontractor', 'both'];
    } else if (role === 'main_contractor' || role === 'admin') {
      allowedTargetUsers = ['job_seeker', 'subcontractor', 'both'];
    } else {
      return res.status(403).json({ message: 'You are not authorized to view jobs' });
    }

    const { jobs, total } = await fetchJobs(allowedTargetUsers, page, limit);

    return res.status(200).json({
      message: "Jobs fetched successfully",
      data:{
        jobs:jobs,
        pagination:{
          total,page,limit,totalPages:Math.ceil(total/limit)
        }
      }
    });

  } catch (error) {
    console.error("Job Post error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during fetching jobs",
      error: Array.isArray(error.message) ? error.message : [error.message],
    });
  }
};


export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.user;

    const job = await fetchJobById(id);


    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

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

    if (!allowedTargetUsers.includes(job.target_user)) {
      return res.status(403).json({ message: 'You are not authorized to view this job' });
    }

    return res.status(200).json({
      message: "Job fetched successfully",
      job:job
    });

  } catch (error) {
    console.error("Job Post error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during fetching a job",
      error: Array.isArray(error.message) ? error.message : [error.message],
    });
  }
};
