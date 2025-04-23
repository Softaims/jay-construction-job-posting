import express from "express";
const router = express.Router();
import { getPendingContractors, submitContractorDocuments, verifyContractorDocuments } from "./controllers.js";
import { upload } from "../../utils/multer.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
import { validateVerificationCertificates } from "./validators/validateVerificationCertificates.js";
import { verifyContractorDocumentsValidator } from "./validators/verifyContractorDocumentsValidator.js";
import { validate } from "../../middlewares/validate.js";

router.post(
  "/submit-contractor-documents",
  upload.fields([{ name: "compliance_certificate" }, { name: "verification_certificate" }]),
  authMiddleware,
  authorizeMiddleware("main_contractor", "subcontractor"),
  validateVerificationCertificates,
  submitContractorDocuments
);

router.post(
  "/verify-contractor-documents",
  authMiddleware,
  authorizeMiddleware("admin"),
  validate(verifyContractorDocumentsValidator),
  verifyContractorDocuments
);
router.get("/pending-contractors", authMiddleware, authorizeMiddleware("admin"), getPendingContractors);
export default router;
