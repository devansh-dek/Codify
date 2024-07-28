const { StatusCodes } = require('http-status-codes');
const { ProblemService } = require('../services/index');
const problemService = new ProblemService();

const create = async (req, res) => {
    try {
        const problem = req.body;
        console.log(req.body);
        const response = await problemService.create(req.body);
        console.log("Resopnse in controller is ", response);
        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            response: response
        });
    }
    catch (error) {
        console.log("Error in create funtion of prob0 ", error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        })
    }
}
const getAll = async (req, res) => {
    try {
        const response = await problemService.getAll();
        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            response
        })

    }
    catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    create,
    getAll
}