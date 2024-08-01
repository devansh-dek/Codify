const { SubmissionRepository } = require('../repository');
const submissionRepository = new SubmissionRepository();
const { TestCaseRepository } = require('../repository/index.js');
const testcaseRepository = new TestCaseRepository();

const { executeCode } = require('../utils/Executors/codeExecutors');
const { TestCase } = require('../models/');

console.log("TEStcases are ", TestCase);

class SubmissionService {
    async create(data) {
        try {
            // Create a new submission entry in the database
            const submission = await submissionRepository.create(data);
            const problemId = Number(data.problemId);
            console.log(problemId, 'is problem iddd');

            // Fetch problem's test cases
            const testCases = await testcaseRepository.getAllTests(problemId);
            console.log("testcases all are ", testCases);

            // Execute the submitted code
            // Compare the output with test cases and determine the verdict
            let verdict = 'Accepted';
            for (const testCase of testCases) {
                const executionOutput = await executeCode(data.code, testCase.dataValues.input);
                console.log("Exutrion out it ", executionOutput);
                const expectedOutput = testCase.dataValues.expectedOutput.trim();
                console.log("Comparing: ", executionOutput.trim(), " with ", expectedOutput);
                if (executionOutput.trim() !== expectedOutput) {
                    verdict = 'Wrong Answer';
                    break;
                }
            }

            // Update the submission with the verdict
            submission.verdict = verdict;
            await submission.save();

            return submission;
        } catch (error) {
            // Handle any errors that occur during submission creation
            throw error;
        }
    }
}

module.exports = SubmissionService;
