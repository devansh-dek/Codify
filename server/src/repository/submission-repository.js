// const submission = require("../models/submission");
const { Submission } = require('../models/index')
console.log("Submission are ", Submission);
const CrudRepository = require("./crud-repository");

class SubmissionRepository extends CrudRepository {
    constructor() {
        super(Submission);
    }
}
module.exports = SubmissionRepository;