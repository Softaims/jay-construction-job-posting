import { Job } from "../../shared/models/JobModel.js";
import { User } from "../../shared/models/UserModel.js";

export const countAllJobs = async () => {
  return await Job.countDocuments();
};

export const countNewlyPostedJobs = async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return await Job.countDocuments({
    createdAt: { $gte: twentyFourHoursAgo },
  });
};

export const countCompanies = async () => {
  return await User.countDocuments({ role: "main_contractor" });
};

export const countCandidates = async () => {
  return await User.countDocuments({
    role: { $in: ["job_seeker", "subcontractor"] },
  });
};
export const getTopRecentJobs = async () => {
  return await Job.find({}).sort({ createdAt: -1 }).limit(3).populate("created_by", "company_name company_number email role");
};
