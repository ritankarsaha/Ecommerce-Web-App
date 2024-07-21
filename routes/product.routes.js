import { Router } from "express";
import { verifyTokenAndAdmin } from "../middlewares/auth2.middleware.js";
import { createProduct, 
    deleteProduct,
     getAllProducts,
      getProduct, 
      updateProduct } from "../controllers/product.controller.js";


const router = Router()

// listing all the product routes over here
router.route("/").post(verifyTokenAndAdmin,createProduct)
router.route("/:id").put(verifyTokenAndAdmin,updateProduct)
router.route("/:id").delete(verifyTokenAndAdmin,deleteProduct)
router.route("/find/:id").get(getProduct)
router.route("/").get(getAllProducts)


export default router

