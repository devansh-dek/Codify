const { UserService } = require('../services/index')
const userService = new UserService();

const create = async (req, res) => {
    try {

        const result = await userService.create(req.body);
        return res.status(201).json({
            sucess: true,
            user: result
        })
    }
    catch (error) {
        console.log("Error in controller user ", error);
        return res.status(401).json({
            success: false,
            error: error
        })

    }
}
// login-controller.js
const login = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const response = await userService.login({ username, password, email });
        const token = response.jwt; // Ensure this token is being set correctly

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            response
        });
    } catch (error) {
        console.log("Error in login-controller:", error.message);
        return res.status(401).json({
            success: false,
            error: error.message // Send back the error message
        });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        console.log(token, 'is our token');
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            response: response,
            success: true,
            message: "User is Authenticated"
        })
    }
    catch (error) {

        return res.status(404).json({
            success: false,
            error
        })
    }
}


module.exports = {
    create,
    login,
    isAuthenticated
}