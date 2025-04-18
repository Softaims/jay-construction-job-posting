
import {
  updateAdminStatusDocumentVerification,
    updateAdminStatusToPending,
  } from "./services.js";
  import { getUserById } from "../../shared/services/services.js";
  import { catchAsync } from "../../utils/catchAsync.js";
  import createError from "http-errors";
  import { s3Uploader } from "../../utils/s3Uploader.js";

export const submitContractorDocuments = catchAsync(async (req, res, next) => {
    const complianceFile = req.files.compliance_certificate?.[0] || null;
    const verificationFile = req.files.verification_certificate?.[0] || null;
    const {_id,role}=req.user
  
    const user = await getUserById(_id);
    if (user.admin_status === "verified") {
      return next(createError(400, "Documents are already approved by admin."));
    }
    if (user.admin_status === "pending") {
      return next(createError(400, "Documents are already submitted"));
    }
  
    const [complianceUploadResult, verificationUploadResult] = await Promise.all([
      s3Uploader(complianceFile),
      s3Uploader(verificationFile),
    ]);
    
    if (!complianceUploadResult.success) {
      return next(createError(500, `Error uploading compliance certificate: ${complianceUploadResult.error}`));
    }
  
    if (!verificationUploadResult.success) {
      return next(createError(500, `Error uploading verification certificate: ${verificationUploadResult.error}`));
    }
  await updateAdminStatusToPending(_id,role,complianceUploadResult.url,verificationUploadResult.url)
    return res.status(200).json({
      success: true,
      message: "Documents has been submitted for admin approval",
    });
  });

  export const verifyContractorDocuments = catchAsync(async (req, res, next) => {
    const { id, admin_status } = req.body;
     const targetUser=await getUserById(id)
        if (!targetUser) {
          return next(createError(404, `User did not exist`));
        }
        if (targetUser.role!="main_contractor" || targetUser.role!="subcontractor") {
          return next(createError(404, `Only main_contractors and subcontractors documents can be ${admin_status}`));
        }
    await updateAdminStatusDocumentVerification(id, targetUser.role, admin_status);
  
    return res.status(200).json({
      success: true,
      message: `Documents have been ${admin_status}.`,
    });
  });
  