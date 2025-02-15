const jwt = require("jsonwebtoken")
const ApiError = require('../utils/ApiError.js')
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    try {
        const token = req.cookies?.acessToken || req.header("Authorization")?.replace("Bearer ","")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}

module.exports = userMiddleware;