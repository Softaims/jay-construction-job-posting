import express from "express";
import { getAllConversations, getMessagesWithUser } from "./controllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.get("/inbox", authMiddleware, authorizeMiddleware("main_contractor", "subcontractor", "job_seeker"), getAllConversations);
router.get("/chat", authMiddleware, authorizeMiddleware("main_contractor", "subcontractor", "job_seeker"), getMessagesWithUser);

export default router;
