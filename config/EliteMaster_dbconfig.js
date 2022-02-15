const sql = require('mssql/msnodesqlv8');
require('dotenv').config()


const configEliteMaster = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DB2,
    driver: 'msnodesqlv8',
    options: {
        trustedconnection: true,
        enableArithAort: true,
    },
    port: process.env.SQL_PORT2
}

module.exports = configEliteMaster;