import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//create a new product
const createProduct = asyncHandler(async(req,res) =>{

    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        return res
        .status(200)
        .json(
            new ApiResponse(200, savedProduct , "Product has been saved successfully! ")
        )
    } catch (error) {
        throw new ApiError(400, "Product couldn't be created successfully! ")
    }
})

// update an existing product
const updateProduct = asyncHandler(async(req,res) =>{
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },{new: true}
        )
        return res
        .status(200)
        .json(new ApiResponse(200,updatedProduct,"Product has been updated successfully"))
      } catch (error) {
        throw new ApiError(401, "Product couldn't get updated successfully! ")
      }
})

// delete an already existing product
const deleteProduct = asyncHandler(async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        return res
        .status(200)
        .json(200, {} , "Product has been deleted successfully!")
    } catch (error) {
        throw new ApiError(401, "Product did not get successfully deleted! ")
    }
})

// get an already existing product from the database
const getProduct = asyncHandler(async(req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        return res
        .status(200)
        .json(200 , product, "Product has been fetched successfully! ")
    } catch (error) {
        throw new ApiError(401, "Product data couldn't be fetched successfully! ")
    }
})



//get all products data from the database
const getAllProducts = asyncHandler(async(req,res) =>{
   
   const qNew = req.query.new
   const qCategory = req.query.category

   try {
    let products;
    if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }

      return res
      .status(200)
      .json(new ApiResponse(
        200,
        products,
        "All Products have been fetched successfully! "
      ))
   } catch (error) {
      throw new ApiError(401, "All Products could not get fetched successfully! ")
   }
})

export {createProduct,updateProduct,deleteProduct, getProduct, getAllProducts}