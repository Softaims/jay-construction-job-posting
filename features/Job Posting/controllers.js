import { jobPostDto } from "./dtos/jobPostDto.js";
import { createAJob, fetchJobById, fetchJobs } from "./services.js";
import { getUserById } from "../../shared/services/services.js";
import { catchAsync } from "../../utils/catchAsync.js";
import createError from "http-errors";

export const createJobPost = catchAsync(async (req, res) => {
  const userId = req.user;
  const user = await getUserById(userId);
  if (user.admin_status != "verified") {
    return next(createError(403, "Forbidden: You cannot post a job until admin approval."));
  }
  const newJob = await createAJob({ ...req.body, created_by: userId });

  return res.status(201).json({
    message: "Job created successfully",
    job: jobPostDto(newJob),
  });
});

export const getAllJobs = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  let allowedTargetUsers = [];
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { latitude, longitude } = req.query;
  let distanceInKm = req.query.distanceInKm ? Number(req.query.distanceInKm) : req.user.travelRadius;
  if (!latitude || !longitude) {
    return next(createError(400, "Latitude and longitude are required."));
  }

  if (role === "job_seeker") {
    allowedTargetUsers = ["job_seeker", "both"];
  } else if (role === "subcontractor") {
    allowedTargetUsers = ["subcontractor", "both"];
  } else if (role === "main_contractor" || role === "admin") {
    allowedTargetUsers = ["job_seeker", "subcontractor", "both"];
  } else {
    return next(createError(403, "You are not authorized to view jobs"));
  }

  console.log("calling fetch job");
  const { jobs, total } = await fetchJobs(allowedTargetUsers, page, limit, latitude, longitude, distanceInKm);

  return res.status(200).json({
    message: "Jobs fetched successfully",
    data: {
      jobs: jobs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

export const getJobById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.user;

  const job = await fetchJobById(id);
  if (!job) {
    return next(createError(404, "Job not found"));
  }

  let allowedTargetUsers = [];

  if (role === "job_seeker") {
    allowedTargetUsers = ["job_seeker", "both"];
  } else if (role === "subcontractor") {
    allowedTargetUsers = ["subcontractor", "both"];
  } else if (role === "main_contractor" || role === "admin") {
    allowedTargetUsers = ["job_seeker", "subcontractor", "both"];
  } else {
    return next(createError(403, "You are not authorized to view jobs"));
  }

  if (!allowedTargetUsers.includes(job.target_user)) {
    return next(createError(403, "You are not authorized to view jobs"));
  }

  return res.status(200).json({
    message: "Job fetched successfully",
    job: job,
  });
});
