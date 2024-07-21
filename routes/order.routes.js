import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth2.middleware.js";
import { createOrder, deleteOrder, getAllUserOrder, getMonthlyIncome, getUserOrder, updateOrder } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()


// listing all the order routes.
router.route("/").post(verifyJWT,createOrder)
router.route("/:id").put(verifyTokenAndAdmin,updateOrder)
router.route("/:id").delete(verifyTokenAndAdmin,deleteOrder)
router.route("/find/:userId").get(verifyTokenAndAuthorization,getUserOrder)
router.route("/").get(verifyTokenAndAdmin,getAllUserOrder)
router.route("/income").get(verifyTokenAndAdmin,getMonthlyIncome)

export default router