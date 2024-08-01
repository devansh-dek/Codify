const CrudRepository = require("./crud-repository");
const { TestCase } = require('../models/');
console.log("Here testcase are ", TestCase);
class TestCaseRepository extends CrudRepository {
    constructor() {
        super(TestCase);
    }
    async getAllTests(problemId) {
        try {
            console.log("problem id is ", problemId);
            const tests = await TestCase.findAll({
                where: {
                    problemId: 1
                }
            })
            console.log("TSTS ARE ", tests);
            return tests;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = TestCaseRepository;