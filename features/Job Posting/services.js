import mongoose from "mongoose";
import { Job } from "../../shared/models/JobModel.js";
export const createAJob = async (jobData) => {
  let newJob = new Job(jobData);
  return await newJob.save();
};

export const fetchJobs = async (allowedTargetUsers, page, limit, latitude, longitude, distanceInKm, serviceType) => {
  const skip = (page - 1) * limit;

  const query = {
    target_user: { $in: allowedTargetUsers },
  };
  if (latitude && longitude && distanceInKm) {
    const distanceInMiles = distanceInKm / 1.609;
    query.job_location = {
      $geoWithin: {
        $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], distanceInMiles / 3963.2],
      },
    };
  }
  if (serviceType) {
    query["services.service_name"] = serviceType.toLowerCase();
  }

  const jobs = await Job.find(query).skip(skip).limit(limit).populate("created_by", "company_name company_number email role");

  const total = await Job.countDocuments(query);

  return { jobs, total };
};

export const fetchJobById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Job.findById(id).populate("created_by", "company_name company_number email role");
};
