import mongoose from "mongoose";
import { Job } from "../../shared/models/JobModel.js";
export const createAJob = async (jobData) => {
 let newJob=new Job(jobData)
  return await newJob.save();
};

export const fetchJobs = async (allowedTargetUsers, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const jobs = await Job.find({ target_user: { $in: allowedTargetUsers } })
    .skip(skip)
    .limit(limit)
    .populate("created_by","company_name company_number email role"); 

  const total = await Job.countDocuments({ target_user: { $in: allowedTargetUsers } });

  return { jobs, total };
};


export const fetchJobById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
   return null
  }
  return await Job.findById(id).populate("created_by","company_name company_number email role");
};