import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { apiError } from "../utils.js/apiError.utils.js";
import { asyncHandler } from "../utils.js/asyncHandler.utils.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    console.log("I'm from verifyHJwt");
    // Extract token from cookies or Authorization header
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.accessToken;
    console.log("token from frontend", req.headers.authorization?.split(' ')[1])
    // console.log("token from frontend", req.cookies)
    if (!token) {
        throw new apiError(401, "ACCESS DENIED: NO TOKEN PROVIDED");
    }

    let decodedToken;
    try {
        // Verify the token
        console.log('TOKEN',token);
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('DECODE TOKEN',decodedToken);
    } catch (error) {
        throw new apiError(401, "ACCESS DENIED: INVALID TOKEN");
    }

    // Find user by ID in the decoded token
    const user = await User.findById(decodedToken._id).select('-password -refreshToken');
    if (!user) {
        throw new apiError(401, "ACCESS DENIED: USER NOT FOUND");
    }

    // Attach the user to the request object
    req.user = user;
    next();
});

