const VoteRepository = require("../repository/vote-repository");



class VoteService {

    constructor() {
        this.voteRepository = new VoteRepository();
    }

    async vote(userId, blogId, voteType) {
        const existingVote = await this.voteRepository.findVote(userId, blogId);

        if (existingVote) {
            if (existingVote.voteType !== voteType) {
                return this.voteRepository.updateVote(existingVote, voteType);
            }
            return existingVote;
        }

        return this.voteRepository.createVote(userId, blogId, voteType);
    }
}
module.exports = VoteService;
