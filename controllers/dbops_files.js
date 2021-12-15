if ( process.env.ENVIRONMENT !== 'production' ) {
    require('dotenv').config()
}

var configJobData = require('../config/JobData_dbconfig');
const sql = require('mssql/msnodesqlv8');

//get all files by clientID
async function getFiles(clientID){
    try{

    }

    catch (error){
        console.log(error);
    }
}

//get file status by id
async function getStatus(fileID){
    try{

    }

    catch (error){
        console.log(error);
    }
}

//get clientID to add to filename
async function clientID(){
    try{

    }

    catch (error){
        console.log(error);
    }
}

module.exports = {
    getFiles: getFiles,
    getStatus: getStatus,
    clientID: clientID
}