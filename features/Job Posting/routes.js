import express from "express";
import { jobPostValidator } from "./validators/jobpostValidator.js";
import { createJobPost, getAllJobs, getJobById } from "./controllers.js";
import { validate } from "../../middlewares/validate.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
const router = express.Router();


router.post("/post-job",authMiddleware, authorizeMiddleware("main_contractor","subcontractor"),validate(jobPostValidator),createJobPost);
router.get("/jobs",authMiddleware,authorizeMiddleware("main_contractor","subcontractor","job_seeker"),getAllJobs)
router.get("/jobs/:id",authMiddleware,authorizeMiddleware("main_contractor","subcontractor","job_seeker"),getJobById)



export default router;
