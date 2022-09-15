require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig');
const sql = require('mssql/msnodesqlv8');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const user_auth = async (req,res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const username = req.body.username
    const user = { name: req.body.username, password: hashedPassword }
    if ( user.name == null || user.password == null ){
        return res.status(400).json('Error:Please enter proper credentials')
    }
        try{
            let pool = await sql.connect(configJobData)
            let users = await pool.request()
                .input('username', sql.VarChar, username)  
                .execute('UserExists')
                    var thisUser = users.recordset[0].username
                    var thisPass = users.recordset[0].hashedpassword
                    var thisAccess = users.recordset[0].apiaccess

            if ( await bcrypt.compare(req.body.password, thisPass) && thisUser === username) {
                if ( thisAccess === 'true' ) {
                        const accessToken = jwt.sign(
                          user,
                          process.env.ACCESS_TOKEN_SECRET,
                          { expiresIn: "30m" }
                        );
                        const refreshToken = jwt.sign(
                          user,
                          process.env.REFRESH_TOKEN_SECRET,
                          { expiresIn: "8hr" }
                        );
                        res.json({accessToken: accessToken, refreshToken: refreshToken})

                        let userUp = { usernm: req.body.username, refToken: refreshToken, accToken: accessToken}
                        try{
                            let pool = await sql.connect(configJobData);
                            let updateToken = await pool.request()
                                .input('usernm', sql.VarChar, userUp.usernm)
                                .input('refToken', sql.VarChar, userUp.refToken)
                                .input('accToken', sql.VarChar, userUp.accToken)
                                .execute('addTokens');
                    
                            //res.status(200).json(updateToken.recordsets);
                        }
                        catch (e){
                            res.status(500).json({ Error: e.message })
                            console.log(e);
                        }

                    } else {
                        res.status(403).json('Error:User does not have API access at this time, please check with your admin and contact Elite Services if necessary')
                    }
                } else {
                    res.status(403).json('Error:Username or password incorrect')
                }
        } catch (e) {
            res.status(500).json({ Error: e.message });
        }
}

const user_refresh = async (req,res) => {
        const refreshtoken = req.body.token
    if (refreshtoken == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let users = await pool.request()
            .input('refToken', sql.VarChar, refreshtoken)
            .execute('RefreshAccess')
        var thisRefTok = users.recordset[0].refreshtoken
        if ( thisRefTok === refreshtoken ){
                jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                    if (err) return res.sendStatus(403)
                    const accesstoken = jwt.sign({ name: user.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
                    res.status(201).json ({ accessToken: accesstoken })
    
                    let userUp = { refToken: refreshtoken, accToken: accesstoken}
                    try{
                        let pool = await sql.connect(configJobData);
                        let updateToken = await pool.request()
                            .input('refToken', sql.VarChar, userUp.refToken)
                            .input('accToken', sql.VarChar, userUp.accToken)
                            .execute('UpdateAccToken');
                
                        //return updateToken.recordsets;
                    }
                    catch (e){
                        res.status(500).json({ Error: e.message })
                        console.log(e);
                    }
                
                })
            } else {
                res.status(401).json('Error:Refresh token does not match our records')
            }

    } catch (e){
        res.status(500).json({ Error: e.message })
        consolee.log(e)
    }
}

const user_me = async (req,res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    try{
        let pool = await sql.connect(configJobData)
        let permLvl = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('UsersMe')
            res.json(JSON.parse(permLvl.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e)
    }
}

const user_create = async (req,res) => {
    try {
        const user = req.body
        for(let i = 0; i < user.length; i++){
            const hashedpassword = await bcrypt.hash(user[i].password, 10)
            Object.assign(user[i], { hashedpassword: hashedpassword })
         }
        const users = JSON.stringify(user)
        try{
            let pool = await sql.connect(configJobData);
            let insertUser = await pool.request()
                .input('users', sql.NVarChar, users)
                .execute('addUsers');
    
            res.status(200).json(insertUser.recordsets);
        }
        catch (e){
            res.status(500).json({ Error: e.message })
            console.log(e);
        }

    } catch (e){
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

const user_client_revoke = async (req,res) => {
    const client = req.body.clientid
    console.log('Clientid provided for RevokeAPIAccess call: '+client)
    try{
        let pool = await sql.connect(configJobData)
        let clients = await pool.request()
            .input('client', sql.VarChar, client)
            .execute('ClientExists')
            console.log('Records found by clientid that will now be disabled: '+clients.recordset[0]['count'])
        if( clients.recordset[0]['count'] > 0.5 ) {
            let pool2 = await sql.connect(configJobData)
            let revoke = await pool2.request()
                .input('client', sql.VarChar, client)
                .execute('RevokeUserAccess')
            res.status(202).json(revoke.recordsets)
        } else{
            res.status(400).json('Error:No users by that clientid found.')
            }

    } catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

const user_get_all = async (req,res) => {
    try{
        let pool = await sql.connect(configJobData);
        let users = await pool.request()
            .execute('GetAllUsers')
    
    res.status(200).json(JSON.parse(users.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (e){
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" })
}


module.exports = {
    user_auth,
    user_refresh,
    user_me,
    user_create,
    user_client_revoke,
    user_get_all
}