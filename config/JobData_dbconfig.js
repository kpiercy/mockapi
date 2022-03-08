const sql = require('mssql/msnodesqlv8');
require('dotenv').config()

const configJobData = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DB1,
    driver: 'msnodesqlv8',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
    options: {
        trustedconnection: true,
        enableArithAort: true,
        abortTransactionOnError: true,
        appName: 'ElitePS REST API'
    },
    port: process.env.SQL_PORT1
}

module.exports = configJobData;