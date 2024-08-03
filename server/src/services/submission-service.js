const { SubmissionRepository } = require('../repository');
const submissionRepository = new SubmissionRepository();
const { TestCaseRepository } = require('../repository/index.js');
const testcaseRepository = new TestCaseRepository();
const { createChannel, publishMessage } = require('../utils/MessageQueues/messageQueues.js');

const { executeCode } = require('../utils/Executors/codeExecutors');
const { TestCase } = require('../models/');

console.log("TEStcases are ", TestCase);

class SubmissionService {
    async create(data) {
        try {
            // Creating a new submission entry
            const submission = await submissionRepository.create(data);
            const problemId = Number(data.problemId);
            console.log(problemId, 'is problem iddd');

            // Fetching problem's test cases
            const testCases = await testcaseRepository.getAllTests(problemId);
            console.log("testcases all are ", testCases);

            //calling out rabitmq queue
            const channel = await createChannel();
            for (const testCase of testCases) {
                const message = JSON.stringify({ submissionId: submission.id, problemId, code: data.code, input: testCase.dataValues.input, expectedOutput: testCase.dataValues.expectedOutput });
                await publishMessage(channel, 'CODE_EXECUTION', message);


            }

            return submission;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = SubmissionService;
