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
    try {
        const response = await userService.login(req.body.username, req.body.password);
        return res.status(201).json({
            response,
            success: true
        })
    }
    catch (error) {
        console.log("error in login- controller", error);
        return res.status(401).json({
            success: false,
            error
        })

    }
}
const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        console.log(token, 'is our token');
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
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