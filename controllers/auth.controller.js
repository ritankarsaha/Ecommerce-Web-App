import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";


// generating access and refresh tokens
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



//registering the user in the database.
const registerUser = asyncHandler( async (req,res) =>{

    const {fullname, username, email, password} = req.body
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(401, "User with the same username or email already exists")
    }

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something wrong while creating a new user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User has been created successfully!")
    )
})







//logging the user in the database
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        throw new ApiError(400, "Username is required for proper logging in!");
    }


    const user = await User.findOne({ username });

    if (!user ) {
        throw new ApiError(404, "Wrong username or Password!! ");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Wrong Password");
    }

    if(!user && !isPasswordValid){
        throw new ApiError(401, "Wrong Credentials");
    }

    // const accessToken = user.generateAccessToken(); 
    // const refreshToken = user.generateRefreshToken(); 

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        );
});






export {registerUser, loginUser}