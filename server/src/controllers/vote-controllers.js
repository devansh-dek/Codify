const VoteService = require('../services/vote-service')

const voteService = new VoteService();

const vote = async (req, res) => {
    try {
        const { userId, blogId, voteType } = req.body;
        const response = await voteService.vote(userId, blogId, voteType);

        return res.status(200).json({
            success: true,
            vote: response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    vote
}