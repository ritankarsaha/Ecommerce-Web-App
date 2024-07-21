import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCart, deleteCart, getAllCarts, getUserCart, updateCart } from "../controllers/cart.controller.js";
import { verifyTokenAndAdmin,verifyTokenAndAuthorization,verifyToken } from "../middlewares/auth2.middleware.js";

const router = Router()

// listing all the cart routes over here.

router.route("/").post(verifyJWT ,createCart)
router.route("/:id").put(verifyTokenAndAuthorization,updateCart)
router.route("/:id").delete(verifyTokenAndAuthorization,deleteCart)
router.route("/find/:userId").get(verifyTokenAndAuthorization,getUserCart)
router.route("/").get(verifyTokenAndAdmin,getAllCarts)

export default router