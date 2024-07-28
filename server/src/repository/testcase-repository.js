const CrudRepository = require("./crud-repository");
const { TestCases } = require('../models/index');
class TestCaseRepository extends CrudRepository {
    constructor() {
        super(TestCases);
    }


}
module.exports = TestCaseRepository;