import { countAllJobs, countNewlyPostedJobs, countCompanies, countCandidates } from "./services.js";
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
