const BlogRepository = require("./blog-repository");
const ProblemRepository = require("./problem-repository");
const SubmissionRepository = require("./submission-repository");
const TestCaseRepository = require("./testcase-repository");
const UserRepository = require("./user-repository");
const VoteRepository = require('./vote-repository')

module.exports = {
    UserRepository,
    BlogRepository,
    VoteRepository,
    ProblemRepository,
    TestCaseRepository,
    SubmissionRepository

}