require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig');
const sql = require('mssql/msnodesqlv8');

async function getClients(){
    try{
        let pool = await sql.connect(configJobData);
        let clients = await pool.request()
            .execute('GetAllClients')
    
    return clients.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'];
    }

    catch (error){
        console.log(error);
    }
}

module.exports = {
    getClients: getClients
}