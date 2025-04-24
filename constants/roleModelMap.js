import { MainContractor } from "../shared/models/MainContractorModel.js";
import { JobSeeker } from "../shared/models/JobSeekerModel.js";
import { Subcontractor } from "../shared/models/SubContractorModel.js";
export const roleModelMap = {
  main_contractor: MainContractor,
  subcontractor: Subcontractor,
  job_seeker: JobSeeker,
};
