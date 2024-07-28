const CrudRepository = require("./crud-repository");
const { Problem } = require('../models');
console.log(Problem, "is problem");
class ProblemRepository extends CrudRepository {
    constructor() {
        super(Problem);
    }
}

module.exports = ProblemRepository;