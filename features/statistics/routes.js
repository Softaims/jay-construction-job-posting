import express from "express";
import { getDashboardStats, getFeaturedJobs } from "./controllers.js";
const router = express.Router();

router.get("/statistics", getDashboardStats);
router.get("/featured-jobs", getFeaturedJobs);

export default router;
