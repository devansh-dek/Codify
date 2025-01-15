const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const { StatusCodes } = require('http-status-codes');

const authenticateJWT = async (req, res, next) => {
    try {
        console.log("HERE");
        console.log("headers are", req.cookies);
        const token = req.cookies.token;
        console.log(token, 'is our token');

        if (!token) {
            return res.status(200).json({
                success: true,
                message: "User is not Authenticated",
                isAuthenticated: false
            });
        }

        // Use a synchronous or properly scoped `jwt.verify`
        const decoded = jwt.verify(token, JWT_KEY); // This directly returns the decoded payload

        req.user = decoded; // Attach the decoded payload to `req.user`
        res.isAuthenticated = true; // Mark the user as authenticated

        console.log(decoded, 'is the decoded token');
        next(); // Proceed to the next middleware
    } catch (error) {
        console.log("error is ", error);
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: error.message || "Authentication failed",
            isAuthenticated: false
        });
    }
};

module.exports = {
    authenticateJWT
};
