const { SubmissionRepository } = require('../repository')
const submissionRepository = new SubmissionRepository();

class SubmissionService {
    async create(data) {
        try {
            const response = await submissionRepository.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = SubmissionService;