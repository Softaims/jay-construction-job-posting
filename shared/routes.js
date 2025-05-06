import express from "express";
import { upload } from "../utils/multer.js";
import { uploadMultiFiles } from "./controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/upload/multiple", authMiddleware, upload.any(), uploadMultiFiles);

export default router;
