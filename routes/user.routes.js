import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { updatePassword,
    updateAccountDetails,
    deleteUser,
    getUser,
    getAllUser,
    getUserStats
 } from "../controllers/user.controller.js";

import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth2.middleware.js";



const router = Router()


// listing all the user routes over here.
router.route("/:id/updatePassword").put(verifyTokenAndAuthorization,updatePassword)
router.route("/:id/updateAccountDetails").put(verifyTokenAndAuthorization,updateAccountDetails)
router.route("/:id").delete(verifyTokenAndAuthorization,deleteUser)
router.route("/find/:id").get(verifyTokenAndAdmin,getUser)
router.route("/").get(verifyTokenAndAdmin,getAllUser)
router.route("/stats").get(verifyTokenAndAdmin,getUserStats)

export default router
