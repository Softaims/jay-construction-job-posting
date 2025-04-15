import express from "express";
const router = express.Router();
import {  submitContractorDocuments} from "./controllers.js";
import { upload } from "../../utils/multer.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
import { validateVerificationCertificates } from "../../middlewares/validateVerificationCertificates.js";


router.post("/submit-contractor-documents", upload.fields([
    { name: 'compliance_certificate'},
    { name: 'verification_certificate' }
  ]),authMiddleware,authorizeMiddleware("main_contractor","subcontractor"),validateVerificationCertificates,submitContractorDocuments)

  export default router