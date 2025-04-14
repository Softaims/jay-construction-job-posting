import { Job } from "./models/JobModel.js";
export const createAJob = async (jobData) => {
 let newJob=new Job(jobData)
  return await newJob.save();
};