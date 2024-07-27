

// import { Vote } from '../models';
// import CrudRepository from './crud-repository';
const { Vote } = require('../models');
const CrudRepository = require('../repository/crud-repository')
class VoteRepository extends CrudRepository {
    async findVote(userId, blogId) {
        return Vote.findOne({ where: { userId, blogId } });
    }

    async createVote(userId, blogId, voteType) {
        return Vote.create({ userId, blogId, voteType });
    }

    async updateVote(vote, voteType) {
        vote.voteType = voteType;
        return vote.save();
    }
}

module.exports = VoteRepository;
