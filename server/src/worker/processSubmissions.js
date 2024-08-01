const { executeCode } = require('../utils/Executors/codeExecutors');
const { SubmissionRepository } = require('../repository');
const submissionRepository = new SubmissionRepository();

const processSubmission = async (data) => {
    try {
        const { submissionId, problemId, code, input, expectedOutput } = data;
        const executionOutput = await executeCode(code, input);
        let verdict = 'Accepted';
        if (executionOutput.trim() !== expectedOutput.trim()) {
            verdict = 'Wrong Answer';
        }
        const submission = await submissionRepository.getById(submissionId);
        submission.verdict = verdict;
        await submission.save();


    } catch (error) {
        throw error;
    }
}

module.exports = processSubmission;