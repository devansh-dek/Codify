const { SubmissionRepository } = require('../repository');
const submissionRepository = new SubmissionRepository();
const { TestCaseRepository } = require('../repository/index.js');
const testcaseRepository = new TestCaseRepository();
const { createChannel, publishMessage } = require('../utils/MessageQueues/messageQueues.js');

const { executeCode } = require('../utils/Executors/codeExecutors');
const { TestCase } = require('../models/');

// console.log("TEStcases are ", TestCase);

class SubmissionService {
    async create(data) {
        try {
            // Creating a new submission entry
            console.log("SUbmission service data ,", data);
            const submission = await submissionRepository.create(data);
            console.log("dat a type is ", data.type);
            if (data.type === 'Run') {
                console.log("here");
                const message = JSON.stringify({ submissionId: submission.id, code: data.code, input: data.input, type: data.type });
                const channel = await createChannel();

                await publishMessage(channel, 'CODE_EXECUTION', message);
                return submission;
            }
            else {

                const problemId = Number(data.problemId);
                console.log(problemId, 'is problem iddd');

                // Fetching problem's test cases
                const testCases = await testcaseRepository.getAllTests(problemId);
                // console.log("testcases all are ", testCases);

                //calling out rabitmq queue
                const channel = await createChannel();
                for (const testCase of testCases) {
                    const message = JSON.stringify({ submissionId: submission.id, problemId, code: data.code, input: testCase.dataValues.input, expectedOutput: testCase.dataValues.expectedOutput });
                    await publishMessage(channel, 'CODE_EXECUTION', message);


                }
            }

            return submission;
        } catch (error) {
            throw error;
        }
    }
    async getSubmissionsById(Id) {
        try {
            console.log("Function id is ", Id);
            const response = await submissionRepository.getByUserId(Id);
            return response;
        }
        catch (error) {
            throw error;
        }
    }

}

module.exports = SubmissionService;
