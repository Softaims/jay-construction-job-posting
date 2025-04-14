import { Job } from "./models/JobModel.js";
export const createAJob = async (jobData) => {
 let newJob=new Job(jobData)
  return await newJob.save();
};

export const fetchJobs = async (allowedTargetUsers) => {
  const filter = {
    target_user: { $in: allowedTargetUsers },
  };

  return await Job.find(filter)
    .populate('created_by', 'company_name email role');
};
