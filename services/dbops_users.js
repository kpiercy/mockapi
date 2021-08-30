require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig');
const sql = require('mssql/msnodesqlv8');
const express = require('express');



//get all users
async function getUsers(){
    try{
        let pool = await sql.connect(configJobData);
        let users = await pool.request()
            .execute('GetAllUsers')
    
    return users.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'];
    }

    catch (error){
        console.log(error);
    }
}

//insert new user to DB, SHA256 encrypt password provided
async function addUser(users){
    try{
        let pool = await sql.connect(configJobData);
        let insertUser = await pool.request()
            .input('users', sql.NVarChar, users)
            .execute('addUsers');

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
            .execute('UpdateAccToken');

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