import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser,loginUser } from "../controllers/auth.controller.js";

const router = Router()

//listing all the auth routes over here.
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)



export default router