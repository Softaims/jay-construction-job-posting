import express from "express";
import { getDashboardStats } from "./controllers.js";
const router = express.Router();

router.get("/statistics", getDashboardStats);
export default router;
