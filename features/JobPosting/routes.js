import express from "express";
import { jobPostValidator } from "./validators/jobpostValidator.js";
import { updateJobValidator } from "./validators/updateJobValidator.js";
import { createJobPost, getAllJobs, getJobById, updateJobPost, deleteJobPost, getUserPostedJobs } from "./controllers.js";
import { validate } from "../../middlewares/validate.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * /post-job:
 *   post:
 *     summary: Create a new job post
 *     description: |
 *       This endpoint allows authenticated users with the "main_contractor" or "subcontractor" roles
 *       to post new job listings. The user must be approved by the admin before they can post a job.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_image:
 *                 type: string
 *                 description: URL to an image representing the project (optional).
 *               job_title:
 *                 type: string
 *                 description: Title of the job.
 *               job_location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: Latitude of the job location.
 *                   longitude:
 *                     type: number
 *                     description: Longitude of the job location.
 *                 required:
 *                   - latitude
 *                   - longitude
 *               job_type:
 *                 type: string
 *                 description: Type of job (e.g., permanent,fixed, etc.).
 *               target_user:
 *                 type: string
 *                 enum: ["job_seeker", "subcontractor", "both"]
 *                 description: Target audience for the job post.
 *               services:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     service_name:
 *                       type: string
 *                       description: Name of the service being offered.
 *                     resource_count:
 *                       type: number
 *                       description: The number of resources required for the service (optional).
 *                 minItems: 1
 *                 description: List of services required for the job post.
 *               job_priority:
 *                 type: boolean
 *                 description: Whether the job is high priority (optional).
 *               budget:
 *                 type: number
 *                 description: Budget for the job (optional).
 *     responses:
 *       '201':
 *         description: Job posted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job created successfully"
 *                 job:
 *                   type: object
 *                   description: The job object created.
 *       '403':
 *         description: Forbidden - User has not been approved by admin to post a job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: You cannot post a job until admin approval."
 *       '400':
 *         description: Bad Request - Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job title is required"
 *     tags:
 *       - Job Postings
 */
router.post("/post-job", authMiddleware, authorizeMiddleware("main_contractor"), validate(jobPostValidator), createJobPost);
router.patch("/update-job/:id", authMiddleware, authorizeMiddleware("main_contractor"), validate(updateJobValidator), updateJobPost);
router.delete("/delete-job/:id", authMiddleware, authorizeMiddleware("main_contractor"), deleteJobPost);
router.get("/user-posted-jobs", authMiddleware, authorizeMiddleware("main_contractor"), getUserPostedJobs);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all available jobs
 *     description: |
 *       This endpoint retrieves all available jobs based on the user's role.
 *       The response is filtered by target user type (job_seeker, subcontractor, both),
 *       and supports pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of jobs per page (default is 10).
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: Jobs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jobs fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     jobs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           job_title:
 *                             type: string
 *                             description: Title of the job.
 *                           job_location:
 *                             type: object
 *                             properties:
 *                               latitude:
 *                                 type: number
 *                               longitude:
 *                                 type: number
 *                             description: Location of the job.
 *                           job_type:
 *                             type: string
 *                             description: Type of job (full-time, part-time, etc.).
 *                           target_user:
 *                             type: string
 *                             enum: ["job_seeker", "subcontractor", "both"]
 *                             description: Target audience for the job.
 *                           services:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 service_name:
 *                                   type: string
 *                                 resource_count:
 *                                   type: number
 *                             description: Services associated with the job.
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           description: Total number of jobs.
 *                         page:
 *                           type: integer
 *                           description: Current page number.
 *                         limit:
 *                           type: integer
 *                           description: Number of jobs per page.
 *                         totalPages:
 *                           type: integer
 *                           description: Total number of pages based on pagination.
 *       '403':
 *         description: Forbidden - User is not authorized to view jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to view jobs"
 *     tags:
 *       - Jobs
 */
router.get("/jobs", authMiddleware, authorizeMiddleware("main_contractor", "subcontractor", "job_seeker"), getAllJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get job details by ID
 *     description: |
 *       This endpoint retrieves the details of a specific job by its ID.
 *       Access is role-based, and only users with appropriate target user access can view the job.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the job.
 *         schema:
 *           type: string
 *           example: "605c72ef153207001f7f1d7"
 *     responses:
 *       '200':
 *         description: Job fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job fetched successfully"
 *                 job:
 *                   type: object
 *                   properties:
 *                     job_title:
 *                       type: string
 *                       description: The title of the job.
 *                     job_location:
 *                       type: object
 *                       properties:
 *                         latitude:
 *                           type: number
 *                         longitude:
 *                           type: number
 *                       description: Location of the job.
 *                     job_type:
 *                       type: string
 *                       description: Type of job (full-time, part-time, etc.).
 *                     target_user:
 *                       type: string
 *                       enum: ["job_seeker", "subcontractor", "both"]
 *                       description: Target audience for the job.
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           service_name:
 *                             type: string
 *                           resource_count:
 *                             type: number
 *                       description: Services associated with the job.
 *       '403':
 *         description: Forbidden - User is not authorized to view the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to view jobs"
 *       '404':
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job not found"
 *     tags:
 *       - Jobs
 */
router.get("/jobs/:id", authMiddleware, authorizeMiddleware("main_contractor", "subcontractor", "job_seeker"), getJobById);

export default router;
