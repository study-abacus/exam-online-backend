require('dotenv').config();
const config = require('./api/config');

module.exports = {
    ...config.DB
}
