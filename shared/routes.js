import express from "express";
import { upload } from "../utils/multer.js";
import { uploadMultiFiles } from "./controllers.js";

const router = express.Router();

router.post("/upload/multiple", upload.any(), uploadMultiFiles);

export default router;
