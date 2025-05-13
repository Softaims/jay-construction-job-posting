import { countAllJobs, countNewlyPostedJobs, countCompanies, countCandidates, getTopRecentJobs } from "./services.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const getDashboardStats = catchAsync(async (req, res, next) => {
  const [totalJobs, newlyPostedJobs, totalCompanies, totalCandidates] = await Promise.all([
    countAllJobs(),
    countNewlyPostedJobs(),
    countCompanies(),
    countCandidates(),
  ]);

  return res.status(200).json({
    message: "Dashboard statistics fetched successfully",
    stats: {
      totalJobs,
      newlyPostedJobs,
      totalCompanies,
      totalCandidates,
    },
  });
});

export const getFeaturedJobs = catchAsync(async (req, res, next) => {
  const jobs = await getTopRecentJobs();

  return res.status(200).json({
    message: "Featured jobs fetched successfully",
    jobs,
  });
});
