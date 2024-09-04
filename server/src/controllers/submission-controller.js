const { StatusCodes } = require("http-status-codes");
const { SubmissionService } = require("../services");


const submissionService = new SubmissionService();
const showSubmissions = async (req, res) => {
    try {
        console.log("User id is ", req.body.userId);
        const submissions = await submissionService.getSubmissionsById(1);
        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            submissions
        })

    } catch (error) {
        console.log("error is ", error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        })
    }
}
const create = async (req, res) => {
    try {
        console.log('req boyd is ', req.body);
        const submission = {
            problemId: Number(req.body.problemId),
            language: req.body.language,
            stauts: req.body.status,
            userId: Number(req.body.userId),
            input: req.body.input,
            code: req.body.code,
            type: req.body.type

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
    create,
    showSubmissions
}