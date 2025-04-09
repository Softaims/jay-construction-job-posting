import express from "express";
const router = express.Router();
import { createUser, loginUser} from "./controllers.js";
import { validate } from "../../middlewares/validate.js";
import { registerSchema,loginSchema } from "./validators.js";


router.post("/register",validate(registerSchema), createUser);
router.post("/login",validate(loginSchema), loginUser);


export default router;
