import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// access and refresh tokens
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

// updating the current password.
const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old password and new password are required");
    }
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Old password is invalid");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password has been changed successfully!!"));
});




// updating the account details of the user.
const updateAccountDetails = asyncHandler(async(req,res) =>{
    const {fullname, email} = req.body
    if(!fullname || !email)
    {
        throw new ApiError(401, "All fields are required!!")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullname,
                email,
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account Details have been updated successfully"))
        

})


//deleting the user from the database
const deleteUser = asyncHandler(async(req,res) =>{
    try {
        await User.findByIdAndDelete(req.params.id)
        return res
        .status(200)
        .json(new ApiResponse(200,{},"User has been deleted successfully!"))
    } catch (error) {
        throw new ApiError(401, "User couldn't be deleted successfully!")
    }
})


//get a particular user from the database
const getUser = asyncHandler(async(req,res) =>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        return res
        .status(200)
        .json(new ApiResponse(200,others,"User Details have been fetched successfully!"))
    } catch (error) {
        throw new ApiError(401, "User data couldn't be fetched successfully! ")
        
    }
})


//get all users from the database
const getAllUser = asyncHandler(async(req,res) =>{
    const query = req.query.new
    try {
        const users = query? await User.find().sort({_id:-1}).limit(5) : await User.find()
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                users,
                "All users have been fectched successfully from the database",
            )
        )
    } catch (error) {
        return res
        .status(401)
        .json(
            new ApiError(500, "Error while fectching all the users from the database! ")
        )
    }
})

// get user stats from the database
const getUserStats = asyncHandler(async(req,res) => {
    const date = new Date()
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const data = await User.aggregate([
             { $match: { createdAt: {$gte: lastyear } } },
          {
            $project: {
              month: { $month: "$createdAt" },
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: 1 },
            },
          },
        ]);
        return res
        .status(200)
        .json(
            new  ApiResponse(
                200,
                data,
                "All User data has been fetched successfully! "
            )
        )
      } catch (err) {
        throw new ApiError(401, "User stats couldn't be fetched successfully by the database! ")
      }



})


export {updatePassword,
     updateAccountDetails, 
     deleteUser,
      getUser,
       getAllUser,
        getUserStats}