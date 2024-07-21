import express from "express";
import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/payment", asyncHandler(async (req,res) => {
  try {
    const { tokenId, amount } = req.body;
    const charge = await stripe.charges.create({
      source: tokenId,
      amount: amount,
      currency: "usd",
    });
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        charge,
        "Charge has been fectched successfully! "
    ))
  } catch (error) {
    throw new ApiError(401, "Chrage could not be fetched successfully! ")
  }
}));

export default router;