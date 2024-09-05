// const submission = require("../models/submission");
const { Submission } = require('../models/index')
console.log("Submission are ", Submission);
const CrudRepository = require("./crud-repository");

class SubmissionRepository extends CrudRepository {
    constructor() {
        super(Submission);
    }
    async getByUserId(userId) {
        try {
            const submissions = await Submission.findAll({
                where: {
                    userId: userId,
                    type: "Submission"
                }
            })
            return submissions;
        }
        catch (error) {
            throw error;
        }
    }
}
module.exports = SubmissionRepository;