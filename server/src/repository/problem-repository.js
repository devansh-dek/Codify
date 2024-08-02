const CrudRepository = require("./crud-repository");
const { Problem } = require('../models/index');
console.log(Problem, "is problem");
class ProblemRepository extends CrudRepository {
    constructor() {
        super(Problem);
    }
    async getProblems(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const { rows: problems, count: totalProblems } = await Problem.findAndCountAll({
                limit, offset
            });
            const totalPages = Math.ceil(totalProblems / limit);
            return {
                problems,
                totalPages
            };



        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProblemRepository;