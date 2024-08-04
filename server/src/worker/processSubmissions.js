const { executeCode } = require('../utils/Executors/codeExecutors');
const { SubmissionRepository } = require('../repository');
const submissionRepository = new SubmissionRepository();
const { io } = require('../index');
const processSubmission = async (data) => {
    try {
        console.log("EXECUTED CODE ", data);
        if (data.type === 'Run') {
            console.log("ABOVE");
            const { submissionId, code, input, type } = data;
            console.log("Cod and input are ", code, "  ", input);
            const executionOutput = await executeCode(code, input);
            const submission = await submissionRepository.getById(submissionId);
            submission.status = 'executed';

            submission.output = executionOutput;
            await submission.save();
            console.log("Executed output is ", executionOutput);
            io.emit('codeExecuted', { submissionId, output: executionOutput });
            return;
        }
        else {

            console.log("Below");
            const { submissionId, problemId, code, input, expectedOutput, type } = data;
            const executionOutput = await executeCode(code, input);
            let verdict = 'Accepted';
            if (executionOutput.trim() !== expectedOutput.trim()) {
                verdict = 'Wrong Answer';
            }
            const submission = await submissionRepository.getById(submissionId);
            submission.verdict = verdict;
            submission.status = 'executed';
            await submission.save();
            io.emit('submissionVerdict', { submissionId, verdict });
        }

    } catch (error) {
        throw error;
    }
}

module.exports = processSubmission;