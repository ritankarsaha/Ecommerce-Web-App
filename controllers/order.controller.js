import { Order } from "../models/order.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//creating a new order
const createOrder = asyncHandler(async(req,res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            savedOrder,
            "New Order has been created successfully! "
        ))
    } catch (error) {
        throw new ApiError(401, "Order can't be created successfully! ")
    }
})

//updating an existing order
const updateOrder = asyncHandler(async (req,res) =>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },{new: true}
        )

        return res
        .status(200)
        .json(new ApiResponse(
            200,
            updateOrder,
            "Order has been updated successfully! "
        ))
    } catch (error) {
        throw new ApiError(401, "Order could not be updated successfully! ")
    }
})

//deleting an existing order
const deleteOrder = asyncHandler(async(req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res
        .status(200)
        .json( new ApiResponse(
            200,
            {},
            "Order has been deleted successfully! "
        ))
    } catch (error) {
        throw new ApiError(401, "Order could not be deleted successfully! ")
    }
})

//get user orders
const getUserOrder = asyncHandler(async(req,res) => {
    try {
        const orders = await Order.find({userId: req.params.userId})
        return res
        .status(200)
        .json( new ApiResponse(
            200,
            orders,
            "User orders have been fetched successfully! "
        ))
    } catch (error) {
        throw new ApiError(401, "User orders could not be fetched dsuccessfully")
    }
})

//get all user orders
const getAllUserOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                orders,
                "All User Orders have been fetched successfully!"
            ));
    } catch (error) {
        throw new ApiError(401, "All User orders can't be fetched successfully!");
    }
});

//get monthly income of the user
const getMonthlyIncome  = asyncHandler(async(req,res) =>{
    const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        income,
        "Monthly Income has been fetched successfully! "
    ))
  } catch (err) {
    throw new ApiError(401, "Monthly Income could not be fetched successfully! ")
  }
})




export {createOrder , 
    updateOrder, 
    deleteOrder, 
    getUserOrder, 
    getAllUserOrder,
getMonthlyIncome}