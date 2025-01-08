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
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const response = await userService.login({ email, password });
        if (!response) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const { jwt } = response;
        res.cookie('token', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        return res.status(200).json({ success: true, message: "Login successful", response });
    } catch (error) {
        console.error("Error in login controller:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};


const isAuthenticated = async (req, res) => {
    try {
        console.log("headers are", req.cookies.token);
        const token = req.cookies.token;
        console.log(token, 'is our token');
        if (!token) {
            return res.status(200).json({
                success: true,
                message: "User is not Authenticated"
            })
        }
        console.log(token, 'is our token');
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            response: response,
            success: true,
            message: "User is Authenticated"
        })
    }
    catch (error) {
        console.log("error is ", error);
        return res.status(404).json({
            success: false,
            error: error.message
        })
    }
}


module.exports = {
    create,
    login,
    isAuthenticated
}