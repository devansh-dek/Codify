// const submission = require("../models/submission");
const { Submission } = require('../models/index')
console.log("Submission are ", Submission);
const CrudRepository = require("./crud-repository");
const { Op } = require('sequelize');
const moment = require('moment');


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
    async heatMap(userId) {
        try {
            const submissions = await Submission.findAll({
                where: {
                    userId: userId
                },
                attributes: ['createdAt'],
            });

            const submissionsByDate = submissions.reduce((acc, submission) => {
                const date = moment(submission.createdAt).format('YYYY-MM-DD');
                if (!acc[date]) {
                    acc[date] = 1;
                } else {
                    acc[date]++;
                }
                return acc;
            }, {});

            const result = Object.keys(submissionsByDate).map(date => ({
                date: date,
                count: submissionsByDate[date],
            }));
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
module.exports = SubmissionRepository;