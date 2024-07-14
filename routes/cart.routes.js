import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createCart, deleteCart, getAllCarts, getUserCart, updateCart } from "../controllers/cart.controller";


const router = Router()

// listing all the cart routes over here.

router.route("/").post(verifyJWT,createCart )
router.route("/:id").put(verifyJWT,updateCart)
router.route("/:id").delete(verifyJWT,deleteCart)
router.route("/find/:userId").get(verifyJWT,getUserCart)
router.route("/").get(verifyJWT,getAllCarts)

export default router