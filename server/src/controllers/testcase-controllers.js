const { StatusCodes } = require('http-status-codes');
const { TestCaseService } = require('../services/index');
const testcaseService = new TestCaseService();

const create = async (req, res) => {
    try {

        const response = await testcaseService.create(req.body);
        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            response
        })
    }
    catch (error) {
        return res.status(StatusCodes.BAD_GATEWAY).json({
            success: false,
            error: error.message
        })
    }
}
module.exports = {
    create
}