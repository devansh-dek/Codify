const { ProblemRepository } = require('../repository/index')
const problemRepository = new ProblemRepository();
class ProblemService {
    async create(data) {
        try {
            const response = await problemRepository.create(data);
            console.log("Response is ", response);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getAll() {
        try {
            const response = await problemRepository.getAll();
            return response;
        }
        catch (error) {
            throw error;
        }
    }


}
module.exports = ProblemService;