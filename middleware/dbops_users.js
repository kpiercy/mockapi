require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig');
const sql = require('mssql/msnodesqlv8');


//get all users// DEPRECATE IN PRODUCTION
async function getUsers(){
    try{
        let pool = await sql.connect(configJobData);
        let users = await pool.request().query("SELECT ID,username from Users");
    return users.recordsets;
    }

    catch (error){
        console.log(error);
    }
}

//insert new user to DB, SHA256 encrypt password provided// DEPRECATE IN PRODUCTION
async function addUser(user){
    try{
        let pool = await sql.connect(configJobData);
        let insertUser = await pool.request()
            .input('name', sql.VarChar, user.name)
            .input('password', sql.VarChar, user.password)
            .execute('addUsers');

        //return insertUser.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

//used by authServer to update Users DB table with active refreshToken
async function addRefreshToken(userUp){
    try{
        let pool = await sql.connect(configJobData);
        let updateToken = await pool.request()
            .input('usernm', sql.VarChar, userUp.usernm)
            .input('refToken', sql.VarChar, userUp.refToken)
            .execute('addRefreshToken');

        //return updateToken.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    addRefreshToken: addRefreshToken
}