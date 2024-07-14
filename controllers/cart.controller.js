import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { Cart } from "../models/cart.models.js";
import jwt from "jsonwebtoken"

// creating the cart of the user.
const createCart = asyncHandler(async(req,res) => {

    const newCart = new Cart(req.body);
    try {

        const savedCart = await newCart.save();
        if(savedCart)
        {
            return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    savedCart,
                    "Cart has been saved succesffuly"
                )
            )
        }
        else{
            throw new ApiError(400, "error while saving your cart!! ")
        }   
    } catch (error) {
        throw new ApiError(401, "error while creating your cart! ")
        
    }
})

//updating the cart as required

const updateCart = asyncHandler(async(req,res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },{new: true}
        )

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updateCart,
                "Cart has been updated successfuly"
            )
        )
    } catch (error) {
        throw new ApiError(401, "error while updating your cart")
    }
})

// deleting a cart created by an user
const deleteCart = asyncHandler(async(req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Cart has been deleted successfully! "
            )
        )

        
    } catch (error) {
        throw new ApiError(401, "Error while deleting the cart! ")
        
    }
})

// getting the user cart
const getUserCart = asyncHandler(async(req,res) => {
  try {
     const cart = await Cart.findOne({
        userId: req.params.userId
     })

     res.
     status(200)
     .json(
        new ApiResponse(
            200, {cart}, "User Cart fetched successfully! "
        )
     )
  } catch (error) {
     throw new ApiError(401, "User cart couldn't be fetched! ")
  }
})


// get all

const getAllCarts = asyncHandler(async(req,res) => { 
    try {
        const carts = await Cart.find();
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {carts},
                "All carts have been fetched successfully! "
            )
        )

    } catch (error) {
        throw new ApiError(401, "Carts fetching is unsuccessfull!! ")
    }
})







export {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCarts,

}