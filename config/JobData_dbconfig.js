const sql = require('mssql/msnodesqlv8');
require('dotenv').config()

const configJobData = {
    user: process.env.SQL_USER_DEV,
    password: process.env.SQL_PASS_DEV,
    server: process.env.SQL_SERVER_DEV,
    database: process.env.SQL_DB_DEV,
    driver: 'msnodesqlv8',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 600
      },
    options: {
        trustedconnection: true,
        enableArithAort: true,
        abortTransactionOnError: true,
        appName: 'ElitePS REST API'
    },
    port: process.env.SQL_PORT_DEV
}

module.exports = configJobData;