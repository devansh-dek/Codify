const submission = require("../models/submission");
const CrudRepository = require("./crud-repository");

class SubmissionRepository extends CrudRepository {
    constructor() {
        super(submission);
    }
}
module.exports = SubmissionRepository;