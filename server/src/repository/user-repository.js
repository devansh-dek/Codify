const { User } = require('../models/index.js')
const CrudRepository = require('./crud-repository.js');
class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }
    async getByUsername(username) {
        try {
            const result = await User.findOne(
                {
                    where: {
                        username: username
                    }
                }
            )
            return result
        }
        catch (error) {
            console.log("Error in user repo");
            throw error;
        }
    }
    async getByEmail(email) {
        try {
            const result = await User.findOne(
                {
                    where: {
                        email: email
                    }
                }
            )
            return result
        }
        catch (error) {
            console.log("Error in user repo");
            throw error;
        }
    }

}
module.exports = UserRepository;    