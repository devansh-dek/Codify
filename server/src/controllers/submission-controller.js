const { StatusCodes } = require("http-status-codes");
const { SubmissionService } = require("../services");


const submissionService = new SubmissionService();

const create = async (req, res) => {
    try {
        console.log('req boyd is ', req.body);
        const submission = {
            problemId: Number(req.body.problemId),
            language: req.body.language,
            stauts: req.body.status,
            userId: Number(req.body.userId),
            code: req.body.code


        }
        console.log('Submission is ', submission);
        const response = await submissionService.create(submission);
        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            response
        })
    } catch (error) {
        console.log("error is ", error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    create
}