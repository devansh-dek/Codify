const { executeCode } = require('../utils/Executors/codeExecutors');
const { SubmissionRepository } = require('../repository');
const submissionRepository = new SubmissionRepository();

const processSubmission = async (data) => {
    try {
        console.log("EXECUTED CODE ", data);
        const { submissionId, problemId, code, input, expectedOutput, type } = data;
        const executionOutput = await executeCode(code, input);
        if (type == 'Run') {
            submission.output = executionOutput;
            await submission.save();
            return;
        }
        let verdict = 'Accepted';
        if (executionOutput.trim() !== expectedOutput.trim()) {
            verdict = 'Wrong Answer';
        }
        const submission = await submissionRepository.getById(submissionId);
        submission.verdict = verdict;
        submission.status = 'executed';
        await submission.save();


    } catch (error) {
        throw error;
    }
}

module.exports = processSubmission;