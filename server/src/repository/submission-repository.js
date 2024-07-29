// const submission = require("../models/submission");
const { Submission } = require('../models/index')
const CrudRepository = require("./crud-repository");

class SubmissionRepository extends CrudRepository {
    constructor() {
        super(Submission);
    }
}
module.exports = SubmissionRepository;