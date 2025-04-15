
import { MainContractor } from "../../shared/models/MainContractorModel.js";
import { Subcontractor } from "../../shared/models/SubContractorModel.js";
export const updateAdminStatusToPending = async (userId,role,compliance_certificate,verification_certificate) => {
    const roleModelMap = {
      main_contractor: MainContractor,
      subcontractor: Subcontractor,
    };
    const Model = roleModelMap[role];
    return await Model.findByIdAndUpdate(
      userId,
      { admin_status: "pending", compliance_certificate, verification_certificate },
      { new: true }
    );
  };
  