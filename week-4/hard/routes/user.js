const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User} = require("../database/index.js")
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")



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
// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const {fullName, email, userName, password } = req.body
    if (
        [fullName, email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or userName already exists")
    }
    const user = await User.create({
        fullName,
        email, 
        password,
        userName: userName.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});

router.post('/login',async (req, res) => {
     // Implement user login logic
     const {userName, password} = req.body
    if (!userName) {
        throw new ApiError(400, "userName is required to login")
    }
    const user = await User.findOne({
        userName
    })
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }
   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

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
    )

});

router.get('/todos', userMiddleware,async (req, res) => {
    // Implement logic for getting todos for a user
    const { userId } = req.params;
      // Fetch all TODOs for the given userId
    const todos = await Todo.find({ userId });
  
    if (!todos.length) {
        return res.status(404).json(new ApiResponse(200,[],"Todos not found"));
    }
  
    return res.status(200).json(new ApiResponse(200,todos,"Todos fetched successfully"));
});

router.post('/logout', userMiddleware,async (req, res) => {
    // Implement logout logic
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
});

module.exports = router