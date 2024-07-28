const { TestCaseRepository } = require('../repository/index');
const testcaseRepository = new TestCaseRepository();

class TestCaseService {
    async create(data) {
        try {
            const response = await testcaseRepository.create(data);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = TestCaseService;

