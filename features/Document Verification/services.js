import { MainContractor } from "../../shared/models/MainContractorModel.js";
import { Subcontractor } from "../../shared/models/SubContractorModel.js";
import { User } from "../../shared/models/UserModel.js";
import mongoose from "mongoose";

export const updateAdminStatusToPending = async (userId, role, compliance_certificate, verification_certificate) => {
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

export const updateAdminStatusDocumentVerification = async (userId, role, admin_status) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid id provided");
  }

  const roleModelMap = {
    main_contractor: MainContractor,
    subcontractor: Subcontractor,
  };
  const Model = roleModelMap[role];
  return await Model.findByIdAndUpdate(userId, { admin_status }, { new: true });
};

export const fetchPendingContractors = async (page, limit) => {
  const skip = (page - 1) * limit;
  const query = { admin_status: "pending" };
  const pendingContractors = await User.find(query).select("_id email role company_name company_number").skip(skip).limit(limit);
  const total = await User.countDocuments(query);
  return { pendingContractors, total };
};
