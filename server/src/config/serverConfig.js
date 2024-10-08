const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(9),
    JWT_KEY: process.env.JWT_SECRET_KEY,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME


}

