const { StatusCodes } = require("http-status-codes");
const { SubmissionService } = require("../services");


const submissionService = new SubmissionService();

const create = async (req, res) => {
    try {
        const response = await submissionService.create(req.body);
        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            response
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    create
}