require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig');
const sql = require('mssql/msnodesqlv8');



//get all users
async function getUsers(){
    try{
        let pool = await sql.connect(configJobData);
        let users = await pool.request()
            .execute('GetAllUsers')
    return users.recordsets;
    }

    catch (error){
        console.log(error);
    }
}

//insert new user to DB, SHA256 encrypt password provided
async function addUser(user){
    try{
        //const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let pool = await sql.connect(configJobData);
        let insertUser = await pool.request()
            .input('guid', sql.VarChar, user.GUID)
            .input('name', sql.VarChar, user.name)
            .input('password', sql.VarChar, user.password)
            .input('permissionLvl', sql.VarChar, user.permissionLvl)
            .input('hashedPassword', sql.VarChar, user.hashedPassword)
            .execute('addUser');

        return insertUser.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

//used by authServer to update Users DB table with active refreshToken
async function addTokens(userUp){
    try{
        let pool = await sql.connect(configJobData);
        let updateToken = await pool.request()
            .input('usernm', sql.VarChar, userUp.usernm)
            .input('refToken', sql.VarChar, userUp.refToken)
            .input('accToken', sql.VarChar, userUp.accToken)
            .execute('addTokens');

        //return updateToken.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

async function updateAccToken(userUp){
    try{
        let pool = await sql.connect(configJobData);
        let updateToken = await pool.request()
            .input('refToken', sql.VarChar, userUp.refToken)
            .input('accToken', sql.VarChar, userUp.accToken)
            .execute('updateAccToken');

        //return updateToken.recordsets;
    }
    catch (error){
        console.log(error);
    }
}




module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    addTokens: addTokens,
    updateAccToken: updateAccToken
}