const config = require('config');
const Pool = require('pg').Pool


const database = new Pool(config.get("dbConfig"))

module.exports = database