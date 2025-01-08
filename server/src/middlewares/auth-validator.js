const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const { StatusCodes } = require('http-status-codes');

const authenticateJWT = async (req, res) => {
    try {
        console.log("headers are", req.cookies.token);
        const token = req.cookies.token;
        console.log(token, 'is our token');
        if (!token) {
            return res.status(200).json({
                success: true,
                message: "User is not Authenticated",
                isAuthenticated: false

            })
        }

        jwt.verify(token, JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    message: "Invalid Token",
                    success: false,
                    isAuthenticated: false
                })
            }
        })
        req.user = decoded;
        res.isAuthenticated = true;
        next();
        console.log(token, 'is our token');

    }
    catch (error) {
        console.log("error is ", error);
        return res.status(404).json({
            success: false,
            error: error.message,
            isAuthenticated: false

        })
    }
}
module.exports = {
    authenticateJWT
}